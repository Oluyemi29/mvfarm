"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaLocationArrow, FaPhone, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import moment from "moment";
import { Puff } from "react-loader-spinner";
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
} from "@heroui/react";
import { AdminDeleteThisRequest } from "@/app/api/Action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type eachRequestProps = {
  eachRequest: {
    id: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    animal: string;
    age: string;
    breed: string;
    gender: string;
    quantity: number;
    amount: number;
    message: string;
    delete: string;
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

const EachRequest = ({ eachRequest }: eachRequestProps) => {
  const router = useRouter();
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [approvedModel, setApprovedModel] = useState(false);

  const handleDeleteButton = async () => {
    try {
      setDeleteLoading(true);
      const id = eachRequest?.id as string;
      const response = await AdminDeleteThisRequest(id);
      if (response.success) {
        return router.push("/admin/request");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
      setDeleteModel(false);
      setApprovedModel(false);
    }
  };
  return (
    <div>
      <div className="md:w-2/6 mx-auto h-108 no-scrollbar overflow-y-auto rounded-lg p-5 border-2 border-maindeep">
        {eachRequest?.delete === "Pending" && (
          <>
            <Puff
              visible={true}
              height="30"
              width="30"
              color="#5c4122"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </>
        )}
        <Image
          src={eachRequest?.image as string}
          alt={eachRequest?.breed as string}
          width={100}
          height={100}
          priority
          quality={95}
          className="mx-auto rounded-md"
        />
        <div className="flex flex-row mt-3 justify-between items-center w-full">
          <p className="text-[0.7rem] text-maindeep">{eachRequest?.animal}</p>
          <p className="text-[0.7rem] text-maindeep">{eachRequest?.age}</p>
        </div>
        <div className="flex flex-row mt-3 justify-between items-center w-full">
          <p className="text-[0.7rem] text-maindeep">{eachRequest?.breed}</p>
          <p className="text-[0.7rem] text-maindeep">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(eachRequest?.amount as number)}
          </p>
        </div>
        <div className="flex flex-row mt-3 justify-between items-center w-full">
          <p className="text-[0.7rem] text-maindeep">{eachRequest?.gender}</p>
          <p className="text-[0.7rem] text-maindeep">{`${eachRequest?.quantity} ${eachRequest?.animal}`}</p>
        </div>
        <div className="flex flex-row mt-3 justify-between items-center w-full">
          <p className="text-[0.7rem] text-maindeep">Request at</p>
          <p className="text-[0.7rem] text-maindeep">
            {moment(eachRequest?.createdAt).fromNow()}
          </p>
        </div>
        <div className="mt-5">
          <p className="text-[0.7rem] text-maindeep text-center">
            {eachRequest?.message}
          </p>
        </div>
        <div>
          <p className="text-[0.8rem] my-3 text-center text-maindeep underline underline-offset-4">
            Request From
          </p>
          <div className="flex mt-3 flex-row justify-between items-center">
            <p className="text-maindeep text-[0.7rem]">
              {eachRequest?.User.name}
            </p>
            <FaUser className="text-[#5c4122]" size={14} />
          </div>
          <div className="flex mt-3 flex-row justify-between items-center">
            <p className="text-maindeep text-[0.7rem]">
              {eachRequest?.User.email}
            </p>
            <MdEmail className="text-[#5c4122]" size={14} />
          </div>
          <div className="flex mt-3 flex-row justify-between items-center">
            <p className="text-maindeep text-[0.7rem]">
              {eachRequest?.User.number}
            </p>
            <FaPhone className="text-[#5c4122]" size={14} />
          </div>
          <div className="flex mt-3 flex-row gap-5 justify-between items-center">
            <p className="text-maindeep text-[0.7rem]">
              {eachRequest?.User.address}
            </p>
            <FaLocationArrow className="text-[#5c4122]" size={14} />
          </div>
        </div>
        <div className="mt-5">
          {eachRequest?.delete === "Pending" ? (
            <Button
              onPress={() => setApprovedModel(true)}
              className="bg-transparent text-red-600 border-2 border-red-600 rounded-md w-full "
            >
              Approved Delete
            </Button>
          ) : (
            <Button
              onPress={() => setDeleteModel(true)}
              className="bg-red-600 text-white w-full"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
      <Modal isOpen={approvedModel} onClose={() => setApprovedModel(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete This Farm Request
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody className="w-full flex flex-row justify-center">
                <p className="text-maindeep tsxt-[0.7rem]">
                  Confirm users deleting request
                </p>
                <Image
                  src={eachRequest?.image as string}
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
                    {eachRequest?.animal}
                  </h1>
                  <h1 className="text-[0.7rem] text-maindeep">
                    {eachRequest?.breed}
                  </h1>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="text-[0.7rem] text-maindeep">
                    {eachRequest?.age}
                  </h1>
                  <h1 className="text-[0.7rem] text-maindeep">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(eachRequest?.amount as number)}
                  </h1>
                </div>
              </CardFooter>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setApprovedModel(false)}
            >
              Cancel
            </Button>
            {deleteLoading ? (
              <Button isLoading disabled className="bg-red-700 text-white">
                Deleting...
              </Button>
            ) : (
              <Button
                className="bg-red-700 text-white"
                onPress={() => handleDeleteButton()}
              >
                Approve Delete
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={deleteModel} onClose={() => setDeleteModel(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete This Farm Request
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody className="w-full flex flex-row justify-center">
                <Image
                  src={eachRequest?.image as string}
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
                    {eachRequest?.animal}
                  </h1>
                  <h1 className="text-[0.7rem] text-maindeep">
                    {eachRequest?.breed}
                  </h1>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="text-[0.7rem] text-maindeep">
                    {eachRequest?.age}
                  </h1>
                  <h1 className="text-[0.7rem] text-maindeep">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(eachRequest?.amount as number)}
                  </h1>
                </div>
              </CardFooter>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setDeleteModel(false)}
            >
              Cancel
            </Button>
            {deleteLoading ? (
              <Button isLoading disabled className="bg-red-700 text-white">
                Deleting...
              </Button>
            ) : (
              <Button
                className="bg-red-700 text-white"
                onPress={() => handleDeleteButton()}
              >
                Delete
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EachRequest;
