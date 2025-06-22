import AuthRepository from "../repositories/authRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  private static instance: AuthService;
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = AuthRepository.getInstance();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private generateTokens(userId: string): TokenPair {
    // Implement token generation logic here
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      { id: userId },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return { accessToken, refreshToken };
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await this.authRepository.login(email);

      if (!response.success) {
        return { success: false, message: "Invalid email or password" };
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        response.user.password
      );

      if (!isPasswordValid) {
        return { success: false, message: "Invalid email or password" };
      }

      const { accessToken, refreshToken } = this.generateTokens(
        response.user._id.toString()
      );

      await this.authRepository.saveRefreshToken(
        response.user._id.toString(),
        refreshToken
      );

      return {
        success: true,
        message: "Login successful",
        accessToken,
        refreshToken,
        user: {
          id: response.user._id.toString(),
          email: response.user.email,
          name: response.user.userName,
        },
      };
    } catch (error) {}
  }

  async register(email: string, password: string): Promise<any> {
    try {
        const existingUser = await this.authRepository.findUserByEmail(email);
        if (existingUser) {
            return { success: false, message: "User already exists" };
        }
    
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await this.authRepository.register({
            email,
            userName: email.split("@")[0], // Simple username generation
            password: hashedPassword,
        });
    
        const { accessToken, refreshToken } = this.generateTokens(
            newUser._id.toString()
        );
    
        await this.authRepository.saveRefreshToken(
            newUser._id.toString(),
            refreshToken
        );
    
        return {
            success: true,
            message: "Registration successful",
            accessToken,
            refreshToken,
            user: {
            id: newUser._id.toString(),
            email: newUser.email,
            name: newUser.userName,
            },
        };
    } catch (error) {
      console.error("Error during registration:", error);
      return { success: false, message: "Registration failed" };
    }
  }
}

export default AuthService;
