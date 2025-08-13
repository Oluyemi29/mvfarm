import Register from "@/components/Register";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register",
};

// correction
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
