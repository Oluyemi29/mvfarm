import OrderDetails from "@/components/Order";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "Order",
};

const page = async () => {
  noStore();

  const allOrder = await prisma.order.findMany();
  return (
    <div>
      <OrderDetails allOrder={allOrder} />
    </div>
  );
};

export default page;
