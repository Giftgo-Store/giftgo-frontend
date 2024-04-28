"use client";
import { useCallback, useMemo, useState } from "react";
import { OrderList } from "@/app/assets/data";
import {
  Input,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  Selection,
  Button,
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { TbTrash } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import React from "react";
interface user {
  orderId: string;
  timestamp: string;
  customerName: string;
  phone_number: string;
}
export default function Customers() {
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState<any | string[]>("10");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [page, setPage] = useState(1);
  const rowsPerPageOptions = ["10", "20", "30", "40", "50"];
  const columns = [
    { name: "NAME", uid: "name", sortable: true },
    { name: "PHONE NUMBER", uid: "phone number" },
    { name: "CREATED", uid: "created" },
    { name: "ACTIONS", uid: "actions" },
  ];


  //filter orders based on search query
  const filteredItems = useMemo(() => {
    if (filterValue.length > 0) {
      return OrderList.slice().filter((item) => {
        return item.customerName.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase());
      });
    }
    return OrderList;
  }, [filterValue, OrderList]);

  const Items = useMemo(() => {
    const start = (page - 1) * Number(rowsPerPage);
    const end = start + Number(rowsPerPage);

    return filteredItems.slice(start, end);
  }, [page, rowsPerPage, filteredItems, filterValue]);

  const pages = useMemo(() => {
    return Math.ceil(filteredItems.length / Number(rowsPerPage));
  }, [Items]);

//bottom conten of table
  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full justify-between sm:items-center gap-3">
        <div className="flex justify-normal  gap-2 items-center text-[#8B909A] text-sm font-medium">
          <p>Showing</p>
          <Select
            size="sm"
            className=" w-[70px]"
            selectedKeys={[rowsPerPage]}
            onChange={(e) => {
              setRowsPerPage(e.target.value);
            }}
            aria-label="rows"
          >
            {rowsPerPageOptions.map((option) => (
              <SelectItem
                isDisabled={filteredItems.length < Number(option)}
                key={option}
                value={option}
              >
                {option}
              </SelectItem>
            ))}
          </Select>
          <p>of {filteredItems.length}</p>
        </div>
        <div className="py-2 px-2 sm:justify-between items-center">
          <Pagination
            isDisabled={filterValue.length > 1}
            showControls
            color="success"
            total={pages}
            initialPage={1}
            page={page}
            onChange={(page) => {
              setPage(page);
            }}
          />
        </div>
      </div>
    );
  }, [Items.length, page, pages]);

// top content of table
  const topContent = useMemo(() => {
    return (
      <div className="flex gap-4 justify-between items-center">
        <Input
          placeholder="Search..."
          endContent={<CiSearch size={28} color="#8B909A" />}
          size="md"
          radius="sm"
          
          aria-label="search"
          className="max-w-[300px] w-full shadow-sm"
          classNames={{
            label: "text-lg",
            input: "py-2 text-base",
            inputWrapper: [
              "bg-white",
              "data-focus-[within=true]:bg-white",
              "data-[hover=true]:bg-white",
              "group-data-[focus=true]:bg-white",
            ],
          }}
          value={filterValue}
          onChange={(e) => {
            setFilterValue(e.target.value);
          }}
        ></Input>
        <Button className="bg-white shadow-sm" radius="sm">
          <TbTrash color="#8B909A" size={20} />
          <span className="text-[#8B909A]">Delete</span>
        </Button>
      </div>
    );
  }, [filterValue]);
//render column cells for tables
  const renderCell = useCallback((user: user, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm" }}
            classNames={{
              description: "text-default-500",
            }}
            name={user.customerName}
            description={"robert@gmail.com"}
          >
            robert@gmail.com
          </User>
        );
      case "phone number":
        return <p>{user.phone_number}</p>;
      case "created":
        return (
          <p className="min-w-[150px]">
            {new Date(user.timestamp).toDateString()}
          </p>
        );
      case "actions":
        return (
          <div className="flex justify-normal items-center gap-3 min-w-[100px]">
            <Button isIconOnly className="bg-transparent">
              <TbEdit color="#8B909A" size={20} />
            </Button>
            <Button isIconOnly className="bg-transparent">
              <TbTrash color="#8B909A" size={20} />
            </Button>
          </div>
        );
      default:
        return "unavailable";
    }
  }, []);
  return (
    <div className="pb-16">
      <Table
        className="min-h-[400px]"
        aria-label="customer table"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        classNames={{
          wrapper: "min-h-[400px]",
          th: [
            "text-[#8B909A]",
            "!rounded-none",
            "first:rounded-r-none",
            "last:rounded-l-none",
            "shadown-none",
            "bg-white",
          ],
          thead: [
            "text-default-500",
            "shadow-none",
            "[&>tr]:first:shadow-none",
          ],
          td: ["py-3", "shadow-none"],
          tr: ["[&>tr]:first:shadow-none"],
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={"start"}
              allowsSorting={column.sortable}
              className={column.uid==="actions"?"px-6":"px-4"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No users found"}
          className="min-h-[400px]"
          items={Items}
        >
          {(item) => (
            <TableRow
              key={Math.random() * filteredItems.length}
              className="border-y border-[#DBDADE]"
            >
              {(columnKey) => (
                <TableCell key={Math.random() * 10.3}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
