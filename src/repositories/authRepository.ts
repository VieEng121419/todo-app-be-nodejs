import AuthModel, { UserType } from "../models/authModel";

interface LoginResponse {
  success: boolean;
  user: UserType;
}

class AuthRepository {
  private static instance: AuthRepository;

  public static getInstance(): AuthRepository {
    if (!AuthRepository.instance) {
      AuthRepository.instance = new AuthRepository();
    }
    return AuthRepository.instance;
  }

  async findUserByEmail(email: string): Promise<UserType | null> {
    try {
      return await AuthModel.findOne({ email });
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("User not found");
    }
  }

  async login(email: string): Promise<LoginResponse> {
    try {
      const user = await this.findUserByEmail(email);

      if (!user) {
        return { success: false, user: null };
      }

      return { user, success: true };
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Login failed");
    }
  }

  async register(userData: UserType): Promise<UserType> {
    try {
      const newUser = new AuthModel(userData);
      return await newUser.save();
    } catch (error) {
      console.error("Error during registration:", error);
      throw new Error("Registration failed");
    }
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    try {
      await AuthModel.findByIdAndUpdate(userId, {
        $push: {
          refreshTokens: {
            token: refreshToken,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          },
        },
      });
    } catch (error) {
      console.error("Error saving refresh token:", error);
      throw new Error("Failed to save refresh token");
    }
  }
}

export default AuthRepository;
