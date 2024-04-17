"use client";
import { Avatar, Badge, Button, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { TbBell } from "react-icons/tb";

export function Header() {
  const pathname = usePathname();
  function pageName() {
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/order-management":
        return "Order Management";
      case "/customers":
        return "Customers";
      case "/transactions":
        return "Transactions";
      case "/add-categories":
        return "Add Categories";
      case "/add-products":
        return "Add Products";
      case "/product-list":
        return "Product List";
      default:
        return "Dashboard";
    }
  }
  return (
    <div className="py-5">
      <div className="w-full flex justify-between items-center">
        <div>
          <span className="font-bold text-2xl text-[#23272E]">
            {pageName()}
          </span>
        </div>
        <div className="flex gap-6 items-center">
          <Button
            isIconOnly
            className="bg-transparent w-fit p-3"
            as={Link}
            href={"/notification"}
          >
            <Badge color="danger" content={5} shape="circle">
              <TbBell size={30} color="#4B465C" />
            </Badge>
          </Button>
          <Button
            isIconOnly
            className="bg-transparent w-fit p-3"
            as={Link}
            href={"/notification"}
          >
            <Badge
              color="success"
              content={""}
              shape="circle"
              placement="bottom-right"
              size="sm"
            >
              <Avatar
                src="https://th.bing.com/th/id/OIP.DUflnJMpmj75BYf1WR6ZEwHaEK?rs=1&pid=ImgDetMain"
                size="md"
              ></Avatar>
            </Badge>
          </Button>
        </div>
      </div>
    </div>
  );
}
