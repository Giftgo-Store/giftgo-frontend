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
export default function Workspace() {
  return <div></div>;
}
