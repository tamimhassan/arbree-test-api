import express, {NextFunction, Response, Request} from "express";
import { authenticateUser } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";
import { authorizeRole } from "../middleware/authorizeRole";
import { USER_ROLE } from "../utils/enum";

const router = express.Router();
const prisma = new PrismaClient();



const getUserProfile = async (req: Request, res: Response): Promise<any> => {
  const user = await prisma.user.findUnique({
    where: { id: (req as any).userId },
    select: { id: true, email: true, name: true, },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
}


router.get("/profile", getUserProfile);
// Protect a route for Admin only
router.get("/admin", authorizeRole(USER_ROLE.ADMIN), (req, res) => {
  res.send("Welcome Admin");
});

// Protect a route for Customer only
router.get("/customer", authorizeRole(USER_ROLE.CUSTOMER), (req, res) => {
  res.send("Welcome Customer");
});

export default router;