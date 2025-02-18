import express from "express";
import {
  createSubscription,
  getUserSubscriptions,
  updateSubscription,
  cancelSubscription,
} from "../controllers/subscription.controller";

const router = express.Router();

router.post("/", createSubscription);
router.get("/", getUserSubscriptions);
router.put("/", updateSubscription);
router.delete("/", cancelSubscription);

export default router;
