import { Request, Response } from "express";
import AuthService from "../services/authService";

class AuthController {
  private static instance: AuthController;
  private authService: AuthService;
  constructor() {
    this.authService = AuthService.getInstance();
  }

  public static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }
      const result = await this.authService.login(email, password);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      if (password.length < 6) {
        res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
        return;
      }

      const result = await this.authService.register(email, password);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default AuthController;
