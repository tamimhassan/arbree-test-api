import express from "express";
import {
  createSubscription,
  getUserSubscriptions,
  updateSubscription,
  cancelSubscription,
} from "../controllers/subscription.controller";

const router = express.Router();

router.post("/", createSubscription);
router.get("/:userId", getUserSubscriptions);
router.put("/:subscriptionId", updateSubscription);
router.delete("/:subscriptionId", cancelSubscription);

export default router;
