import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { inngest } from "@/inngest/client";
import { email } from "zod";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
export const appRouter = createTRPCRouter({
  testAi: baseProcedure.mutation(async () => {
    await inngest.send({
      name:"execute/ai",
    })
    
    return { success: true, message: "Workflow queued" };
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflows.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "mani@gmail.com",
      },
    });
    return { success: true, message: "Workflow queued" };
  }),
});

export type AppRouter = typeof appRouter;
