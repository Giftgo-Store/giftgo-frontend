"use client";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { TbBell } from "react-icons/tb";

export function Header() {
  const pathname = usePathname();
  function pageName() {
    switch (pathname) {
      case "/admin/dashboard":
        return "Dashboard";
      case "/admin/order-management":
        return "Order Management";
      case "/admin/customers":
        return "Customers";
      case "/admin/transactions":
        return "Transactions";
      case "/admin/add-categories":
        return "Add Categories";
      case "/admin/add-products":
        return "Add Products";
      case "/admin/product-list":
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
        <div className="flex gap-6 max-[200px] justify-between items-center">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
               <Button isIconOnly className="bg-transparent w-[50px] h-[50px] p-3">
              <Badge color="danger" content={5} shape="circle">
                <TbBell size={30} color="#4B465C" />
                </Badge>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile">
                New notification
              </DropdownItem>
              <DropdownItem key="New notification">
                New notification
              </DropdownItem>
              <DropdownItem key="New notification">
                New notification
              </DropdownItem>
              <DropdownItem key="New notification">
                New notification
              </DropdownItem>
              <DropdownItem key="system">New notification</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <Button isIconOnly className="bg-transparent w-[50px] h-[50px] p-3">
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
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@tonyreichert</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
