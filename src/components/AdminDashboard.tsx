"use client";
import { Card } from "@heroui/react";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaCodePullRequest } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GrDeliver } from "react-icons/gr";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type AdminDashboardProps = {
  allUsers: number;
  unverifyUsers: number;
  farmanimals: number;
  requests: number;
  orders: number;
  totalPayments: number;
  paymentDones: number;
  productDelivered: number;
  allOrders: {
    amount: number;
    createdAt: Date;
  }[];
};

const AdminDashboard = ({
  allOrders,
  allUsers,
  farmanimals,
  orders,
  paymentDones,
  productDelivered,
  requests,
  totalPayments,
  unverifyUsers,
}: AdminDashboardProps) => {
  const newData = allOrders.map((eachData) => {
    return {
      date: eachData.createdAt.toDateString(),
      amt: eachData.amount,
    };
  });
  return (
    <div className="my-5">
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 justify-center grid-cols-1 gap-7">
        <Card className="p-5 ">
          <div className="flex flex-row justify-between items-center">
            <p className="text-maindeep">All Users</p>
            <FaUsers />
          </div>
          <p className="text-maindeep text-2xl my-4 font-semibold">
            {allUsers}
          </p>
        </Card>
        <Card className="p-5 ">
          <div className="flex flex-row justify-between items-center">
            <p className="text-maindeep">Unverified Users</p>
            <FaUsers />
          </div>
          <p className="text-maindeep text-2xl my-4 font-semibold">
            {unverifyUsers}
          </p>
        </Card>
        <Card className="p-5 ">
          <div className="flex flex-row justify-between items-center">
            <p className="text-maindeep">Farm Animals</p>
            <AiFillProduct />
          </div>
          <p className="text-maindeep text-2xl my-4 font-semibold">
            {farmanimals}
          </p>
        </Card>
        <Card className="p-5 ">
          <div className="flex flex-row justify-between items-center">
            <p className="text-maindeep">Request</p>
            <FaCodePullRequest />
          </div>
          <p className="text-maindeep text-2xl my-4 font-semibold">
            {requests}
          </p>
        </Card>
        <Card className="p-5 ">
          <div className="flex flex-row justify-between items-center">
            <p className="text-maindeep">Order</p>
            <MdOutlinePayment />
          </div>
          <p className="text-maindeep text-2xl my-4 font-semibold">{orders}</p>
        </Card>
        <Card className="p-5 ">
          <div className="flex flex-row justify-between items-center">
            <p className="text-maindeep">Total Payment</p>
            <GiReceiveMoney />
          </div>
          <p className="text-maindeep text-2xl my-4 font-semibold">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(totalPayments)}
          </p>
        </Card>
        <Card className="p-5 ">
          <div className="flex flex-row justify-between items-center">
            <p className="text-maindeep">Payment Done</p>
            <FaMoneyCheckDollar />
          </div>
          <p className="text-maindeep text-2xl my-4 font-semibold">
            {paymentDones}
          </p>
        </Card>
        <Card className="p-5 ">
          <div className="flex flex-row justify-between items-center">
            <p className="text-maindeep">Product Deliver</p>
            <GrDeliver />
          </div>
          <p className="text-maindeep text-2xl my-4 font-semibold">
            {productDelivered}
          </p>
        </Card>
      </div>
      <div className="mt-10 mx-auto w-full lg:flex justify-center hidden">
        <LineChart
          width={900}
          height={400}
          data={newData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amt" stroke="#8884d8" />
        </LineChart>
      </div>

      <div className="mt-10 mx-auto w-full lg:hidden overflow-x-auto no-scrollbar flex justify-center">
        <LineChart
          width={600}
          height={400}
          data={newData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amt" stroke="#8884d8" />
        </LineChart>
      </div>

      
    </div>
  );
};

export default AdminDashboard;
