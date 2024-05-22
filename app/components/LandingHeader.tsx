"use client"

import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { PiMapPinLine, PiShoppingCart } from "react-icons/pi";
import { FiHeadphones, FiPhoneCall} from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useState } from "react";
import Modal from "./LoginModal";
import CheckoutModal from "./CheckoutModal";


const LandingHeader = () => {
const [isOpen, setIsOpen] = useState(false)

 const [showModal, setShowModal] = useState(false);

 const openModal = () => setShowModal(true);
 const closeModal = () => setShowModal(false);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const openCheckoutModal = () => setShowCheckoutModal(true);
  const closeCheckoutModal = () => setShowCheckoutModal(false);

    const toggleMenu = () => {
      window.scroll(0, 0);
      setIsOpen(!isOpen);
    };

    return (
      <>
        <div
          className={`${
            isOpen
              ? "fixed bg-primary top-0 left-0 w-[80%] flex-col transition-all duration-300 ease-in-out py-[10px] px-[24px] rounded-r-[10px] flex justify-between gap-[25px] h-[100vh] pt-[70px] text-white lg:hidden activeNav z-40"
              : "fixed left-[-100%] transition-all duration-300 ease-in-out"
          } `}
        >
          <div className="text-center flex flex-col justify-start items-end gap-[25px]">
            <div className="lg:hidden" onClick={toggleMenu}>
              <IoCloseOutline className="text-white h-[30px] w-[30px]" />
            </div>
            <Link onClick={toggleMenu} href={"/"} className="w-full">
              <p className="">Home</p>
            </Link>
            <Link onClick={toggleMenu} href={"/contact"} className="w-full">
              <p className="">Contact</p>
            </Link>
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
              />
              <FiSearch className="text-white lg:text-black lg:absolute right-4 top-4 w-[20px] h-[20px]" />
            </div>

            <div className="flex justify-center items-center gap-[20px] lg:hidden">
              <PiShoppingCart
                className="w-[25px] text-white h-[25px]"
                onClick={openCheckoutModal}
              />
              <CheckoutModal
                showCheckoutModal={showCheckoutModal}
                closeCheckoutModal={closeCheckoutModal}
              />
              <AiOutlineUser
                className="w-[25px] text-white h-[25px]"
                onClick={openModal}
              />
              <Modal showModal={showModal} closeModal={closeModal} />
              <select
                name=""
                id=""
                className="border-none bg-primary text-white outline-none text-[16px] font-[500]"
              >
                <option
                  value=""
                  className="flex justify-center gap-1 items-center"
                >
                  Ship to{" "}
                  <Image src="/flag.png" alt="" width={20} height={10} />
                </option>
              </select>
            </div>
            <div className="hidden lg:flex justify-center items-center gap-[24px] mt-4 lg:mt-0">
              <div className="flex justify-center items-center gap-1 text-[14px] text-white leading-[20px]">
                <PiMapPinLine />
                <p>Track Order</p>
              </div>
              <div className="flex justify-center items-center gap-1 text-[14px] text-white leading-[20px]">
                <FiHeadphones />
                <p>Customer SUpport</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between flex-col lg:flex-row items-start lg:items-center gap-5 w-full">
            <select
              name=""
              id=""
              className="rounded-[4px] h-[48px] w-full lg:w-[150px] text-[14px] font-[600] px-[10px] py-[14px] outline-none text-black hidden lg:flex"
            >
              <option value="All category">All category</option>
              <option value="Uncategorized">Uncategorized</option>
              <option value="Flowers and Notes">Flowers and Notes</option>
              <option value="Kids items">Kids items</option>
              <option value="Adult items">Adult items</option>
              <option value="Food Items">Food Items</option>
            </select>

            <div className="lg:flex hidden justify-center items-center gap-[32px]">
              <div className="flex justify-center items-center gap-2 text-[14px] lg:text-[18px] text-white leading-[20px]">
                <FiPhoneCall />
                <p>+234 9000000000</p>
              </div>
              <PiShoppingCart
                className="w-[25px] text-white h-[25px] cursor-pointer"
                onClick={openCheckoutModal}
              />
              <CheckoutModal
                showCheckoutModal={showCheckoutModal}
                closeCheckoutModal={closeCheckoutModal}
              />
              <AiOutlineUser
                className="w-[25px] text-white h-[25px] cursor-pointer"
                onClick={openModal}
              />
              <Modal showModal={showModal} closeModal={closeModal} />
              <select
                name=""
                id=""
                className="border-none bg-primary text-white outline-none text-[16px] font-[500]"
              >
                <option
                  value=""
                  className="flex justify-center gap-1 items-center"
                >
                  Ship to{" "}
                  <Image src="/flag.png" alt="" width={20} height={10} />
                </option>
              </select>
            </div>
          </div>
        </div>
      </>
    );
}
 
export default LandingHeader;