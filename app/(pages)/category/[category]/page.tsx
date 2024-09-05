/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Card from "@/app/components/cards/Card";
import Category from "@/app/components/commons/Category";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
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

const page = () => {
  const toast = useAppToast();
  const params = useParams();
  console.log(params?.category);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState<any>([]);
  const [revPerPage, setRevPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setRevPerPage(1);
      }
    };
    console.log(revPerPage, window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [revPerPage]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setRevPerPage(4);
      }
    };
    console.log(revPerPage, window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [revPerPage]);

  const location = Cookies.get("location");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/products/location/${location}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${Cookies.get("token")}`,
          //   },
          // }
        );
        setProduct(response.data.data.products[0]);
        // Handle successful response, e.g., save token, redirect, etc.
      } catch (error) {
        //@ts-ignore
        // toast({
        //   status: "error",
        //   description:
        //     //@ts-expect-error
        //     error?.response?.data || error?.message || "an error occurred ",
        // });
      } finally {
        // Any cleanup or final actions
      }
    };

    fetchData();
  }, [params?.category]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/products/locate/${location} `
        );
        setCategory(response.data.data);
        // Handle successful response, e.g., save token, redirect, etc.
      } catch (error) {
        //@ts-ignore
        // toast({
        //   status: "error",
        //   description:
        //     //@ts-expect-error
        //     error?.response?.data || error?.message || "an error occurred ",
        // });
      } finally {
        // Any cleanup or final actions
      }
    };

    fetchData();
  }, [params?.category]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${BASE_URL}/api/v1/products/location/${location}`
  //       );
  //       console.log(response.data.data.data);
  //       setCategory(response.data.data);
  //       // Handle successful response, e.g., save token, redirect, etc.
  //     } catch (error) {
  //       //@ts-ignore
  //       // toast({
  //       //   status: "error",
  //       //   description:
  //       //     //@ts-expect-error
  //       //     error?.response?.data || error?.message || "an error occurred ",
  //       // });
  //     } finally {
  //       // Any cleanup or final actions
  //     }
  //   };

  //   fetchData();
  // }, [params && params.category]);
  const cat = category && category.map((cat:any) => cat.products)

  const allItems = cat.flatMap((innerArray) => innerArray);

  console.log(allItems)

  return (
    <>
      <div className="py-[20px] px-[4%] lg:px-[8%] bg-secondary mb-[56px]">
        <h2 className="font-[600] leading-[32px] text-[28px] text-[#191C1F]">
          {location} Store
        </h2>
        <p className="text-[#475156] text-[18px] font-[500]">
          <Link href={"/"}>Home</Link> / Search
        </p>
      </div>

      <div className="py-4 bg-[#F5F5F5] px-[4%] lg:mx-[8%] mb-[32px]">
        <h2 className="text-[#191C1F] text-[24px] text-center font-[600]">
          Shop By Categories
        </h2>

        <div className="mt-[24px] w-full flex justify-between items-center relative overflow-x-hidden gap-4">
          <div>
            <div className="h-12 w-12 rounded-full bg-primary flex justify-center items-center cursor-pointer custom-nextt z-40">
              <FaArrowLeft className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="flex justify-center items-center w-[100%] overflow-x-hidden ">
            {category && category.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={20}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  prevEl: ".custom-nextt",
                  nextEl: ".custom-prevv",
                }}
                breakpoints={{
                  640: {
                    slidesPerView:
                      category.length === 1 ? 1 : category.length === 2 ? 2 : 2,
                  },
                  768: {
                    slidesPerView:
                      category.length === 1 ? 1 : category.length === 2 ? 2 : 2,
                  },
                  1024: {
                    slidesPerView:
                      category.length === 1
                        ? 1
                        : category.length === 2
                        ? 2
                        : category.length === 3
                        ? 3
                        : 4,
                  },
                }}
              >
                {category &&
                  category.map((cat: any, i: any) => {
                    console.log(cat);
                    return (
                      <SwiperSlide
                        key={i}
                        className="flex justify-center items-center"
                      >
                        <div className=" flex justify-center items-center">
                          <Category
                            key={i}
                            catId={cat}
                            paramId={params && params.category}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            ) : (
              "No available category"
            )}
          </div>
          <div>
            <div className="h-12 w-12 rounded-full bg-primary flex justify-center items-center cursor-pointer custom-prevv z-40">
              <FaArrowRight className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-[4%] lg:mx-[8%] mb-[90px]">
        <div>
          <div className="flex justify-center lg:justify-between items-center mb-6">
            <h2 className="text-[#191C1F] text-[24px] text-center font-[600]">
              Products you may like
            </h2>
            <Link
              href={`/category/${params && params.category}/all`}
              className="hidden lg:flex justify-end items-center text-[#EB6363] text-[14px] font-[600] gap-2"
            >
              Browse All Products
              <FaArrowRight />
            </Link>
          </div>
          <div className="flex justify-center items-center flex-wrap gap-6">
            {allItems ? (
              allItems.map((product: any, i: any) => {
                return <Card key={i} lists={product} />;
              })
            ) : (
              <p className="text-center font-medium">No product available</p>
            )}

            <Link
              href={`/category/${params && params.category}/all`}
              className="flex lg:hidden w-full lg:w-fit justify-center items-center gap-[35px] text-white px-7 py-4 bg-primary hover:bg-[#05031A]  rounded-[3px] font-[700] text-[16px]"
            >
              <p> Browse All Products</p>
            </Link>
          </div>
        </div>

        <div className="flex gap-4 justify-between flex-col lg:flex-row items-center my-[32px]">
          <div className="w-full lg:w-[50%] bg-[#F2F4F5] pt-[36px] pl-[36px] pr-[10px] flex justify-between flex-col lg:flex-row items-center lg:items-end rounded-[4px]">
            <div className="flex flex-col items-start justify-center lg:pb-[60px] lg:w-[50%]">
              <p className="bg-secondary py-2 px-3 rounded-[2px] text-[#475156] text-[14px] font-[600]">
                INTRODUCING
              </p>
              <h1 className="pt-2 leading-[45px] text-[36px] font-[600] text-[#191C1F] pb-[12px]">
                Exotic Fluffy <br className="hidden lg:block" /> Teddy Bear
              </h1>
              <p className="text-[#475156] pb-[20px] font-[500]">
                Shop for you best sellers the nicest{" "}
                <br className="hidden lg:block" /> fluffiest teddy bears{" "}
              </p>

              <button className="py-[14px] px-[10px] lg:px-[24px] rounded-[2px] hover:bg-[#05031A]  bg-primary text-white text-[16px] font-[600] flex justify-center items-center gap-2">
                SHOP NOW <FaArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-end items-center lg:w-[50%]">
              <Image
                src="/teddy2.png"
                alt=""
                width={290}
                height={280}
                className="w-[340px]"
              />
            </div>
          </div>
          <div className="w-full lg:w-[50%] bg-[#191C1F] pt-[36px] lg:pl-[36px] flex justify-between items-center lg:items-end flex-col lg:flex-row rounded-[4px]">
            <div className="flex flex-col items-start justify-center pb-[60px] lg:w-[50%]">
              <p className="bg-secondary py-2 px-3 rounded-[2px] text-[#475156] text-[14px] font-[600]">
                INTRODUCING
              </p>
              <h1 className="pt-2 leading-[45px] text-[36px] font-[600] text-white pb-[12px]">
                Exotic Fluffy <br /> Teddy Bear
              </h1>
              <p className="text-[#ADB7BC] pb-[20px] font-[500]">
                Shop for you best sellers the nicest <br /> fluffiest teddy
                bears{" "}
              </p>

              <button className="py-[14px] px-[24px] rounded-[2px] bg-primary hover:bg-[#05031A]  text-white text-[16px] font-[600] flex justify-center items-center gap-2">
                SHOP NOW <FaArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-end items-center lg:w-[50%] relative">
              <div className="flex justify-center text-center items-center w-[100px] h-[88px] rounded-full bg-secondary absolute -top-3 right-6">
                <div className="flex flex-col text-center items-center gap-0">
                  <p className="leading-0 text-[13px]">From</p>
                  <p className="leading-0 font-[600] text-[#475156] text-[14px]">
                    ₦5900
                  </p>
                </div>
              </div>
              <Image
                src="/pef.png"
                alt=""
                width={290}
                height={280}
                className="w-[360px] h-[320px]"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-center lg:justify-between items-center mb-6">
            <h2 className="text-[#191C1F] text-[24px] text-center font-[600]">
              Fastest Delivery Available
            </h2>
            <Link
              href={`/category/${params && params.category}/all`}
              className="hidden lg:flex justify-end items-center text-[#EB6363] text-[14px] font-[600] gap-2"
            >
              Browse All Products
              <FaArrowRight />
            </Link>
          </div>
          <div className="flex justify-center items-center flex-wrap gap-6">
            {product && product?.products ? (
              product.products.map((product: any, i: any) => {
                return (
                  product &&
                  product?.expressShipping === "true" && (
                    <Card key={i} lists={product} />
                  )
                );
              })
            ) : (
              <p className="text-center font-medium">
                No express product available
              </p>
            )}
            <Link
              href={`/category/${params && params.category}/category-detail/${
                params && params.category
              }`}
              className="flex lg:hidden w-full lg:w-fit justify-center items-center gap-[35px] text-white px-7 py-4 bg-primary hover:bg-[#05031A]  rounded-[3px] font-[700] text-[16px]"
            >
              <p> Browse All Products</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
