"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaPhone, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import moment from "moment";
import { IoLocationSharp } from "react-icons/io5";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { AdminEditOrderStatus } from "@/app/api/Action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type eachOrderProps = {
  eachOrder: {
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
    User: {
      number: string | null;
      name: string | null;
      id: string;
      image: string;
      email: string | null;
      verifyEmail: boolean;
      emailVerified: Date | null;
      password: string | null;
      address: string | null;
      provider: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
    };
  } | null;
};

const EachOrder = ({ eachOrder }: eachOrderProps) => {
  const router = useRouter();
  const [editModel, setEditModel] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [status, setStatus] = useState("");

  const AllowStatus = ["Payment_Done", "Payment_Refunded", "Product_Received"];
  const AllOrderStatus = AllowStatus.map((eachAllowed) => {
    return {
      key: eachAllowed,
      label: eachAllowed.replace("_", " "),
    };
  });
  const handleEditButton = async () => {
    try {
      setEditLoading(true);
      const id = eachOrder?.id as string;
      const response = await AdminEditOrderStatus({ id, status });
      if (response.success) {
        return router.push("/admin/order");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditLoading(false);
      setEditModel(false);
    }
  };
  return (
    <div>
      <div className="md:w-2/6 mx-auto h-108 no-scrollbar overflow-y-auto rounded-lg p-5 border-2 border-maindeep">
        <Image
          src={eachOrder?.image as string}
          alt={eachOrder?.breed as string}
          width={100}
          height={100}
          priority
          quality={95}
          className="mx-auto rounded-md"
        />
        <div className="flex flex-row mt-3 justify-between items-center w-full">
          <p className="text-[0.7rem] text-maindeep">{eachOrder?.animal}</p>
          <p className="text-[0.7rem] text-maindeep">{eachOrder?.age}</p>
        </div>
        <div className="flex flex-row mt-3 justify-between items-center w-full">
          <p className="text-[0.7rem] text-maindeep">{eachOrder?.breed}</p>
          <p className="text-[0.7rem] text-maindeep">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(eachOrder?.amount as number)}
          </p>
        </div>
        <div className="flex flex-row mt-3 justify-between items-center w-full">
          <p className="text-[0.7rem] text-maindeep">{eachOrder?.gender}</p>
          <p className="text-[0.7rem] text-maindeep">{`${eachOrder?.animal}`}</p>
        </div>
        <div className="flex flex-row mt-3 justify-between items-center w-full">
          <p className="text-[0.7rem] text-maindeep">Order at</p>
          <p className="text-[0.7rem] text-maindeep">
            {moment(eachOrder?.createdAt).fromNow()}
          </p>
        </div>
        <div className="flex flex-row mt-3 justify-between items-center w-full">
          <p className="text-[0.7rem] text-maindeep">Order STatus</p>
          <p className="text-[0.7rem] text-maindeep">
            {eachOrder?.status.replace("_", " ")}
          </p>
        </div>
        <div>
          <p className="text-[0.8rem] my-3 text-center text-maindeep underline underline-offset-4">
            Order From
          </p>
          <div className="flex mt-3 flex-row justify-between items-center">
            <p className="text-maindeep text-[0.7rem]">
              {eachOrder?.User.name}
            </p>
            <FaUser className="text-[#5c4122]" size={14} />
          </div>
          <div className="flex mt-3 flex-row justify-between items-center">
            <p className="text-maindeep text-[0.7rem]">
              {eachOrder?.User.email}
            </p>
            <MdEmail className="text-[#5c4122]" size={14} />
          </div>
          <div className="flex mt-3 flex-row justify-between items-center">
            <p className="text-maindeep text-[0.7rem]">
              {eachOrder?.User.number}
            </p>
            <FaPhone className="text-[#5c4122]" size={14} />
          </div>
          <div className="flex mt-3 flex-row gap-5 justify-between items-center">
            <p className="text-maindeep text-[0.7rem]">
              {eachOrder?.User.address}
            </p>
            <IoLocationSharp className="text-[#5c4122]" size={14} />
          </div>
        </div>
        <div className="mt-5">
          <Button
            onPress={() => setEditModel(true)}
            className="bg-maindeep text-white w-full"
          >
            Edit Order Status
          </Button>
        </div>
      </div>
      <Modal isOpen={editModel} onClose={() => setEditModel(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Update Order Status
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody className="w-full flex flex-col justify-center items-center">
                <p className="text-maindeep tsxt-[0.7rem]">
                  Kindly select the new status
                </p>
                <Image
                  src={eachOrder?.image as string}
                  alt="Farm Animal"
                  width={150}
                  height={150}
                  className="flex justify-center rounded-md"
                  priority
                  quality={95}
                />
              </CardBody>
              <CardFooter className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="text-[0.7rem] text-maindeep">
                    {eachOrder?.animal}
                  </h1>
                  <h1 className="text-[0.7rem] text-maindeep">
                    {eachOrder?.breed}
                  </h1>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="text-[0.7rem] text-maindeep">
                    {eachOrder?.age}
                  </h1>
                  <h1 className="text-[0.7rem] text-maindeep">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(eachOrder?.amount as number)}
                  </h1>
                </div>
                <div className="w-full">
                  <Select
                    className="w-full"
                    label="New order status"
                    placeholder="Select new order status"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setStatus(e.target.value);
                    }}
                  >
                    {AllOrderStatus.map((orderStatus) => (
                      <SelectItem key={orderStatus.key}>
                        {orderStatus.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </CardFooter>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setEditModel(false)}
            >
              Cancel
            </Button>
            {editLoading ? (
              <Button isLoading disabled className="bg-maindeep text-white">
                Updating...
              </Button>
            ) : (
              <Button
                className="bg-maindeep text-white"
                onPress={() => handleEditButton()}
              >
                Submit Status
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EachOrder;
