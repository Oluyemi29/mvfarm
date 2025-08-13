"use client";
import { Button, Image, Input, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { FaNairaSign } from "react-icons/fa6";
import { UploadFarmAnimal } from "@/app/api/Action";

const UploadFarm = () => {
  const [imagePreview, setImagePreview] = useState(
    "https://i.pinimg.com/736x/5c/cb/ed/5ccbedefd717dcb9492ee009fe577db8.jpg"
  );
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImagePreview(URL.createObjectURL(files[0]));
      setImageFile(files[0]);
    }
  };

  const formSchema = z.object({
    age: z
      .string({ message: "pls enter animal age" })
      .max(200, { message: "Maximum of 200 character" }),
    animal: z
      .string({ message: "pls enter animal type" })
      .max(200, { message: "Maximum of 200 character" }),
    breed: z
      .string({ message: "pls enter breed type" })
      .max(200, { message: "Maximum of 200 character" }),
    gender: z
      .string({ message: "pls enter gender" })
      .max(100, { message: "Maximum of 200 character" }),
    amount: z
      .string({ message: "pls enter amount" })
      .max(200, { message: "Maximum of 200 character" })
      .refine(
        (value) => {
          return Number(value) > 0;
        },
        { message: "Number must be greater the 0" }
      ),
    message: z
      .string({ message: "pls enter quantity" })
      .max(10000, { message: "Maximum of 200 character" }),
  });
  type formSchemType = z.infer<typeof formSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<formSchemType>({
    resolver: zodResolver(formSchema),
  });
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
  const submit = async (value: formSchemType) => {
    try {
      setLoading(true);
      if (!imageFile) {
        toast.error("Kindly upload image sample");
        return;
      }
      const image = await getImageLinks();
      const { age, amount, animal, breed, gender, message } = value;
      const response = await UploadFarmAnimal({
        age,
        amount,
        animal,
        breed,
        gender,
        image,
        message,
      });
      if (response.success) {
        toast.success(response.message);
        setImagePreview(
          "https://i.pinimg.com/736x/5c/cb/ed/5ccbedefd717dcb9492ee009fe577db8.jpg"
        );
        setImageFile(null);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="w-full md:w-2/6 mx-auto flex flex-col border-2 border-maindeep justify-center items-center p-4 rounded-lg">
        <h1 className="text-maindeep font-semibold mt-4 text-medium text-center">
          Request
        </h1>
        <p className="text-sm mb-3 text-maindeep">
          Kindly make request of the farm animals
        </p>
        <form
          onSubmit={handleSubmit(submit)}
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
            isInvalid={!!errors.animal}
            errorMessage={errors.animal?.message}
            {...register("animal")}
            label="Animal"
            placeholder="Animal"
            type="text"
          />
          <Input
            isInvalid={!!errors.age}
            errorMessage={errors.age?.message}
            {...register("age")}
            label="Age"
            placeholder="Age"
            type="text"
          />
          <Input
            isInvalid={!!errors.breed}
            errorMessage={errors.breed?.message}
            {...register("breed")}
            label="Breed"
            placeholder="Breed"
            type="text"
          />
          <Input
            isInvalid={!!errors.gender}
            errorMessage={errors.gender?.message}
            {...register("gender")}
            label="Gender"
            placeholder="Gender"
            type="text"
          />
          <Input
            isInvalid={!!errors.amount}
            errorMessage={errors.amount?.message}
            {...register("amount")}
            label="Amount"
            placeholder="Amount"
            type="number"
            startContent={<FaNairaSign />}
          />
          <Textarea
            isInvalid={!!errors.message}
            errorMessage={errors.message?.message}
            {...register("message")}
            label="Message"
            placeholder="Message"
            type="text"
            height={40}
          />
          <div className="mt-10">
            {loading ? (
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
        <p className="text-[0.7rem] text-center">
          Pls upload the image sample of the farm animal
        </p>
      </div>
    </div>
  );
};

export default UploadFarm;
