import VerifyEmail from "@/components/VerifyEmail";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Verification",
};
const page = () => {
  return <div>
    <VerifyEmail />
  </div>;
};

export default page;
