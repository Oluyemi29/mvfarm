"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";

type ImageProps = {
  preview: string;
  imageFile: Blob | null;
};
const UploadButton = () => {
  const [data, setData] = useState<ImageProps | null>({
    imageFile: null,
    preview: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setData((prevData) => {
        return {
          ...prevData,
          preview: URL.createObjectURL(files[0]),
          imageFile: files[0],
        };
      });
    }
  };
  const handleSubmit = async () => {
    const { imageFile } = data as ImageProps;
    if (!imageFile) {
      toast.error("kindly upload image");
      return;
    }
    const formData = new FormData();
    formData.append("image", imageFile);
    const request = await fetch("/api/uploadimage/route.ts", {
      method: "POST",
      body: formData,
    });
    const response = await request.json();
    console.log(response);
  };
  return (
    <div>
      {data?.preview && (
        <Image
          src={(data?.preview as string) ?? "/rabb.png"}
          alt="pics"
          width={100}
          height={100}
          className="w-20 h-20 rounded-md"
          priority
          quality={95}
        />
      )}

      <label>
        <input
          type="file"
          hidden
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <FaCamera className="cursor-pointer" size={32} />
      </label>
      <Button onPress={() => handleSubmit()}>Upload Image</Button>
    </div>
  );
};

export default UploadButton;
