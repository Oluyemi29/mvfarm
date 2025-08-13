"use server";
import { prisma } from "@/lib/prisma";
import { customAlphabet } from "nanoid";
import bcrypt from "bcrypt";
import { VerificationEmail } from "@/components/emails/VerificationEmail";
import ForgotPasswordEmail from "@/components/emails/ForgotPasswordEmail";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { getServerSession } from "next-auth";
import PaymentSuccessEmail from "@/components/emails/PaymentSuccessEmail";
import SubscriptionSuccessEmail from "@/components/emails/SubscribeEmail";
// import Flutterwave from "flutterwave-node-v3";

// const flw = new Flutterwave(
//   process.env.FLW_PUBLIC_KEY as string,
//   process.env.FLW_SECRET_KEY as string
// );

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface RegisterUserProps {
  name: string;
  image: string;
  email: string;
  number: string;
  password: string;
  address: string;
}
export const RegisterUser = async ({
  address,
  email,
  image,
  name,
  number,
  password,
}: RegisterUserProps) => {
  if (!address || !email || !image || !name || !number || !password) {
    return {
      success: false,
      message: "All input are required",
    };
  }
  const existUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existUser) {
    if (!existUser.verifyEmail) {
      return {
        success: true,
        message: "Account already registered but not yet verified",
      };
    } else if (existUser.verifyEmail && !existUser.password) {
      return {
        success: false,
        message: "Account already Registered with Google",
      };
    } else {
      return {
        success: false,
        message: "Account already exist, kindly login",
      };
    }
  }
  const hashPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      address,
      email,
      image,
      name,
      number,
      password: hashPassword,
    },
  });
  return {
    success: true,
    message: "User Registered Successfully",
  };
};

interface SendVerificationCodeProps {
  email: string;
}
export const SendVerificationCode = async ({
  email,
}: SendVerificationCodeProps) => {
  try {
    if (!email) {
      return {
        success: false,
        message: "Kindly enter your email",
      };
    }
    const emailExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!emailExist) {
      return {
        success: false,
        message: "This account have not been Registered",
      };
    }
    if (!emailExist.verifyEmail && emailExist.password === null) {
      return {
        success: false,
        message: "Account registered with Google, kindly login",
      };
    }
    if (emailExist.verifyEmail) {
      return {
        success: false,
        message: "Account already verified,kindly login",
      };
    }
    const now = new Date();
    const availableCode = await prisma.userVerificationCode.findUnique({
      where: {
        email,
      },
    });
    if (availableCode) {
      const TenMinutes = 10 * 60 * 1000;
      const expiredTime =
        new Date(availableCode.createdAt).getTime() + TenMinutes;
      if (expiredTime < now.getTime()) {
        const alphaNumeric =
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const generateCode = customAlphabet(alphaNumeric, 6);
        const verificationCode = generateCode();
        const html = await render(
          VerificationEmail({ code: verificationCode })
        );
        await transporter.sendMail({
          from: `"MVFARM " <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Your MVFARM Verification Code",
          html,
        });
        const updateUserCode = await prisma.userVerificationCode.update({
          where: {
            email,
          },
          data: {
            createdAt: now,
            updatedAt: now,
            email: email,
            verificationCode,
          },
        });
        if (updateUserCode) {
          return {
            success: true,
            message: "Verification Code has been sent",
          };
        } else {
          return {
            success: false,
            message: "An Error Occur",
          };
        }
      } else {
        const html = await render(
          VerificationEmail({ code: availableCode.verificationCode })
        );
        await transporter.sendMail({
          from: `"MVFARM " <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Your MVFARM Verification Code",
          html,
        });
        return {
          success: true,
          message: "Verification Code has been sent",
        };
      }
    } else {
      const alphaNumeric =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const generateCode = customAlphabet(alphaNumeric, 6);
      const verificationCode = generateCode();
      const html = await render(VerificationEmail({ code: verificationCode }));
      await transporter.sendMail({
        from: `"MVFARM " <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your MVFARM Verification Code",
        html,
      });
      const updateUserCode = await prisma.userVerificationCode.create({
        data: {
          email,
          verificationCode,
        },
      });
      if (updateUserCode) {
        return {
          success: true,
          message: "Verification Code has been sent",
        };
      } else {
        return {
          success: false,
          message: "An Error Occur",
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An Error Occur",
    };
  }
};

interface EmailVeriCodeProps {
  vcode: string;
  email: string;
}
export const EmailVeriCode = async ({ vcode, email }: EmailVeriCodeProps) => {
  try {
    if (!vcode || !email) {
      return {
        success: false,
        message: "Kindly enter your Verification Code",
      };
    }
    const now = new Date();
    const [verifyCode, mailVerified] = await Promise.all([
      await prisma.userVerificationCode.findUnique({
        where: {
          email,
        },
      }),
      await prisma.user.findUnique({
        where: {
          email,
        },
      }),
    ]);
    if (!verifyCode) {
      return {
        success: false,
        message: "You havent request for code",
      };
    }
    if (mailVerified?.verifyEmail) {
      return {
        success: false,
        message: "Account already verified, kindly login",
      };
    }
    const TenMinutes = 10 * 60 * 1000;
    const expiredTime = new Date(verifyCode.createdAt).getTime() + TenMinutes;
    if (expiredTime < now.getTime()) {
      return {
        success: false,
        message: "Code Expired, get new Code",
      };
    }
    if (verifyCode.verificationCode !== vcode) {
      return {
        success: false,
        message: "Incorrect Code",
      };
    }
    const updateEmailVerifyStatus = await prisma.user.update({
      where: {
        email,
      },
      data: {
        verifyEmail: true,
      },
    });
    if (updateEmailVerifyStatus) {
      return {
        success: true,
        message: "Account Verify Successfully, kindly login",
      };
    } else {
      return {
        success: false,
        message: "Error when verifing Account",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An Error Occured",
    };
  }
};

interface PassResetMailProps {
  email: string;
}

export const PassResetMail = async ({ email }: PassResetMailProps) => {
  try {
    if (!email) {
      return {
        success: false,
        message: "Kindly input your registered email",
      };
    }
    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existUser) {
      return {
        success: false,
        message: "Account not found",
      };
    }
    const resetLink = `${process.env.MVFARM_SITE_URL}/reset-password/${existUser.id}`;
    const html = await render(ForgotPasswordEmail({ resetLink }));
    await transporter.sendMail({
      from: `"MVFARM " <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your MVFARM Account Password",
      html,
    });
    return {
      success: true,
      message: "Reset link sent successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An Error Occured",
    };
  }
};

interface PasswordResetProps {
  id: string;
  password: string;
}

export const PasswordReset = async ({ id, password }: PasswordResetProps) => {
  try {
    if (!id || !password) {
      return {
        success: false,
        message: "All fields are required",
      };
    }
    const existUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!existUser) {
      return {
        success: false,
        message: "Account not found",
      };
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id },
      data: { password: hashPassword },
    });
    return {
      success: true,
      message: "password updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An Error Occured",
    };
  }
};

interface EditProfile {
  image: string;
  address: string;
  email: string;
  name: string;
  number: string;
}
export const EditProfile = async ({
  image,
  address,
  email,
  name,
  number,
}: EditProfile) => {
  noStore();
  try {
    if (!image || !email || !name) {
      return {
        success: false,
        message: "All input are required",
      };
    }
    const session = await getServerSession();
    if (!session || !session.user) {
      return {
        success: false,
        message: "unauthorize access",
      };
    }
    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existUser) {
      return {
        success: false,
        message: "user not found",
      };
    }

    const updateProfile = await prisma.user.update({
      where: {
        email,
      },
      data: {
        image,
        address,
        name,
        number,
      },
    });

    if (updateProfile) {
      revalidatePath("/profile");
      revalidatePath("/admin");
      return {
        success: true,
        message: "Profile Updated Successfully",
      };
    } else {
      return {
        success: false,
        message: "Error when updating profile",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface UploadFarmAnimalProps {
  image: string;
  animal: string;
  age: string;
  breed: string;
  gender: string;
  amount: string;
  message: string;
}
export const UploadFarmAnimal = async ({
  age,
  amount,
  animal,
  breed,
  gender,
  image,
  message,
}: UploadFarmAnimalProps) => {
  try {
    if (!amount || !animal || !age || !breed || !gender || !image || !message) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const uploadAnimal = await prisma.farmanimal.create({
      data: {
        age,
        amount: Number(amount),
        animal,
        breed,
        gender,
        image,
        message,
      },
    });
    if (uploadAnimal) {
      return {
        success: true,
        message: "Farm animal uploaded successfully",
      };
    } else {
      return {
        success: false,
        message: "Error uploading farm animal",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

export const DeleteFarm = async (id: string) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "Required field not found",
      };
    }
    const existFarm = await prisma.farmanimal.findUnique({
      where: {
        id,
      },
    });
    if (!existFarm) {
      return {
        success: false,
        message: "Farm animal does not exist",
      };
    }
    const AnimalDeleted = await prisma.farmanimal.delete({
      where: {
        id,
      },
    });
    if (AnimalDeleted) {
      revalidatePath("/admin/farms");
      revalidatePath("/admin");
      return {
        success: true,
        message: "Farm animal deleted successfully",
      };
    } else {
      return {
        success: false,
        message: "Error when deleting farm animal",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface EditFarmAnimalProps {
  id: string;
  image: string;
  animal: string;
  age: string;
  breed: string;
  gender: string;
  amount: string;
  message: string;
  available: boolean;
}

export const EditFarmAnimal = async ({
  age,
  amount,
  animal,
  breed,
  gender,
  id,
  image,
  message,
  available,
}: EditFarmAnimalProps) => {
  try {
    if (
      !age ||
      !amount ||
      !animal ||
      !breed ||
      !gender ||
      !id ||
      !image ||
      !message
    ) {
      return {
        success: false,
        message: "All fields are required",
      };
    }
    const existData = await prisma.farmanimal.findUnique({
      where: {
        id,
      },
    });
    if (!existData) {
      return {
        success: false,
        message: "Data not found",
      };
    }
    const updateFarmAnimal = await prisma.farmanimal.update({
      where: {
        id,
      },
      data: {
        age,
        amount: Number(amount),
        animal,
        breed,
        gender,
        image,
        message,
        available,
      },
    });
    if (updateFarmAnimal) {
      revalidatePath("/admin/farms");
      revalidatePath("/admin");
      revalidatePath("/farm");
      return {
        success: true,
        message: "Farm animal edited successfully",
      };
    } else {
      return {
        success: false,
        message: "error when editting farm animal",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface RequestDetailsProps {
  userId: string;
  image: string;
  animal: string;
  quantity: string;
  age: string;
  breed: string;
  gender: string;
  amount: string;
  message: string;
}
export const RequestDetails = async ({
  age,
  amount,
  animal,
  breed,
  gender,
  image,
  message,
  quantity,
  userId,
}: RequestDetailsProps) => {
  try {
    if (
      !age ||
      !amount ||
      !animal ||
      !breed ||
      !gender ||
      !image ||
      !message ||
      !quantity ||
      !userId
    ) {
      return {
        success: false,
        message: "All field ae required",
      };
    }
    const request = await prisma.request.create({
      data: {
        age,
        amount: Number(amount),
        animal,
        breed,
        gender,
        image,
        message,
        quantity: Number(quantity),
        userId,
      },
    });
    if (request) {
      revalidatePath("/farm/request");
      revalidatePath("/admin");
      return {
        success: true,
        message: "Request successfully made",
      };
    } else {
      return {
        success: false,
        message: "Error when making request",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error when making request",
    };
  }
};

export const DeleteThisRequest = async (id: string) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const checkRequest = await prisma.request.findUnique({
      where: {
        id,
      },
    });
    if (!checkRequest) {
      return {
        success: false,
        message: "Request not found",
      };
    }
    await prisma.request.update({
      where: {
        id,
      },
      data: {
        delete: "Pending",
      },
    });
    revalidatePath("/farm/request");
    revalidatePath("/admin");
    return {
      success: true,
      message: "Deleting request made, awaiting admin approval",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

export const AdminDeleteThisRequest = async (id: string) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const checkRequest = await prisma.request.findUnique({
      where: {
        id,
      },
    });
    if (!checkRequest) {
      return {
        success: false,
        message: "Request not found",
      };
    }
    await prisma.request.delete({
      where: {
        id,
      },
    });
    revalidatePath("/farm/request");
    revalidatePath("/admin/request");
    revalidatePath("/admin");
    return {
      success: true,
      message: "Deleting request made, awaiting admin approval",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface MakePaymentProps {
  name: string;
  email: string;
  phone: string;
  amount: number;
}

export const MakePayment = async ({
  amount,
  email,
  name,
  phone,
}: MakePaymentProps) => {
  try {
    if (!amount || !email || !name || !phone) {
      return {
        success: false,
        message: "All field are required",
      };
    }

    return {
      success: true,
      message: "response.message",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

type AllcartProps = {
  userId: string;
  eachFarm: {
    id: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    animal: string;
    age: string;
    breed: string;
    gender: string;
    amount: number;
    message: string;
  };
}[];

export const CreateOrder = async (
  username: string,
  allCartInfo: AllcartProps,
  email: string
) => {
  try {
    const total = allCartInfo.reduce((acc, num) => {
      return acc + num.eachFarm.amount;
    }, 0);
    const name = username;

    const body = await render(PaymentSuccessEmail({ name, total }));

    await transporter.sendMail({
      from: `"MVFARM " <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Payment Confirmation",
      html: body,
    });
    allCartInfo.map(async (eachCart) => {
      await prisma.order.create({
        data: {
          age: eachCart.eachFarm.age,
          amount: eachCart.eachFarm.amount,
          animal: eachCart.eachFarm.animal,
          breed: eachCart.eachFarm.breed,
          gender: eachCart.eachFarm.gender,
          image: eachCart.eachFarm.image,
          userId: eachCart.userId,
        },
      });
    });
    allCartInfo.map(async (eachCart) => {
      await prisma.farmanimal.update({
        where: {
          id: eachCart.eachFarm.id,
        },
        data: {
          available: false,
        },
      });
    });
    revalidatePath("/farm");
    revalidatePath("/farm/order");
    revalidatePath("/admin");
    revalidatePath("/admin/order");
    revalidatePath("/admin/farms");
    return {
      success: true,
      message: "Order created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};
interface OrderStatus {
  id: string;
  status: string;
}

export const AdminEditOrderStatus = async ({ id, status }: OrderStatus) => {
  const AllowStatus = ["Payment_Done", "Payment_Refunded", "Product_Received"];
  try {
    if (!id || !status) {
      return {
        success: false,
        message: "all field are required",
      };
    }
    const existOrder = await prisma.order.findUnique({
      where: {
        id,
      },
    });
    if (!existOrder) {
      return {
        success: false,
        message: "order not found",
      };
    }
    if (!AllowStatus.includes(status)) {
      return {
        success: false,
        message: "status not allowed",
      };
    }

    const updateStatus = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status:
          status === "Payment_Done"
            ? "Payment_Done"
            : status === "Payment_Refunded"
              ? "Payment_Refunded"
              : "Product_Received",
      },
    });
    if (updateStatus) {
      revalidatePath("/farm/order");
      revalidatePath("/admin/order");
      revalidatePath("/admin");
      return {
        success: true,
        message: "order status updated successfully",
      };
    } else {
      return {
        success: false,
        message: "An error occured",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

export const Subscriber = async (email: string) => {
  try {
    if (!email) {
      return {
        success: false,
        message: "all field ar required",
      };
    }
    const alreadySubscribe = await prisma.subscribe.findUnique({
      where: {
        email,
      },
    });
    if (alreadySubscribe) {
      return {
        success: false,
        message: "You already subscribe, Thank you😍",
      };
    }
    await prisma.subscribe.create({
      data: {
        email,
      },
    });
    const body = await render(SubscriptionSuccessEmail());

    await transporter.sendMail({
      from: `"MVFARM " <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "You are Subscribed!",
      html: body,
    });

    return {
      success: true,
      message: "Thanks for subscribing😍",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};
