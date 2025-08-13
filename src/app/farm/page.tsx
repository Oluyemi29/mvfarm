import Dashboard from "@/components/Dashboard";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "Farm",
};

const page = async () => {
  noStore();
  const allfarmInfo = await prisma.farmanimal.findMany({
    where: {
      available: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <Dashboard allfarmInfo={allfarmInfo} />
    </div>
  );
};

export default page;
