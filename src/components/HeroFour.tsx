"use client";
import { Button, Image } from "@heroui/react";
import React from "react";
import { motion } from "framer-motion";

const HeroFour = () => {
  return (
    <div>
      <h1 className="text-maindeep text-2xl font-semibold text-center underline underline-offset-4 my-6">
        Breeds
      </h1>
      <div className="grid md:grid-cols-2 w-full justify-center grid-cols-1 gap-10">
        <motion.div initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }} className="flex md:flex-row flex-col gap-2">
          <div className="w-full flex flex-col justify-evenly">
            <h1 className="text-medium font-semibold text-maindeep">
              Flemish Giant rabbit
            </h1>
            <p className="text-maindeep line-clamp-6">
              he Flemish Giant is one of the largest and oldest domesticated
              rabbit breeds, originally from Belgium. Known for its massive size
              and calm temperament, this gentle giant can weigh up to 14 - 20
              pounds or more.
            </p>
            <Button className="bg-maindeep w-max mt-5 text-white">
              Get one
            </Button>
          </div>
          <div>
            <Image
              src={
                "https://i.pinimg.com/736x/75/87/36/758736577dcd7d822270051d1811e373.jpg"
              }
              alt="Rabbit"
              className=" w-full"
            />
          </div>
        </motion.div>
        <motion.div initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }} className="flex md:flex-row flex-col gap-2">
          <div className="w-full flex flex-col justify-evenly">
            <h1 className="text-medium font-semibold text-maindeep">
              Lionhead rabbit
            </h1>
            <p className="text-maindeep line-clamp-6">
              The Lionhead rabbit is a small, friendly, and fluffy breed known
              for its distinctive woolly mane around the head, resembling a
              lion`s mane. Originating from Belgium, this breed is popular as a
              pet due to its gentle nature and unique appearance.
            </p>
            <Button className="bg-maindeep text-white mt-5 w-max">
              Get one
            </Button>
          </div>
          <div>
            <Image
              src={
                "https://i.pinimg.com/736x/d6/61/78/d66178366b35b338fc2d0b9d55219e07.jpg"
              }
              alt="Rabbit"
              className=" w-full"
            />
          </div>
        </motion.div>
        <motion.div initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }} className="flex md:flex-row flex-col gap-2">
          <div className="w-full flex flex-col justify-evenly">
            <h1 className="text-medium font-semibold text-maindeep">
              Angora rabbit
            </h1>
            <p className="text-maindeep line-clamp-6">
              The Angora rabbit is famous for its long, soft, and luxurious
              wool, which is harvested and used in making high-quality yarn and
              clothing. Originally bred in Turkey, this breed is one of the
              oldest types of domestic rabbits.
            </p>
            <Button className="bg-maindeep text-white mt-5 w-max">
              Get one
            </Button>
          </div>
          <div>
            <Image
              src={
                "https://i.pinimg.com/736x/ce/9c/57/ce9c57123acc496ebca0f89f70f6761e.jpg"
              }
              alt="Rabbit"
              className=" w-full"
            />
          </div>
        </motion.div>
        <motion.div initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }} className="flex md:flex-row flex-col gap-2">
          <div className="w-full flex flex-col justify-evenly">
            <h1 className="text-medium font-semibold text-maindeep">
              Rex rabbit
            </h1>
            <p className="text-maindeep line-clamp-6">
              The Rex rabbit is known for its incredibly soft, velvety fur,
              which feels like plush velvet to the touch. This unique texture
              comes from a genetic mutation that causes their guard hairs to be
              the same length as the undercoat.
            </p>
            <Button className="bg-maindeep text-white mt-5 w-max">
              Get one
            </Button>
          </div>
          <div>
            <Image
              src={
                "https://i.pinimg.com/736x/d4/a2/fe/d4a2fe6c399445f4de194202b1558d52.jpg"
              }
              alt="Rabbit"
              className=" w-full"
            />
          </div>
        </motion.div>
        <motion.div initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }} className="flex md:flex-row flex-col gap-2">
          <div className="w-full flex flex-col justify-evenly">
            <h1 className="text-medium font-semibold text-maindeep">
              Californian rabbit
            </h1>
            <p className="text-maindeep line-clamp-6">
              The Californian rabbit is a popular meat and show breed,
              recognized for its striking white body with dark markings on the
              ears, nose, feet, and tail. Developed in California in the 1920s,
              this medium-to-large breed combines the best traits of the New
              Zealand White and Himalayan rabbits.
            </p>
            <Button className="bg-maindeep text-white mt-5 w-max">
              Get one
            </Button>
          </div>
          <div>
            <Image
              src={
                "https://i.pinimg.com/736x/28/3d/32/283d32f0d9c54dee3a7e8d6e813fa3ce.jpg"
              }
              alt="Rabbit"
              className=" w-full"
            />
          </div>
        </motion.div>
        <motion.div initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }} className="flex md:flex-row flex-col gap-2">
          <div className="w-full flex flex-col justify-evenly">
            <h1 className="text-medium font-semibold text-maindeep">
              Harlequin rabbit
            </h1>
            <p className="text-maindeep line-clamp-6">
              The Harlequin rabbit is easily recognized by its unique and
              eye-catching color pattern, often featuring alternating bands of
              two contrasting colors—typically orange with black, blue,
              chocolate, or lilac.
            </p>
            <Button className="bg-maindeep text-white mt-5 w-max">
              Get one
            </Button>
          </div>
          <div>
            <Image
              src={
                "https://i.pinimg.com/736x/14/35/1a/14351a13c9f939b53ad5774c6ae95bee.jpg"
              }
              alt="Rabbit"
              className=" w-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroFour;
