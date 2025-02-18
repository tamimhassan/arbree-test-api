import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { addMonths } from "date-fns"; // To calculate end date based on plan duration
import { SUBSCRIPTION_STATUS } from "../utils/enum";

const prisma = new PrismaClient();

// Create a new subscription
export const createSubscription = async (req: Request, res: Response): Promise<any> => {
  const { userId, planId } = req.body;

  try {
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    // Calculate end date based on plan duration (e.g., "1 month")
    const durationInMonths = parseInt(plan.duration.split(" ")[0]);
    const endDate = addMonths(new Date(), durationInMonths);

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planId,
        status: SUBSCRIPTION_STATUS.ACTIVE,
        endDate,
      },
    });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: "Failed to create subscription" });
  }
};

// Update a subscription (e.g., for upgrading or downgrading a plan)
export const updateSubscription = async (req: Request, res: Response): Promise<any> => {
  const { subscriptionId } = req.params;
  const { planId } = req.body;

  try {
    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    const updatedSubscription = await prisma.subscription.update({
      where: { id:Number(subscriptionId) },
      data: {
        planId,
        endDate: addMonths(new Date(), parseInt(plan.duration.split(" ")[0])),
        status: SUBSCRIPTION_STATUS.ACTIVE,
      },
    });

    res.json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subscription" });
  }
};

// Cancel a subscription
export const cancelSubscription = async (req: Request, res: Response):Promise<any> => {
  const { subscriptionId } = req.params;

  try {
    const subscription = await prisma.subscription.update({
      where: { id: Number(subscriptionId) },
      data: {
        status: SUBSCRIPTION_STATUS.CANCELED,
      },
    });

    res.json({ message: "Subscription cancelled", subscription });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel subscription" });
  }
};

// Get all subscriptions for a user
export const getUserSubscriptions = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;

  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: Number(userId) },
      include: { plan: true },
    });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
};
