import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { PiMapPinLine, PiShoppingCart } from "react-icons/pi";
import { FiHeadphones, FiPhoneCall } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

const LandingHeader = () => {
    return (
      <>
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

        <div className="px-[4%] lg:px-[8%] flex flex-col justify-between items-center bg-primary pt-[20px] pb-[16px] gap-[20px]">
          <div className="flex justify-between items-center w-full flex-wrap">
            <div className="w-[20%] ">
              <Image src="/icon.svg" alt="" width={118} height={48} />
            </div>
            <div className="relative">
              <input
                type="search"
                className="rounded-[4px] h-[48px] w-[260px] lg:w-[600px] px-[20px] py-[14px] outline-none text-[14px]"
                placeholder="Search for anything..."
              />
              <FiSearch className="absolute right-4 top-4 w-[20px] h-[20px]" />
            </div>
            <div className="flex justify-center items-center gap-[24px] mt-4 lg:mt-0">
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
              className="rounded-[4px] h-[48px] w-full lg:w-[150px] text-[14px] font-[600] px-[10px] py-[14px] outline-none text-black"
            >
              <option value="All category">All category</option>
              <option value="Uncategorized">Uncategorized</option>
              <option value="Flowers and Notes">Flowers and Notes</option>
              <option value="Kids items">Kids items</option>
              <option value="Adult items">Adult items</option>
              <option value="Food Items">Food Items</option>
            </select>

            <div className="flex justify-center items-center gap-[32px]">
              <div className="flex justify-center items-center gap-2 text-[14px] lg:text-[18px] text-white leading-[20px]">
                <FiPhoneCall />
                <p>+234 9000000000</p>
              </div>
              <PiShoppingCart className="w-[25px] text-white h-[25px]" />
              <AiOutlineUser className="w-[25px] text-white h-[25px]" />
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