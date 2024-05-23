"use client";
import {
  Button,
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
} from "@nextui-org/react";
import { OrderList } from "@/app/assets/data";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { CiSearch } from "react-icons/ci";
import { TbTrash } from "react-icons/tb";

interface user {
  orderId: string;
  timestamp: string;
  customerName: string;
  totalAmount: number;
  status: string;
}

export default function Transactions() {
  const [filterValue, setFilterValue] = useState("");
  const [sortOption, setSortOption] = useState<string>("Recent");
  const [page, setPage] = useState(1);
  const [statusFilterValue, setStatusFilterValue] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState<any | string[]>("10");
  const rowsPerPageOptions = ["10", "20", "30", "40", "50"];
  console.log(statusFilterValue);
  const status = [
    "All",
    "Pending",
    "Confirmed",
    "Processing",
    "Picked",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const columns = [
    { name: "CUSTOMER", uid: "customer name", sortable: true },
    { name: "DATE", uid: "date" },
    { name: "TOTAL", uid: "total" },
    { name: "METHOD", uid: "method" },
    { name: "STATUS", uid: "status" },
    { name: "ACTION", uid: "action" },
  ];
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  useEffect(() => {
    const initialStatus = searchParams.get("status") || "All";
    const initialRowsPerPage = searchParams.get("rowsPerPage") || "10";
    const initialPage = searchParams.get("page") || "1";
    
    setStatusFilterValue(initialStatus);
    setRowsPerPage(initialRowsPerPage);
    setPage(Number(initialPage));
  }, [searchParams]);

  
 const updateSearchParams = (newParams: any) => {
   const params = new URLSearchParams(searchParams);
   Object.keys(newParams).forEach((key) => {
     params.set(key, newParams[key]);
   });
   replace(`${pathname}?${params.toString()}`);
 };


  const handleStatusChange = (status: string) => {
    setStatusFilterValue(status);
    setPage(1);
    setRowsPerPage("10");
    updateSearchParams({
      status,
      page: 1,
      rowsPerPage: "10",
      filter: filterValue,
    });
  };

  const handleRowsPerPageChange = (rows: string) => {
    setRowsPerPage(rows);
    setPage(1);
    updateSearchParams({
      rowsPerPage: rows,
      page: 1,
      status: statusFilterValue,
      filter: filterValue,
    });
  };

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
    updateSearchParams({
      page: newPage,
      status: statusFilterValue,
      rowsPerPage,
      filter: filterValue,
    });
  };

 useEffect(() => {
   updateSearchParams({ filter: filterValue });
 }, [filterValue]);

 useEffect(() => {
   const initialFilter = searchParams.get("filter") || "";
   setFilterValue(initialFilter);
 }, []);
  // Filter and sort items based on sort option
  const filteredItems = useMemo(() => {
    let sortedList = OrderList.slice(); // Create a copy of the original list
    // Filter the sorted list based on other filters
    let filteredList = sortedList.filter((item) => {
      // Apply status and orderId filters
      if (statusFilterValue.includes("All")) {
        if (filterValue.length > 0) {
          return item.customerName
            .toLocaleLowerCase()
            .includes(filterValue.toLocaleLowerCase());
        }
        return true;
      } else {
        if (typeof item.status === "string") {
          if (filterValue.length > 0) {
            return (
              item.customerName
                .toLocaleLowerCase()
                .includes(filterValue.toLocaleLowerCase()) &&
              statusFilterValue
                .toLocaleLowerCase()
                .includes(item.status.toLocaleLowerCase())
            );
          }
          return statusFilterValue
            .toLocaleLowerCase()
            .includes(item.status.toLocaleLowerCase());
        }
        return false;
      }
    });

    return filteredList;
  }, [OrderList, statusFilterValue, filterValue, sortOption]);

  //pagination for orders

  const Items = useMemo(() => {
    const start = (page - 1) * Number(rowsPerPage);
    const end = start + Number(rowsPerPage);

    return filteredItems.slice(start, end);
  }, [
    page,
    filteredItems,
    OrderList,
    statusFilterValue,
    filterValue,
    sortOption,
    rowsPerPage,
  ]);

  const pages = useMemo(() => {
    return Math.ceil(filteredItems.length / Number(rowsPerPage));
  }, [Items]);

  function statusColor(orderStatus: string) {
    switch (orderStatus) {
      case "Pending":
        return "text-[#FFC600] ";
      case "Confirmed":
        return "text-[#28C76F] ";
      case "Processing":
        return "text-[#0FB7FF] ";
      case "Shipped":
        return "text-[#BD00FF] ";
      case "Cancelled":
        return "text-[#EA5455] ";
      case "Picked":
        return "text-[#1EB564] ";
      case "Delivered":
        return "text-[#33189D] ";
      default:
        return "text-[#FFC600] ";
    }
  }

  const topContent = useMemo(() => {
    return (
      <div className="flex gap-4 lg:justify-normal justify-between w-full items-center">
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
        <div>
          <Select
            aria-label={"status select"}
            suppressHydrationWarning={true}
            radius="none"
            size="md"
            classNames={{
              trigger: ["bg-white", "min-w-[200px]", "w-full"],
            }}
            onChange={(e) => handleStatusChange(e.target.value)}
            selectedKeys={[statusFilterValue]}
          >
            {status.map((item) => (
              <SelectItem key={item} value={item} className="">
                {item}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    );
  }, [filterValue, statusFilterValue, Items]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full justify-between sm:items-center gap-3">
        <div className="flex justify-normal  gap-2 items-center text-[#8B909A] text-sm font-medium">
          <p>Showing</p>
          <Select
            size="sm"
            className=" w-[100px]"
            selectedKeys={[rowsPerPage]}
            onChange={(e) => handleRowsPerPageChange(e.target.value)}
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
            onChange={handlePageChange}
          />
        </div>
      </div>
    );
  }, [Items.length, page, pages]);

  const renderCell = useCallback((user: user, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <p>{user.orderId}</p>;
      case "customer name":
        return <p>{user.customerName}</p>;
      case "date":
        return (
          <p className="min-w-[150px]">
            {new Date(user.timestamp).toDateString()}
          </p>
        );
      case "total":
        return <p>{user.totalAmount}</p>;
      case "method":
        return <p className="pl-1">CC</p>;
      case "status":
        return (
          <p className={`${statusColor(user.status)} pl-1`}>{user.status}</p>
        );
      case "action":
        return (
          <Button className="text-[#1EB564] bg-transparent pl-0">
            View Details
          </Button>
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
        topContent={topContent}
        topContentPlacement="outside"
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
              className={column.uid === "actions" ? "px-6" : "px-4"}
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
