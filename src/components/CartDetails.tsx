"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "./ContextApi";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  Divider,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CreateOrder } from "@/app/api/Action";

type PUBLIC_KEYPROPS = {
  PUBLIC_KEY: string;
};
type AllcartProps = {
  userId: string;
  eachFarm: {
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
  };
}[];
type EachCartProps = {
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
};
type AuthContextProps = {
  AddToCart: (userId: string, eachFarm: EachCartProps) => void;
  RemoveFromCart: (userId: string, eachFarm: EachCartProps) => void;
  RemoveAllCart: (userId: string) => void;
  cartNumber: number;
  allCart: AllcartProps | [];
};
// type PaymentResponse = {
//   amount: number;
//   charge_response_code: string;
//   charge_response_message: string;
//   charged_amount: number;
//   created_at: string;
//   currency: string;
//   customer: {
//     name: string;
//     email: string;
//     phone_number: string;
//   };
//   flw_ref: string;
//   redirectstatus: string | undefined;
//   status: string;
//   // status: "successful";
//   transaction_id: number;
//   tx_ref: string;
// };

const CartDetails = ({ PUBLIC_KEY }: PUBLIC_KEYPROPS) => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user.id as string;
  const Context = useContext(AuthContext) as AuthContextProps;
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const email = session?.user.email as string;
  const name = session?.user.name as string;
  const phone = session?.user.number as string;
  const id = session?.user.id as string;

  const SubTotalPrice = Context.allCart.reduce((acc, value) => {
    return acc + value.eachFarm.amount;
  }, 0);

  const Discount = Context.cartNumber * 200;
  const TotalPrice = SubTotalPrice - Discount;

  const config = {
    public_key: PUBLIC_KEY,
    tx_ref: `${new Date().getTime()}${id}`,
    amount: TotalPrice,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: "MVFARM Animal Payment",
      description: "Payment for items in cart",
      logo: "https://i.pinimg.com/736x/d7/ce/60/d7ce6066ac0d682c30812355e4262fb5.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = async () => {
    try {
      setLoading(true);
      handleFlutterPayment({
        callback: (response) => {
          closePaymentModal();
          if (response.status === "successful") {
            handleSuccessfullPayment();
          } else {
            toast.error("An error occurred");
            return router.push("/farm/cart");
          }
        },

        onClose: () => {},
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleSuccessfullPayment = async () => {
    try {
      const allCartInfo = Context.allCart as AllcartProps;
      const username = session?.user.name as string;
      const email = session?.user.email as string;
      const response = await CreateOrder(username, allCartInfo, email);
      if (response.success) {
        toast.success("payment successfully made");
        Context.RemoveAllCart(userId);
        return router.push("/farm/order");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleBreadCrumb = (link: string) => {
    return router.push(link);
  };
  return (
    <div className="mt-4">
      <div className="flex flex-col my-6 items-center justify-center">
        <h1 className="md:text-3xl text-lg text-maindeep font-semibold">
          My Farm Cart
        </h1>
        <p className="text-[0.7rem] w-full md:w-[50%] mx-auto text-center text-maindeep mt-3">
          Pls Note this condition : Immediately you payed for the farm animal,
          you have a maximum of 3 days from the payment day to come for your
          farm animal, else extra charges of #500 will be added to each farm
          animal per day when you came for your farm animal, in which you will
          have to payed before receiving your farm animal.
        </p>
        <div className="flex flex-row mt-4 gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="cursor-pointer"
          />
          <p className="text-maindeep text-[0.7rem]">
            I agree to the condition
          </p>
        </div>
        <div className="mt-5">
          <Breadcrumbs size="sm" radius="md">
            <BreadcrumbItem onPress={() => handleBreadCrumb("/")}>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem onPress={() => handleBreadCrumb("/farm")}>
              Farm
            </BreadcrumbItem>
            <BreadcrumbItem
              isCurrent
              onPress={() => handleBreadCrumb("/farm/cart")}
            >
              Cart
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      {Context.allCart.length < 1 ? (
        <div className="w-full flex flex-col justify-center items-center h-40">
          <h1 className="text-maindeep text-2xl">Your cart is Empty</h1>
        </div>
      ) : (
        <div className="mt-10 w-full flex md:flex-row flex-col gap-5">
          <div className="md:w-9/12 w-full">
            <div className="bg-mainfaided font-semibold p-3 rounded-md mb-2 flex gap-10 flex-row w-full text-black">
              <p className="md:w-6/12 w-8/12">Product</p>
              <p className="md:w-3/12 w-2.5/12">Price</p>
              <p className="md:w-3/12 w-1.5/12">Action</p>
            </div>
            <div className="flex flex-col gap-3">
              {Context.allCart.map((eachCart, index) => {
                const eachFarm = eachCart.eachFarm;
                return (
                  <div
                    key={index}
                    className="w-full odd:bg-transparent p-3 even:bg-gray-200 rounded-md flex gap-10 flex-row"
                  >
                    <div className="flex md:w-6/12 w-8/12 md:flex-row flex-col md:gap-5 gap-2">
                      <Image
                        src={eachCart.eachFarm?.image || "/rabb.png"}
                        alt="Animal"
                        width={100}
                        height={100}
                        className="md:w-2/6 w-4/6 h-20 md:h-28 rounded-md"
                        priority
                        quality={95}
                      />
                      <div className="flex md:w-3/6 w-full md:gap-5 gap-2 flex-col">
                        <div className="flex flex-row justify-between ">
                          <p className="text-[0.8rem] text-maindeep">
                            {eachCart.eachFarm?.animal}
                          </p>
                          <p className="text-[0.8rem] text-maindeep">
                            {eachCart.eachFarm?.breed}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between ">
                          <p className="text-[0.8rem] text-maindeep">
                            {eachCart.eachFarm?.age}
                          </p>
                          <p className="text-[0.8rem] text-maindeep">
                            {eachCart.eachFarm?.gender}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/12 w-2.5/12">
                      <p className="text-[0.8rem] text-maindeep">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(eachCart.eachFarm?.amount)}
                      </p>
                    </div>
                    <div className="md:w-3/12 w-1.5/12">
                      <MdDelete
                        onClick={() =>
                          Context?.RemoveFromCart(userId, eachFarm)
                        }
                        className="text-red-700 cursor-pointer"
                        size={28}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row mt-5 justify-end items-center w-full">
              <Button
                onPress={() => Context?.RemoveAllCart(userId)}
                className="text-white bg-red-700 "
              >
                Remove all cart
              </Button>
            </div>
          </div>
          <div className="md:w-3/12 w-full">
            <Card className="p-4">
              <h1 className="text-maindeep font-semibold">Order Summary </h1>
              <Divider className="bg-maindeep my-5" />
              <div className="w-full flex flex-col gap-5">
                <div className="w-full flex text-maindeep flex-row justify-between items-center">
                  <p className="text-[0.8rem]">Items</p>
                  <p className="text-[0.8rem] font-semibold">
                    {Context?.cartNumber || 0}
                  </p>
                </div>
                <div className="w-full flex text-maindeep flex-row justify-between items-center">
                  <p className="text-[0.8rem]">Sub Total</p>
                  <p className="text-[0.8rem] font-semibold">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(SubTotalPrice)}
                  </p>
                </div>
                <div className="w-full flex text-maindeep flex-row justify-between items-center">
                  <p className="text-[0.8rem]">Discount</p>
                  <p className="text-[0.8rem] font-semibold">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(Discount)}
                  </p>
                </div>
                <Divider />
                <div className="w-full flex text-maindeep flex-row justify-between items-center">
                  <p className="text-[0.8rem]">Total</p>
                  <p className="text-[0.8rem] font-semibold">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(TotalPrice)}
                  </p>
                </div>
                {agree ? (
                  <div>
                    {loading ? (
                      <Button
                        disabled
                        className="bg-blue-800/55 text-white w-full"
                        isLoading
                      >
                        Process...
                      </Button>
                    ) : (
                      <Button
                        disabled={TotalPrice < 1}
                        onPress={() => handlePayment()}
                        className="bg-blue-800 text-white w-full"
                      >
                        Proceed to Checkout
                      </Button>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-maindeep text-[0.7rem]">
                      The condition is required to proceed to checkout
                    </p>
                    <Button className="cursor-not-allowed bg-blue-800/70 text-white w-full">
                      Agree to the condition
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetails;
