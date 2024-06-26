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
import { useState, useMemo, useCallback, Suspense, useEffect } from "react";
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
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export interface order {
  orderId: string;
  timestamp: string;
  customerName: string;
  totalAmount: number;
  status: string;
  profit: number;
  products: [
    {
      productId: string;
      productName: string;
      price: number;
      originalPrice: number;
      sellingPrice: number;
      quantity: number;
      discount: number;
      total: number;
    }
  ];
}

export default function OrderManagement() {
  const [sortOption, setSortOption] = useState<string>("Recent");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilterValue, setStatusFilterValue] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState<any | string[]>("10");
  const [selected, setSelected] = useState<any>();

  const filters = ["Recent", "Older", "Most products", "Less products"];
  const rowsPerPageOptions = ["10", "20", "30", "40", "50"];
  const tabs = [
    "All",
    "Pending",
    "Confirmed",
    "Processing",
    "Picked",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const status = [
    "Pending",
    "Confirmed",
    "Processing",
    "Picked",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const sesssion = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/admin/auth/login");
    },
  });

  const session: any = useSession();
  const token = session?.data?.token;
  const API = process.env.NEXT_PUBLIC_API_ROUTE;

  // Update status filter value when search params change
  useEffect(() => {
    setStatusFilterValue(`${pathname}?${searchParams}`);
  }, [searchParams]);

  // Filter and sort items based on sort option
  const filteredItems = useMemo(() => {
    let sortedList = OrderList.slice(); // Create a copy of the original list

    // Sort the list based on the sortOption

    //filter recent orders
    if (sortOption === "Recent") {
      sortedList.sort((a, b) => {
        const earlyOrder = new Date(a.timestamp) as unknown as number;
        const laterOrder = new Date(b.timestamp) as unknown as number;
        return laterOrder - earlyOrder;
      });
    }
    //filter by older orders
    else if (sortOption === "Older") {
      sortedList.sort((a, b) => {
        const earlyOrder = new Date(a.timestamp) as unknown as number;
        const laterOrder = new Date(b.timestamp) as unknown as number;
        return earlyOrder - laterOrder;
      });
    }
    //filter by most products
    else if (sortOption === "Most products") {
      sortedList.sort((a, b) => {
        const largeOrder = a.products.length;
        const smallOrder = b.products.length;
        return smallOrder - largeOrder;
      });
    }
    //filter by less products
    else if (sortOption === "Less products") {
      sortedList.sort((a, b) => {
        const largeOrder = a.products.length;
        const smallOrder = b.products.length;
        return largeOrder - smallOrder;
      });
    }

    // Filter the sorted list based on other filters
    let filteredList = sortedList.filter((item) => {
      // Apply status and orderId filters
      if (statusFilterValue.includes("All")) {
        if (filterValue.length > 0) {
          return item.orderId.includes(filterValue);
        }
        return true;
      } else {
        if (typeof item.status === "string") {
          if (filterValue.length > 0) {
            return (
              item.orderId
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
        return "text-[#FFC600] bg-[#FFC60029]";
      case "Confirmed":
        return "text-[#28C76F] bg-[#28C76F29]";
      case "Processing":
        return "text-[#0FB7FF] bg-[#0FB7FF29]";
      case "Shipped":
        return "text-[#BD00FF] bg-[#BD00FF29]";
      case "Cancelled":
        return "text-[#EA5455] bg-[#ffbeaa]";
      case "Picked":
        return "text-[#1EB564] bg-[#0F60FF29]";
      case "Delivered":
        return "text-[#33189D] bg-[#33189D29]";
      default:
        return "text-[#FFC600] bg-[#FFC60029]";
    }
  }
  //tab fallback
  function TabFallback() {
    return (
      <Tabs
        variant="underlined"
        color="success"
        className="border-b py-0 w-full"
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
    );
  }

  //tabs for orders
  const MyTabs = useCallback(() => {
    return (
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
          setStatusFilterValue(tab);
          setPage(1);
        }}
      >
        {tabs.map((tab) => (
          <Tab
            className="text-[#8B909A]"
            title={tab}
            key={searchParams ? `${pathname}?tab=${tab}` : pathname}
          ></Tab>
        ))}
      </Tabs>
    );
  }, [searchParams]);

  //select for orders
  const MySelect = useCallback(
    (orderStatus: string) => {
      return (
        <Select
          aria-label={orderStatus}
          suppressHydrationWarning={true}
          radius="none"
          size="sm"
          classNames={{
            trigger: [statusColor(orderStatus)],
            value: [
              `group-data-[has-value=true]:${statusColor(orderStatus)}`,
              statusColor(orderStatus),
              "bg-[color:unset]",
            ],
          }}
          selectedKeys={[orderStatus]}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelected(e.target.value);
          }}
        >
          {status.map((item) => (
            <SelectItem key={item} value={item} className="">
              {item}
            </SelectItem>
          ))}
        </Select>
      );
    },
    [statusFilterValue, filteredItems]
  );
  const getOrders = async () => {
    try {
      const res = await fetch(`${API}/orders/order/all`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
      });

      const resData = await res.json();

      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pb-12" suppressHydrationWarning={true}>
      <div className="w-full overflow-x-auto py-2">
        <Suspense fallback={<TabFallback />}>{MyTabs()}</Suspense>
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
          value={filterValue}
          onChange={(e) => {
            setFilterValue(e.target.value);
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
          placeholder="Sort by"
          selectedKeys={[sortOption]}
          onChange={(e) => {
            setSortOption(e.target.value);
          }}
        >
          {filters.map((filter) => (
            <SelectItem key={filter}>{filter}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="w-full bg-white rounded-2xl overflow-x-auto overflow-y-hidden">
        <div className="flex justify-between py-2 border-b w-full min-w-max">
          <div className=" flex-1 min-w-[150px] w-full flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span>ORDER ID</span>
          </div>
          <div className=" flex-1 min-w-[150px] w-full flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span>Created</span>
          </div>
          <div className=" flex-1 min-w-[150px] w-full flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span>CUSTOMER</span>
          </div>
          <div className=" flex-1 min-w-[150px] w-full flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span>TOTAL</span>
          </div>
          <div className=" flex-1 min-w-[150px] w-full flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span>PROFIT</span>
          </div>
          <div className=" flex-1 min-w-[150px] w-full flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span>STATUS</span>
          </div>
          <div className=" flex-1 min-w-[150px] w-full flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
            <span className="hidden">dropdown</span>
          </div>
          <div className="text-[#8B909A] text-sm font-medium w-[28px]">
            <div className="opacity-0">
              {" "}
              <IoCaretDownCircleOutline color="#8B909A" size={24} />
            </div>
          </div>
        </div>
        <div className="w-fit lg:w-full">
          {Items &&
            Items.map((order, index) => (
              <Accordion
                suppressHydrationWarning
                className="border-b py-0 px-0"
                showDivider
                key={order.orderId + index}
              >
                <AccordionItem
                  classNames={{
                    trigger: ["py-0", "gap-0", "px-4"],
                    base: ["px-0", "data-[open=true]:bg-[#DBDADE]"],
                    content: "py-0",
                  }}
                  indicator={({ isOpen }) =>
                    isOpen ? (
                      <IoCaretForwardCircleOutline color="black" size={28} />
                    ) : (
                      <IoCaretDownCircleOutline color="#8B909A" size={28} />
                    )
                  }
                  className="w-full"
                  suppressHydrationWarning
                  title={
                    <div className="flex justify-between items-center py-1">
                      <div className=" flex-1 min-w-[150px] w-full flex-grow  text-sm font-medium py-2 px-4">
                        <span className="mx-auto font-semibold">
                          {order.orderId}
                        </span>
                      </div>
                      <div className=" flex-1 min-w-[150px] w-full flex-grow  text-sm font-medium py-2 pr-4 pl-0">
                        <span>{order.timestamp}</span>
                      </div>
                      <div className=" flex-1 min-w-[150px] w-full flex-grow  text-sm font-medium py-2 px-0 lg:px-4">
                        <span className="mx-auto">{order.customerName}</span>
                      </div>
                      <div className=" flex-1 min-w-[150px] w-full flex-grow  text-sm font-medium py-2 px-0 lg:px-4 ">
                        <span className="mx-auto">₦{order.totalAmount}</span>
                      </div>
                      <div className=" flex-1 min-w-[150px] w-full flex-grow  text-sm font-medium py-2 px-0 lg:px-4 ">
                        <span className="mx-auto">₦{order.profit}</span>
                      </div>
                      <div className=" flex-1 min-w-[150px] w-full flex-grow  text-sm font-medium py-2 px-0 lg:px-4 ">
                        {MySelect(order.status)}
                      </div>
                      <div className=" flex-1 min-w-[150px] w-full flex-grow  text-sm font-medium py-2 px-4">
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
                      <div className="flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                        <span>#</span>
                      </div>
                      <div className=" flex-1   w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                        <span>SKU</span>
                      </div>
                      <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                        <span>NAME</span>
                      </div>
                      <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                        <span>PRICE</span>
                      </div>
                      <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                        <span>QTY</span>
                      </div>
                      <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                        <span>DISC.</span>
                      </div>
                      <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
                        <span>TOTAL</span>
                      </div>
                      <div className=" flex-1 max-w-[100px] w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
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
                          <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
                            <span className="hidden">#</span>
                          </div>
                          <div className=" flex-1  w-full  flex-grow text-sm font-medium py-4 px-4">
                            <span>{product.productId}</span>
                          </div>
                          <div className=" flex-1  w-full  flex-grow  text-sm  py-4 px-4 font-semibold">
                            <span>{product.productName}</span>
                          </div>
                          <div className=" flex-1  w-full  flex-grow  text-sm font-medium py-4 px-4">
                            <span>₦{product.price}</span>
                          </div>
                          <div className=" flex-1  w-full  flex-grow  text-sm font-medium py-4 px-4">
                            <span>x{product.quantity}</span>
                          </div>
                          <div className=" flex-1  w-full  flex-grow text-[#EA5455] text-sm font-medium py-4 px-4">
                            <span>{product.discount}%</span>
                          </div>
                          <div className=" flex-1  w-full  flex-grow  text-sm font-medium py-4 px-4">
                            <span>₦{product.total}</span>
                          </div>
                          <div className=" flex-1 max-w-[100px]  w-full  flex-grow  text-sm font-medium py-4 px-4">
                            <p className="flex gap-2">
                              <HiOutlineDotsHorizontal
                                color="black"
                                size={20}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className="flex justify-between "
                      suppressHydrationWarning={true}
                    >
                      <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
                        <span className="hidden">#</span>
                      </div>
                      <div className=" flex-1  w-full flex-grow text-sm font-medium py-4 px-4"></div>
                      <div className=" flex-1  w-full flex-grow  text-sm  py-4 px-4 font-semibold"></div>
                      <div className=" flex-1  w-full flex-grow  text-sm font-medium py-4 px-4"></div>
                      <div className=" flex-1  w-full flex-grow  text-sm font-medium py-4 px-4">
                        <p className="py-4">Subtotal</p>
                        <p className="py-4">Shipping</p>
                        <p className="py-4">Discount</p>
                        <p className="py-4">Total</p>
                      </div>
                      <div className=" flex-1  w-full flex-grow text-[#EA5455] text-sm font-medium py-4 px-4"></div>
                      <div className=" flex-1  w-full flex-grow  text-sm font-medium py-4 px-4">
                        <p className="py-4">₦11,000</p>
                        <p className="py-4">₦900</p>
                        <p className="text-[#EA5455] py-4">₦0</p>
                        <p className="py-4">₦{order.totalAmount}</p>
                      </div>
                      <div className=" flex-1 max-w-[100px] w-full flex-grow  text-sm font-medium py-4 px-4"></div>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            ))}
          {Items && Items.length < 0 && (
            <div className="min-w-[40vh] flex justify-center items-center">
              <p className="text-lg font-semibold">No orders found !</p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center py-2 px-3">
          <div className="flex justify-normal gap-2 items-center text-[#8B909A] text-sm font-medium">
            <p>Showing</p>
            <Select
              size="sm"
              className=" w-[100px]"
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
          <Pagination
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
    </div>
  );
}
