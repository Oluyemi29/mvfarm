"use client";
import { PassResetMail } from "@/app/api/Action";
import { Button, Input } from "@heroui/react";
import React from "react";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = React.useState("");
  const [loadingMail, setLoadingMail] = React.useState(false);

  const handleVerifyButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoadingMail(true);
      if (!email) {
        toast.error("Kindly enter your email");
        return;
      }
      const response = await PassResetMail({ email });
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMail(false);
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
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleVerifyButton(e)
          }
          className="mt-10"
        >
          <div className="">
            <Input
              className=""
              label={"Email Address"}
              placeholder="Email Address"
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            {loadingMail ? (
              <Button
                disabled
                type="button"
                isLoading
                className="bg-maindeep w-full h-12 cursor-pointer mt-5 text-white"
              >
                Sending...
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-maindeep w-full h-12 mt-5 text-white"
              >
                Send Reset Link
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
