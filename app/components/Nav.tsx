"use client";
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  Spacer,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { TbSmartHome } from "react-icons/tb";
import { IoCartOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { FiFileText } from "react-icons/fi";
import { FiBox } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import BoxAdd from "../../public/box-add.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Nav() {
    const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["text"]));
    const [showOnlyIcon, setShowOnlyIcon] = useState(false)
    const pathname = usePathname();
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  return (
    <div
      className={`flex flex-col gap-2  bg-white  h-screen absolute px-4 py-5 transition-[width] transform ease-in-out w-fit overflow-hidden duration-300`}
    >
      <div className="flex justify-between items-center pl-2 overflow-hidden transition-[width] transform ease-in-out duration-300 ">
        <Link href="/" className={`${showOnlyIcon ? "hidden" : "block"}`}>
          <Image src={"/icon.svg"} alt="icon" width={100} height={100} />
        </Link>
        <Button
          isIconOnly
          className="bg-white"
          onClick={() => setShowOnlyIcon(!showOnlyIcon)}
        >
          <Image src={"/hamburger.svg"} alt="icon" width={40} height={40} />
        </Button>
      </div>
      <Spacer y={4}></Spacer>
      <Listbox
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        hideSelectedIcon
        className={`flex flex-col gap-3 p-0 sm:max-w-[260px]  w-full overflow-hidden transition-[width] transform ease-in-out duration-300 `}
        classNames={{
          list: [
            "gap-4  transition-[width] transform ease-in-out overflow-hidden duration-300",
          ],
          base: ["w-fit sm:max-w-[300px]  w-full"],
        }}
      >
        <ListboxSection
          title={"MAIN MENU"}
          classNames={{
            group: [
              " flex flex-col gap-3 w-fit transition-[width] transform ease-in-out overflow-hidden duration-300",
            ],
            heading: [
              "px-3 py-3 text-sm overflow-hidden transition-[width] transform ease-in-out block overflow-hidden whitespace-nowrap  h-[40px] duration-300 ",
              showOnlyIcon ? "opacity-0 w-[0]" : "opacity-100",
            ],
          }}
          className="w-full transition-[width] transform ease-in-out block overflow-hidden whitespace-nowrap  duration-300"
        >
          <ListboxItem
            className={`${pathname === "/" ? "bg-[#F3F4F8]" : "opacity-60"}  ${
              showOnlyIcon ? "pr-0" : "px-2"
            } transition-[width] transform ease-in-out overflow-hidden duration-300 `}
            startContent={<TbSmartHome size={34} />}
            key="dashboard"
            href="/"
          >
            <p
              className={`text-lg font-semibold transition-[width] transform ease-in-out block overflow-hidden duration-300 ${
                showOnlyIcon ? "w-[0] px-0" : ""
              }transition-[width] transform ease-in-out overflow-hidden duration-300`}
            >
              Dashboard
            </p>
          </ListboxItem>
          <ListboxItem
            className={`${
              pathname === "/order-management" ? "bg-default" : "opacity-60"
            }  ${
              showOnlyIcon ? "pr-0" : "px-2"
            } transition-[width] transform ease-in-out overflow-hidden duration-300`}
            startContent={<IoCartOutline size={34} />}
            key="order-management"
            href="/order-management"
          >
            <p
              className={`text-lg font-semibold transition-[width] transform ease-in-out block overflow-hidden duration-300 ${
                showOnlyIcon ? "w-[0] px-0" : ""
              }transition-[width] transform ease-in-out overflow-hidden duration-300`}
            >
              Order Management
            </p>
          </ListboxItem>
          <ListboxItem
            className={`${
              pathname === "/customers" ? "bg-default" : "opacity-60"
            }  ${
              showOnlyIcon ? "pr-0" : "px-2"
            } transition-[width] transform ease-in-out overflow-hidden duration-300`}
            startContent={<LuUsers size={34} />}
            key="customers"
            href="/customers"
          >
            <p
              className={`text-lg font-semibold transition-[width] transform ease-in-out block overflow-hidden duration-300 ${
                showOnlyIcon ? "w-[0] px-0" : ""
              }transition-[width] transform ease-in-out overflow-hidden duration-300`}
            >
              {" "}
              Customers
            </p>
          </ListboxItem>
          <ListboxItem
            className={`${
              pathname === "/transactions" ? "bg-default" : "opacity-60"
            } ${
              showOnlyIcon ? "pr-0" : "px-2"
            } transition-[width] transform ease-in-out overflow-hidden duration-300`}
            startContent={<FiFileText size={34} />}
            key="transactions"
            href="/transactions"
          >
            <p
              className={`text-lg font-semibold transition-[width] transform ease-in-out block overflow-hidden duration-300 ${
                showOnlyIcon ? "w-[0] px-0" : ""
              }transition-[width] transform ease-in-out overflow-hidden duration-300`}
            >
              Transactions
            </p>
          </ListboxItem>
        </ListboxSection>
        <ListboxSection
          title={"PRODUCTS"}
          classNames={{
            group: [
              " flex flex-col gap-3 w-full transition-[width] transform ease-in-out overflow-hidden duration-300",
            ],
            heading: [
              "px-3 py-3 text-sm overflow-hidden transition-[width] transform ease-in-out block overflow-hidden whitespace-nowrap  h-[40px] duration-300 ",
              showOnlyIcon ? "opacity-0 w-[0]" : "opacity-100",
            ],
          }}
          className="w-full transition-[width] transform ease-in-out block overflow-hidden whitespace-nowrap  duration-300"
        >
          <ListboxItem
            className={`${
              pathname === "/add-categories" ? "bg-[#F3F4F8]" : "opacity-60"
            }  ${
              showOnlyIcon ? "pr-0" : "px-2"
            } transition-[width] transform ease-in-out overflow-hidden duration-300`}
            startContent={
              <Image src={BoxAdd} alt="box" width={34} height={34} />
            }
            key="add-categories"
            href="/add-categories"
          >
            <p
              className={`text-lg font-semibold transition-[width] transform ease-in-out block overflow-hidden duration-300 ${
                showOnlyIcon ? "w-[0] px-0" : ""
              }transition-[width] transform ease-in-out overflow-hidden duration-300`}
            >
              Add Categories
            </p>
          </ListboxItem>
          <ListboxItem
            className={`${
              pathname === "/add-products" ? "bg-default" : "opacity-60"
            }  ${
              showOnlyIcon ? "pr-0" : "px-2"
            } transition-[width] transform ease-in-out overflow-hidden duration-300`}
            startContent={<IoMdAddCircleOutline size={34} />}
            key="add-products"
            href="/add-products"
          >
            <p
              className={`text-lg font-semibold transition-[width] transform ease-in-out block overflow-hidden duration-300 ${
                showOnlyIcon ? "w-[0] px-0" : ""
              }transition-[width] transform ease-in-out overflow-hidden duration-300`}
            >
              Add Products
            </p>
          </ListboxItem>
          <ListboxItem
            className={`${
              pathname === "/product-list" ? "bg-default" : "opacity-60"
            }  ${
              showOnlyIcon ? "pr-0" : "px-2"
            } transition-[width] transform ease-in-out overflow-hidden duration-300`}
            startContent={<FiBox size={34} />}
            key="product-list"
            href="/product-list"
          >
            <p
              className={`text-lg font-semibold transition-[width] transform ease-in-out block overflow-hidden duration-300 ${
                showOnlyIcon ? "w-[0] px-0" : ""
              }transition-[width] transform ease-in-out overflow-hidden duration-300`}
            >
              product List
            </p>
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </div>
  );
}
