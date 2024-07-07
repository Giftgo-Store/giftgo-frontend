"use client";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { PiShoppingCart } from "react-icons/pi";
import { LiaFighterJetSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import Slider from "../commons/Slider";

type List = {
  brandName: string;
  images: string[];
  createdAt: string;
  description: string;
  expressShipping: string;
  productName: string;
  regularPrice: string;
  salesPrice: string;
  stockQuantity: string;
  _id: string;
};

type CardProps = {
  lists: List | any;
};

const Card = ({ lists }: CardProps) => {
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [showImg, setShowImg] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  function formatNumberWithCommas(amount: number): string {
    return new Intl.NumberFormat("en-US").format(amount);
  }

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  console.log(lists);

  return (
    <>
      <Slider
        showModal={showModal}
        closeModal={closeModal}
        images={lists?.images}
      />
      <div className="w-[290px] flex flex-col gap-[16px] border-[#E4E7E9] border-[1px] rounded-[8px] p-[8px] drop-shadow-sm hover:shadow-2xl shadow-white/12 cursor-pointer relative">
        {lists && lists?.expressShipping && (
          <div className="bg-primary rounded-br-[8px] rounded-tl-[8px] absolute top-0 left-0 py-[7px] px-[10px] flex justify-center items-center gap-1 text-white z-50">
            <LiaFighterJetSolid />
            <p className="text-[11px]">Express shipping</p>
          </div>
        )}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={lists && lists?.images && lists?.images[0]}
            alt=""
            width={276}
            height={256}
            className="relative z-0 object-cover h-[300px] w-[276px]"
          />
          {isHovered && (
            <div className="w-full h-full bg-cardBg z-40 absolute top-0 flex justify-center items-center">
              <div className="flex justify-center items-center gap-2">
                <div
                  className="w-[48px] h-[48px] rounded-full bg-primary flex justify-center items-center"
                  onClick={() => router.push(`/product/${lists && lists._id}`)}
                >
                  <PiShoppingCart className="w-[24px] h-[24px] text-white" />
                </div>
                <div
                  className="w-[48px] h-[48px] rounded-full bg-white flex justify-center items-center"
                  onClick={() => openModal()}
                >
                  <IoEyeOutline className="w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[14px] font-[500] text-[#475156] pb-1">
            {lists && lists.productName}
          </p>
          <p className="text-[14px] font-[500] text-[#475156] pb-1">
            {lists &&
              lists?.description &&
              lists.description.slice(0, 30) + "..."}
          </p>

          <div className="flex justify-start items-center gap-[2px]">
            <FaStar className="text-[#FA8232] w-[13px] h-[12px]" />
            <FaStar className="text-[#FA8232] w-[13px] h-[12px]" />
            <FaStar className="text-[#FA8232] w-[13px] h-[12px]" />
            <FaStar className="text-[#FA8232] w-[13px] h-[12px]" />
            <FaStar className="text-[#FA8232] w-[13px] h-[12px]" />
            <p className="text-[#77878F] text-[12px] pl-1">(583)</p>
          </div>
          <p className="text-[#05031A] text-[16px] font-[600] pt-2">
            ₦ {formatNumberWithCommas(lists && lists?.salePrice)}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
