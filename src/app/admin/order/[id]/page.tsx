import EachOrder from "@/components/EachOrder";
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // read route params
  const { id } = await params;

  // fetch data
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    select: {
      animal: true,
      breed: true,
    },
  });

  return {
    title: order ? `${order.animal} - ${order.breed}` : "Order",
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  noStore()
  const id = (await params).id;
  const eachOrder = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      User: true,
    },
  });

  return (
    <div>
      <EachOrder eachOrder={eachOrder} />
    </div>
  );
};

export default page;
