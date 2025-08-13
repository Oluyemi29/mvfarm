"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Comment } from "react-loader-spinner";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";

type AllOrderProps = {
  allOrder: {
    id: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    animal: string;
    age: string;
    breed: string;
    gender: string;
    amount: number;
    status: string;
  }[];
};

type LateOrderProps = {
  id: string;
  time: string;
}[];
const OrderDetails = ({ allOrder }: AllOrderProps) => {
  const { data: session } = useSession();
  const [lateOrder, setLateOrder] = useState<LateOrderProps>([
    {
      id: "",
      time: "",
    },
  ]);
  const userId = session?.user.id as string;
  const AllMyOrder = allOrder.filter((eachOrder) => {
    return eachOrder.userId === userId;
  });

  useEffect(() => {
    const getLateDetails = () => {
      const Threedays = 3 * 24 * 60 * 60 * 1000;
      const ThePastdays = AllMyOrder.filter((eachMyOrder) => {
        return (
          eachMyOrder.createdAt.getTime() + Threedays < new Date().getTime() &&
          eachMyOrder.status !== "Product_Received"
        );
      });
      if (ThePastdays.length > 0) {
        const Interval = setInterval(() => {
          const Result = ThePastdays.map((eachPastDays) => {
            const lateTime =
              new Date().getTime() -
              (eachPastDays.createdAt.getTime() + Threedays);
            const Days = Math.floor(lateTime / (24 * 60 * 60 * 1000));
            const Hours = Math.floor(
              (lateTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
            );
            const Minutes = Math.floor(
              (lateTime % (60 * 60 * 1000)) / (60 * 1000)
            );
            const Second = Math.floor((lateTime % (60 * 1000)) / 1000);
            return {
              id: eachPastDays.id,
              time: `Late with ${Days}D ${Hours}H ${Minutes}M ${Second}S`,
            };
          });
          setLateOrder(Result);
        }, 1000);
        return () => clearInterval(Interval);
      }
    };
    getLateDetails();
  }, [AllMyOrder]);
  return (
    <div className="mt-4">
      <div className="flex flex-col my-6 items-center justify-center">
        <h1 className="md:text-3xl text-lg text-maindeep font-semibold">
          My Farm Order History
        </h1>
        <p className="text-[0.7rem] w-full md:w-[50%] mx-auto text-center text-maindeep mt-3">
          Pls Note this condition : Immediately you payed for the farm animal,
          you have a maximum of 3 days from the payment day to come for your
        </p>
      </div>
      {AllMyOrder.length < 1 ? (
        <div className="w-full flex flex-col justify-center items-center h-40">
          <h1 className="text-maindeep text-2xl">Your cart is Empty</h1>
        </div>
      ) : (
        <div className="mt-10 w-full flex md:flex-row flex-col gap-5">
          <div className="w-full">
            <div className="bg-mainfaided font-semibold p-3 rounded-md mb-2 flex gap-10 flex-row w-full text-black">
              <p className="md:w-6/12 w-6/12">Product</p>
              <p className="md:w-3/12 w-3/12">Price</p>
              <p className="md:w-3/12 w-3/12">Action</p>
            </div>
            <div className="flex flex-col gap-3">
              {AllMyOrder.map((eachOrder, index) => {
                return (
                  <div
                    key={index}
                    className="w-full hover:bg-gray-50 odd:bg-transparent p-3 even:bg-gray-100 rounded-md flex gap-10 flex-row"
                  >
                    <div className="flex md:w-6/12 w-6/12 md:flex-row flex-col md:gap-5 gap-2">
                      <Image
                        src={eachOrder.image || "/rabb.png"}
                        alt="Animal"
                        width={100}
                        height={100}
                        className="md:w-2/6 w-4/6 h-20 md:h-32 rounded-md"
                        priority
                        quality={95}
                      />
                      <div className="flex md:w-3/6 w-full md:gap-5 gap-2 flex-col">
                        <div className="flex flex-row justify-between ">
                          <p className="text-[0.8rem] text-maindeep">
                            {eachOrder.animal}
                          </p>
                          <p className="text-[0.8rem] text-maindeep">
                            {eachOrder.breed}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between ">
                          <p className="text-[0.8rem] text-maindeep">
                            {eachOrder.age}
                          </p>
                          <p className="text-[0.8rem] text-maindeep">
                            {eachOrder.gender}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/12 w-3/12">
                      <p className="text-[0.8rem] text-maindeep">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(eachOrder.amount)}
                      </p>
                    </div>
                    <div className="md:w-3/12 w-3/12">
                      <p className="text-maindeep text-[0.8rem]">
                        {eachOrder.status}
                      </p>
                      {lateOrder.find(
                        (thisOrder) => thisOrder.id === eachOrder.id
                      )?.time && (
                        <>
                          <Popover>
                            <PopoverTrigger>
                              <Button className="bg-transparent">
                                <Comment
                                  visible={true}
                                  height="30"
                                  width="30"
                                  ariaLabel="comment-loading"
                                  wrapperStyle={{}}
                                  wrapperClass="comment-wrapper"
                                  color="#fff"
                                  backgroundColor="#F4442E"
                                />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="px-1 py-2">
                                <div className="text-small font-bold">
                                  Late Product Recieved
                                </div>
                                <div className="text-tiny">
                                  {
                                    lateOrder.find(
                                      (thisOrder) =>
                                        thisOrder.id === eachOrder.id
                                    )?.time
                                  }
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
