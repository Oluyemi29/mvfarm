import CartDetails from "@/components/CartDetails";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cart",
};

const page =async () => {
  const PUBLIC_KEY = process.env.FLW_PUBLIC_KEY as string
  return (
    <div>
      <CartDetails PUBLIC_KEY={PUBLIC_KEY} />
    </div>
  );
};

export default page;
