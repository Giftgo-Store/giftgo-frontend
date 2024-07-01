"use client";
import {
  Accordion,
  AccordionItem,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useState, useMemo, useCallback, Suspense, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { PiPrinterFill } from "react-icons/pi";
import {
  IoCaretDownCircleOutline,
  IoCaretForwardCircleOutline,
} from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { json } from "stream/consumers";

export interface order {
  orderId: string;
  created: string;
  customer: string;
  total: number;
  status: string;
  profit: number;
  items: [
    {
      sku: string;
      name: string;
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
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<order[]>([]);
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
    "pending",
    "confirmed",
    "processing",
    "picked",
    "shipped",
    "delivered",
    "cancelled",
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

  // fetchdata
  const getOrders = async () => {
    try {
      const res = await fetch(`${API}/orders/transaction/details`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
      });

      const resData = await res.json();
      setOrders(resData.orders);
      setIsLoading(false);
      // console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };
  //update orderStatus
  const updateOrderStatus = async (orderId: string) => {
    const data = {
      status: selected,
    };
    try {
      const res = await fetch(`${API}/orders/${orderId}/status`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
        method: "PATCH",
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      // setOrders(resData.orders);
      // setIsLoading(false);
      console.log(resData);
      setOrders((prevOrders) =>
        Array.isArray(prevOrders)
          ? prevOrders.map((order) =>
              order.orderId === orderId ? { ...order, status: selected } : order
            )
          : []
      );
      // console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  });
  // Update status filter value when search params change
  useEffect(() => {
    setStatusFilterValue(`${pathname}?${searchParams}`);
  }, [searchParams]);

  // Filter and sort items based on sort option
  const filteredItems = useMemo(() => {
    let sortedList = orders.slice(); // Create a copy of the original list

    // Sort the list based on the sortOption

    //filter recent orders
    if (sortOption === "Recent") {
      sortedList.sort((a, b) => {
        const earlyOrder = new Date(a.created) as unknown as number;
        const laterOrder = new Date(b.created) as unknown as number;
        return laterOrder - earlyOrder;
      });
    }
    //filter by older orders
    else if (sortOption === "Older") {
      sortedList.sort((a, b) => {
        const earlyOrder = new Date(a.created) as unknown as number;
        const laterOrder = new Date(b.created) as unknown as number;
        return earlyOrder - laterOrder;
      });
    }
    //filter by most products
    else if (sortOption === "Most products") {
      sortedList.sort((a, b) => {
        const largeOrder = a.items.length;
        const smallOrder = b.items.length;
        return smallOrder - largeOrder;
      });
    }
    //filter by less products
    else if (sortOption === "Less products") {
      sortedList.sort((a, b) => {
        const largeOrder = a.items.length;
        const smallOrder = b.items.length;
        return largeOrder - smallOrder;
      });
    }

    // Filter the sorted list based on other filters
    let filteredList = sortedList.filter((item) => {
      // Apply status and orderId filters
      if (statusFilterValue.includes("All")) {
        if (filterValue.length > 0) {
          return item.orderId
            .toLocaleLowerCase()
            .includes(filterValue.toLocaleLowerCase());
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
  }, [orders, statusFilterValue, filterValue, sortOption]);

  //pagination for orders

  const Items = useMemo(() => {
    const start = (page - 1) * Number(rowsPerPage);
    const end = start + Number(rowsPerPage);

    return filteredItems.slice(start, end);
  }, [
    page,
    filteredItems,
    orders,
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
    (order: { orderId: string; status: string }) => {
      return (
        <Select
          aria-label={order.status}
          suppressHydrationWarning={true}
          radius="none"
          size="sm"
          classNames={{
            trigger: [statusColor(order.status)],
            value: [
              `group-data-[has-value=true]:${statusColor(order.status)}`,
              statusColor(order.status),
              "bg-[color:unset]",
            ],
          }}
          // selectedKeys={[selected]}
          defaultSelectedKeys={[order.status]}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelected(e.target.value);
            updateOrderStatus(order.orderId);
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
    [statusFilterValue, filteredItems, selected]
  );
  // const getOrders = async () => {
  //   try {
  //     const res = await fetch(`${API}/orders/order/all`, {
  //       headers: {
  //         AUTHORIZATION: "Bearer " + token,
  //       },
  //     });

  //     const resData = await res.json();

  //     console.log(resData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      <div className="w-full bg-white rounded-t-2xl overflow-x-auto overflow-y-hidden min-h-[40vh]">
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
                        <span>{new Date(order.created).toDateString()}</span>
                      </div>
                      <div className=" flex-1 min-w-[150px] w-full flex-grow  text-sm font-medium py-2 px-0 lg:px-4">
                        <span className="mx-auto">{order.customer}</span>
                      </div>
                      <div className=" flex-1 min-w-[150px] w-full flex-grow  text-sm font-medium py-2 px-0 lg:px-4 ">
                        <span className="mx-auto">
                          ₦{order.total && order.total.toLocaleString()}
                        </span>
                      </div>
                      <div className=" flex-1 min-w-[150px] w-full flex-grow  text-sm font-medium py-2 px-0 lg:px-4 ">
                        <span className="mx-auto">
                          ₦{order.profit && order.profit.toLocaleString()}
                        </span>
                      </div>
                      <div className=" flex-1 min-w-[150px] w-full flex-grow  text-sm font-medium py-2 px-0 lg:px-4 ">
                        {MySelect(order)}
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
                    {order.items.map((product, index) => (
                      <div key={index}>
                        <div
                          key={index}
                          className="flex justify-between border-b pl-2"
                          suppressHydrationWarning={true}
                        >
                          <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
                            <span className="hidden">#</span>
                          </div>
                          <div className=" flex-1  w-full  flex-grow text-sm font-medium py-4 px-4">
                            <span>{product.sku}</span>
                          </div>
                          <div className=" flex-1  w-full  flex-grow  text-sm  py-4 px-4 font-semibold">
                            <span>{product.name}</span>
                          </div>
                          <div className=" flex-1  w-full  flex-grow  text-sm font-medium py-4 px-4">
                            <span>
                              ₦{product.price && product.price.toLocaleString()}
                            </span>
                          </div>
                          <div className=" flex-1  w-full  flex-grow  text-sm font-medium py-4 px-4">
                            <span>x{product.quantity}</span>
                          </div>
                          <div className=" flex-1  w-full  flex-grow text-[#EA5455] text-sm font-medium py-4 px-4">
                            <span>
                              {product.discount &&
                                product.discount.toLocaleString()}
                            </span>
                          </div>
                          <div className=" flex-1  w-full  flex-grow  text-sm font-medium py-4 px-4">
                            <span>
                              ₦{product.total && product.total.toLocaleString()}
                            </span>
                          </div>
                          <div className=" flex-1 max-w-[100px]  w-full  flex-grow  text-sm font-medium py-4 px-4">
                            <p className="flex gap-2">
                              <HiOutlineDotsHorizontal
                                color="black"
                                size={20}
                                className="cursor-pointer"
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
                        <p className="py-4">Shipping</p>
                        <p className="py-4">Discount</p>
                        <p className="py-4">Total</p>
                      </div>
                      <div className=" flex-1  w-full flex-grow text-[#EA5455] text-sm font-medium py-4 px-4"></div>
                      <div className=" flex-1  w-full flex-grow  text-sm font-medium py-4 px-4">
                        <p className="py-4">₦1000</p>
                        <p className="text-[#EA5455] py-4">₦0</p>
                        <p className="py-4">₦{order.total}</p>
                      </div>
                      <div className=" flex-1 max-w-[100px] w-full flex-grow  text-sm font-medium py-4 px-4"></div>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            ))}
          {Items.length < 1 && !isLoading && (
            <div className="min-h-[40vh] flex justify-center items-center">
              <p className="text-lg font-semibold">No orders found !</p>
            </div>
          )}
          {Items.length < 1 && isLoading && (
            <div className="min-h-[40vh] flex justify-center items-center">
              <Spinner color="default"></Spinner>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center py-2 pb-3 px-3 bg-white  rounded-b-2xl">
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
          initialPage={1}
          total={pages}
          page={page}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
}
