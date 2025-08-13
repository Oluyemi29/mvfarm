import Login from "@/components/Login";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
};

const page = () => {
  return (
    <div>
      <Suspense>
        <Login />
      </Suspense>
    </div>
  );
};

export default page;
