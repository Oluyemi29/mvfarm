import Profile from "@/components/Profile";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile",
};

const page = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default page;
