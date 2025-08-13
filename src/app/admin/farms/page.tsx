import AllFarms from "@/components/AllFarms";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "All Farms",
};

const page = async () => {
  noStore();
  const allFarmAnimal = await prisma.farmanimal.findMany();
  return (
    <div>
      <AllFarms allFarmAnimal={allFarmAnimal} />
    </div>
  );
};

export default page;
