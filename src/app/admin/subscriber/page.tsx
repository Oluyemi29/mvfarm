import AllSubscribers from "@/components/AllSubscribers";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "Subscriber",
};
const page = async () => {
  noStore();
  const subscribers = await prisma.subscribe.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <AllSubscribers subscribers={subscribers} />
    </div>
  );
};

export default page;
