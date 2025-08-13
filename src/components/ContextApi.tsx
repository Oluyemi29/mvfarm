"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

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
  allCart : AllcartProps | []
};
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const ContextApi = ({ children }: { children: React.ReactNode }) => {
  const [allCart, setAllCart] = useState<AllcartProps | []>([]);

  const AddToCart = (userId: string, eachFarm: EachCartProps) => {
    if (!userId || !eachFarm || !eachFarm.id) {
      toast.error(`An Error Occured`);
      return;
    }
    const checkResult = allCart.find((eachCart) => {
      return eachCart.userId === userId && eachCart.eachFarm.id === eachFarm.id;
    });
    if (checkResult) {
      toast.error(`Item ${eachFarm.animal} Already Added`);
      return;
    } else {
      setAllCart((prevData) => [...prevData, { userId, eachFarm }]);
      localStorage.setItem(
        "mvfarm",
        JSON.stringify([...allCart, { userId, eachFarm }])
      );
      toast.success(`Item ${eachFarm.animal} Added Successfully`);
      return;
    }
  };
  const RemoveFromCart = (userId: string, eachFarm: EachCartProps) => {
    if (!userId || !eachFarm || !eachFarm.id) {
      toast.error(`An Error Occured`);
      return;
    }

    const checkResult = allCart.find((eachCart) => {
      return eachCart.userId === userId && eachCart.eachFarm.id === eachFarm.id;
    });
    if (!checkResult) {
      toast.error(`Item ${eachFarm.animal} not found in cart`);
      return;
    }
    const removingCart = allCart.filter((eachCart) => {
      return eachCart.userId === userId && eachCart.eachFarm.id !== eachFarm.id;
    });
    setAllCart(() => removingCart);
    localStorage.setItem("mvfarm", JSON.stringify([...removingCart]));
  };
  const RemoveAllCart = (userId: string) => {
    const checkResult = allCart.find((eachCart) => {
      return eachCart.userId === userId;
    });
    if (!checkResult) {
      toast.error(`You have no cart before`);
      return;
    }
    const removingAlCart = allCart.filter((eachCart) => {
      return eachCart.userId !== userId;
    });
    localStorage.setItem("mvfarm", JSON.stringify([...removingAlCart]));
    setAllCart([]);
    toast.success("All Item Remove Successfully");
  };
  const { data: session } = useSession();
  const userId = session?.user.id as string;
  const cartNumber =
    allCart.filter((eachCart) => {
      return eachCart.userId === userId;
    }).length ?? 0;
  useEffect(() => {
    const getAllAddedCart = (userId: string) => {
      const allAddedCart = JSON.parse(localStorage.getItem("mvfarm") as string);

      if (allAddedCart) {
        const Mycart = allAddedCart.filter((eachAddedCart: AllcartProps[0]) => {
          return eachAddedCart.userId === userId;
        });
        if (Mycart) {
          setAllCart(Mycart);
        } else {
          setAllCart([]);
        }
        setAllCart(allAddedCart);
      } else {
        localStorage.setItem("mvfarm", JSON.stringify([]));
      }
    };
    getAllAddedCart(userId);
  }, [userId]);

  return (
    <AuthContext.Provider
      value={{ AddToCart, RemoveFromCart, RemoveAllCart, cartNumber,allCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ContextApi;
