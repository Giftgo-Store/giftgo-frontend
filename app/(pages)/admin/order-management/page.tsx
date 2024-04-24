"use client";
import {
  Accordion,
  AccordionItem,
  Input,
  Pagination,
  Select,
  SelectItem,
  Selection,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { OrderList } from "@/app/assets/data";
import { PiPrinterFill } from "react-icons/pi";
import {
  IoCaretDownCircleOutline,
  IoCaretForwardCircleOutline,
} from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";



export default function OrderManagement() {
  const [filterOption, setFilterOption] = useState<string | any>("date range");
  const [pageNo, setPageNo] = useState<any | number>();
  const [data,setData]=useState([])
  const filters = ["date range", "status", "amounts of product"];
  const tabs = [
    "Pending",
    "Confirmed",
    "processing",
    "Picked",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
const pathname = usePathname();
const { replace } = useRouter();
  const searchParams = useSearchParams();


  function statusColor(orderStatus: string) {
    switch (orderStatus) {
      case "Pending":
        return "text-[#FFC600] bg-[#FFC60029]";
      case "Confirmed":
        return "text-[#28C76F] bg-[#28C76F29]";
      case "processing":
        return "text-[#0FB7FF] bg-[#0FB7FF29]";
      case "Shipped":
        return "text-[#BD00FF] bg-[#BD00FF29]";
      case "Cancelled":
        return " text-danger bg-[#EA5455FF29]";
      case "Picked":
        return "text-[#1EB564] bg-[#0F60FF29]";
      case "Delivered":
        return "text-[#33189D] bg-[#33189D29]";
      default:
        return "text-[#FFC600] bg-[#FFC60029]";
    }
  }
  return (
    <div className="pb-12">
      <div className="w-full overflow-x-auto py-2">
        {" "}
        <Tabs
          selectedKey={`${pathname}?${searchParams}`}
          variant="underlined"
          color="success"
          className="border-b py-0 w-full"
          classNames={{
            tabContent: ["group-data-[selected=true]:text-[#1EB564]"],
            cursor: ["group-data-[selected=true]:bg-[#1EB564]"],
            tabList: "py-0",
          }}
          onSelectionChange={(tab: any) => {
            replace(tab);
          }}
        >
          {tabs.map((tab) => (
            <Tab
              className="text-[#8B909A]"
              title={tab}
              key={`${pathname}?tab=${tab}`}
            ></Tab>
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
        <div className="flex justify-between py-2 border-b">
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
          <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span className="hidden">dropdown</span>
          </div>
          <div className="text-[#8B909A] text-sm font-medium py-2 px-0">
            <div className="opacity-0">
              {" "}
              <IoCaretDownCircleOutline color="#8B909A" size={24} />
            </div>
          </div>
        </div>
        <div>
          {OrderList.map((order, index) => (
            <Accordion
              suppressHydrationWarning={true}
              className="border-b py-0 px-0"
              showDivider
              key={index}
            >
              <AccordionItem
                classNames={{
                  trigger: ["py-0", "gap-0", "px-4"],
                  base: ["px-0","data-[open=true]:bg-[#DBDADE]"],
                  content:"py-0"
                }}
                indicator={({ isOpen }) =>
                  isOpen ? (
                    <IoCaretForwardCircleOutline color="black" size={28} />
                  ) : (
                    <IoCaretDownCircleOutline color="#8B909A" size={28} />
                  )
                }
                key={index}
                suppressHydrationWarning={true}
                title={
                  <div className="flex justify-between items-center py-1">
                    <div className=" flex-1 flex-grow  text-sm font-medium py-2 px-4">
                      <span className="mx-auto font-semibold">
                        {order.orderId}
                      </span>
                    </div>
                    <div className=" flex-1 flex-grow  text-sm font-medium py-2 pr-4 pl-2">
                      <span>{order.timestamp}</span>
                    </div>
                    <div className=" flex-1 flex-grow  text-sm font-medium py-2 px-4">
                      <span className="mx-auto">{order.customerName}</span>
                    </div>
                    <div className=" flex-1 flex-grow  text-sm font-medium py-2 px-4">
                      <span className="mx-auto">₦{order.totalAmount}</span>
                    </div>
                    <div className=" flex-1 flex-grow  text-sm font-medium py-2 pl-4">
                      <span className="mx-auto">₦{order.profit}</span>
                    </div>
                    <div className=" flex-1 flex-grow  text-sm font-medium py-2 px-4">
                      <Select
                        suppressHydrationWarning={true}
                        radius="none"
                        size="sm"
                        classNames={{
                          trigger: [statusColor(order.status), ,],
                          value: [
                            `group-data-[has-value=true]:${statusColor(
                              order.status
                            )}`,
                            statusColor(order.status),
                            "bg-[color:unset]",
                          ],
                        }}
                        onSelectionChange={() => statusColor(order.status)}
                        defaultSelectedKeys={[order.status]}
                      >
                        {tabs.map((item, index) => (
                          <SelectItem key={item} value={item} className="">
                            {item}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className=" flex-1 flex-grow  text-sm font-medium py-2 px-4">
                      <span className="hidden">dropdown</span>
                    </div>
                  </div>
                }
              >
                <div className="bg-[#FAFAFA]">
                  <div
                    className="flex justify-between border-b"
                    suppressHydrationWarning={true}
                  >
                    <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                      <span>#</span>
                    </div>
                    <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                      <span>SKU</span>
                    </div>
                    <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                      <span>NAME</span>
                    </div>
                    <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                      <span>PRICE</span>
                    </div>
                    <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                      <span>QTY</span>
                    </div>
                    <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                      <span>DISC.</span>
                    </div>
                    <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                      <span>TOTAL</span>
                    </div>
                    <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                      <p className="flex gap-2">
                        <PiPrinterFill color="#8B909A" size={20} />
                        <span>PRINT</span>
                      </p>
                    </div>
                  </div>
                  {order.products.map((product, index) => (
                    <div key={index}>
                      <div
                        key={index}
                        className="flex justify-between border-b"
                        suppressHydrationWarning={true}
                      >
                        <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
                          <span className="hidden">#</span>
                        </div>
                        <div className=" flex-1 flex-grow text-sm font-medium py-4 px-4">
                          <span>{product.productId}</span>
                        </div>
                        <div className=" flex-1 flex-grow  text-sm  py-4 px-4 font-semibold">
                          <span>{product.productName}</span>
                        </div>
                        <div className=" flex-1 flex-grow  text-sm font-medium py-4 px-4">
                          <span>₦{product.price}</span>
                        </div>
                        <div className=" flex-1 flex-grow  text-sm font-medium py-4 px-4">
                          <span>x{product.quantity}</span>
                        </div>
                        <div className=" flex-1 flex-grow text-[#EA5455] text-sm font-medium py-4 px-4">
                          <span>{product.discount}%</span>
                        </div>
                        <div className=" flex-1 flex-grow  text-sm font-medium py-4 px-4">
                          <span>₦{product.total}</span>
                        </div>
                        <div className=" flex-1 flex-grow  text-sm font-medium py-4 px-4">
                          <p className="flex gap-2">
                            <HiOutlineDotsHorizontal color="black" size={20} />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div
                    className="flex justify-between "
                    suppressHydrationWarning={true}
                  >
                    <div className=" flex-1 flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
                      <span className="hidden">#</span>
                    </div>
                    <div className=" flex-1 flex-grow text-sm font-medium py-4 px-4"></div>
                    <div className=" flex-1 flex-grow  text-sm  py-4 px-4 font-semibold"></div>
                    <div className=" flex-1 flex-grow  text-sm font-medium py-4 px-4"></div>
                    <div className=" flex-1 flex-grow  text-sm font-medium py-4 px-4">
                      <p className="py-4">Subtotal</p>
                      <p className="py-4">Shipping</p>
                      <p className="py-4">Discount</p>
                      <p className="py-4">Total</p>
                    </div>
                    <div className=" flex-1 flex-grow text-[#EA5455] text-sm font-medium py-4 px-4"></div>
                    <div className=" flex-1 flex-grow  text-sm font-medium py-4 px-4">
                      <p className="py-4">₦11,000</p>
                      <p className="py-4">₦900</p>
                      <p className="text-[#EA5455] py-4">₦0</p>
                      <p className="py-4">₦{order.totalAmount}</p>
                    </div>
                    <div className=" flex-1 flex-grow  text-sm font-medium py-4 px-4">
                    </div>
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        <div className="flex justify-between items-center py-2 px-3">
          <div className="flex justify-normal gap-2 items-center text-[#8B909A] text-sm font-medium">
            <p>Showing</p>
            <Select
              size="sm"
              className=" w-[70px]"
              selectedKeys={pageNo}
              onSelectionChange={setPageNo}
              defaultSelectedKeys={["10"]}
            >
              <SelectItem key={10} value={10}>
                10
              </SelectItem>
              <SelectItem key={20} value={20}>
                20
              </SelectItem>
              <SelectItem key={30} value={30}>
                30
              </SelectItem>
              <SelectItem key={40} value={40}>
                40
              </SelectItem>
              <SelectItem key={50} value={50}>
                50
              </SelectItem>
            </Select>
            <p>of 50</p>
          </div>
          <Pagination showControls color="success" total={5} initialPage={1} />
        </div>
      </div>
    </div>
  );
}
