import AllUsers from "@/components/AllUsers";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "All Users",
};

const page = async () => {
  noStore();
  const AllUserInfo = await prisma.user.findMany();
  return (
    <div>
      <AllUsers AllUserInfo={AllUserInfo} />
    </div>
  );
};

export default page;
