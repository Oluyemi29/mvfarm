"use client";
import { RegisterUser } from "@/app/api/Action";
import { Button, Input, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const Register = () => {
  const router = useRouter();
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    "https://i.pinimg.com/736x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg"
  );
  const [imageFile, setImageFile] = useState<Blob>();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "OAuthAccountNotLinked") {
      toast.error(
        "You previously registered manually. Please sign in with email and password."
      );
    }
  }, [error]);

  const formSchema = z.object({
    name: z.string({ message: "Kindly enter name" }),
    email: z
      .string({ message: "Kindly enter email" })
      .email({ message: "Not Email Format" }),
    number: z.string({ message: "Kindly enter your Phone Number" }),
    password: z.string({ message: "Kindly enter your password" }),
    address: z.string({ message: "Kindly enter your address" }),
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

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setPreviewImage(URL.createObjectURL(files[0]));
      setImageFile(files[0]);
    }
  };
  const imageData = new FormData();
  const getImageLink = async () => {
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
    return response.secure_url;
  };
  const submit = async (value: formSchemType) => {
    try {
      setLoading(true);
      const { address, email, name, number, password } = value;
      if (!imageFile) {
        toast.error("Kindly Upload image");
        return;
      }
      const image = await getImageLink();
      const response = await RegisterUser({
        address,
        email,
        image,
        name,
        number,
        password,
      });
      if (response.success) {
        toast.success(response.message);
        reset();
        return router.push("/verify");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    } finally {
      reset();
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    const response = await signIn("google", {
      redirect: false,
      callbackUrl: "/farm",
    });
    if (response?.ok) {
      toast.success("Signed in successfully");
      return router.push("/farm");
    } else if (response?.error) {
      toast.error("Google sign-in failed.");
    }
  };
  return (
    <div className="md:w-2/6 w-full border-2 border-maindeep rounded-lg p-5 mx-auto mt-10">
      <h1 className="text-maindeep font-semibold text-medium text-center">
        Register
      </h1>
      <p className="text-sm text-maindeep text-center">
        Kindly enter your details correctly
      </p>

      <form
        onSubmit={handleSubmit(submit)}
        className="flex h-72 overflow-y-auto py-5 no-scrollbar flex-col gap-3"
      >
        <label className="w-max cursor-pointer mx-auto">
          <Image
            src={previewImage}
            alt="Profile"
            width={10}
            height={10}
            className="w-20 h-20 border-2 border-maindeep p-1 rounded-full"
            priority
            quality={95}
          />
          <input
            type="file"
            hidden
            accept=".jpg, .png, .jpeg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleImage(e)
            }
          />
        </label>
        <Input
          label="Name"
          labelPlacement="inside"
          placeholder="Name"
          type="text"
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          labelPlacement="inside"
          placeholder="Email"
          type="email"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Phone Number"
          labelPlacement="inside"
          placeholder="Phone Number"
          type="number"
          isInvalid={!!errors.number}
          errorMessage={errors.number?.message}
          {...register("number")}
        />
        <Input
          label="Password"
          labelPlacement="inside"
          placeholder="Password"
          type={hidePassword ? "password" : "text"}
          endContent={
            hidePassword ? (
              <FaEye
                onClick={() => setHidePassword(false)}
                className="cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setHidePassword(true)}
                className="cursor-pointer"
              />
            )
          }
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
        <Textarea
          label="Address"
          placeholder="Address"
          labelPlacement="inside"
          height={50}
          isInvalid={!!errors.address}
          errorMessage={errors.address?.message}
          {...register("address")}
        />
        <div>
          {loading ? (
            <Button
              type="button"
              className="bg-maindeep w-full mt-10 h-12 cursor-not-allowed text-white"
              disabled
              isLoading
            >
              Processing...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-maindeep w-full mt-10 h-12 text-white"
            >
              Submit
            </Button>
          )}
        </div>
      </form>
      <Button
        onPress={() => handleGoogleSignIn()}
        className="w-full mt-3 bg-transparent border-2 border-maindeep rounded-xl h-12"
      >
        <FcGoogle />
        Sign in with Google
      </Button>
      <div className="flex w-full mt-1 flex-row justify-between items-center">
        <Link className="text-[0.7rem]" href={"/verify"}>
          Verify Account
        </Link>
        <Link className="text-[0.7rem]" href={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
