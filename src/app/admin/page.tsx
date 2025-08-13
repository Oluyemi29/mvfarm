import AdminDashboard from "@/components/AdminDashboard";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};
const page = async () => {
  noStore();
  const [
    allUsers,
    unverifyUsers,
    farmanimals,
    requests,
    orders,
    totalPayments,
    paymentDones,
    productDelivered,
    allOrders,
  ] = await Promise.all([
    await prisma.user.count(),
    await prisma.user.count({
      where: {
        verifyEmail: false,
      },
    }),
    await prisma.farmanimal.count(),
    await prisma.request.count(),
    await prisma.order.count(),
    await prisma.order
      .findMany({
        select: {
          amount: true,
        },
      })
      .then((AllAmount) => {
        return AllAmount.reduce((acc, value) => {
          return acc + value.amount;
        }, 0);
      }),
    await prisma.order.count({
      where: {
        status: "Payment_Done",
      },
    }),
    await prisma.order.count({
      where: {
        status: "Product_Received",
      },
    }),
    await prisma.order.findMany({
      select: {
        amount: true,
        createdAt: true,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);
  return (
    <div>
      <AdminDashboard
        allUsers={allUsers}
        unverifyUsers={unverifyUsers}
        farmanimals={farmanimals}
        requests={requests}
        orders={orders}
        totalPayments={totalPayments}
        paymentDones={paymentDones}
        productDelivered={productDelivered}
        allOrders={allOrders}
      />
    </div>
  );
};

export default page;
