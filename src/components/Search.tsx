"use client";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";

type SetFilteredByProps = {
  setFilteredBy: React.Dispatch<
    React.SetStateAction<{
      name: string;
      value: string;
    }>
  >;
  setSearchFarmAnimal: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({
  setFilteredBy,
  setSearchFarmAnimal,
}: SetFilteredByProps) {
  const [Open, setOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [placeHolderProps, setPlaceHolderProps] = useState({
    name: "",
    value: "",
  });

  const handleChange = (
    name: string,
    value: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => { 
    if (e.target.checked === true) {
      setFilteredBy((prevData) => {
        return {
          ...prevData,
          name: name,
          value: value,
        };
      });
      setPlaceHolderProps((prevData) => {
        return {
          ...prevData,
          name: name,
          value: value,
        };
      });
    }
  };

  return (
    <div className="my-3">
      <div className="flex w-full mx-auto items-center">
        <div
          className={`overflow-hidden inline-flex items-center transition-all duration-500 ${
            Open ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        >
          <button
            onClick={() => onOpen()}
            className="mr-2 p-3 bg-mainfaided text-black cursor-pointer rounded-md"
          >
            <FaFilter size={25} />
          </button>
          <Input
            type="text"
            label={
              placeHolderProps.name
                ? `Search by ${placeHolderProps.name}`
                : `Search by Room Name`
            }
            placeholder={
              placeHolderProps.name
                ? `Search by ${placeHolderProps.name}`
                : `Search by Animal Name`
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchFarmAnimal(e.target.value);
            }}
            size="sm"
          />
        </div>
        <button
          onClick={() => setOpen(!Open)}
          className="ml-2 p-3 bg-mainfaided text-black cursor-pointer rounded-md"
        >
          <FaSearch size={25} />
        </button>
      </div>
      <Drawer
        size="xs"
        isOpen={isOpen}
        placement="left"
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Filter by
              </DrawerHeader>
              <DrawerBody>
                <div className="flex flex-col gap-3">
                  <div className="flex border-gray-300 border px-3 py-3 rounded-md justify-between items-center">
                    <h1 className="font-semibold">Animal Name</h1>
                    <Input
                      size="sm"
                      type="radio"
                      checked={
                        placeHolderProps.value == "animal" ? true : false
                      }
                      name="filter"
                      value={"animal"}
                      className="w-min cursor-pointer"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange("Animal Name", "animal", e);
                      }}
                    />
                  </div>
                  <div className="flex border-gray-300 border px-3 py-3 rounded-md justify-between items-center">
                    <h1 className="font-semibold">Animal Price</h1>
                    <Input
                      size="sm"
                      type="radio"
                      checked={
                        placeHolderProps.value == "amount" ? true : false
                      }
                      name="filter"
                      value={"amount"}
                      className="w-min cursor-pointer"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange("Animal Price", "amount", e);
                      }}
                    />
                  </div>
                  <div className="flex border-gray-300 border px-3 py-3 rounded-md justify-between items-center">
                    <h1 className="font-semibold">Animal Description</h1>
                    <Input
                      size="sm"
                      type="radio"
                      checked={
                        placeHolderProps.value == "message" ? true : false
                      }
                      name="filter"
                      value={"message"}
                      className="w-min cursor-pointer"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange("Animal Description", "message", e);
                      }}
                    />
                  </div>
                  <div className="flex border-gray-300 border px-3 py-3 rounded-md justify-between items-center">
                    <h1 className="font-semibold">Animal Breed</h1>
                    <Input
                      size="sm"
                      type="radio"
                      checked={placeHolderProps.value == "breed" ? true : false}
                      name="filter"
                      value={"breed"}
                      className="w-min cursor-pointer"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange("Animal Breed", "breed", e);
                      }}
                    />
                  </div>
                  <div className="flex border-gray-300 border px-3 py-3 rounded-md justify-between items-center">
                    <h1 className="font-semibold">Animal Age</h1>
                    <Input
                      size="sm"
                      type="radio"
                      checked={placeHolderProps.value == "age" ? true : false}
                      name="filter"
                      value={"age"}
                      className="w-min cursor-pointer"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange("Animal Age", "age", e);
                      }}
                    />
                  </div>
                  <div className="flex border-gray-300 border px-3 py-3 rounded-md justify-between items-center">
                    <h1 className="font-semibold">Animal Gender</h1>
                    <Input
                      size="sm"
                      type="radio"
                      checked={
                        placeHolderProps.value == "gender" ? true : false
                      }
                      name="filter"
                      value={"gender"}
                      className="w-min cursor-pointer"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange("Animal Gender", "gender", e);
                      }}
                    />
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter className="flex flex-row justify-between items-center">
                <Button
                  className="bg-mainfaided text-black font-semibold"
                  // onPress={()=>handleClear()}
                  size="sm"
                >
                  Clear
                </Button>

                <Button
                  className="bg-mainfaided text-black font-semibold"
                  onPress={onClose}
                  size="sm"
                >
                  Done
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
