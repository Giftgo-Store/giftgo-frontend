"use client";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { PiShoppingCart } from "react-icons/pi";
import { LiaFighterJetSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import Slider from "../commons/Slider";
import Link from "next/link";
import Cookies from "js-cookie";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import Modal from "@/app/components/modals/LoginModal";
import { useRefetch } from "@/app/context/refetchContext";
import { useAppToast } from "@/app/providers/useAppToast";

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

interface Review {
  rating: number;
  comment: string;
  createdAt: string;
  reviewerName: string;
  updatedAt: string;
  _id: string;
}

const Card = ({ lists }: CardProps) => {
  const router = useRouter();
  const toast = useAppToast();

  const [isHovered, setIsHovered] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const { triggerRefetch } = useRefetch();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const openModal1 = () => setShowModal1(true);
  const closeModal1 = () => setShowModal1(false);

  function formatNumberWithCommas(amount: number): string {
    return new Intl.NumberFormat("en-US").format(amount);
  }

  const [showModal, setShowModal] = useState(false);

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents card navigation when opening the modal
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const calculateAverageRating = (reviews: Review[]): number => {
    if (!reviews || reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return averageRating;
  };

  const averageRating = calculateAverageRating(lists?.reviews || []);

  const query = new URLSearchParams({
    quantity: "1",
  }).toString();

  const handleAddToCart = async (e: any, product: any) => {
    e.stopPropagation();
    const token = Cookies.get("token");
    if (!token) {
      openModal1();
      setShowLogin(true);
      return;
    }
    if (1 > product?.stockQuantity) {
      toast({
        status: "error",
        description: `Not enough stock. Only ${product.stockQuantity} stocks are available at the moment.`,
      });
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/cart/add`,
        {
          productId: product && product.productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      triggerRefetch();
      toast({
        status: "success",
        description: response.data.message || "Success",
      });
    } catch (error: any) {
      //@ts-ignore
      toast({
        status: "error",
        description:
          //@ts-ignore
          error?.response?.data.message ||
          error?.message ||
          "an error occurred ",
      });
      if (error?.response?.status === 401) {
        Cookies.remove("token");
        return;
      }
    } finally {
      // Any cleanup or final actions
    }
  };

  return (
    <>
      {showLogin && <Modal showModal={showModal1} closeModal={closeModal1} />}
      <Slider
        showModal={showModal}
        closeModal={closeModal}
        images={lists?.images}
      />
      <div
        className="w-[45%] lg:w-[290px] flex flex-col gap-[16px] border-[#E4E7E9] border-[1px] rounded-[2px] lg:rounded-[8px] p-[8px] drop-shadow-sm hover:shadow-2xl shadow-white/12 cursor-pointer relative"
        onClick={() => router.push(`/product/${lists?.productId}`)}
      >
        {lists && lists?.expressShipping === "true" && (
          <div className="bg-primary rounded-br-[2px] lg:rounded-br-[8px] rounded-tl-[2px] lg:rounded-tl-[8px] absolute top-0 left-0 py-[4px] lg:py-[7px] px-[6px] lg:px-[10px] flex justify-center items-center lg:gap-1 text-white z-50">
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
            src={lists?.images[0]}
            alt=""
            width={276}
            height={256}
            className="relative z-0 object-cover lg:h-[300px] lg:w-[276px] bg-red-400"
          />
          {isHovered && (
            <div className="w-full h-full bg-cardBg z-40 absolute top-0 flex justify-center items-center">
              <div className="flex justify-center items-center gap-2">
                <div
                  className="w-[48px] h-[48px] rounded-full bg-primary flex justify-center items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/product/${lists?.productId}`);
                  }}
                >
                  <PiShoppingCart className="w-[24px] h-[24px] text-white" />
                </div>
                <div
                  className="w-[48px] h-[48px] rounded-full bg-white flex justify-center items-center"
                  onClick={openModal}
                >
                  <IoEyeOutline className="w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[14px] leading-1 font-[500] text-[#475156] lg:pb-1">
            {lists?.productName}
          </p>
          <p className="hidden lg:block text-[13px] font-[500] text-[#838f95] lg:pb-1">
            {lists?.description.slice(0, 30) + "..."}
          </p>

          <div className="flex justify-start items-center gap-[2px]">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < averageRating
                    ? "text-[#FA8232] w-[13px] h-[12px]"
                    : "text-gray-300 w-[13px] h-[12px]"
                }
              />
            ))}
            <p className="text-[#77878F] text-[12px] pl-1">
              ({lists?.reviews?.length})
            </p>
          </div>
          <p className="text-[[#05031A]] text-[16px] font-[600] py-1 lg:py-2">
            ₦ {formatNumberWithCommas(lists?.salePrice)}
          </p>
          <div className="flex justify-between items-center gap-2 w-full">
            <Image
              src="/Buy 2.svg"
              alt=""
              width={22}
              height={22}
              className=""
              onClick={(e) => handleAddToCart(e, lists)}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/order-now/${lists && lists.productId}?${query}`);
              }}
              type="submit"
              className="w-full bg-primary relative z-[999] hover:bg-[#05031A]  text-white py-2 lg:h-[48px] h-[35px] rounded-[8px] flex justify-center items-center gap-4 font-[700]"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
