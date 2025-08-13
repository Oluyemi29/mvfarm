"use client";
import { Button, Card, Image } from "@heroui/react";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import RequestForm from "./RequestForm";
import toast from "react-hot-toast";
import { DeleteThisRequest } from "@/app/api/Action";
import { useSession } from "next-auth/react";

type myRequestProps = {
  Request: {
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
  }[];
};
const Request = ({ Request }: myRequestProps) => {
  const { data: session } = useSession();
  const userId = session?.user.id as string;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [showDelete, setShowDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const myRequest = Request.filter((eachRequest) => {
    return eachRequest.userId === userId;
  });
  const [deleteInfo, setDeleteInfo] = useState({
    id: "",
    image: "",
    animal: "",
    age: "",
    breed: "",
    gender: "",
    quantity: 0,
    amount: 0,
    message: "",
  });

  const handleDeleteChange = (
    id: string,
    image: string,
    animal: string,
    age: string,
    breed: string,
    gender: string,
    quantity: number,
    amount: number,
    message: string
  ) => {
    try {
      setDeleteInfo((prevData) => {
        return {
          ...prevData,
          age,
          amount,
          animal,
          breed,
          gender,
          id,
          image,
          message,
          quantity,
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setShowDelete(true);
    }
  };
  const DeleteRequest = async () => {
    try {
      setLoadingDelete(true);
      if (!deleteInfo.id) {
        toast.error("An error occured");
        return;
      }
      const id = deleteInfo.id;
      const response = await DeleteThisRequest(id);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDelete(false);
      setShowDelete(false);
    }
  };
  return (
    <div>
      <div className="flex flex-row mt-5 justify-end">
        <Button onPress={onOpen} className="text-white bg-maindeep">
          Make Request
        </Button>
      </div>
      <h1 className="text-maindeep mt-5 text-center font-semibold text-medium">
        My Request
      </h1>
      <p className="text-center text-sm text-maindeep">
        Here are my request so far
      </p>
      <div className="mt-20">
        {myRequest.length < 1 ? (
          <>
            <h1 className="text-center font-semibold text-maindeep text-medium">
              No Request Made Currently
            </h1>
          </>
        ) : (
          <>
            <div className="flex flex-col text-maindeep gap-3">
              {myRequest.map((eachRequest, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-full flex-col items-center rounded-md p-3 justify-between md:flex-row gap-3 odd:bg-slate-200 even:bg-transparent"
                  >
                    <div className="w-full flex md:flex-row flex-col justify-between items-center md:justify-evenly">
                      <Image
                        src={eachRequest.image}
                        alt="Request"
                        width={100}
                        height={100}
                        className="mx-auto"
                      />
                      <div className="flex w-full md:w-[50%] flex-col gap-3">
                        <div className="flex flex-row justify-between w-full items-center">
                          <p className="text-[0.7rem]">{eachRequest.age}</p>
                          <p className="text-[0.7rem]">
                            {new Intl.NumberFormat("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            }).format(eachRequest.amount)}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between w-full items-center">
                          <p className="text-[0.7rem]">{eachRequest.animal}</p>
                          <p className="text-[0.7rem]">{eachRequest.breed}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-[0.7rem] no-scrollbar overflow-y-auto h-20">
                        {eachRequest.message}
                      </p>
                    </div>
                    <div className="flex flex-row justify-end md:flex-col gap-3">
                      <Button
                        onPress={() => {
                          handleDeleteChange(
                            eachRequest.id,
                            eachRequest.image,
                            eachRequest.animal,
                            eachRequest.age,
                            eachRequest.breed,
                            eachRequest.gender,
                            eachRequest.quantity,
                            eachRequest.amount,
                            eachRequest.message
                          );
                        }}
                        className="bg-red-700 text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <Modal
        className="text-maindeep"
        onClose={() => setShowDelete(false)}
        isOpen={showDelete}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col">
            Delete this request
          </ModalHeader>
          <ModalBody>
            <Card className="w-full p-5">
              <Image
                src={deleteInfo.image}
                alt={deleteInfo.breed}
                width={100}
                height={100}
                className="w-auto h-auto mx-auto rounded-md"
              />
              <div className="flex my-2 text-maindeep flex-row w-full justify-between items-center">
                <p className="text-[0.7rem]">{deleteInfo.age}</p>
                <p className="text-[0.7rem]">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(deleteInfo.amount)}
                </p>
              </div>
              <div className="flex my-2 text-maindeep flex-row w-full justify-between items-center">
                <p className="text-[0.7rem]">{deleteInfo.animal}</p>
                <p className="text-[0.7rem]">{deleteInfo.gender}</p>
              </div>
              <div className="flex my-2 text-maindeep flex-row w-full justify-between items-center">
                <p className="text-[0.7rem]">{deleteInfo.breed}</p>
                <p className="text-[0.7rem]">{deleteInfo.quantity}</p>
              </div>
              <div>
                {loadingDelete ? (
                  <Button
                    disabled
                    isLoading
                    className="bg-red-700 text-white rounded-md mt-3"
                  >
                    Deleting...
                  </Button>
                ) : (
                  <Button
                    onPress={() => DeleteRequest()}
                    className="bg-red-700 text-white rounded-md mt-3"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setShowDelete(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={onClose} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col">Request Form</ModalHeader>
          <ModalBody>
            <RequestForm onClose={onClose} />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Request;
