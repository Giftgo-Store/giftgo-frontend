"use client";

import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
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
        setCartItems(response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource"
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
        setCategories(response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource"
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
      } catch (error) {
        //@ts-ignore
        console.error(
          "Error fetching resource"
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
            ? "fixed bg-primary top-0 left-0 w-[80%] flex-col transition-all duration-300 ease-in-out py-[10px] px-[24px] rounded-r-[10px] flex justify-between gap-[25px] h-[100vh] pt-[70px] text-white lg:hidden activeNav z-[9999]"
            : "fixed left-[-100%] transition-all duration-300 ease-in-out"
        } `}
      >
        <div className="text-center flex flex-col justify-start items-end gap-[10px]">
          <div className="lg:hidden -mt-[20px] mb-[20px]" onClick={toggleMenu}>
            <IoCloseOutline className="text-white h-[30px] w-[30px]" />
          </div>
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
                    {loc.location.toUpperCase()}
                  </p>
                </Link>
              );
            })}

          <div className="mt-5">
            <select
              name=""
              id=""
              className="rounded-[4px] w-full lg:w-[150px] text-[12px] font-[600] px-[10px] py-[14px] outline-none text-black flex"
              value={search}
              onChange={(e) => handleFilter(e)}
            >
              <option selected>All Categories</option>
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
      <div className="py-2 hidden lg:flex justify-between w-full items-center bg-[#170303] px-[4%] lg:px-[8%] text-[#F2F4F5]">
        <p className="text-[13px] leading-[20px]">
          Welcome to Giftgo online store.{" "}
        </p>
        <div className="flex justify-center items-center gap-[24px] text-[14px] font-[500]">
          <select
            name=""
            id=""
            className="border-none text-[13px] text-[#F2F4F5] bg-[#170303] outline-none"
          >
            <option value="">Eng</option>
          </select>
          <select
            name=""
            id=""
            className="border-none text-[13px] text-[#F2F4F5] bg-[#170303] outline-none"
          >
            <option value="">NGN</option>
          </select>
        </div>
      </div>

      <div className="px-[4%] lg:px-[8%] flex flex-col justify-between items-center bg-[#FFFCF5] pt-[20px] lg:pb-[16px] gap-[20px] border-b-[#E1E3E5] border-b-[1px]">
        <div className="flex justify-between items-center w-full flex-wrap">
          <div className="lg:hidden" onClick={toggleMenu}>
            <GiHamburgerMenu className="text-black h-[30px] w-[30px]" />
          </div>
          <div className="w-[20%] ">
            <Link href="/">
              <Image src="/icon.svg" alt="" width={118} height={48} />
            </Link>
          </div>
          <div className="relative">
            <input
              type="search"
              className="rounded-[4px] h-[48px] w-[260px] lg:w-[600px] px-[20px] py-[14px] outline-none text-[14px] hidden bg-[#F9F9F999] border-[1px] border-[#E1E3E599] lg:flex z-0"
              placeholder="Search for anything..."
              value={search}
              onChange={(e) => handleSearch(e)}
            />
            <FiSearch
              className="text-white hidden lg:text-black lg:absolute right-4 top-4 w-[20px] h-[20px]"
              onClick={() => openSearchModal()}
            />
            <FiSearch className="text-white hidden lg:block lg:text-black lg:absolute right-4 top-4 w-[20px] h-[20px]" />
          </div>

          <div className="flex justify-center items-center gap-[8px] lg:hidden">
            <div
              className="relative bg-[#F9F9F9] p-1 rounded-[2px]"
              onClick={openCheckoutModal}
            >
              <Image
                src="/Buy 2.svg"
                alt=""
                width={32}
                height={32}
                className=""
              />
              <p className="absolute bg-primary text-white h-4 w-4 rounded-full text-xs flex justify-center items-center font-semibold top-[2px] right-[-4px]">
                {cartItems.length}
              </p>
            </div>
            <Image
              src="/Wishlist.svg"
              alt=""
              width={44}
              height={44}
              className=" cursor-pointer"
              onClick={() =>
                token ? router.push("/account/order") : openModal()
              }
            />
           {token ? <CheckoutModal
              showCheckoutModal={showCheckoutModal}
              closeCheckoutModal={closeCheckoutModal}
            /> : <Modal showModal={showModal} closeModal={closeModal} />}
           
            <Image
              src="/userDropdown.svg"
              alt=""
              width={44}
              height={44}
              className=" cursor-pointer"
              onClick={() => (token ? router.push("/account") : openModal())}
            />
            <Modal showModal={showModal} closeModal={closeModal} />
           
          </div>
          <div className="hidden lg:flex justify-center items-center gap-[12px] mt-4 lg:mt-0">
            <div
              className="relative bg-[#F9F9F9] rounded-[8px] py-[10px] px-[16px] flex justify-start items-center gap-2 cursor-pointer"
              onClick={openCheckoutModal}
            >
             
              <Image
                src="/Buy 2.svg"
                alt=""
                width={22}
                height={22}
                className=""
              />
              <p className="text-[14px] font-[500] text-[#191C1F]">Cart</p>
              <p className=" bg-primary text-white h-5 w-5 rounded-full text-xs flex justify-center items-center font-semibold top-[-4px] right-[-10px]">
                {cartItems.length}
              </p>
            </div>
            <Image
              src="/Wishlist.svg"
              alt=""
              width={44}
              height={44}
              className=" cursor-pointer"
              onClick={() =>
                token ? router.push("/account/order") : openModal()
              }
            />
           {token ? <CheckoutModal
              showCheckoutModal={showCheckoutModal}
              closeCheckoutModal={closeCheckoutModal}
            /> : <Modal showModal={showModal} closeModal={closeModal} />}
           
            <Image
              src="/userDropdown.svg"
              alt=""
              width={44}
              height={44}
              className=" cursor-pointer"
              onClick={() => (token ? router.push("/account") : openModal())}
            />
            <Modal showModal={showModal} closeModal={closeModal} />
          </div>
         
        </div>

        <div className="relative w-full lg:hidden">
          <input
            type="search"
            className="rounded-[4px] h-[48px] w-full px-[20px] py-[14px] outline-none text-[14px] bg-[#F9F9F999] border-[1px] border-[#E1E3E599] lg:flex z-0"
            placeholder="Search for anything..."
            value={search}
            onChange={(e) => handleSearch(e)}
          />
          <FiSearch
            className="text-black hidden lg:absolute right-4 top-4 w-[20px] h-[20px]"
            onClick={() => openSearchModal()}
          />
          <FiSearch className="text-black block absolute right-4 top-4 w-[20px] h-[20px]" />
        </div>

        <div className="flex justify-between flex-col lg:flex-row items-start lg:items-center gap-5 w-full">
          <select
            name=""
            id=""
            className="rounded-[4px] h-[48px] w-full lg:w-[150px] text-[14px] font-[600] px-[10px] py-[14px] outline-none border-[1px] border-[#E1E3E599] text-black hidden lg:flex"
            value={search}
            onChange={(e) => handleFilter(e)}
          >
            <option selected>All Categories</option>
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
              <p className="text-[#808080] text-[14px]">Contact</p>
              <p className="text-[#191C1F] font-[500]">+234 91 1414 0300</p>
            </Link>           
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingHeader;
