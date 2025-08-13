import ResetPassword from "@/components/ResetPassword";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Reset Password",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id as string;

  return (
    <div>
      <ResetPassword id={id} />
    </div>
  );
};

export default page;
