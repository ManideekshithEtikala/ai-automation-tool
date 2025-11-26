
import prisma from "@/lib/db";
export default async function Home() {
  const data= await prisma.user.findMany();
  console.log(data);
  return (
   <div>hell0world</div>
  );
}
