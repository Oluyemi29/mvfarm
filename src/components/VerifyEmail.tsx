"use client";
import { EmailVeriCode, SendVerificationCode } from "@/app/api/Action";
import { Button, Divider, Input, InputOtp } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const router = useRouter();
  const [vcode, setVCode] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loadingMail, setLoadingMail] = React.useState(false);
  const [loadingVCode, setLoadingVCode] = React.useState(false);

  const [hideButton, setHideButton] = useState(false);
  const handleSendCode = async () => {
    try {
      setLoadingMail(true);
      if (!email) {
        toast.error("Kindly enter your email");
        return;
      }
      const response = await SendVerificationCode({ email });
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
  const handleVerifyButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoadingVCode(true);
      if (!email) {
        toast.error("Kindly enter your email");
        return;
      }
      if (!vcode) {
        toast.error("Kindly enter the code you received");
        return;
      }
      const response = await EmailVeriCode({ email, vcode });
      if (response.success) {
        toast.success(response.message);
        return router.push("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingVCode(false);
    }
  };
  useEffect(() => {
    setHideButton(vcode ? true : false);
  }, [vcode]);
  return (
    <div className="w-full">
      <div className="md:w-2/6 w-full mx-auto mt-14 border-2 border-maindeep rounded-lg p-4">
        <h1 className="text-center text-maindeep my-3">Verify Your Email</h1>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleVerifyButton(e)
          }
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
                hidden={hideButton}
                disabled
                type="button"
                isLoading
                className="bg-maindeep cursor-pointer mt-2 text-white"
              >
                Sending...
              </Button>
            ) : (
              <Button
                type="button"
                hidden={hideButton}
                onPress={() => handleSendCode()}
                className="bg-maindeep mt-2 text-white"
              >
                Send Code
              </Button>
            )}
          </div>
          <Divider className="bg-maindeep my-3" />
          <div>
            <p className="text-maindeep text-small ">enter OTP code received</p>
            <p className="text-[0.7rem] text-maindeep">
              Note : The code received can still be reuse in case your phone
              reload this page as far as the expiring time has not yet reach
            </p>
            <InputOtp
              fullWidth
              size="lg"
              allowedKeys={"^[a-z A-Z 0-9]*$"}
              length={6}
              value={vcode}
              onValueChange={setVCode}
            />
            {loadingVCode ? (
              <Button
                type="button"
                disabled
                isLoading
                className="bg-maindeep cursor-pointer text-white"
              >
                Verifing...
              </Button>
            ) : (
              <Button type="submit" className="bg-maindeep text-white">
                Verify Code
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
