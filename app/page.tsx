"use client";
import {
  Avatar,
  Badge,
  Button,
  Link,
  Image,
  Slider,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  Chip,
  User,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { TbBell } from "react-icons/tb";
import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";
import { DashboardCard } from "@/app/components/dashboardCard";
import { DashboardCardHeader } from "@/app/components/dashboardCardHeader";
import ApexCharts, { ApexOptions } from "apexcharts";
import {
  LegacyRef,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Chart from "react-apexcharts";
import { HiDotsVertical } from "react-icons/hi";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
export default function Dashboard() {
  const canvasref = useRef<any>();
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const series = [
    {
      name: "Revenue",
      data: [0, 320, 200, 500, 120, 300, 100, 400],
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
      categories: days,
    },
    tooltip: {
      y: {
        formatter: function (
          value,
          { series, seriesName, seriesIndex, dataPointIndex, w }
        ) {
          return series[seriesIndex][dataPointIndex] + "k";
        },
      },
    },
    grid: {
      borderColor: "transparent",
    },
  };
  const areaseries = [
    {
      name: "Total Orders",
      data: [0, 320, 0, 0, 200, 500, 120, 300, 100],
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
      type: "datetime",
      categories: [
        "2024-04-11T01:30:00.000Z",
        "2024-04-11T01:40:00.000Z",
        "2024-04-11T01:50:00.000Z",
        "2024-04-11T02:00:00.000Z",
        "2024-04-11T03:30:00.000Z",
        "2024-04-11T04:00:00.000Z",
        "2024-04-11T05:30:00.000Z",
        "2024-04-11T06:00:00.000Z",
        "2024-04-11T07:30:00.000Z",
      ],
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
  const bestSellingrows = [
    {
      product: "Nikes AF1's",
      total_orders: 506,
      status: "instock",
      price: 13000,
    },
    {
      product: "Nikes AF1's",
      total_orders: 506,
      status: "instock",
      price: 13000,
    },
    {
      product: "Nikes AF1's",
      total_orders: 506,
      status: "outstock",
      price: 13000,
    },
    {
      product: "Nikes AF1's",
      total_orders: 506,
      status: "instock",
      price: 13000,
    },
    {
      product: "Nikes AF1's",
      total_orders: 506,
      status: "outstock",
      price: 13000,
    },
    {
      product: "Nikes AF1's",
      total_orders: 506,
      status: "instock",
      price: 13000,
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
  const products = [
    {
      name: "Gucci teddy",
      id: "FXZ-3455",
      price: 12000,
      image:
        "https://websta.me/wp-content/uploads/2020/10/Promotional-Items-to-Your-Marketing-Campaigns.jpg",
    },
    {
      name: "Gucci teddy",
      id: "FXZ-3455",
      price: 12000,
      image:
        "https://websta.me/wp-content/uploads/2020/10/Promotional-Items-to-Your-Marketing-Campaigns.jpg",
    },
    {
      name: "Dior body spray",
      id: "FXZ-3455",
      price: 12000,
      image:
        "https://websta.me/wp-content/uploads/2020/10/Promotional-Items-to-Your-Marketing-Campaigns.jpg",
    },
    {
      name: "Apex wristwatch",
      id: "FXZ-3455",
      price: 12000,
      image:
        "https://websta.me/wp-content/uploads/2020/10/Promotional-Items-to-Your-Marketing-Campaigns.jpg",
    },
    {
      name: "Monster",
      id: "FXZ-3455",
      price: 12000,
      image:
        "https://websta.me/wp-content/uploads/2020/10/Promotional-Items-to-Your-Marketing-Campaigns.jpg",
    },
    {
      name: "Slick Perfume",
      id: "FXZ-3455",
      price: 12000,
      image:
        "https://websta.me/wp-content/uploads/2020/10/Promotional-Items-to-Your-Marketing-Campaigns.jpg",
    },
    {
      name: "Nike AF1's",
      id: "FXZ-3455",
      price: 12000,
      image:
        "https://websta.me/wp-content/uploads/2020/10/Promotional-Items-to-Your-Marketing-Campaigns.jpg",
    },
  ];
  const recentOrders = [
    {
      id: "#5089",
      customer: "Tony Reichert",
      total: "12000",
      status: "completed",
    },
    {
      id: "#5089",
      customer: "Tony Reichert",
      total: "12000",
      status: "pending",
    },
    {
      id: "#5089",
      customer: "Tony Reichert",
      total: "12000",
      status: "completed",
    },
    {
      id: "#5089",
      customer: "Tony Reichert",
      total: "12000",
      status: "pending",
    },
    {
      id: "#5089",
      customer: "Tony Reichert",
      total: "12000",
      status: "pending",
    },
    {
      id: "#5089",
      customer: "Tony Reichert",
      total: "12000",
      status: "completed",
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
        <Button
          isIconOnly
          className="bg-transparent text-[#1EB564]"
          onClick={option}
        >
          <HiDotsVertical size={24} color="#8B909A" />
        </Button>
      </div>
    );
  }, []);
  const renderCell = useCallback((item: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <p className="text-[#1EB564] font-normal">{item.id}</p>;
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
        return <p className="text-[#23272E] font-bold">{item.product}</p>;
      case "total orders":
        return <p className="font-normal">{item.total_orders}</p>;
      case "status":
        if (item.status === "instock") {
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
        } else if (item.status === "outstock") {
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
        } else if (item.status === "pending") {
          return <p className="text-[#FFC600]">{item.status}</p>;
        } else if (item.status === "completed") {
          return <p className="text-[#1EB564]">{item.status}</p>;
        }
      case "price":
        return <p className="font-normal">₦{item.price}</p>;
      case "customer":
        return <p>{item.customer}</p>;

      default:
        return item.id;
    }
  }, []);

  function option() {
    alert("yes");
  }

  return (
    <div>
      {/* total sales and cost section */}
      <div className="flex justify-between items-center gap-4 ">
        <div className="p-5 w-full bg-white rounded-2xl ">
          <div className="flex justify-between gap-5">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col pb-3">
                <p className="font-semibold text-lg">Total Sales & Costs</p>
                <span className="text-[#8B909A] text-base">Last 7 days</span>
              </div>
              <div className="flex flex-col gap-5 pt-3">
                <div className="flex gap-6 items-end justify-normal">
                  <span className="font-bold text-3xl text-[2rem]">₦1.7M</span>
                  <span className="font-bold text-[#1EB564]">₦1.5M</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex justify-normal items-center gap-1">
                    <IoArrowUpOutline
                      color="#1EB564"
                      style={{ strokeWidth: "35" }}
                      size={16}
                    />
                    <span className="text-[#1EB564] font-medium">₦8.56k</span>
                  </div>
                  <p className="text-[#8B909A] text-base">vs Last 7 days</p>
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
                  className="w-[400px] h-full object-contain"
                ></Image>
              </div>
              <div className="flex justify-between w-full">
                {days.map((day: string) => (
                  <span className="text-[#8B909A] font-medium text-[0.625rem] leading-[20px]">
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[40%] w-full">
          <DashboardCard
            title={"Sessions"}
            amount={1.6}
            profit={false}
            percentage={3}
          />
        </div>
      </div>
      {/* dashboard section containing cards */}
      <div className="flex gap-4 py-4">
        <DashboardCard
          title={"Total Orders"}
          amount={700}
          profit={true}
          percentage={6}
        ></DashboardCard>
        <DashboardCard
          title={"Total Profit"}
          amount={150}
          profit={true}
          percentage={12}
        ></DashboardCard>
        <DashboardCard
          title={"Discounted Amount"}
          amount={12}
          profit={false}
          percentage={2}
        ></DashboardCard>
      </div>
      {/* report section */}
      <div className="flex gap-4 pb-4">
        {/* report chart */}
        <div className="p-5  w-full bg-white rounded-2xl flex flex-col gap-6">
          <DashboardCardHeader
            title={"Reports"}
            supportText="Last 7 Days"
            option={option}
          />
          <div className="flex justify-between gap-3">
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[#23272E] text-2xl">5k</p>
              <p className="font-medium text-sm text-[#8B909A]">Customers</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[#23272E] text-2xl">300</p>
              <p className="font-medium text-sm text-[#8B909A]">
                Total Products
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[#23272E] text-2xl">250</p>
              <p className="font-medium text-sm text-[#8B909A]">
                Stock Products
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[#23272E] text-2xl">50</p>
              <p className="font-medium text-sm text-[#8B909A]">Out of stock</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[#23272E] text-2xl">₦250k</p>
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
        {/* user tracker */}
        <div className="max-w-[40%] w-full p-5 bg-white rounded-2xl">
          <div className="flex flex-col gap-2 py-3">
            <p className="font-semibold text-lg text-[#23272E]">
              Users in last 30 minutes
            </p>
            <span className="font-bold text-[2.0rem] leading-[2.0rem]">
              150
            </span>
            <p className="text-[#8B909A] text-base">Users per minute</p>
            <div className="w-full">
              <Image
                src="/bargraph.png"
                alt="bargraoph"
                radius="none"
                className="w-full max-w-full"
                removeWrapper
              ></Image>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="py-2 font-bold text-lg">Sales by Area</p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 justify-between items-center">
                <div className="flex flex-col gap-1 w-[100px]">
                  <span className="font-medium text-base">230</span>
                  <span className="text-sm font-normal text-[#8B909A]">
                    Australia
                  </span>
                </div>
                <Progress
                  aria-label="sales"
                  value={70}
                  className="max-w-sm bg-none"
                  classNames={{
                    indicator: "!bg-[#1EB564]",
                  }}
                  size="md"
                />
                <div className="flex justify-center items-center gap-2">
                  <SlArrowDown color="#D02626" style={{ strokeWidth: "35" }} />
                  <span className="text-[#D02626]">16.2%</span>
                </div>
              </div>
              <div className="flex gap-3 justify-between items-center">
                <div className="flex flex-col gap-1 w-[100px]">
                  <span className="font-medium text-base">130</span>
                  <span className="text-sm font-normal text-[#8B909A]">
                    Canada
                  </span>
                </div>
                <Progress
                  aria-label="sales"
                  value={60}
                  className="max-w-sm"
                  classNames={{
                    indicator: "!bg-[#1EB564]",
                  }}
                  size="md"
                />
                <div className="flex justify-center items-center gap-2">
                  <SlArrowUp color="#1EB564" style={{ strokeWidth: "35" }} />
                  <span className="text-[#1EB564]">16.2%</span>
                </div>
              </div>{" "}
              <div className="flex gap-3 justify-between items-center">
                <div className="flex flex-col gap-1 w-[100px]">
                  <span className="font-medium text-base">50</span>
                  <span className="text-sm font-normal text-[#8B909A]">US</span>
                </div>
                <Progress
                  aria-label="sales"
                  value={50}
                  className="max-w-sm"
                  classNames={{
                    indicator: "!bg-[#1EB564]",
                  }}
                  size="md"
                />
                <div className="flex justify-center items-center gap-2">
                  <SlArrowUp color="#1EB564" style={{ strokeWidth: "35" }} />
                  <span className="text-[#1EB564]">12.3%</span>
                </div>
              </div>{" "}
              <div className="flex gap-3 justify-between items-center">
                <div className="flex flex-col gap-1 w-[100px]">
                  <span className="font-medium text-base">300</span>
                  <span className="text-sm font-normal text-[#8B909A]">UK</span>
                </div>
                <Progress
                  aria-label="sales"
                  value={40}
                  className="max-w-sm"
                  classNames={{
                    indicator: "!bg-[#1EB564]",
                  }}
                  size="md"
                />
                <div className="flex justify-center items-center gap-2">
                  <SlArrowDown color="#D02626" style={{ strokeWidth: "35" }} />
                  <span className="text-[#D02626]">11.2%</span>
                </div>
              </div>{" "}
              <div className="flex gap-3 justify-between items-center">
                <div className="flex flex-col gap-1 w-[100px]">
                  <span className="font-medium text-base">100</span>
                  <span className="text-sm font-normal text-[#8B909A]">
                    Germany
                  </span>
                </div>
                <Progress
                  aria-label="sales"
                  value={30}
                  className="max-w-sm"
                  classNames={{
                    indicator: "!bg-[#1EB564]",
                  }}
                  size="md"
                />
                <div className="flex justify-center items-center gap-2">
                  <SlArrowDown color="#D02626" style={{ strokeWidth: "35" }} />
                  <span className="text-[#D02626]">16.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* top sellin category section */}
      <div className="flex gap-4 pb-4">
        <div className="max-w-[40%] w-full flex flex-col gap-4 p-5 bg-white rounded-2xl">
          <div>
            <DashboardCardHeader
              title="Top Selling Category"
              supportText="Total 2.5K Visitors"
              option={option}
            />
          </div>
          <div className="relative max-h-[300px] w-fit mx-auto">
            <div className="w-[220px] h-[220px] rounded-full flex flex-col gap-2 items-center justify-center bg-[#EB6363] text-white">
              <span className="opacity-[80%]">Gifts</span>
              <span className="font-bold text-2xl">500</span>
              <span className="opacity-[80%]">Per Day</span>
            </div>
            <div className="w-[200px] h-[200px] rounded-full flex flex-col gap-2 items-center justify-center bg-[#FEEFD3] text-black -top-20 relative left-28">
              <span className="opacity-[80%]">Perfumes</span>
              <span className="font-bold text-2xl">500</span>
              <span className="opacity-[80%]">Per Day</span>
            </div>
            <div className="w-[160px] h-[160px] rounded-full flex flex-col gap-2 items-center justify-center bg-[#1EB564] text-white relative z-10 -top-64 -left-8">
              <span className="opacity-[80%]">Teddy bears</span>
              <span className="font-bold text-2xl">500</span>
              <span className="opacity-[80%]">Per Day</span>
            </div>
          </div>
        </div>
        <div className="w-full p-5 bg-white rounded-2xl">
          <Table
            shadow="none"
            aria-label="last transactions"
            topContent={tableTopContent}
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
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.total}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* best selling product section */}
      <div className="flex gap-4 pb-4">
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
            }}
          >
            <TableHeader columns={bestSellingcolumns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={bestSellingrows}>
              {(item) => (
                <TableRow key={item.product}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="w-full max-w-[40%] p-5 bg-white rounded-2xl flex flex-col gap-4">
          <DashboardCardHeader
            title={"Trending Products"}
            supportText="Total 5k visitors"
            option={option}
          />
          <div className="flex flex-col gap-2">
            {products.map((product, index) => (
              <div className="flex justify-between items-center w-full ">
                <User
                  key={index}
                  name={<p className="font-bold text-base">{product.name}</p>}
                  description={
                    <p className="text-[#8B909A] text-base">
                      item:{product.id}
                    </p>
                  }
                  avatarProps={{
                    src: product.image,
                    radius: "none",
                  }}
                />
                <p>₦{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* total orders */}
      <div className="flex gap-4 pb-4">
        <div className="max-w-[40%] w-full p-5 bg-white rounded-2xl">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex flex-col gap-2 py-3">
                <p className="font-semibold text-lg text-[#23272E]">
                  Total Orders
                </p>
                <span className="font-bold text-[2.0rem] leading-[2.0rem]">
                  2k
                </span>
                <p className="text-[#8B909A] text-base">Users per minute</p>
              </div>
            </div>
            <div className="flex justify-normal items-center gap-1">
              <IoArrowUpOutline
                color="#1EB564"
                style={{ strokeWidth: "35" }}
                size={16}
              />
              <span className="text-[#1EB564]">6%</span>
              <span className="text-[#8B909A] text-base">vs last 7 days</span>
            </div>
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
              td: ["py-3"],
            }}
          >
            <TableHeader columns={recentOrdersColumns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={recentOrders}>
              {(item) => (
                <TableRow key={item.id}>
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
