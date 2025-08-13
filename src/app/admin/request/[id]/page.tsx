import EachRequest from "@/components/EachRequest";
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore} from "next/cache";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // read route params
  const { id } = await params;

  // fetch data
  const request = await prisma.request.findUnique({
    where: {
      id,
    },
    select: {
      animal: true,
      breed: true,
    },
  });

  return {
    title: request ? `${request.animal} - ${request.breed}` : "Request",
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  noStore()
  const id = (await params).id;
  const eachRequest = await prisma.request.findUnique({
    where: {
      id,
    },
    include: {
      User: true,
    },
  });

  return (
    <div>
      <EachRequest eachRequest={eachRequest} />
    </div>
  );
};

export default page;
