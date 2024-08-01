import Image from "next/image";
import '../../globals.css'
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

const Footer = () => {
    return (
      <>
        <div className="py-[56px] px-[8%] flex flex-col justify-center items-center gap-[40px] bg-primary w-full flex-wrap">
          <Image src="/icon.svg" alt="" width={158} height={64} />
          <div>
            <p className="text-center text-white text-[18px] pb-[16px]">
              For enquiries, call
            </p>
            <p className="text-center text-white text-[18px]">
              +234 9000000000
            </p>
          </div>

          <div className="flex justify-between flex-wrap gap-7 items-center w-full">
            <div className="flex justify-start gap-[24px] text-white lg:w-[30%]">
              <FaFacebook className="w-[24px] h-[24px]" />
              <FaXTwitter className="w-[24px] h-[24px]" />
              <FaInstagram className="w-[24px] h-[24px]" />
            </div>

            <p className="text-white text-[13px] ">© 2024 Giftgo</p>

            <div className="flex justify-end items-center gap-2 text-white lg:w-[30%]">
              <div className="flex justify-center items-center gap-1 py-[2px] rounded-[4px] px-2 bg-white">
                <IoIosSend className="w-[15px] h-[15px] text-black" />
                <p className="text-[11px] font-[500] text-black">
                  BANK TRANSFER
                </p>
              </div>
              <Image src="/master.png" alt="" width={32} height={23} />
              <Image src="/visa.png" alt="" width={32} height={23} />
            </div>
          </div>
        </div>
      </>
    );
}
 
export default Footer;