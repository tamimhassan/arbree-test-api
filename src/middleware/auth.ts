import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { USER_ROLE } from "../utils/enum";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateUser = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, userRole: USER_ROLE };
    (req as any).userId = decoded.userId;
    (req as any).userRole = decoded.userRole
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
