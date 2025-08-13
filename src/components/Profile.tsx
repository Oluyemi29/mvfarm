"use client";
import { Button, Card, Divider, Image, Input, Textarea } from "@heroui/react";
import {  useSession } from "next-auth/react";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import toast from "react-hot-toast";
import { EditProfile } from "@/app/api/Action";
import { IoLocation } from "react-icons/io5";

interface previewImageProps {
  name: string;
  number: string;
  address: string;
}
const Profile = () => {
  const { data: session,update } = useSession();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<previewImageProps>({
    name: session?.user.name as string,
    number: session?.user.number as string,
    address: session?.user.address as string,
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
    return response.secure_url as string;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleEditProfile = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const image = !imageFile
        ? (session?.user.image as string)
        : await getImageLink();
      const { address, name, number } = profileData;
      const email = session!.user.email;
      const myAddress = address ?? session?.user.address;
      const myName = name ?? session?.user.name;
      const myNumber = number ?? session?.user.number;
      if (!image) {
        toast.error("Kindly upload your image");
        return;
      }
      if (!myName) {
        toast.error("Name is required");
        return;
      }
      if (!email) {
        toast.error("Email is required");
        return;
      }
      const response = await EditProfile({
        image,
        address: myAddress,
        email,
        name: myName,
        number: myNumber,
      });
      if (response.success) {
        await update();
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
      setLoading(false);
    }
  };
  return (
    <div className="md:w-2/6 w-full mx-auto mt-20">
      <Card>
        <div className="bg-mainfaided w-full flex flex-col py-5 gap-3 justify-center items-center rounded-bl-lg rounded-br-lg">
          <h1 className="text-maindeep">Details</h1>
          <Image
            src={
              (session?.user.image as string) ??
              "https://i.pinimg.com/736x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg"
            }
            alt="Profile"
            width={50}
            height={50}
            className="w-32 h-32 rounded-full border-2 p-1 border-maindeep"
          />
          <h1 className="text-maindeep">{session?.user.name}</h1>
        </div>
        <div className="p-5">
          <div className="flex flex-col gap-2">
            <p className="text-maindeep">Email</p>
            <div className="flex items-center flex-row gap-5">
              <MdEmail className="text-maindeep" size={24} />
              <h1 className="text-maindeep">{session?.user.email}</h1>
            </div>
          </div>
          <div>
            {session?.user.number && (
              <>
                <Divider className="bg-maindeep h-0.5 my-2" />
                <div className="flex flex-col gap-2">
                  <p className="text-maindeep">Phone Number</p>
                  <div className="flex flex-row items-center gap-5">
                    <FaPhone className="text-maindeep" size={24} />
                    <h1 className="text-maindeep">
                      {session?.user.number as string}
                    </h1>
                  </div>
                </div>
              </>
            )}
          </div>
          {session?.user.address && (
            <>
              <Divider className="bg-maindeep h-0.5 my-2" />
              <div className="flex flex-col gap-2">
                <p className="text-maindeep">Address</p>
                <div className="flex flex-row items-center gap-5">
                  <IoLocation className="text-maindeep" size={24} />
                  <h1 className="text-maindeep">{session?.user.address}</h1>
                </div>
              </div>
            </>
          )}
          <Button
            className="bg-maindeep mt-10 text-white w-full h-12"
            onPress={onOpen}
          >
            Edit Profile
          </Button>
        </div>
      </Card>
      <Modal onClose={onClose} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Edit Profile
          </ModalHeader>
          <ModalBody>
            <div className="w-full border-2 border-maindeep rounded-lg p-5 mx-auto mt-10">
              {/* <h1 className="text-maindeep font-semibold text-medium text-center">
                
              </h1> */}
              <p className="text-sm text-maindeep text-center">
                Kindly enter your details correctly
              </p>

              <form
                onSubmit={(e: React.FormEvent<HTMLElement>) =>
                  handleEditProfile(e)
                }
                className="flex h-72 overflow-y-auto py-5 no-scrollbar flex-col gap-3"
              >
                <label className="w-max cursor-pointer mx-auto">
                  <Image
                    src={
                      previewImage
                        ? previewImage
                        : (session?.user.image as string)
                    }
                    alt="Profile"
                    className="w-20 h-20 border-2 border-maindeep p-1 rounded-full"
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
                  defaultValue={session?.user.name as string}
                  name="name"
                  value={profileData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                />
                <Input
                  label="Email"
                  labelPlacement="inside"
                  placeholder="Email"
                  type="email"
                  readOnly
                  value={session?.user.email as string}
                  className="cursor-not-allowed"
                />
                <Input
                  label="Phone Number"
                  labelPlacement="inside"
                  placeholder="Phone Number"
                  type="number"
                  defaultValue={session?.user.number as string}
                  name="number"
                  value={profileData.number}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                />
                <Textarea
                  label="Address"
                  placeholder="Address"
                  labelPlacement="inside"
                  height={50}
                  defaultValue={session?.user.address as string}
                  name="address"
                  value={profileData.address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
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
                      Save
                    </Button>
                  )}
                </div>
              </form>
            </div>
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

export default Profile;
