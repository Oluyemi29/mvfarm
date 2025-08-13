"use client";
import { PasswordReset } from "@/app/api/Action";
import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";

interface ResetIdProps {
  id: string;
}
const ResetPassword = ({ id }: ResetIdProps) => {
  const [loading, setLoading] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);
  const formSchema = z
    .object({
      password: z
        .string({ message: "Kindly enter your new password" })
        .min(4, { message: "Minimum of 4 character" }),
      confirmPassword: z
        .string({ message: "Kindly enter your new password" })
        .min(4, { message: "Minimum of 4 character" }),
    })
    .refine(
      (value) => {
        return value.password === value.confirmPassword;
      },
      { message: "Password does not match", path: ["confirmPassword"] }
    );
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
      const { password, confirmPassword } = value;
      if (!password || !confirmPassword) {
        toast.error("Kinly input all details");
        return;
      }
      const response = await PasswordReset({ id, password });
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <div className="md:w-2/6 w-full mx-auto mt-14 border-2 border-maindeep rounded-lg p-4">
        <h1 className="text-center text-maindeep my-3">
          Confirm Account Ownership
        </h1>
        <p className="text-[0.7rem] text-maindeep">
          a link and button will be sent your register email account to confirm
          account ownership
        </p>
        <form onSubmit={handleSubmit(submit)} className="mt-10 flex flex-col gap-4">
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
          <Input
            label="Confirm Password"
            labelPlacement="inside"
            placeholder="Confirm Password"
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
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          {loading ? (
            <Button
              disabled
              type="button"
              isLoading
              className="bg-maindeep w-full h-12 cursor-pointer mt-12 text-white"
            >
              Sending...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-maindeep w-full h-12 mt-12 text-white"
            >
              Send Reset Link
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
