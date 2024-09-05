"use client";

import Card from "@/app/components/cards/Card";
import {
  FaArrowRight,
  FaArrowLeft,
  FaXTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { FaStar } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";
import {
  PiShoppingCart,
  PiMedalLight,
  PiCreditCardLight,
  PiHeadphones,
} from "react-icons/pi";
import { IoCopyOutline } from "react-icons/io5";
import { LiaFighterJetSolid } from "react-icons/lia";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import Modal from "@/app/components/modals/LoginModal";
import { useRefetch } from "@/app/context/refetchContext";
import Link from "next/link";
import { useAppToast } from "@/app/providers/useAppToast";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Skeleton } from "@nextui-org/react";

interface Review {
  rating: number;
  comment: string;
  createdAt: string;
  reviewerName: string;
  updatedAt: string;
  _id: string;
}

const Page = () => {
  const toast = useAppToast();
  const { triggerRefetch } = useRefetch();
  const params = useParams();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("1");
  const [showMore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showLogin, setShowLogin] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const [product, setProduct] = useState<any>([]);
  const [relatedProduct, setRelatedProduct] = useState<any>([]);
  const location = Cookies.get("location");
  console.log(params);
  const token = Cookies.get("token");

    const handleBack = () => {
      router.back();
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/products/${params && params.id}`
        );
        setProduct(response.data.data);
        setLoadingImages(false);
      } catch (error: any) {
        console.error(
          //@ts-ignore
          "Error fetching resource"
          // error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };

    fetchData();
  }, [location, params]);

  const query = new URLSearchParams({
    quantity: quantity.toString(),
  }).toString();

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/products/${params && params.id}/related`
        );
        setRelatedProduct(response.data.data);
      } catch (error: any) {
        console.error(
          //@ts-ignore
          "Error fetching resource"
          // error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };

    fetchData();
  }, [location, params]);

  console.log(relatedProduct);

  const handleAddToCart = async () => {
    const token = Cookies.get("token");
    if (!token) {
      console.log("No token");
      openModal();
      setShowLogin(true);
      return;
    }
    if (quantity > product?.stockQuantity) {
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
          productId: params && params.id,
          quantity: quantity,
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

  console.log(product && product.reviews);

  const calculateAverageRating = (reviews: Review[]): number => {
    if (!reviews || reviews.length === 0) return 0; // Correct check for empty array

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return averageRating;
  };

  const averageRating = calculateAverageRating(product && product.reviews);
  console.log(`Average Rating: ${averageRating}`);

  return (
    <div className="">
      {showLogin && <Modal showModal={showModal} closeModal={closeModal} />}
      <div className="py-[20px] px-[8%] bg-secondary mb-[56px]">
        <h2
          className="font-[600] leading-[32px] text-[28px] text-[#191C1F]"
          onClick={() => (token ? router.push("/account") : openModal())}
        >
          {location} Store
        </h2>
        <p className="text-[#475156] text-[18px] font-[500]">
          <span className="cursor-pointer" onClick={() => router.push("/")}>
            Home
          </span>{" "}
          / <span className="cursor-pointer">Shop</span> /{" "}
          <span className="cursor-pointer" onClick={handleBack}>
            {location} store
          </span>{" "}
          / {product && product?.category?.name}
        </p>
      </div>

      <div className="flex justify-center lg:justify-between items-center flex-col lg:flex-row px-[4%] lg:px-[8%] mt-[20px] lg:mt-[56px] mb-[24px] w-full">
        <div className="lg:w-[50%] flex-col justify-start items-start lg:px-[24px] gap-2 h-full overflow-x-hidden">
          {loadingImages ? (
            <Skeleton
              // width="100%"
              // height="315px"
              className="w-full lg:w-[80%] h-[315px] object-cover rounded-[8px]"
            />
          ) : (
            <Image
              src={product && product?.images && product?.images[0]}
              alt=""
              width={174}
              height={148}
              className="w-full lg:w-[80%] h-[315px] object-cover rounded-[8px] transition-transform duration-300 ease-in-out transform hover:scale-95"
              onClick={() => openLightbox(0)}
            />
          )}
          <div className="flex gap-2 w-[80%] justify-between mt-2 items-center relative overflow-x-hidden z-40">
            <div className=" absolute cursor-pointer -left-6 custom-nextt z-40">
              <div className="h-12 w-12 rounded-full bg-primary flex justify-center items-center z-[999]">
                <FaArrowLeft className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="absolute cursor-pointer -right-6 custom-prevv z-40">
              <div className="h-12 w-12 rounded-full bg-primary flex justify-center items-center">
                <FaArrowRight className="h-6 w-6 text-white " />
              </div>
            </div>
            <div className="w-full">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={10}
                slidesPerView={product?.images?.length === 1 ? 1 : 2}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: ".custom-nextt",
                  prevEl: ".custom-prevv",
                }}
              >
                {product &&
                  product?.images &&
                  product?.images.map((image: string, index: number) => (
                    <SwiperSlide
                      key={index}
                      className="flex justify-center items-center w-full"
                    >
                      <div
                        className="relative flex justify-center gap-2 items-center"
                        onClick={() => openLightbox(index)}
                      >
                        <Image
                          src={image}
                          alt={`product image ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-[80px] h-[80px] object-cover cursor-pointer rounded-[8px]"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>

        <div className="flex lg:w-[50%] pt-[50px] lg:pt-0 flex-col items-start lg:pl-[4%]">
          <div className="mb-[20px] lg:mb-[48px]">
            <h2 className="text-[#191C1F] text-[28px] font-[600]">
              {product && product?.productName}
            </h2>
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
                ({product && product.reviews && product.reviews.length})
              </p>
            </div>
          </div>

          <p className="text-[#505050] lg:pr-[14%] mb-[20px]">
            {product && product?.description}
          </p>

          <div className="flex flex-col lg:flex-row justify-between w-full gap-4 items-start lg:items-center">
            <div className="flex w-full lg:w-fit justify-center items-center gap-[35px] text-[#191C1F] px-6 py-4 border-[#E4E7E9] border-[2px] rounded-[3px]">
              <FiMinus
                className="w-4 h-4 cursor-pointer"
                onClick={handleDecrease}
              />
              <p>{quantity}</p>
              <FiPlus
                className="w-4 h-4 cursor-pointer"
                onClick={handleIncrease}
              />
            </div>
            <button
              className="flex w-full lg:w-fit justify-center items-center gap-2 text-white px-8 py-4 bg-primary hover:bg-[#05031A]  rounded-[3px] font-[700]"
              onClick={handleAddToCart}
            >
              <p>ADD TO CART</p>
              <PiShoppingCart className="w-6 h-6 cursor-pointer" />
            </button>
            <Link
              href={`/order-now/${product && product._id}?${query}`}
              className="flex w-full lg:w-fit justify-center items-center gap-[35px] text-[#191C1F] px-7 py-4 border-primary border-[2px] rounded-[3px] font-[700] text-[16px]"
            >
              <p>BUY NOW</p>
            </Link>
          </div>

          <div className="flex justify-end items-center w-full text-[#475156] gap-3 mt-1">
            <p className="text-[14px]">Share product: </p>
            <div className="flex justify-end gap-2 items-center">
              <IoCopyOutline className="w-5 h-5 cursor-pointer" />
              <FaXTwitter className="w-4 h-4 cursor-pointer" />
              <FaFacebook className="w-4 h-4 cursor-pointer" />
              <FaInstagram className="w-4 h-4 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-[4%] lg:px-[8%] flex justify-center items-center flex-col">
        <div className="pt-[18px] flex justify-center items-center gap-3 border-b-[1px] border-b-[#E4E7E9] w-full">
          <p
            onClick={() => setActiveNav("1")}
            className={`${
              activeNav === "1"
                ? "bg-white text-[#191C1F] border-b-[3px] border-b-primary"
                : "backdrop-blur mx-2 text-[#475156]"
            } px-4 py-4 transition-all ease-out duration-200  hover:scale-95 text-[14px] font-[500] cursor-pointer`}
          >
            DESCRIPTION
          </p>
          <p
            onClick={() => setActiveNav("2")}
            className={`${
              activeNav === "2"
                ? "bg-white text-[#191C1F] border-b-[3px] border-b-primary"
                : "backdrop-blur mx-2 text-[#475156]"
            } px-4 py-4 transition-all ease-out duration-200  hover:scale-95 text-[14px] font-[500] cursor-pointer`}
          >
            REVIEW
          </p>
        </div>

        {activeNav === "1" && (
          <div className="flex justify-between items-start mt-[24px] flex-col lg:flex-row lg:gap-[86px] gap-6">
            <div className="text-[14px]">
              <h2 className="text-[#191C1F] font-[500]">Description</h2>
              <p className="text-[#5F6C72] mt-2 lg:mt-3">
                {product && product?.description}
              </p>
            </div>
            <div className="text-[14px] text-[#191C1F] whitespace-nowrap">
              <h2 className="text-[#191C1F] font-[500]">Feature</h2>
              <div className="flex flex-col items-start gap-3 mt-2 lg:mt-4">
                <div className="flex justify-start items-center gap-1">
                  <PiMedalLight className="text-[#FA8232] h-6 w-6" />
                  <p>Free 1 Year Warranty</p>
                </div>
                <div className="flex justify-start items-center gap-1 whitespace-nowrap">
                  <LiaShippingFastSolid className="text-[#FA8232] h-6 w-6" />
                  <p>Free Shipping and Fast Delivery</p>
                </div>
                <div className="flex justify-start items-center gap-1">
                  <PiHeadphones className="text-[#FA8232] h-6 w-6" />
                  <p>24/7 Customer Support</p>
                </div>
                <div className="flex justify-start items-center gap-1">
                  <PiCreditCardLight className="text-[#FA8232] h-6 w-6" />
                  <p>Secure Payment Method</p>
                </div>
              </div>
            </div>
            <div className="bg-[#E4E7E9] h-[180px] w-[1px] hidden lg:block"></div>

            <div className="text-[14px] text-[#191C1F] whitespace-nowrap">
              <h2 className="text-[#191C1F] font-[500]">
                Shipping Information
              </h2>
              {product.expressShipping === "true" && (
                <div className="bg-primary rounded-br-[8px] mt-2 lg:mt-5 rounded-tl-[8px] py-[5px] px-[12px] flex justify-center items-center gap-1 text-white w-[fit-content]">
                  <LiaFighterJetSolid />
                  <p className="text-[11px]">Express shipping</p>
                </div>
              )}
              <p className="text-[#5F6C72] mt-1">
                <span className="font-[500]">Courier : </span> 2-4 days free
                shipping
              </p>
            </div>
          </div>
        )}

        {activeNav === "2" && (
          <div>
            <div className="flex justify-between flex-wrap items-start mt-[24px] gap-[8px]">
              {product &&
                product.reviews &&
                product.reviews.slice(0, 6).map((review: any, i: any) => {
                  const dateString = review.createdAt;
                  const date: Date = new Date(dateString);

                  const day: string = String(date.getDate()).padStart(2, "0");
                  const month: string = String(date.getMonth() + 1).padStart(
                    2,
                    "0"
                  ); // getMonth() is zero-based
                  const year: number = date.getFullYear();

                  const formattedDate: string = `${day}-${month}-${year}`;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-start justify-between lg:w-fit gap-2 "
                    >
                      <div className="flex justify-start items-center gap-[2px]">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={
                              index < review.rating
                                ? "text-[#FA8232] w-[13px] h-[12px]"
                                : "text-gray-300 w-[13px] h-[12px]"
                            }
                          />
                        ))}
                      </div>
                      {/* <h2 className="font-[400] text-[#191C1F] text-[16px]">
                        I like the product
                      </h2> */}
                      <p className="text-[#475156] text-[14px]">
                        {review.comment}
                      </p>
                      <p className="text-[12px] text-[#77878F]">
                        {formattedDate}
                      </p>
                    </div>
                  );
                })}
              {showMore &&
                product &&
                product.reviews &&
                product.reviews.slice(6, 7).map((review: any, i: any) => {
                  const dateString = review.createdAt;
                  const date: Date = new Date(dateString);

                  const day: string = String(date.getDate()).padStart(2, "0");
                  const month: string = String(date.getMonth() + 1).padStart(
                    2,
                    "0"
                  ); // getMonth() is zero-based
                  const year: number = date.getFullYear();

                  const formattedDate: string = `${day}-${month}-${year}`;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-start justify-between lg:w-[30%] gap-2 "
                    >
                      <div className="flex justify-start items-center gap-[2px]">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={
                              index < review.rating
                                ? "text-[#FA8232] w-[13px] h-[12px]"
                                : "text-gray-300 w-[13px] h-[12px]"
                            }
                          />
                        ))}
                      </div>
                      {/* <h2 className="font-[400] text-[#191C1F] text-[16px]">
                        I like the product
                      </h2> */}
                      <p className="text-[#475156] text-[14px]">
                        {review.comment}
                      </p>
                      <p className="text-[12px] text-[#77878F]">
                        {formattedDate}
                      </p>
                    </div>
                  );
                })}

              {showMore &&
                product &&
                product.reviews &&
                product.reviews.slice(7, 8).map((review: any, i: any) => {
                  const dateString = review.createdAt;
                  const date: Date = new Date(dateString);

                  const day: string = String(date.getDate()).padStart(2, "0");
                  const month: string = String(date.getMonth() + 1).padStart(
                    2,
                    "0"
                  ); // getMonth() is zero-based
                  const year: number = date.getFullYear();

                  const formattedDate: string = `${day}-${month}-${year}`;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-start justify-between lg:w-[30%] gap-2 "
                    >
                      <div className="flex justify-start items-center gap-[2px]">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={
                              index < review.rating
                                ? "text-[#FA8232] w-[13px] h-[12px]"
                                : "text-gray-300 w-[13px] h-[12px]"
                            }
                          />
                        ))}
                      </div>
                      {/* <h2 className="font-[400] text-[#191C1F] text-[16px]">
                        I like the product
                      </h2> */}
                      <p className="text-[#475156] text-[14px]">
                        {review.comment}
                      </p>
                      <p className="text-[12px] text-[#77878F]">
                        {formattedDate}
                      </p>
                    </div>
                  );
                })}
              {showMore &&
                product &&
                product.reviews &&
                product.reviews.slice(8, 9).map((review: any, i: any) => {
                  const dateString = review.createdAt;
                  const date: Date = new Date(dateString);

                  const day: string = String(date.getDate()).padStart(2, "0");
                  const month: string = String(date.getMonth() + 1).padStart(
                    2,
                    "0"
                  ); // getMonth() is zero-based
                  const year: number = date.getFullYear();

                  const formattedDate: string = `${day}-${month}-${year}`;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-start justify-between lg:w-[30%] gap-2 "
                    >
                      <div className="flex justify-start items-center gap-[2px]">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={
                              index < review.rating
                                ? "text-[#FA8232] w-[13px] h-[12px]"
                                : "text-gray-300 w-[13px] h-[12px]"
                            }
                          />
                        ))}
                      </div>
                      {/* <h2 className="font-[400] text-[#191C1F] text-[16px]">
                        I like the product
                      </h2> */}
                      <p className="text-[#475156] text-[14px]">
                        {review.comment}
                      </p>
                      <p className="text-[12px] text-[#77878F]">
                        {formattedDate}
                      </p>
                    </div>
                  );
                })}
            </div>

            <div
              className="mt-6 flex justify-center items-center gap-1 text-[#DE732D] text-[14px] font-[600] cursor-pointer"
              onClick={() => setShowMore(!showMore)}
            >
              <p>Load {!showMore ? "More" : "Less"}</p>
              {!showMore ? (
                <GoArrowDown className="w-5 h-5" />
              ) : (
                <GoArrowUp className="w-5 h-5" />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mx-[4%] lg:mx-[8%] mb-[90px] mt-[56px]">
        <div>
          <div className="flex justify-center lg:justify-between items-center mb-6">
            <h2 className=" text-[#191C1F] text-[24px] text-center font-[600]">
              Products you may like
            </h2>
            <Link
              href={"/#location"}
              className=" hidden lg:flex justify-end items-center text-[#EB6363] text-[14px] font-[600] gap-2"
            >
              Browse All Products
              <FaArrowRight />
            </Link>
          </div>
          <div className="flex justify-center items-center flex-wrap gap-6">
            {/* <Card />
            <Card express={true} />
            <Card />
            <Card />
            <Card express={true} />
            <Card />
            <Card express={true} />
            <Card /> */}
            {relatedProduct && relatedProduct ? (
              relatedProduct.map((product: any, i: any) => {
                return <Card key={i} lists={product} />;
              })
            ) : (
              <p className="text-center font-medium">
                No related product available
              </p>
            )}
            <Link
              href={"/#location"}
              className="flex lg:hidden w-full lg:w-fit justify-center items-center gap-[35px] text-white px-7 py-4 bg-primary hover:bg-[#05031A]  rounded-[3px] font-[700] text-[16px]"
            >
              <p> Browse All Products</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
