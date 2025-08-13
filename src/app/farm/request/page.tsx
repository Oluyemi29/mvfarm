import Request from "@/components/Request";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "Request",
};

const page = async () => {
  noStore();
  const myRequest = await prisma.request.findMany({});

  return (
    <div>
      <Request Request={myRequest} />
    </div>
  );
};

export default page;
