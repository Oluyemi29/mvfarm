"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardLanding = () => {
  return (
    <div className="w-full bg-mainfaided/10 rounded-lg flex md:flex-row flex-col-reverse justify-between gap-10 p-5">
      <div className="flex w-full flex-col justify-center items-center">
        <h1 className="lg:text-6xl md:text-4xl text-3xl text-center font-bold text-maindeep">
          Farm Animal are <br /> Friendly
        </h1>
        <p className="text-medium text-maindeep mt-5">Get One Get More</p>
        <p className="mt-1 text-medium text-maindeep">
          You can make request here
        </p>
        <Button
          as={Link}
          href="/farm/request"
          className="bg-maindeep mt-5 text-white"
        >
          Make a request
        </Button>
      </div>
      <div className="w-full">
        <Image
          src={"/side-rab.png"}
          alt="animal"
          width={100}
          height={100}
          priority
          quality={100}
          className="md:w-2/6 w-3/6 mx-auto rounded-md animate-bounce"
        />
      </div>
    </div>
  );
};

export default DashboardLanding;
