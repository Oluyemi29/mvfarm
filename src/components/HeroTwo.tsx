"use client";
import { Image } from "@heroui/react";
import React from "react";
import { motion } from "framer-motion";

const HeroTwo = () => {
  return (
    <div className="mt-5">
      <div className="grid grid-cols-2 md:grid-cols-6 justify-between items-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <div className="text-center">
            <Image
              src={
                "https://i.pinimg.com/736x/b7/ec/a3/b7eca3dadcd11260a759f5e6726cb82e.jpg"
              }
              alt="Rabiit"
              className="w-40 h-40 rounded-full"
            />
            <h1>Rabbit</h1>
          </div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <div className="text-center">
            <Image
              src={
                "https://i.pinimg.com/736x/eb/1d/41/eb1d41eab2667a6451ef1819a11489e3.jpg"
              }
              alt="Rabiit"
              className="w-40 h-40 rounded-full"
            />
            <h1>Rabbit</h1>
          </div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <div className="text-center">
            <Image
              src={
                "https://i.pinimg.com/736x/3d/4d/98/3d4d98bc63ce629a42f70316bece8c5a.jpg"
              }
              alt="Rabiit"
              className="w-40 h-40 rounded-full"
            />
            <h1>Rabbit</h1>
          </div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <div className="text-center">
            <Image
              src={
                "https://i.pinimg.com/736x/8b/20/3c/8b203c447f829ae2c35e676ebd4f5a90.jpg"
              }
              alt="Rabiit"
              className="w-40 h-40 rounded-full"
            />
            <h1>Rabbit</h1>
          </div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <div className="text-center">
            <Image
              src={
                "https://i.pinimg.com/736x/2c/52/75/2c52750f72df8d20321b09b6aa0a0269.jpg"
              }
              alt="Rabiit"
              className="w-40 h-40 rounded-full"
            />
            <h1>Rabbit</h1>
          </div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <div className="text-center">
            <Image
              src={
                "https://i.pinimg.com/736x/c3/33/19/c3331970404812ed908d4d3cb182ef5c.jpg"
              }
              alt="Rabiit"
              className="w-40 h-40 rounded-full"
            />
            <h1>Rabbit</h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroTwo;
