import Card from './components/Card';
import Category from './components/Category';
import './globals.css'
import Image from "next/image";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";
import { PiCreditCardLight } from "react-icons/pi";
import { FiHeadphones } from "react-icons/fi";


const Landing = () => {
    return (
      <>
        <div className="mx-[8%] mt-[96px] bg-secondary pt-[40px] px-[40px] rounded-[8px] flex justify-between item-end mb-[32px]">
          <div className="flex flex-col items-start justify-center pb-[40px]">
            <Image src="/icon.svg" alt="" width={118} height={48} />

            <h1 className="pt-2 leading-[72px] text-[48px] font-[600] text-[#191C1F] pb-[40px]">
              Shop the Best Selection <br /> from Around the Globe at <br />{" "}
              GiftGo!
            </h1>

            <button className="py-[18px] px-[40px] rounded-[4px] bg-primary text-white text-[16px] font-[600]">
              Shop Now
            </button>
          </div>
          <div className="flex justify-end items-end">
            <Image src="/teddy.png" alt="" width={430} height={386} />
          </div>
        </div>

        <div className="border-[#E4E7E9] border-[1px] bg-[#F5F5F5] flex justify-between items-center p-2 mx-[8%] rounded-[8px] mb-[84px]">
          <div className="p-4 flex justify-between items-center bg-white gap-2">
            <MdOutlineLocalShipping className="w-10 h-10 text-[#191C1F]" />
            <div className="flex flex-col gap-0 items-start">
              <h2 className="text-[14px] text-[#191C1F] font-[500] leading-0">
                FREE SHIPPING
              </h2>
              <p className="text-[#5F6C72] text-[13px] font-[500] leading-0">
                Delivery in 24/7
              </p>
            </div>
          </div>

          <div className="p-4 flex justify-between items-center bg-white gap-2">
            <FiHeadphones className="w-10 h-10 text-[#191C1F]" />
            <div className="flex flex-col gap-0 items-start">
              <h2 className="text-[14px] text-[#191C1F] font-[500] leading-0">
                SUPPORT 24/7
              </h2>
              <p className="text-[#5F6C72] text-[13px] font-[500] leading-0">
                Live contact/message
              </p>
            </div>
          </div>

          <div className="p-4 flex justify-between items-center bg-white gap-2">
            <IoTrophyOutline className="w-10 h-10 text-[#191C1F]" />
            <div className="flex flex-col gap-0 items-start">
              <h2 className="text-[14px] text-[#191C1F] font-[500] leading-0">
                24 HOUR RETURN
              </h2>
              <p className="text-[#5F6C72] text-[13px] font-[500] leading-0">
                100% money-back guarantee
              </p>
            </div>
          </div>

          <div className="p-4 flex justify-between items-center bg-white gap-2">
            <PiCreditCardLight className="w-10 h-10 text-[#191C1F]" />
            <div className="flex flex-col gap-0 items-start">
              <h2 className="text-[14px] text-[#191C1F] font-[500] leading-0">
                SECURE PAYMENT
              </h2>
              <p className="text-[#5F6C72] text-[13px] font-[500] leading-0">
                Your money is safe
              </p>
            </div>
          </div>
        </div>

        <div className="mx-[8%] text-[#191C1F] mb-[90px]">
          <h2 className="text-center font-[600] text-[26px] pb-[24px]">
            Shop By
          </h2>

          <div className="bg-[#F5F5F5] py-10 px-20 w-full flex justify-center items-center gap-x-[140px] gap-y-10 flex-wrap">
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="w-[112px] h-[112px] flex justify-center items-center bg-[#05031A] rounded-full">
                <Image src="/um.png" alt="" width={68} height={50} />
              </div>
              <p className="text-[20px]">USA</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="w-[112px] h-[112px] flex justify-center items-center bg-[#05031A] rounded-full">
                <Image src="/gb.png" alt="" width={68} height={50} />
              </div>
              <p className="text-[20px]">UK</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="w-[112px] h-[112px] flex justify-center items-center bg-[#05031A] rounded-full">
                <Image src="/de.png" alt="" width={68} height={50} />
              </div>
              <p className="text-[20px]">Germany</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="w-[112px] h-[112px] flex justify-center items-center bg-[#05031A] rounded-full">
                <Image src="/ca.png" alt="" width={68} height={50} />
              </div>
              <p className="text-[20px]">Canada</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="w-[112px] h-[112px] flex justify-center items-center bg-[#05031A] rounded-full">
                <Image src="/au.png" alt="" width={68} height={50} />
              </div>
              <p className="text-[20px]">Australia</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="w-[112px] h-[112px] flex justify-center items-center bg-[#05031A] rounded-full">
                <Image src="/br.png" alt="" width={68} height={50} />
              </div>
              <p className="text-[20px]">Brazil</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="w-[112px] h-[112px] flex justify-center items-center bg-[#05031A] rounded-full">
                <Image src="/asia.png" alt="" width={68} height={50} />
              </div>
              <p className="text-[20px]">Asia</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="w-[112px] h-[112px] flex justify-center items-center bg-[#05031A] rounded-full">
                <Image src="/na.png" alt="" width={68} height={50} />
              </div>
              <p className="text-[20px]">North America</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="w-[112px] h-[112px] flex justify-center items-center bg-[#05031A] rounded-full">
                <Image src="/europe.png" alt="" width={68} height={50} />
              </div>
              <p className="text-[20px]">Rest of Europe</p>
            </div>
          </div>
        </div>
      </>
    );
}
 
export default Landing;