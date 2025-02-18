import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new plan
export const createPlan = async (req: Request, res: Response) => {
  const { name, description, price, duration } = req.body;

  try {
    const newPlan = await prisma.plan.create({
      data: {
        name,
        description,
        price,
        duration,
      },
    });
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ error: "Failed to create plan" });
  }
};

// Update an existing plan
export const updatePlan = async (req: Request, res: Response) => {
  const { planId } = req.params;
  const { name, description, price, duration } = req.body;

  try {
    const updatedPlan = await prisma.plan.update({
      where: { id: Number(planId) },
      data: {
        name,
        description,
        price,
        duration,
      },
    });
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ error: "Failed to update plan" });
  }
};

// Get all plans
export const getPlans = async (req: Request, res: Response) => {
  try {
    const plans = await prisma.plan.findMany();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
};

// Get a single plan by ID
export const getPlanById = async (req: Request, res: Response): Promise<any> => {
  const { planId } = req.params;

  try {
    const plan = await prisma.plan.findUnique({
      where: { id: Number(planId) },
    });
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch plan" });
  }
};

// Delete a plan
export const deletePlan = async (req: Request, res: Response) => {
  const { planId } = req.params;

  try {
    const deletedPlan = await prisma.plan.delete({
      where: { id: Number(planId) },
    });
    res.json({ message: "Plan deleted", plan: deletedPlan });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete plan" });
  }
};
