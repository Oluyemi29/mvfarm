"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const AdminNavbar = () => {
  return (
    <div className="w-full ">
      <div className="flex md:justify-center w-full overflow-x-scroll no-scrollbar my-5 flex-row gap-2 mx-auto">
        <Button
          className="bg-maindeep text-white min-w-max px-4"
          as={Link}
          href="/admin"
        >
          Dashboard
        </Button>
        <Button
          className="bg-maindeep text-white min-w-max px-4"
          as={Link}
          href="/admin/users"
        >
          Users
        </Button>
        <Button
          className="bg-maindeep text-white min-w-max px-4"
          as={Link}
          href="/admin/farms"
        >
          Farms
        </Button>
        <Button
          className="bg-maindeep text-white min-w-max px-4"
          as={Link}
          href="/admin/upload"
        >
          Upload Farm
        </Button>
        <Button
          className="bg-maindeep text-white min-w-max px-4"
          as={Link}
          href="/admin/request"
        >
          Request
        </Button>
        <Button
          className="bg-maindeep text-white min-w-max px-4"
          as={Link}
          href="/admin/order"
        >
          Order
        </Button>
        <Button
          className="bg-maindeep text-white min-w-max px-4"
          as={Link}
          href="/admin/subscriber"
        >
          Subscriber
        </Button>
      </div>
    </div>
  );
};

export default AdminNavbar;
