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

  return <div></div>;
}
