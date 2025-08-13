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
} from "@heroui/react";
import moment from "moment";

type AllSubscribersProps = {
  subscribers: {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

const AllSubscribers = ({ subscribers }: AllSubscribersProps) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(subscribers.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return subscribers.slice(start, end);
  }, [page, subscribers]);
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
          <TableColumn>S/N</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>DATE</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Subscriber currently"} items={items}>
          {subscribers.map((eachSubsciber, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{eachSubsciber.email}</TableCell>
                <TableCell>
                  {moment(eachSubsciber.createdAt).fromNow()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllSubscribers;
