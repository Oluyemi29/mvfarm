import Register from "@/components/Register";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register",
};

const page = () => {
  return (
    <div>
      <Suspense>
        <Register />
      </Suspense>
    </div>
  );
};

export default page;
