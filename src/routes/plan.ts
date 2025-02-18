import express from "express";
import { createPlan, updatePlan, getPlans, getPlanById, deletePlan } from "../controllers/plan.controller";

const router = express.Router();

router.post("/", createPlan); // Create a new plan
router.put("/:planId", updatePlan); // Update an existing plan
router.get("/", getPlans); // Get all plans
router.get("/:planId", getPlanById); // Get a plan by ID
router.delete("/:planId", deletePlan); // Delete a plan

export default router;
