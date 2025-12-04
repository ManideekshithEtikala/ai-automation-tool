"use client"
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const  Page=() => {
  const trpc=useTRPC();
  const queryClient=useQueryClient();
  const {data}=useQuery(trpc.getWorkflows.queryOptions());
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success("Workflow created successfully");
  }}));
  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess: () => {
      toast.success("Ai Job queued successfully");
  }
  })); 
  return (
   <div className="min-h-screen min-w-screen flex items-center justify-center">
{JSON.stringify(data,null,2)}
<Button disabled={testAi.isPending} onClick={()=>testAi.mutate()}>Test AI</Button>
<Button disabled={create.isPending} onClick={()=>create.mutate()}>Create Workflow</Button>
<LogoutButton />
   </div>
  );
}
export default Page;
