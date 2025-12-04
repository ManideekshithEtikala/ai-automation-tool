import prisma from '@/lib/db';
import { createTRPCRouter, protectedProcedure } from '../init';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx}) => {
      return prisma.workflows.findMany();
    }),
    createWorkflow: protectedProcedure.mutation(async()=>{
      await inngest.send({
        name:"test/hello.world",
        data:{
          email:"mani@gmail.com"
        }
      })
      return { success: true,message: "Workflow queued" };
    })
});

export type AppRouter = typeof appRouter;