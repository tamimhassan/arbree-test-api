import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { USER_ROLE } from "../utils/enum";


const prisma = new PrismaClient();

export const authorizeRole = (role: USER_ROLE): any => {
  return (req: Request, res: Response, next: NextFunction) => {


    if ((req as any).userRole !== role) {
      return res.status(403).json({ message: "Access denied: Insufficient permissions" });
    }
    next();
  };
};
