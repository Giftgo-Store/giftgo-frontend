"use client";
import {
  Button,
  Image,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
  User,
  Skeleton,
  Spinner,
  Link,
} from "@nextui-org/react";
import { redirect } from "next/navigation";
import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";
import { DashboardCard } from "@/app/components/cards/dashboardCard";
import { DashboardCardHeader } from "@/app/components/headers/dashboardCardHeader";
import { ApexOptions } from "apexcharts";
import { useCallback, useEffect, useMemo, useState } from "react";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { HiDotsVertical } from "react-icons/hi";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { useSession } from "next-auth/react";
import { TrendingProductLoader } from "@/app/components/loaders/trendingProductLoader";
import { SalesByAreaLoader } from "@/app/components/loaders/salesByAreaLoader";
import BASE_URL from "@/app/config/baseurl";

interface TopSellingCategory {
  totalSales: number;
  categoryName: string;
}

interface BestSellingProduct {
  productId: string;
  productName: string;
  sku: string;
  revenue: string;
  inStock: boolean;
  image: string;
  totalOrders: number;
  price: number;
}

interface weeklystats {
  week: string;
  totalOrders: number;
  totalRevenue: number | null;
}
interface dailyOrders {
  date: string;
  totalOrders: number | null;
}
interface revenueStats {
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  totalSales: number;
  weeklyStats: weeklystats[];
  dailyOrders: dailyOrders[];
  topSellingCategories: TopSellingCategory[];
  bestSellingProducts: BestSellingProduct[];
}
interface recentOrders {
  orderId: string;
  created: string;
  customer: string;
  total: number;
  profit: number;
  status: string;
  items: [
    {
      sku: string;
      name: string;
      quantity: number;
      discount: number;
      total: number;
    }
  ];
}

export default function Dashboard() {
  const [revenueStats, setRevenueStats] = useState<revenueStats | null>(null);
  const [recentOrderNo, setRecentOrderNo] = useState(null);
  const [productStats, setProductStats] = useState<revenueStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<recentOrders[]>([]);
  const [reportData, setReportData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const topSellingCategories = revenueStats?.topSellingCategories;
  const bestSellingProducts =
    productStats?.bestSellingProducts.slice(0.6).sort((a, b) => {
      const mostSold = a.totalOrders;
      const leastSold = b.totalOrders;
      return leastSold - mostSold;
    }) || [];
  const sesssion = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/admin/auth/login");
    },
  });

  const session: any = useSession();
  const token = session?.data?.token;
  const API = BASE_URL + "/api/v1";

  const weeklyorders = revenueStats?.weeklyStats?.map((totalOrders) => {
    return totalOrders.totalOrders;
  });
  const weeks = revenueStats?.weeklyStats?.map((totalOrders) => {
    return totalOrders.week;
  });
  const days = revenueStats?.dailyOrders?.map((totalOrders) => {
    return totalOrders.date;
  });
  const dailyOrders = revenueStats?.dailyOrders?.map((totalOrders) => {
    return totalOrders.totalOrders;
  });
  const shuffle = (array: BestSellingProduct[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, 6);
  };
  const sorted_recent_orders = recentOrders
    ?.slice(0, 6)
    .sort((a: any, b: any) => {
      const latestorder = a.created;
      const olderorder = b.created;
      return olderorder - latestorder;
    });
  const trending_products = shuffle([...bestSellingProducts]);
  const salesByLocation = reportData[5] || [];
  const totalOrders = salesByLocation.reduce(
    (sum: number, loc: any) => sum + loc.totalOrders,
    0
  );
  const averageOrders = totalOrders / (salesByLocation.length - 1);

  const series: any = [
    {
      name: "Daily order",
      data: dailyOrders,
    },
  ];
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5],
      curve: "straight",
      dashArray: [0],
    },
    colors: ["#1EB564"],
    xaxis: {
      type: "datetime",
      categories: days,
    },
    tooltip: {
      y: {
        formatter: function (
          value,
          { series, seriesName, seriesIndex, dataPointIndex, w }
        ) {
          return formatNumber(series[seriesIndex][dataPointIndex]);
        },
      },
    },
    grid: {
      borderColor: "transparent",
    },
  };
  const areaseries: any = [
    {
      name: "Total Orders",
      data: weeklyorders,
    },
  ];
  const areaOption: ApexOptions = {
    chart: {
      id: "area-datetime",
      type: "area",
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    colors: ["#1EB564"],
    markers: {
      size: 0,
    },
    xaxis: {
      // type: "datetime",
      categories: weeks,
    },
    grid: {
      borderColor: "transparent",
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  const rows = [
    {
      id: "#5069",
      issued_date: "31 March 2024",
      total: "12000",
      action: "Active",
    },
    {
      id: "#5089",
      issued_date: "31 March 2024",
      total: "12000",
      action: "Active",
    },
    {
      id: "#5089",
      issued_date: "31 March 2024",
      total: "12000",
      action: "Active",
    },
    {
      id: "#5089",
      issued_date: "31 March 2024",
      total: "12000",
      action: "Active",
    },
    {
      id: "#5089",
      issued_date: "31 March 2024",
      total: "12000",
      action: "Active",
    },
    {
      id: "#5089",
      issued_date: "31 March 2024",
      total: "12000",
      action: "Active",
    },
  ];

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "issued date",
      label: "ISSUED DATE",
    },
    {
      key: "total",
      label: "TOTAL",
    },
    {
      key: "action",
      label: "ACTION",
    },
  ];

  const bestSellingcolumns = [
    {
      key: "product",
      label: "PRODUCT",
    },
    {
      key: "total orders",
      label: "TOTAL ORDERS",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "price",
      label: "PRICE",
    },
  ];

  const recentOrdersColumns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "customer",
      label: "CUSTOMER",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "total",
      label: "TOTAL",
    },
  ];
  const tableTopContent = useMemo(() => {
    return (
      <div className="flex justify-between py-3">
        <div className="flex flex-col">
          <p className="font-semibold text-lg text-[#23272E]">
            Last Transactions
          </p>
        </div>
        <Button
          isIconOnly
          className="bg-transparent text-[#1EB564] w-[100px]"
          onClick={option}
        >
          View Details
        </Button>
      </div>
    );
  }, []);
  const bestSellingTableTopContent = useMemo(() => {
    return (
      <div className="flex justify-between py-3 w-full">
        <div className="flex flex-col">
          <p className="font-semibold text-lg text-[#23272E]">
            Best Selling Product
          </p>
        </div>
      </div>
    );
  }, []);
  const RecentTableTopContent = useMemo(() => {
    return (
      <div className="flex justify-between py-3 w-full">
        <div className="flex flex-col">
          <p className="font-semibold text-lg text-[#23272E]">Recent Orders</p>
        </div>
        <Button
          className="bg-transparent text-[#1EB564]"
          as={Link}
          href="/admin/order-management"
        >
          View Orders
        </Button>
      </div>
    );
  }, []);
  function statusColor(orderStatus: string) {
    switch (orderStatus) {
      case "pending":
        return "text-[#FFC600] ";
      case "confirmed":
        return "text-[#28C76F] ";
      case "processing":
        return "text-[#0FB7FF] ";
      case "shipped":
        return "text-[#BD00FF] ";
      case "cancelled":
        return "text-[#EA5455] ";
      case "picked":
        return "text-[#1EB564] ";
      case "delivered":
        return "text-[#33189D] ";
      default:
        return "text-[#FFC600] ";
    }
  }
  const renderCell = useCallback((item: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <p className="text-[#1EB564] font-normal">{item.orderId}</p>;
      case "issued date":
        return <p className="font-normal">{item.issued_date}</p>;
      case "total":
        return <p className="font-normal">₦{item.total}</p>;
      case "action":
        return (
          <Button className="bg-transparent text-[#1EB564] font-normal w-[100px] pl-0">
            View Detail
          </Button>
        );
      case "product":
        return (
          <p className="text-[#23272E] font-bold w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
            {item.productName}
          </p>
        );
      case "total orders":
        return <p className="font-normal">{item.totalOrders}</p>;
      case "status":
        if (item.inStock === true) {
          return (
            <Chip
              variant="dot"
              classNames={{
                base: "border-none",
                dot: "bg-[#1EB564]",
              }}
              className="text-[#1EB564]"
            >
              stock
            </Chip>
          );
        } else if (item.inStock === false) {
          return (
            <Chip
              color="danger"
              variant="dot"
              classNames={{
                base: "border-none",
              }}
              className="text-danger"
            >
              out
            </Chip>
          );
        } else if (item.status) {
          return <p className={statusColor(item.status)}>{item.status}</p>;
        }

      case "price":
        return <p className="font-normal">₦{item.price.toLocaleString()}</p>;
      case "revenue":
        return <p className="font-normal">₦{item.revenue}</p>;
      case "customer":
        return <p>{item.customer}</p>;

      default:
        return item.productId;
    }
  }, []);

  function option() {
    alert("yes");
  }
  function formatNumber(x: number) {
    if (x >= 1_000_000) {
      return (x / 1_000_000).toFixed(1) + "M";
    } else if (x >= 1_000) {
      return (x / 1_000).toFixed(1) + "K";
    } else if (x === 0) {
      return "0";
    } else {
      return x.toLocaleString().toString();
    }
  }

  const getRevenueStats = async () => {
    try {
      const res = await fetch(`${API}/products/general/stats`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
      });

      const resData = await res.json();
      setRevenueStats(resData);
      // console.log(resData);
    } catch (error) {
      // console.log(error);
    }
  };
  const getRecentOrders = async () => {
    try {
      const res = await fetch(`${API}/orders/transaction/details`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
      });

      const resData = await res.json();
      setRecentOrders(resData.orders);
    } catch (error) {
      // console.log(error);
    }
  };
  const getPreviousOrders = async () => {
    try {
      const res = await fetch(`${API}/orders/week/last-week`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
      });

      const resData = await res.json();
      setRecentOrderNo(resData.data.totalOrders);
      // console.log(resData);
    } catch (error) {
      // console.log(error);
    }
  };
  const getProductStats = async () => {
    try {
      const res = await fetch(`${API}/statistics/product-stats`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
      });

      const resData = await res.json();
      setProductStats(resData);
      setLoading(false);
      // console.log(resData);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchReports = async (urls: string[]) => {
    try {
      const responses = await Promise.all(
        urls.map((url: string) =>
          fetch(`${API}${url}`, {
            headers: {
              AUTHORIZATION: "Bearer " + token,
            },
          })
        )
      );

      const data = await Promise.all(
        responses.map((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
          }
          return response.json();
        })
      );
      setReportData(data);
      return data;
    } catch (error) {
      // console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getRevenueStats();
    getPreviousOrders();
    getProductStats();
    getRecentOrders();
    const urls = [
      "/statistics/total-customers",
      "/statistics/total-products",
      "/statistics/in-stock-products",
      "/statistics/out-of-stock-products",
      "/statistics/users-in-last-30-minutes",
      "/statistics/sales-by-area",
    ];

    fetchReports(urls);
  }, []);
  return (
    <div>
      {/* total sales and cost section */}
      <div className="flex lg:flex-row flex-col justify-between items-center gap-4 pb-4">
        <div className="p-5 w-full bg-white rounded-2xl ">
          <div className="flex md:flex-row flex-col justify-between gap-5">
            <div className="flex flex-col justify-normal gap-5">
              <div className="flex flex-col pb-3">
                <p className="font-semibold text-lg">Total Sales & Costs</p>
                <span className="text-[#8B909A] text-base">Last 7 days</span>
              </div>
              <div className="flex flex-col gap-5 pt-3">
                <div className="flex gap-6 items-end justify-normal">
                  {revenueStats ? (
                    <span className="font-bold text-3xl text-[2rem]">
                      ₦{formatNumber(revenueStats?.totalRevenue)}
                    </span>
                  ) : (
                    <Skeleton className="w-[60px] h-[30px]"></Skeleton>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-4">
                <div className="flex gap-1 justify-normal items-center font-medium">
                  <span className="w-2 h-2 rounded-[50%] bg-black"></span>
                  <span>Sales</span>
                </div>
                <div className="flex gap-1 justify-normal items-center font-medium">
                  <span className="w-2 h-2 rounded-[50%] bg-[#1EB564]"></span>
                  <span>Cost</span>
                </div>
              </div>
              <div>
                <Image
                  src={"/lines.png"}
                  alt=""
                  className="lg:w-[400px] w-full h-full object-contain"
                  removeWrapper
                ></Image>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:max-w-[40%] w-full">
          <DashboardCard
            customstyle="min-w-[270px] lg:max-w-[unset]"
            title={"Total Orders"}
            amount={totalOrders && formatNumber(totalOrders)}
            profit={true}
            percentage={6}
          ></DashboardCard>
        </div>
      </div>

      {/* report section */}
      <div className="flex lg:flex-row flex-col gap-4 pb-4">
        {/* report chart */}
        <div className="p-5  w-full bg-white rounded-2xl flex flex-col gap-6">
          <DashboardCardHeader
            title={"Reports"}
            supportText="Last 7 Days"
            option={option}
          />
          <div className="flex justify-between gap-3">
            <div className="flex flex-col gap-3">
              {revenueStats ? (
                <p className="font-bold text-[#23272E] text-2xl">
                  {formatNumber(revenueStats?.totalCustomers)}
                </p>
              ) : (
                <Skeleton className="w-[60px] h-[30px]"></Skeleton>
              )}
              <p className="font-medium text-sm text-[#8B909A]">Customers</p>
            </div>
            <div className="flex flex-col gap-3">
              {revenueStats ? (
                <p className="font-bold text-[#23272E] text-2xl">
                  {reportData[1] && formatNumber(reportData[1])}
                </p>
              ) : (
                <Skeleton className="w-[60px] h-[30px]"></Skeleton>
              )}
              <p className="font-medium text-sm text-[#8B909A]">
                Total Products
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {revenueStats ? (
                <p className="font-bold text-[#23272E] text-2xl">
                  {reportData[2] && formatNumber(reportData[2])}
                </p>
              ) : (
                <Skeleton className="w-[60px] h-[30px]"></Skeleton>
              )}
              <p className="font-medium text-sm text-[#8B909A]">
                Stock Products
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {revenueStats ? (
                <p className="font-bold text-[#23272E] text-2xl">
                  {reportData[3] && formatNumber(reportData[3])}
                </p>
              ) : (
                <Skeleton className="w-[60px] h-[30px]"></Skeleton>
              )}
              <p className="font-medium text-sm text-[#8B909A]">Out of stock</p>
            </div>
            <div className="flex flex-col gap-3">
              {revenueStats ? (
                <p className="font-bold text-[#23272E] text-2xl">
                  {formatNumber(revenueStats?.totalRevenue)}
                </p>
              ) : (
                <Skeleton className="w-[60px] h-[30px]"></Skeleton>
              )}
              <p className="font-medium text-sm text-[#8B909A]">Revenue</p>
            </div>
          </div>
          <div>
            <Chart
              options={options}
              series={series}
              type="line"
              width="100%"
              height={"350px"}
            />
          </div>
        </div>
      </div>
      {/* top sellin category section */}
      <div className="flex lg:flex-row flex-col gap-4 pb-4">
        <div className="lg:max-w-[50%] w-full flex flex-col gap-4 p-5 bg-white rounded-2xl">
          <div>
            <DashboardCardHeader
              title="Top Selling Category"
              supportText={`Total of ${revenueStats?.totalCustomers} customers`}
              option={option}
            />
          </div>
          <div className="relative max-h-[350px] w-fit mx-auto">
            <div className="w-[220px] h-[220px] rounded-full flex flex-col gap-2 items-center justify-center bg-[#EB6363] text-white">
              <span className="opacity-[80%]">
                {topSellingCategories ? (
                  <span className="opacity-[80%]">
                    {topSellingCategories[0].categoryName}
                  </span>
                ) : (
                  <Skeleton className="w-[70px] h-[40px]" />
                )}
              </span>
              {topSellingCategories ? (
                <span className="font-bold text-2xl">
                  {topSellingCategories[0].totalSales}
                </span>
              ) : (
                <Skeleton className="w-[100px] h-[30px]" />
              )}
              <span className="opacity-[80%]">Sold</span>
            </div>
            <div className="w-[200px] h-[200px] rounded-full flex flex-col gap-2 items-center justify-center bg-[#FEEFD3] text-black -top-20 relative left-28">
              {topSellingCategories ? (
                <span className="opacity-[80%]">
                  {topSellingCategories[1].categoryName}
                </span>
              ) : (
                <Skeleton className="w-[70px] h-[40px]" />
              )}

              <span className="font-bold text-2xl">
                {topSellingCategories ? (
                  <span className="font-bold text-2xl">
                    {topSellingCategories[1].totalSales}
                  </span>
                ) : (
                  <Skeleton className="w-[100px] h-[30px]" />
                )}
              </span>
              <span className="opacity-[80%]">Sold</span>
            </div>
            <div className="w-[160px] h-[160px] rounded-full flex flex-col gap-2 items-center justify-center bg-[#1EB564] text-white relative z-10 -top-64 -left-8">
              {topSellingCategories ? (
                <span className="opacity-[80%]">
                  {topSellingCategories[2].categoryName}
                </span>
              ) : (
                <Skeleton className="w-[70px] h-[40px]" />
              )}

              <span className="font-bold text-2xl">
                {topSellingCategories ? (
                  <span className="font-bold text-2xl">
                    {topSellingCategories[2].totalSales}
                  </span>
                ) : (
                  <Skeleton className="w-[100px] h-[30px]" />
                )}
              </span>
              <span className="opacity-[80%]">Sold</span>
            </div>
          </div>
        </div>
        {/* user tracker */}
        <div className="lg:max-w-[50%] w-full p-5 bg-white rounded-2xl min-h-[50vh] ">
          <div className="flex flex-col gap-2 py-3">
            <p className="font-semibold text-lg text-[#23272E]">
              Users in last 30 minutes
            </p>
            {revenueStats ? (
              <span className="font-bold text-[2.0rem] leading-[2.0rem]">
                {reportData[4] && formatNumber(reportData[4])}
              </span>
            ) : (
              <Skeleton className="w-[60px] h-[30px]"></Skeleton>
            )}
            <p className="text-[#8B909A] text-base">User sessions</p>
            <div className="w-full">
              <Image
                src="/bargraph.png"
                alt="bargraoph"
                radius="none"
                className="w-full max-w-full"
                removeWrapper
                classNames={{
                  wrapper: "max-w-full",
                }}
              ></Image>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="py-2 font-bold text-lg">Sales by Area</p>
            <div className="flex flex-col gap-3">
              {!loading && salesByLocation ? (
                salesByLocation.map((location: any) => {
                  const percentage = Number(
                    ((location.totalOrders / averageOrders) * 100).toFixed(1)
                  );
                  const isDecrease = Number(percentage) < averageOrders;

                  return (
                    <div
                      className="flex gap-3 justify-between items-center"
                      key={location.locationName}
                    >
                      <div className="flex flex-col gap-1 w-[150px]">
                        <span className="font-medium text-base">
                          {location.totalOrders}
                        </span>
                        <span className="text-sm font-normal text-[#8B909A]">
                          {location.locationName}
                        </span>
                      </div>
                      <Progress
                        aria-label="sales"
                        value={percentage}
                        className="max-w-sm bg-none"
                        classNames={{
                          indicator: "!bg-[#1EB564]",
                        }}
                        size="md"
                      />
                      <div className="flex justify-center items-center gap-2">
                        {isDecrease ? (
                          <SlArrowDown
                            color="#D02626"
                            style={{ strokeWidth: "35" }}
                          />
                        ) : (
                          <SlArrowUp
                            color="#1EB564"
                            style={{ strokeWidth: "35" }}
                          />
                        )}
                        <span
                          className={`text-${
                            isDecrease ? "#D02626" : "#1EB564"
                          }`}
                        >
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col gap-4">
                  <SalesByAreaLoader />
                  <SalesByAreaLoader />
                  <SalesByAreaLoader />
                  <SalesByAreaLoader />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* best selling product section */}
      <div className="flex lg:flex-row flex-col gap-4 pb-4">
        <div className="w-full p-5 bg-white rounded-2xl">
          <Table
            shadow="none"
            aria-label="last transactions"
            topContent={bestSellingTableTopContent}
            classNames={{
              th: [
                "border-divider",
                "text-[#8B909A]",
                "!rounded-none",
                "first:rounded-r-none",
                "last:rounded-l-none",
                "bg-[#F8F9FA]",
                "border-b-[#DBDADE]",
                "border-b-2",
                "mx-auto",
              ],
              thead: ["text-default-500"],
              table: "min-h-[270px]",
            }}
          >
            <TableHeader columns={bestSellingcolumns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={bestSellingProducts || []}
              isLoading={loading}
              loadingContent={<Spinner label="Loading..." color="default" />}
              emptyContent={!loading && "There is no data"}
            >
              {(item: BestSellingProduct) => (
                <TableRow key={item.productId + item.productName}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="w-full lg:max-w-[40%] p-5 bg-white rounded-2xl flex flex-col gap-4">
          <DashboardCardHeader
            title={"Trending Products"}
            supportText={`Total of ${revenueStats?.totalCustomers} customers`}
            option={option}
          />
          <div className="flex flex-col gap-2">
            {!loading && trending_products ? (
              trending_products.map((product, index) => (
                <div
                  className="flex justify-between items-center w-full "
                  key={index}
                >
                  <User
                    key={index}
                    name={
                      <p className="font-bold text-base w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {product.productName}
                      </p>
                    }
                    description={
                      <p className="text-[#8B909A] text-base">
                        item:{product.sku}
                      </p>
                    }
                    avatarProps={{
                      src: product.image,
                      radius: "none",
                    }}
                  />
                  <p>₦{product.price.toLocaleString()}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-2">
                <TrendingProductLoader />
                <TrendingProductLoader />
                <TrendingProductLoader />
                <TrendingProductLoader />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* total orders */}
      <div className="flex lg:flex-row flex-col gap-4 pb-4">
        <div className="lg:max-w-[40%] w-full p-5 bg-white rounded-2xl">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex flex-col gap-2 py-3">
                <p className="font-semibold text-lg text-[#23272E]">
                  Total Orders
                </p>
                {revenueStats ? (
                  <span className="font-bold text-[2.0rem] leading-[2.0rem]">
                    {formatNumber(revenueStats?.totalOrders)}
                  </span>
                ) : (
                  <Skeleton className="w-[60px] h-[30px]"></Skeleton>
                )}
                <p className="text-[#8B909A] text-base">
                  Orders in {weeklyorders?.length} weeks
                </p>
              </div>
            </div>
            {weeklyorders && weeklyorders.length > 1 && (
              <div className="flex items-center gap-2">
                {(() => {
                  const currentWeekOrders =
                    weeklyorders[weeklyorders.length - 1];
                  const previousWeekOrders =
                    weeklyorders[weeklyorders.length - 2];
                  const percentageChange = (
                    ((currentWeekOrders - previousWeekOrders) /
                      previousWeekOrders) *
                    100
                  ).toFixed(1);
                  const isIncrease = Number(percentageChange) >= 0;

                  return (
                    <>
                      {isIncrease ? (
                        <IoArrowUpOutline
                          color="#1EB564"
                          style={{ strokeWidth: "35" }}
                        />
                      ) : (
                        <IoArrowDownOutline
                          color="#D02626"
                          style={{ strokeWidth: "35" }}
                        />
                      )}
                      <span
                        className={`text-[${
                          isIncrease ? "#1EB564" : "#D02626"
                        }]`}
                      >
                        {Math.abs(Number(percentageChange))}%
                      </span>
                      <span className="text-[#8B909A] text-base">
                        vs last 7 days
                      </span>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
          <div>
            <Chart
              options={areaOption}
              series={areaseries}
              type="area"
              width="100%"
              height={"300px"}
            />
          </div>
        </div>
        <div className="w-full p-5 bg-white rounded-2xl">
          <Table
            shadow="none"
            aria-label="best selling products"
            topContent={RecentTableTopContent}
            classNames={{
              th: [
                "border-divider",
                "text-[#8B909A]",
                "!rounded-none",
                "first:rounded-r-none",
                "last:rounded-l-none",
                "bg-[#F8F9FA]",
                "border-b-[#DBDADE]",
                "border-b-2",
                "mx-auto",
              ],
              thead: ["text-default-500"],
              td: ["py-3"],
              table: "min-h-[270px]",
            }}
          >
            <TableHeader columns={recentOrdersColumns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={sorted_recent_orders || []}
              isLoading={loading}
              loadingContent={<Spinner label="Loading..." color="default" />}
              emptyContent={!loading && "There is no data"}
            >
              {(item) => (
                <TableRow key={item.orderId}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
Dashboard.requireAuth = true;
