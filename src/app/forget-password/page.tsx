import ForgetPassword from "@/components/ForgetPassword";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Forget Password",
};

const page = () => {
  return (
    <div>
      <ForgetPassword />
    </div>
  );
};

export default page;
