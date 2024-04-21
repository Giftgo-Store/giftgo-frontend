"use client";
import { Input, Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
export default function OrderManagement() {
  const [filterOption, setFilterOption] = useState<string | any>("date range");
  const filters = ["date range", "status", "amounts of product"];
  const tabs = [
    "Pending",
    "Confirmed",
    "Processing",
    "Picked",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const orderList = [
    {
      orderId: "#5284",
      timestamp: new Date().toLocaleDateString("en-us"),
      customerName: "Joseph wheeler",
      totalAmount: 20000,
      status: "pending",
      products: [
        {
          productId: "#6876",
          productName: "Bama",
          price: 3000,
          originalPrice: 2000,
          sellingPrice: 2700,
          quantity: 1,
          discount: 0,
          total: 2700,
        },
        {
          productId: "#6876",
          productName: "Shoe",
          price: 20000,
          originalPrice: 16000,
          sellingPrice: 17300,
          quantity: 1,
          discount: 10,
          total: 17300,
        },
      ],
    },
  ];
  return (
    <div>
      <div className="w-full overflow-x-auto py-2">
        {" "}
        <Tabs
          variant="underlined"
          color="success"
          className="border-b py-0"
          classNames={{
            tabContent: ["group-data-[selected=true]:text-[#1EB564]"],
            cursor: ["group-data-[selected=true]:bg-[#1EB564]"],
            tabList: "py-0",
          }}
        >
          {tabs.map((tab) => (
            <Tab className="text-[#8B909A]" title={tab} key={tab}></Tab>
          ))}
        </Tabs>
      </div>
      <div className="flex justify-between gap-3 pt-4 py-3">
        <Input
          placeholder="Search by order id"
          endContent={<CiSearch size={28} color="#8B909A" />}
          size="md"
          radius="sm"
          aria-label="search"
          className="max-w-[300px] w-full"
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
        ></Input>
        <Select
          size="md"
          radius="sm"
          className="max-w-[250px] w-full bg-white"
          variant="flat"
          aria-label="filter select"
          classNames={{
            trigger: [
              "bg-white",
              "data-focus-[within=true]:bg-white",
              "data-[hover=true]:bg-white",
              "group-data-[focus=true]:bg-white",
            ],
          }}
          selectorIcon={<SlArrowDown size={28} color="#8B909A" />}
          placeholder="Filter by"
          value={filterOption}
          onSelectionChange={setFilterOption}
        >
          {filters.map((filter) => (
            <SelectItem key={filter}>{filter}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="w-full bg-white rounded-2xl">
        <div className="flex justify-between py-3 border-b">
          <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span>ORDER ID</span>
          </div>
          <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span>Created</span>
          </div>
          <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span>CUSTOMER</span>
          </div>
          <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span>TOTAL</span>
          </div>
          <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span>PROFIT</span>
          </div>
          <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span>STATUS</span>
          </div>
        </div>
        <div>
          {orderList.map((order) => (
            <div className="flex justify-between py-3 border-b">
              <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
                      <span>{order.orderId}</span>
              </div>
              <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
                      <span>{order.timestamp}</span>
              </div>
              <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
                      <span>{order.customerName}</span>
              </div>
              <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
                <span>TOTAL</span>
              </div>
              <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
                <span>PROFIT</span>
              </div>
              <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
                <span>STATUS</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
