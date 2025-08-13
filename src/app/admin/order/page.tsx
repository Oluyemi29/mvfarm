import AllOrders from "@/components/AllOrders";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "All Order",
};
const page = async () => {
  noStore();
  const allOrder = await prisma.order.findMany({
    include: {
      User: true,
    },
  });
  return (
    <div>
      <AllOrders allOrder={allOrder} />
    </div>
  );
};

export default page;
