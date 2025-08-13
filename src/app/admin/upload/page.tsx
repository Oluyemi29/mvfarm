import UploadFarm from "@/components/UploadFarm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Upload Farm",
};

const page = () => {
  return (
    <div>
      <UploadFarm />
    </div>
  );
};

export default page;
