"use client";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const HeroThree = () => {
  return (
    <motion.div
      initial={{
        y: 100,
        opacity: 0,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      className="my-5"
    >
      <h1 className="text-maindeep font-semibold text-center text-2xl mt-5">
        About Us
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10 mt-6">
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="w-full"
        >
          <p className="text-maindeep">
            At Mhayvic Farm, we are passionate about connecting rabbit breeders,
            farmers, and buyers through a trusted and convenient online
            platform. Our goal is to make the process of buying and selling farm
            animals—especially rabbits—easier, safer, and more accessible for
            everyone. We work closely with reputable breeders and sellers to
            ensure that all animals listed on our platform are healthy,
            well-cared for, and ready for their new homes. Whether you`re
            starting a farm, expanding your livestock, or simply looking for a
            pet rabbit, RabbitFarm Market is here to help. With a focus on
            quality, transparency, and customer satisfaction, we`re building a
            reliable marketplace that supports sustainable farming and
            responsible animal care.
          </p>
          <Button as={Link} href="/" className="bg-maindeep mt-5 text-white">
            Check it out
          </Button>
        </motion.div>
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="w-full"
        >
          <Image
            src={
              "https://i.pinimg.com/736x/b8/a4/31/b8a43169a059fbafbaab74bcd8465c45.jpg"
            }
            alt="Rabbit"
            className="md:w-[75%] w-full h-auto"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroThree;
