"use client";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Tab,
  Tabs,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { FiBox } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { TbBell, TbSmartHome } from "react-icons/tb";
import BoxAdd from "../../public/box-add.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import { TicketDiscount } from "iconsax-react";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { auth } from "@/auth";
import { HiHomeModern } from "react-icons/hi2";
import { toast } from "react-toastify";
import BASE_URL from "@/app/config/baseurl";

interface admin {
  _id: string;
  email: string;
  phone: number;
  name: string;
}
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>("Create admin");
  const [adminDetails, setAdminDetails] = useState<admin>();
  const [newPassword, setNewPassword] = useState("");
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  //get session data
  const session: any = useSession();
  const token = session?.data?.token;
  const API = BASE_URL + "/api/v1";

  //check if email is valid
  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  //return name for page header
  function pageName() {
    if (pathname?.startsWith("/admin/reviews")) {
      return "Reviews";
    }
    switch (pathname) {
      case "/admin":
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
      case "/admin/coupons":
        return "Coupons";

      default:
        return "Dashboard";
    }
  }

  const getAdminDetails = async () => {
   
    try {
      const res = await fetch(`${API}/admin/profile`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
      });
      const resData = await res.json();
      setAdminDetails(resData.data);
    } catch (error) {
      toast.error("An error occured , please try again");
    }
  };
  const resetForm = () => {
    setName("");
    setPassword("");
    setConfirmPassword("");
    setPhoneNumber("");
    setEmail("");
    setAdminKey("");
    onClose();
  };

  //create new admin
  const createNewAdmin = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      email,
      phone: phoneNumber,
      password,
      confirmPassword,
      adminKey,
    };
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/create/admin`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const resData = await res.json();

      if (res.ok) {
        setAdminDetails(resData.data);
        toast.success("Admin details successfully edited");
        resetForm();
        setLoading(false);
      } else {
        toast.error(resData.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occured , please try again");
    }
  };

  //edit admin details
  const EditAdminDetails = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      phone: phoneNumber,
      email,
    };
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/update-profile`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
        method: "PUT",
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (res.ok) {
        toast.success("Admin details successfully edited");
        resetForm();
        setLoading(false);
      } else {
        toast.error(resData.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occured , please try again");
    }
  };

  //change password
  const ChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      currentPassword: password,
      newPassword: newPassword,
      confirmPassword,
    };
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/change-password`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
        method: "PUT",
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (res.ok) {
        toast.success("password changed successfully ");
        resetForm();
        setLoading(false);
        setName(resData.name)
        setEmail(resData.email)
        setPhoneNumber(resData.phone)
      } else {
        toast.error(resData.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occured , please try again");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminDetails();
  }, []);

  //memoizeadmin details
  const memoizedAdminDetails = useMemo(() => {
    return adminDetails;
  }, [adminDetails]);
  console.log(memoizedAdminDetails);

  return (
    <div>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="2xl"
        className="px-0 bg-transparent"
        classNames={{
          wrapper: ["px-0", "bg-transparent"],
        }}
        suppressHydrationWarning
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
              <DropdownTrigger suppressHydrationWarning>
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
                    <Avatar size="md"></Avatar>
                  </Badge>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">{memoizedAdminDetails?.email}</p>
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSelected("Create admin");
                    onOpen();
                  }}
                  key="create admin"
                  className="gap-2"
                >
                  <p>Create new admin</p>
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    setSelected("Edit admin");
                    onOpen();
                  }}
                  key="edit admin"
                  className="gap-2"
                >
                  <p>Edit admin details</p>
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSelected("change password");
                    onOpen();
                  }}
                  key="Change password"
                  className="gap-2"
                >
                  <p>Change password</p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden w-[50px] h-[50px]"
            />
          </div>
        </NavbarContent>
        <NavbarMenu className="flex flex-col gap-3 text-xl text-black z-[100] absolute">
          <NavbarItem>
            <p className="px-3 py-1 opacity-60">MAIN MENU</p>
          </NavbarItem>
          <NavbarItem
            className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black ${
              pathname === "/admin" ? "bg-[#F3F4F8]" : "opacity-60"
            }   transition-[width] transform ease-in-out duration-300 `}
            as={Link}
            key="dashboard"
            aria-label="dashboard"
            href="/admin"
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
          <NavbarItem>
            <p className="px-3 py-1 opacity-60">COUPONS</p>
          </NavbarItem>
          <NavbarItem
            className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black ${
              pathname === "/admin/coupons" ? "bg-[#F3F4F8]" : "opacity-60"
            }   transition-[width] transform ease-in-out  duration-300`}
            key="coupons"
            as={Link}
            href="/admin/coupons"
          >
            <TicketDiscount size="34" color="#000000" />
            <p
              className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black text-lg font-semibold `}
            >
              Coupons
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
              pathname === "/admin/add-location" ? "bg-[#F3F4F8]" : "opacity-60"
            }   transition-[width] transform ease-in-out  duration-300`}
            key="add-location"
            as={Link}
            href="/admin/add-location"
          >
            {" "}
            <MdOutlineAddLocationAlt size={34} />
            <p
              className={`flex gap-3 justify-normal items-center p-[6px] rounded text-black text-lg font-semibold `}
            >
              Add Locations
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
            href="/admin/product-list"
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        onClose={() => {
          setSelected("Create admin");
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex justify-start items-center gap-2 text-[#0070f0]">
                  <div className="flex justify-center w-full">
                    <Image src={"/icon.svg"} alt="icon" width={100} />
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                {selected === "change password" ? (
                  <Card
                    className=" min-h-[400px] h-fit  shadow-none"
                    shadow="none"
                  >
                    <CardBody className="overflow-hidden">
                      <form
                        className="flex flex-col gap-4"
                        onSubmit={ChangePassword}
                      >
                        <div>
                          <Input
                            isRequired
                            label="Current Password"
                            placeholder="Enter your current password"
                            type="password"
                            value={password}
                            id="password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            errorMessage={
                              password.length > 1 && password.length < 8
                                ? " password nedds to be ad least 8 characters long"
                                : ""
                            }
                          />
                        </div>
                        <div>
                          <Input
                            isRequired
                            label="New Password"
                            placeholder="Enter new your password"
                            type="password"
                            value={newPassword}
                            id="password"
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                            }}
                          />
                        </div>
                        <div>
                          <Input
                            isRequired
                            label="Confirm password"
                            placeholder="Re-enter your new password"
                            type="password"
                            value={confirmPassword}
                            id="password"
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                            }}
                            errorMessage={
                              confirmPassword.length > 1 &&
                              confirmPassword.length < 8
                                ? " password nedds to be ad least 8 characters long"
                                : ""
                            }
                          />
                        </div>

                        <div className="flex gap-2 justify-end">
                          <Button
                            fullWidth
                            color="primary"
                            className=" h-[45px]"
                            isLoading={loading}
                            isDisabled={loading}
                            radius="lg"
                            type="submit"
                          >
                            Change password
                          </Button>
                        </div>
                      </form>
                    </CardBody>
                  </Card>
                ) : (
                  <Card
                    className=" min-h-[400px] h-fit  shadow-none"
                    shadow="none"
                  >
                    <CardBody className="overflow-hidden">
                      <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                      >
                        <Tab key="Create Admin" title="Create Admin">
                          <form
                            className="flex flex-col gap-4"
                            onSubmit={createNewAdmin}
                          >
                            <div>
                              <Input
                                isRequired
                                label="Name"
                                placeholder="Enter your name"
                                type="text"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                              />
                            </div>
                            <Input
                              isRequired
                              label="Email"
                              id="email"
                              placeholder="Enter your email"
                              type="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              isInvalid={isInvalid}
                              errorMessage={
                                isInvalid ? "Please enter a valid email" : ""
                              }
                            />
                            <div>
                              <Input
                                isRequired
                                label="Phone number"
                                placeholder="Enter your Phone number"
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => {
                                  setPhoneNumber(e.target.value);
                                }}
                              />
                            </div>
                            <div>
                              <Input
                                isRequired
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                id="password"
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                }}
                                errorMessage={
                                  password.length > 1 && password.length < 8
                                    ? " password nedds to be ad least 8 characters long"
                                    : ""
                                }
                              />
                            </div>
                            <div>
                              <Input
                                isRequired
                                label="Confirm password"
                                placeholder="Re-enter your password"
                                type="password"
                                value={confirmPassword}
                                id="password"
                                onChange={(e) => {
                                  setConfirmPassword(e.target.value);
                                }}
                                errorMessage={
                                  password.length > 1 && password.length < 8
                                    ? " password nedds to be ad least 8 characters long"
                                    : ""
                                }
                              />
                            </div>
                            <div>
                              <Input
                                isRequired
                                label="Admin key"
                                placeholder="Enter the admin key"
                                type="text"
                                value={adminKey}
                                onChange={(e) => {
                                  setAdminKey(e.target.value);
                                }}
                              />
                            </div>

                            <p className="text-center text-small">
                              Want to Edit admin Profile ?{" "}
                              <Link
                                size="sm"
                                onPress={() => setSelected("Edit admin")}
                                className="cursor-pointer"
                              >
                                Edit admin profile
                              </Link>
                            </p>
                            <div className="flex gap-2 justify-end">
                              <Button
                                fullWidth
                                color="primary"
                                className=" h-[45px]"
                                isLoading={loading}
                                isDisabled={loading}
                                radius="lg"
                                type="submit"
                              >
                                Create admin
                              </Button>
                            </div>
                          </form>
                        </Tab>
                        <Tab key="Edit admin" title="Edit admin">
                          <form
                            className="flex flex-col gap-4 h-[300px]"
                            onSubmit={EditAdminDetails}
                          >
                            <div>
                              <Input
                                isRequired
                                label="Name"
                                placeholder="Enter your name"
                                type="text"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                              />
                            </div>
                            <Input
                              isRequired
                              label="Email"
                              placeholder="Enter your email"
                              type="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                            <Input
                              isRequired
                              label="Password"
                              placeholder="Enter your password"
                              type="password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
                            <p className="text-center text-small">
                              Want to create an admin account?{" "}
                              <Link
                                size="sm"
                                onPress={() => setSelected("Create admin")}
                                className="cursor-pointer"
                              >
                                Create admin
                              </Link>
                            </p>
                            <div className="flex gap-2 justify-end">
                              <Button
                                fullWidth
                                color="primary"
                                className=" h-[45px]"
                                isLoading={loading}
                                isDisabled={loading}
                                radius="lg"
                                type="submit"
                              >
                                Edit admin
                              </Button>
                            </div>
                            <div className="flex justify-center"></div>
                          </form>
                        </Tab>
                      </Tabs>
                    </CardBody>
                  </Card>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
