import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface RefreshTokenType {
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface UserType {
  _id?: mongoose.Types.ObjectId;
  email: string;
  userName: string;
  password: string;
  refreshTokens?: RefreshTokenType[];
  comparePassword?: (candidatePassword: string) => Promise<boolean>;
}

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  },
});

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    refreshTokens: [refreshTokenSchema],
  },
  {
    timestamps: true,
  }
);

authSchema.pre("save", function (next) {
  for (let i = this.refreshTokens.length - 1; i >= 0; i--) {
    if (this.refreshTokens[i].expiresAt <= new Date()) {
      this.refreshTokens.splice(i, 1);
    }
  }
  next();
});

const Auth = mongoose.model<UserType>("User", authSchema);

export default Auth;
