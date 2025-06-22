import jwt from "jsonwebtoken";
import Auth from "../models/authModel";

interface JwtPayloadType {
    id: string;
}

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayloadType;
    const user = await Auth.findById(decoded.id).select("-password -refreshTokens");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
