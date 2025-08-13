"use client";
import { Button, Card, Divider } from "@heroui/react";
import React, { useContext } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { AuthContext } from "./ContextApi";
import Image from "next/image";
import { useSession } from "next-auth/react";

type AllFarmProps = {
  allfarm: {
    id: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    animal: string;
    age: string;
    breed: string;
    gender: string;
    amount: number;
    message: string;
  }[];
};
const FarmCards = ({ allfarm }: AllFarmProps) => {
  const { data: session } = useSession();
  const userId = session?.user.id as string;
  const Context = useContext(AuthContext);
  // const AddToCart = Context?.AddToCart
  return (
    <div>
      {allfarm.length < 1 ? (
        <div className="w-full h-48 flex flex-col justify-center items-center">
          <h1 className="text-maindeep text-lg underline underline-offset-2">
            No Farm Animal Available
          </h1>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          {allfarm.map((eachFarm, index) => {
            return (
              <Card key={index} className="p-4">
                <Image
                  src={eachFarm.image}
                  alt="farm"
                  height={100}
                  width={100}
                  className="w-full lg:h-48 h-60 rounded-md"
                  priority
                  quality={100} 
                />
                <div>
                  <h1 className="text-maindeep font-semibold text-medium">
                    {eachFarm.animal}
                  </h1>
                  <div className="flex text-maindeep text-sm flex-row justify-between items-center my-1">
                    <p>{eachFarm.gender}</p>
                    <p>{eachFarm.age}</p>
                  </div>
                  <Divider className="bg-maindeep" />
                  <p className="h-20 w-full text-maindeep overflow-y-auto mt-4 no-scrollbar text-sm">
                    {eachFarm.message}
                  </p>
                  <div className="text-maindeep flex flex-row justify-between items-center w-full mt-5">
                    <p>
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(eachFarm.amount)}
                    </p>
                    <Button
                      onPress={() => {
                        Context?.AddToCart(userId, eachFarm);
                      }}
                      size="sm"
                      className="bg-maindeep text-white"
                    >
                      <FaCartPlus color="white" /> Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FarmCards;
