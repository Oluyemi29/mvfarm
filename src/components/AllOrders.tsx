"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Button,
  Image,
} from "@heroui/react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

export const users = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
    action: (
      <div className="flex flex-row gap-3">
        <Button className="bg-green-700 text-white">Edit</Button>
        <Button className="text-white bg-red-700">Delete</Button>
      </div>
    ),
  },
];

type allOrderProps = {
  allOrder: {
    id: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    animal: string;
    age: string;
    breed: string;
    gender: string;
    amount: number;
    status: string;
    User: {
      number: string | null;
      name: string | null;
      id: string;
      image: string;
      email: string | null;
      verifyEmail: boolean;
      emailVerified: Date | null;
      password: string | null;
      address: string | null;
      provider: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
};
const AllOrders = ({ allOrder }: allOrderProps) => {
  const farmrequest = allOrder.map((eachFarmOrder, index) => {
    const result = {
      key: index,
      image: (
        <Image
          src={eachFarmOrder.image}
          alt="animal"
          width={30}
          height={30}
          className="w-10 h-10 rounded-full"
        />
      ),
      name: eachFarmOrder.User.name?.split(" ")[0],
      animal: eachFarmOrder.animal,
      breed: eachFarmOrder.breed,
      status: eachFarmOrder.status.replace("_"," "),
      amount: `${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(eachFarmOrder.amount)}`,
      action: (
        <div className="flex flex-row gap-3">
          <Button
            as={Link}
            href={`/admin/order/${eachFarmOrder.id}`}
            className="bg-green-700 text-white"
          >
            View
            <FaEye />
          </Button>
        </div>
      ),
    };
    return result;
  });
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(allOrder.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return farmrequest.slice(start, end);
  }, [page, farmrequest]);

  return (
    <div>
      <Table
        isStriped
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="default"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        topContent={
          <h1 className="text-center font-semibold text-medium">All Farms</h1>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="image">IMAGE</TableColumn>
          <TableColumn key="name">BUYER</TableColumn>
          <TableColumn key="animal">ANIMAL</TableColumn>
          <TableColumn key="breed">BREED</TableColumn>
          <TableColumn key="status">PAYMENT STATUS</TableColumn>
          <TableColumn key="amount">AMOUNT</TableColumn>
          <TableColumn key="action">ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No farm available currently"} items={items}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllOrders;
