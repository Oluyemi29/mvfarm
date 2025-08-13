"use client";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { MdEventAvailable } from "react-icons/md";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaSackDollar } from "react-icons/fa6";

const HeroOne = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col-reverse justify-between md:gap-10 gap-4 md:mt-10 mt-4">
        <div className="w-full flex md:flex-col flex-col-reverse">
          <Image
            src={"/rabb.png"}
            alt="Rabiit"
            width="60%"
            height="auto"
            className="m-auto"
          />
          <div>
            <h1 className="text-maindeep font-bold text-2xl md:text-5xl">
              Get Your Desire Pet Breeds
            </h1>
            <p className="text-maindeep mt-5">
              Your trusted online destination for buying and selling healthy,
              farm-raised rabbits. Whether you`re a farmer, breeder, or pet
              lover, we connect you with quality rabbits at affordable prices.
              Safe, simple, and reliable — start your rabbit journey with us
              today
            </p>
            <div className="flex flex-row gap-2 md:gap-5">
              <Button
                as={Link}
                href="/login"
                className="text-white bg-maindeep mt-10"
              >
                Start Now
              </Button>
              <Button
                as={Link}
                href="/request"
                className="text-maindeep bg-mainfaided mt-10"
              >
                Make Request
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Image
            src="https://i.pinimg.com/1200x/d7/ce/60/d7ce6066ac0d682c30812355e4262fb5.jpg"
            alt="Cages"
            className="md:w-[75%] w-full mx-auto"
          />
        </div>
      </div>
      <div className="w-full bg-mainfaided flex flex-row items-center px-8 py-4 mt-5 rounded-md justify-between">
        <div className="flex flex-row gap-1 items-center">
          <MdEventAvailable className="text-maindeep" />
          <h1 className="text-maindeep text-sm md:block hidden">24/7 Availablility</h1>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <VscWorkspaceTrusted className="text-maindeep" />
          <h1 className="text-maindeep text-sm md:block hidden">Guarantee Trust</h1>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <FaSackDollar className="text-maindeep" />
          <h1 className="text-maindeep text-sm md:block hidden">Payment Plan</h1>
        </div>
      </div>
    </div>
  );
};

export default HeroOne;
