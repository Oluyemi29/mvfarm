"use client";
import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "OAuthAccountNotLinked") {
      toast.error(
        "You previously registered manually. Please sign in with email and password."
      );
    }
  }, [error]);
  const router = useRouter();
  const formSchema = z.object({
    email: z
      .string({ message: "Kindly enter email" })
      .email({ message: "Not Email Format" }),
    password: z.string({ message: "Kindly enter your password" }),
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
  const submit = async (value: formSchemType) => {
    try {
      setLoading(true);
      const { email, password } = value;
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response?.error) {
        if (response.error === "CredentialsSignin") {
          toast.error("Invalid email or password");
        } else if (response.error === "OAuthSignin") {
          toast.error("Something went wrong with the OAuth provider");
        } else if (response.error === "OAuthCallback") {
          toast.error("OAuth callback failed");
        } else if (response.error === "OAuthCreateAccount") {
          toast.error("Could not create OAuth account");
        } else if (response.error === "EmailSignin") {
          toast.error("Could not send sign-in email");
        } else {
          toast.error("An unexpected error occurred. Please try again");
        }
      } else if (response?.ok) {
        toast.success("Login successfully");
        reset();
        return router.push("/farm");
      }
    } catch (error) {
      console.log(error);
    } finally {
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
        Login
      </h1>
      <p className="text-sm text-maindeep text-center">
        Kindly enter your details correctly
      </p>

      <form
        onSubmit={handleSubmit(submit)}
        className="flex mt-10 pt-3 flex-col gap-5"
      >
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
        <div className="flex mt-10 flex-col gap-3">
          {loading ? (
            <Button
              type="button"
              className="bg-maindeep w-full  h-12 text-white"
              isLoading
              disabled
            >
              Processing...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-maindeep w-full  h-12 text-white"
            >
              Submit
            </Button>
          )}

          <Button
            type="button"
            onPress={() => handleGoogleSignIn()}
            className="w-full bg-transparent border-2 border-maindeep rounded-xl h-12"
          >
            <FcGoogle />
            Sign in with Google
          </Button>
          <div className="flex w-full mt-1 flex-row justify-between items-center">
            <Link className="text-[0.7rem]" href={"/forget-password"}>
              Forget Password
            </Link>
            <Link className="text-[0.7rem]" href={"/register"}>
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
