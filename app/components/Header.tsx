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
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FiFileText, FiBox } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { TbBell, TbSmartHome } from "react-icons/tb";
import Image from "next/image";
import BoxAdd from "../../public/box-add.svg";
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
 const nav=useCallback(() => {
    return (
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="2xl"
        className="px-0 bg-transparent"
        classNames={{
          wrapper: ["px-0", "bg-transparent"],
        }}
      >
        <NavbarContent>
          <NavbarBrand>
            <div className="w-full flex justify-between items-center">
              <div>
                <span className="font-bold text-2xl text-[#23272E]">
                  {pageName()}
                </span>
              </div>
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <div className="flex gap-6 max-[200px] justify-between items-center">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="bg-transparent w-[50px] h-[50px] p-3"
                >
                  <Badge color="danger" content={5} shape="circle">
                    <TbBell size={30} color="#4B465C" />
                  </Badge>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile">New notification</DropdownItem>
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
                <Button
                  isIconOnly
                  className="bg-transparent w-[50px] h-[50px] p-3"
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
            <Button isIconOnly className="md:hidden bg-transparent">
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden"
              />
            </Button>
          </div>
        </NavbarContent>
        <NavbarMenu className="flex flex-col gap-3 text-xl text-black">
          <NavbarItem>
            <p className="px-3 py-1 opacity-60">MAIN MENU</p>
          </NavbarItem>
          <NavbarItem
            className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black ${
              pathname === "/admin/dashboard" ? "bg-[#F3F4F8]" : "opacity-60"
            }   transition-[width] transform ease-in-out duration-300 `}
            as={Link}
            key="dashboard"
            aria-label="dashboard"
            href="/admin/dashboard"
          >
            <TbSmartHome size={34} />
            <p
              className={`flex gap-3 justify-normal items-center p-[6px] rounded text-lg font-semibold `}
            >
              Dashboard
            </p>
          </NavbarItem>
          <NavbarItem
            className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black ${
              pathname === "/admin/order-management"
                ? "bg-[#F3F4F8]"
                : "opacity-60"
            }   transition-[width] transform ease-in-out  duration-300`}
            as={Link}
            key="order-management"
            href="/admin/order-management"
          >
            <IoCartOutline size={34} />
            <p
              className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black text-lg font-semibold `}
            >
              Order Management
            </p>
          </NavbarItem>
          <NavbarItem
            className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black ${
              pathname === "/admin/customers" ? "bg-[#F3F4F8]" : "opacity-60"
            }   transition-[width] transform ease-in-out  duration-300`}
            as={Link}
            key="customers"
            href="/admin/customers"
          >
            <LuUsers size={34} />
            <p
              className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black text-lg font-semibold   transition-[width] transform ease-in-out  duration-300`}
            >
              {" "}
              Customers
            </p>
          </NavbarItem>
          <NavbarItem
            className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black ${
              pathname === "/admin/transactions" ? "bg-[#F3F4F8]" : "opacity-60"
            }  transition-[width] transform ease-in-out  duration-300`}
            key="transactions"
            as={Link}
            href="/admin/transactions"
          >
            <FiFileText size={34} />
            <p
              className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black text-lg font-semibold `}
            >
              Transactions
            </p>
          </NavbarItem>

          <NavbarItem>
            <p className="px-3 py-1 opacity-60">PRODUCTS</p>
          </NavbarItem>
          <NavbarItem
            className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black ${
              pathname === "/admin/add-categories"
                ? "bg-[#F3F4F8]"
                : "opacity-60"
            }   transition-[width] transform ease-in-out  duration-300`}
            key="add-categories"
            as={Link}
            href="/admin/add-categories"
          >
            {" "}
            <Image src={"/box-add.svg"} alt="box" width={34} height={34} />
            <p
              className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black text-lg font-semibold `}
            >
              Add Categories
            </p>
          </NavbarItem>
          <NavbarItem
            className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black ${
              pathname === "/admin/add-products" ? "bg-[#F3F4F8]" : "opacity-60"
            }   transition-[width] transform ease-in-out  duration-300`}
            key="add-products"
            as={Link}
            href="/admin/add-products"
          >
            <IoMdAddCircleOutline size={34} />
            <p
              className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black text-lg font-semibold `}
            >
              Add Products
            </p>
          </NavbarItem>
          <NavbarItem
            className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black ${
              pathname === "/admin/product-list" ? "bg-[#F3F4F8]" : "opacity-60"
            }   transition-[width] transform ease-in-out  duration-300`}
            key="product-list"
            as={Link}
            href="/admin/<FiBox size={34} />product-list"
          >
            <FiBox size={34} />
            <p
              className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black text-lg font-semibold `}
            >
              product List
            </p>
          </NavbarItem>
        </NavbarMenu>
      </Navbar>
    );
  },[isMenuOpen, pageName, pathname])
  return (
   nav()
  );
}
