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
  Image,
} from "@heroui/react";


type AllUserInfoProps = {
  AllUserInfo: {
    number: string | null;
    name: string | null;
    id: string;
    image: string;
    email: string | null;
    address: string | null;
  }[];
};

const AllUsers = ({ AllUserInfo }: AllUserInfoProps) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(AllUserInfo.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return AllUserInfo.slice(start, end);
  }, [page, AllUserInfo]);
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
          <h1 className="text-center font-semibold text-medium">All Users</h1>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>NUMBER</TableColumn>
          <TableColumn>ADDRESS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No user currently"} items={items}>
          {AllUserInfo.map((eachUser, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Image
                    src={eachUser.image}
                    alt="Profile"
                    width={30}
                    height={30}
                    className="w-20 h-20 rounded-full"
                  />
                </TableCell>
                <TableCell>{eachUser.name}</TableCell>
                <TableCell>{eachUser.email}</TableCell>
                <TableCell>{eachUser.number}</TableCell>
                <TableCell className="line-clamp-1">
                  {eachUser.address}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUsers;
