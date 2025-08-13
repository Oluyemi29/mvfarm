"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Button,
  Image,
  Input,
  Textarea,
  Card,
  CardBody,
  CardFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import toast from "react-hot-toast";
import { DeleteFarm, EditFarmAnimal } from "@/app/api/Action";
import { FaNairaSign } from "react-icons/fa6";
import { Comment } from "react-loader-spinner";

type allFarmAnimalProps = {
  allFarmAnimal: {
    image: string;
    id: string;
    message: string;
    age: string;
    animal: string;
    breed: string;
    gender: string;
    amount: number;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

type editFarmProps = {
  id: string;
  image: string;
  age: string;
  animal: string;
  breed: string;
  gender: string;
  amount: string;
  message: string;
  available: boolean;
};
type deleteFarmProps = {
  id: string;
  image: string;
  age: string;
  animal: string;
  breed: string;
  gender: string;
  amount: string;
  message: string;
  available: boolean;
};
const AllFarms = ({ allFarmAnimal }: allFarmAnimalProps) => {
  const [editModel, setEditModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editFarm, setEditFarm] = useState<editFarmProps>({
    id: "",
    image: "",
    age: "",
    animal: "",
    breed: "",
    gender: "",
    amount: "",
    message: "",
    available: true,
  });
  const [deleteFarm, setDeleteFarm] = useState<deleteFarmProps>({
    id: "",
    image: "",
    age: "",
    animal: "",
    breed: "",
    gender: "",
    amount: "",
    message: "",
    available: true,
  });
  const [editFarmFormDetails, setEditFarmFormDetails] = useState({
    id: editFarm.id,
    age: editFarm.age,
    animal: editFarm.animal,
    breed: editFarm.breed,
    gender: editFarm.gender,
    amount: editFarm.amount,
    message: editFarm.message,
    available: editFarm.available,
  });
  const [imagePreview, setImagePreview] = useState(
    "https://i.pinimg.com/736x/5c/cb/ed/5ccbedefd717dcb9492ee009fe577db8.jpg"
  );

  const [imageFile, setImageFile] = useState<Blob | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImagePreview(URL.createObjectURL(files[0]));
      setImageFile(files[0]);
    }
  };
  const imageData = new FormData();
  const getImageLinks = async () => {
    imageData.append("file", imageFile as Blob);
    imageData.append("upload_preset", "mvfarm");
    imageData.append("folder", "users");
    const request = await fetch(
      `https://api.cloudinary.com/v1_1/mhayvic/image/upload`,
      {
        method: "POST",
        body: imageData,
      }
    );
    const response = await request.json();
    return response.secure_url as string;
  };

  const farmanimal = allFarmAnimal.map((eachFarmAnimal, index) => {
    const result = {
      key: index,
      image: (
        <Image
          src={eachFarmAnimal.image}
          alt="animal"
          width={30}
          height={30}
          className="w-10 h-10 rounded-full"
        />
      ),
      age: eachFarmAnimal.age,
      animal: eachFarmAnimal.animal,
      breed: eachFarmAnimal.breed,
      gender: eachFarmAnimal.gender,
      amount: eachFarmAnimal.amount,
      message: <p className="line-clamp-1">{eachFarmAnimal.message}</p>,
      action: (
        <div className="flex flex-row gap-3">
          <Button
            onPress={() => {
              handleEdit(
                eachFarmAnimal.id,
                eachFarmAnimal.image,
                eachFarmAnimal.age,
                eachFarmAnimal.animal,
                eachFarmAnimal.breed,
                eachFarmAnimal.gender,
                eachFarmAnimal.amount.toString(),
                eachFarmAnimal.message,
                eachFarmAnimal.available
              );
            }}
            className="bg-green-700 text-white"
          >
            Edit
          </Button>
          <Button
            onPress={() => {
              handleDelete(
                eachFarmAnimal.id,
                eachFarmAnimal.image,
                eachFarmAnimal.age,
                eachFarmAnimal.animal,
                eachFarmAnimal.breed,
                eachFarmAnimal.gender,
                eachFarmAnimal.amount.toString(),
                eachFarmAnimal.message,
                eachFarmAnimal.available
              );
            }}
            className="text-white bg-red-700"
          >
            Delete
          </Button>
          {eachFarmAnimal.available === false && (
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
                <div className="text-small font-bold underline underline-offset-2">
                  Availability
                </div>
                <div className="text-tiny text-center">
                  This farm animal as been paid for,
                  <br /> its no longer available
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      ),
    };
    return result;
  });
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(allFarmAnimal.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return farmanimal.slice(start, end);
  }, [page, farmanimal]);

  const handleEdit = (
    id: string,
    image: string,
    age: string,
    animal: string,
    breed: string,
    gender: string,
    amount: string,
    message: string,
    available: boolean
  ) => {
    setEditFarm((prevData) => {
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
        available,
      };
    });
    setEditFarmFormDetails((prevData) => {
      return {
        ...prevData,
        age,
        amount,
        animal,
        breed,
        gender,
        id,
        message,
        available,
      };
    });
    setImagePreview(image);
    setEditModel(true);
  };
  const handleDelete = (
    id: string,
    image: string,
    age: string,
    animal: string,
    breed: string,
    gender: string,
    amount: string,
    message: string,
    available: boolean
  ) => {
    setDeleteFarm((prevData) => {
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
        available,
      };
    });
    setDeleteModel(true);
  };
  const handleDeleteButton = async () => {
    try {
      setDeleteLoading(true);
      if (!deleteFarm.id) {
        toast.error("field required not found");
        return;
      }
      const response = await DeleteFarm(deleteFarm.id);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteModel(false);
      setDeleteLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFarmFormDetails((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleEditButton = async (e: React.FormEvent<Element>) => {
    try {
      setEditLoading(true);
      e.preventDefault();
      const image = imageFile ? await getImageLinks() : editFarm.image;
      if (!image) {
        toast.error("Kindly upload image");
        return;
      }
      const { age, amount, animal, breed, gender, id, message, available } =
        editFarmFormDetails;

      if (!age || !amount || !animal || !breed || !gender || !id || !message) {
        toast.error("All field are required");
        return;
      }
      if (Number(amount) < 1) {
        toast.error("Amount must be greater than 0");
        return;
      }
      const response = await EditFarmAnimal({
        age,
        amount,
        animal,
        breed,
        gender,
        id,
        image,
        message,
        available,
      });
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditModel(false);
      setEditLoading(false);
    }
  };
  return (
    <div>
      <Table
        isStriped
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="default"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        topContent={
          <h1 className="text-center font-semibold text-medium">All Farms</h1>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="image">IMAGE</TableColumn>
          <TableColumn key="age">AGE</TableColumn>
          <TableColumn key="animal">ANIMAL</TableColumn>
          <TableColumn key="breed">BREED</TableColumn>
          <TableColumn key="gender">GENDER</TableColumn>
          <TableColumn key="amount">AMOUNT</TableColumn>
          <TableColumn key="message">MESSAGE</TableColumn>
          <TableColumn key="action">ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No farm available currently"} items={items}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal isOpen={editModel} onClose={() => setEditModel(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Edit Farm Animal Details
          </ModalHeader>
          <ModalBody>
            <div className="w-full mx-auto flex flex-col border-2 border-maindeep justify-center items-center p-4 rounded-lg">
              <h1 className="text-maindeep font-semibold mt-4 text-medium text-center">
                Edit Farm Animal Form
              </h1>
              <p className="text-sm mb-3 text-maindeep">
                Kindly enter correct farm animals
              </p>
              <form
                onSubmit={(e: React.FormEvent<Element>) => handleEditButton(e)}
                className="w-full pt-4 flex h-60 overflow-y-auto flex-col gap-3 no-scrollbar"
              >
                <label className="w-max cursor-pointer mx-auto">
                  <Image
                    src={imagePreview}
                    alt="Rabbit"
                    className="w-20 h-20 rounded-full mx-auto border-2 border-maindeep p-1"
                  />
                  <input
                    type="file"
                    hidden
                    name=""
                    id=""
                    accept=".jpg, .png, .jpeg"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleImage(e);
                    }}
                  />
                </label>
                <Input
                  label="Animal"
                  placeholder="Animal"
                  type="text"
                  defaultValue={editFarm.animal}
                  name="animal"
                  value={editFarmFormDetails.animal}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                />
                <Input
                  label="Age"
                  placeholder="Age"
                  type="text"
                  defaultValue={editFarm.age}
                  name="age"
                  value={editFarmFormDetails.age}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                />
                <Input
                  label="Breed"
                  placeholder="Breed"
                  type="text"
                  defaultValue={editFarm.breed}
                  name="breed"
                  value={editFarmFormDetails.breed}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                />
                <Input
                  label="Gender"
                  placeholder="Gender"
                  type="text"
                  defaultValue={editFarm.gender}
                  name="gender"
                  value={editFarmFormDetails.gender}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                />
                <Input
                  label="Amount"
                  placeholder="Amount"
                  type="number"
                  startContent={<FaNairaSign />}
                  defaultValue={editFarm.amount}
                  name="amount"
                  value={editFarmFormDetails.amount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                />
                <Textarea
                  label="Message"
                  placeholder="Message"
                  type="text"
                  height={40}
                  defaultValue={editFarm.message}
                  name="message"
                  value={editFarmFormDetails.message}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                />
                <Input
                  type="checkbox"
                  className="w-max cursor-pointer"
                  label={`${editFarm.available ? "This farm animal is available" : "Farm animal is not available"}`}
                  labelPlacement="outside-left"
                  checked={editFarm.available}
                  onChange={() => {
                    setEditFarm((prevData) => {
                      return {
                        ...prevData,
                        available: !editFarm.available,
                      };
                    });
                    setEditFarmFormDetails((prevData) => {
                      return {
                        ...prevData,
                        available: !editFarmFormDetails.available,
                      };
                    });
                  }}
                />
                <div className="mt-10">
                  {editLoading ? (
                    <Button
                      type="button"
                      disabled
                      isLoading
                      className="bg-maindeep h-12 text-white w-full"
                    >
                      Processing...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-maindeep h-12 text-white w-full"
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setEditModel(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={deleteModel} onClose={() => setDeleteModel(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete Farm Animal Details
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody className="w-full flex flex-row justify-center">
                <Image
                  src={deleteFarm.image}
                  alt="Farm Animal"
                  width={200}
                  height={200}
                  className="flex justify-center"
                />
              </CardBody>
              <CardFooter className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="text-[0.7rem] text-maindeep">
                    {deleteFarm.animal}
                  </h1>
                  <h1 className="text-[0.7rem] text-maindeep">
                    {deleteFarm.breed}
                  </h1>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="text-[0.7rem] text-maindeep">
                    {deleteFarm.age}
                  </h1>

                  <h1 className="text-[0.7rem] text-maindeep">
                    {deleteFarm.amount}
                  </h1>
                </div>
                <div>
                  <p className="text-[0.7rem] text-maindeep">{`${deleteFarm.available ? "This farm animal is available" : "This farm animal is not available"}`}</p>
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

export default AllFarms;
