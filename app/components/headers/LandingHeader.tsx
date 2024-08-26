"use client";

import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { PiMapPinLine, PiShoppingCart } from "react-icons/pi";
import { FiHeadphones, FiPhoneCall } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useState, useEffect, ChangeEvent } from "react";
import Modal from "../modals/LoginModal";
import ReviewModal from "../modals/ReviewModal";
import CheckoutModal from "../modals/CheckoutModal";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import { useRefetch } from "../../context/refetchContext";

const LandingHeader = () => {
  const { refetch } = useRefetch();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const query = new URLSearchParams({
      product: e.target.value,
    });
    router.push(`/search/product?${query}`);
  };

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearch(e.target.value);
    const query = new URLSearchParams({
      filter: e.target.value,
    });
    setIsOpen(false);
    router.push(`/search/filter?${query}`);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/cart`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        console.log(response.data.data);
        // Handle successful response, e.g., save token, redirect, etc.
        setCartItems(response.data.data);
        console.log("Successful", response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource"
          // error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchCartItems();
  }, [refetch]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/category`);
        console.log(response.data.data);
        // Handle successful response, e.g., save token, redirect, etc.
        setCategories(response.data.data);
        console.log("Successful", response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource"
          // error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/location`);
        setLocation(response.data.data);
        // Handle successful response, e.g., save token, redirect, etc.
        console.log("Successful", response.data.data);
      } catch (error) {
        //@ts-ignore
        console.error(
          "Error fetching resource"
          // error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };

    fetchData();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [showSearchModal, setShowSearchModal] = useState(false);

  const openSearchModal = () => setShowSearchModal(true);
  const closeSearchModal = () => setShowSearchModal(false);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const openCheckoutModal = () => setShowCheckoutModal(true);
  const closeCheckoutModal = () => setShowCheckoutModal(false);

  const toggleMenu = () => {
    window.scroll(0, 0);
    setIsOpen(!isOpen);
  };

  const token = Cookies.get("token");

  return (
    <>
      {showSearchModal && (
        <ReviewModal isOpen={showSearchModal} onClose={closeSearchModal}>
          <div className="flex h-[300px] items-center justify-center">
            <div className="relative">
              <input
                type="search"
                className="rounded-[4px] h-[48px] w-[260px] lg:w-[600px] px-[20px] py-[14px] outline-none text-[14px] border border-black flex z-0"
                placeholder="Search for anything..."
                value={search}
                onChange={(e) => handleSearch(e)}
              />
              <FiSearch
                className="text-black absolute right-4 top-4 w-[20px] h-[20px]"
                onClick={() => closeSearchModal()}
              />
            </div>
          </div>
        </ReviewModal>
      )}
      <div
        className={`${
          isOpen
            ? "fixed bg-primary top-0 left-0 w-[80%] flex-col transition-all duration-300 ease-in-out py-[10px] px-[24px] rounded-r-[10px] flex justify-between gap-[25px] h-[100vh] pt-[70px] text-white lg:hidden activeNav z-40"
            : "fixed left-[-100%] transition-all duration-300 ease-in-out"
        } `}
      >
        <div className="text-center flex flex-col justify-start items-end gap-[10px]">
          <div className="lg:hidden -mt-[20px] mb-[20px]" onClick={toggleMenu}>
            <IoCloseOutline className="text-white h-[30px] w-[30px]" />
          </div>
          {/* <Link onClick={toggleMenu} href={"/"} className="w-full">
            <p className="">Home</p>
          </Link>
          <Link
            onClick={toggleMenu}
            href={
              "https://wa.me/2349114140300?text=Hello+i+want+to+make+enquiry,+My+Name+is"
            }
            target="_blank"
            rel="noreferrer"
            className="w-full"
          >
            <p className="">Contact</p>
          </Link> */}
          {location.length > 0 &&
            location.map((loc: any, i: any) => {
              return (
                <Link
                  href={`/category/${loc._id}`}
                  key={i}
                  className="flex flex-col items-center justify-center gap-[4px]"
                  onClick={() => Cookies.set("location", loc.location)}
                >
                  <p className="text-[14px]" onClick={toggleMenu}>
                    {loc.location}
                  </p>
                </Link>
              );
            })}

          <div className="mt-5">
            <p>Filter Products</p>
            <select
              name=""
              id=""
              className="rounded-[4px] w-full lg:w-[150px] text-[12px] font-[600] px-[10px] py-[14px] outline-none text-black flex"
              value={search}
              onChange={(e) => handleFilter(e)}
            >
              <option selected>Filter Products</option>
              {categories &&
                categories.map((category: any, i: any) => {
                  return (
                    <option key={i} value={category.id} className="text-[12px]">
                      {category.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
      <div className="py-3 flex justify-between w-full items-center bg-secondary px-[4%] lg:px-[8%]">
        <p className="text-[14px] leading-[20px]">
          Welcome to Giftgo online store.{" "}
        </p>
        <div className="flex justify-center items-center gap-[24px] text-[14px] font-[500]">
          <select
            name=""
            id=""
            className="border-none bg-secondary outline-none"
          >
            <option value="">Eng</option>
          </select>
          <select
            name=""
            id=""
            className="border-none bg-secondary outline-none"
          >
            <option value="">NGN</option>
          </select>
        </div>
      </div>

      <div className="px-[4%] lg:px-[8%] flex flex-col justify-between items-center bg-primary pt-[20px] lg:pb-[16px] gap-[20px]">
        <div className="flex justify-between items-center w-full flex-wrap">
          <div className="lg:hidden" onClick={toggleMenu}>
            <GiHamburgerMenu className="text-white h-[30px] w-[30px]" />
          </div>
          <div className="w-[20%] ">
            <Link href="/">
              <Image src="/icon.svg" alt="" width={118} height={48} />
            </Link>
          </div>
          <div className="relative">
            <input
              type="search"
              className="rounded-[4px] h-[48px] w-[260px] lg:w-[600px] px-[20px] py-[14px] outline-none text-[14px] hidden lg:flex z-0"
              placeholder="Search for anything..."
              value={search}
              onChange={(e) => handleSearch(e)}
            />
            <FiSearch
              className="text-white lg:hidden lg:text-black lg:absolute right-4 top-4 w-[20px] h-[20px]"
              onClick={() => openSearchModal()}
            />
            <FiSearch className="text-white hidden lg:block lg:text-black lg:absolute right-4 top-4 w-[20px] h-[20px]" />
          </div>

          <div className="flex justify-center items-center gap-[20px] lg:hidden">
            <div className="relative">
              <PiShoppingCart
                className="w-[25px] text-white h-[25px] cursor-pointer"
                onClick={openCheckoutModal}
              />
              <p className="absolute bg-white h-4 w-4 rounded-full text-xs flex justify-center items-center font-semibold top-[-4px] right-[-10px]">
                {cartItems.length}
              </p>
            </div>
            <CheckoutModal
              showCheckoutModal={showCheckoutModal}
              closeCheckoutModal={closeCheckoutModal}
            />
            <AiOutlineUser
              className="w-[25px] text-white h-[25px] cursor-pointer"
              onClick={() => (token ? router.push("/account") : openModal())}
            />
            <Modal showModal={showModal} closeModal={closeModal} />
            {/* <select
              name=""
              id=""
              className="border-none bg-primary text-white outline-none text-[16px] font-[500]"
            >
              <option
                value=""
                className="flex justify-center gap-1 items-center"
              >
                Ship to <Image src="/flag.png" alt="" width={20} height={10} />
              </option>
            </select> */}
          </div>
          <div className="hidden lg:flex justify-center items-center gap-[24px] mt-4 lg:mt-0">
            <button
              onClick={() =>
                token ? router.push("/account/order") : openModal()
              }
              className="flex justify-center items-center gap-1 text-[14px] text-white leading-[20px]"
            >
              <PiMapPinLine />
              <p>Track Order</p>
            </button>
            <Link
              href={
                "https://wa.me/2349114140300?text=Hello+i+want+to+make+enquiry,+My+Name+is"
              }
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center gap-1 text-[14px] text-white leading-[20px]"
            >
              <FiHeadphones />
              <p>Customer Support</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-between flex-col lg:flex-row items-start lg:items-center gap-5 w-full">
          <select
            name=""
            id=""
            className="rounded-[4px] h-[48px] w-full lg:w-[150px] text-[14px] font-[600] px-[10px] py-[14px] outline-none text-black hidden lg:flex"
            value={search}
            onChange={(e) => handleFilter(e)}
          >
            <option selected>Filter Products</option>
            {categories &&
              categories.map((category: any, i: any) => {
                return (
                  <option key={i} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
          </select>

          <div className="lg:flex hidden justify-center items-center gap-[32px]">
            <Link
              href={"tel:09114140300"}
              className="flex justify-center items-center gap-2 text-[14px] lg:text-[18px] text-white leading-[20px]"
            >
              <FiPhoneCall />
              <p>+234 91 1414 0300</p>
            </Link>
            <div className="relative">
              <PiShoppingCart
                className="w-[25px] text-white h-[25px] cursor-pointer"
                onClick={openCheckoutModal}
              />
              <p className="absolute bg-white h-4 w-4 rounded-full text-xs flex justify-center items-center font-semibold top-[-4px] right-[-10px]">
                {cartItems.length}
              </p>
            </div>
            <CheckoutModal
              showCheckoutModal={showCheckoutModal}
              closeCheckoutModal={closeCheckoutModal}
            />
            <AiOutlineUser
              className="w-[25px] text-white h-[25px] cursor-pointer"
              onClick={() => (token ? router.push("/account") : openModal())}
            />
            <Modal showModal={showModal} closeModal={closeModal} />
            {/* <select
              name=""
              id=""
              className="border-none bg-primary text-white outline-none text-[16px] font-[500]"
            >
              <option
                value=""
                className="flex justify-center gap-1 items-center"
              >
                Ship to <Image src="/flag.png" alt="" width={20} height={10} />
              </option>
            </select> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingHeader;
