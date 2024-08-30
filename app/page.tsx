/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Card from "./components/cards/Card";
import Category from "./components/commons/Category";
import "./globals.css";
import Image from "next/image";
import { IoTrophyOutline } from "react-icons/io5";
import { PiCreditCardLight, PiHeadphones } from "react-icons/pi";
import { LiaShippingFastSolid } from "react-icons/lia";
import axios from "axios";
import BASE_URL from "./config/baseurl";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
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

const Landing = () => {
  const [location, setLocation] = useState([]);

  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const { ref: ref3, inView: inView3 } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

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

  return (
    <>
      <div className="mx-[0%] lg:mx-[8%] hero pt-[20px] lg:pt-[90px] px-[20px] lg:px-[80px] rounded-b-[32px] flex justify-between item-end mb-[32px] flex-row relative overflow-hidden">
        <div className="flex flex-col items-start justify-center pb-[16px] lg:pb-[40px]">
          <motion.div
            ref={ref3}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: inView3 ? 1 : 0, y: inView3 ? 0 : -100 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#808080] text-[14px] lg:text-[20px]">
              Welcome to Giftgo online store.{" "}
            </p>
          </motion.div>

          <motion.div
            ref={ref2}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: inView2 ? 1 : 0, x: inView2 ? 0 : -100 }}
            transition={{ duration: 0.8 }}
            className="w-[80vw] lg:w-[40vw] overflow-hidden"
          >
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={0}
              // slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                <h1 className="lg:pt-2 lg:leading-[50px] tracking-[-0.8px] text-[24px] lg:text-[48px] font-[600] text-[#191C1F] pb-[16px] lg:pb-[40px]">
                  Bringing the World to <br className="hidden lg:block" /> You -{" "}
                  <br className="lg:hidden" />
                  Explore Diverse <br className="" /> Products!
                </h1>
              </SwiperSlide>
              <SwiperSlide>
                <h1 className="lg:pt-2 lg:leading-[50px] tracking-[-0.8px] text-[24px] lg:text-[48px] font-[600] text-[#191C1F] pb-[16px] lg:pb-[40px]">
                  Shop the Best Selection <br /> from Around the <br className="lg:hidden" /> Globe!
                </h1>
              </SwiperSlide>
              <SwiperSlide>
                <h1 className="lg:pt-2 lg:leading-[50px] tracking-[-0.8px] text-[24px] lg:text-[48px] font-[600] text-[#191C1F] pb-[16px] lg:pb-[40px]">
                  Welcome - Your Global Destination for Quality Goods!
                </h1>
              </SwiperSlide>
            </Swiper>
          </motion.div>

          <Link
            href={"#location"}
            className="py-[12px] lg:py-[18px] px-[20px] lg:px-[40px] rounded-[4px] bg-primary hover:bg-[#05031A] text-white text-[16px] font-[600]"
          >
            Shop Now
          </Link>
        </div>
        <motion.div
          ref={ref1}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: inView1 ? 1 : 0, y: inView1 ? 0 : -100 }}
          transition={{ duration: 0.8 }}
          className="flex justify-end items-end absolute lg:relative bottom-0 right-0"
        >
          <Image
            src="/ted.png"
            alt=""
            width={430}
            height={386}
            className="w-[197px] h-[176px] lg:w-[430px] lg:h-[386px]"
          />
        </motion.div>
      </div>

      <div className="hidden lg:flex justify-center items-center w-full relative z-[99]">
        <div className="border-[##E1E3E599] w-[55%] -mt-[4%] border-[1px] bg-[#FFFFFF99] flex gap-2 justify-between items-center p-2 mx-[4%] lg:mx-[8%] rounded-t-[12px] rounded-b-[24px] mb-[84px] overflow-x-auto">
          <div className="p-6 lg:p-3 whitespace-nowrap lg:whitespace-wrap flex justify-between items-center gap-5">
            <LiaShippingFastSolid className="w-8 h-8 text-[#191C1F]" />
            <div className="flex flex-col gap-0 items-start">
              <h2 className="text-[14px] text-[#191C1F] font-[500] leading-0">
                FREE SHIPPING
              </h2>
              <p className="text-[#5F6C72] text-[13px] font-[500] leading-0">
                Delivery in 24/7
              </p>
            </div>
          </div>
          <div className="p-6 lg:p-3 whitespace-nowrap lg:whitespace-wrap flex justify-between items-center gap-5">
            <PiHeadphones className="w-8 h-8 text-[#191C1F]" />
            <div className="flex flex-col gap-0 items-start">
              <h2 className="text-[14px] text-[#191C1F] font-[500] leading-0">
                SUPPORT 24/7
              </h2>
              <p className="text-[#5F6C72] text-[13px] font-[500] leading-0">
                Live contact/message
              </p>
            </div>
          </div>
          {/* <div className="p-6 lg:p-3 whitespace-nowrap lg:whitespace-wrap flex justify-between items-center gap-5">
            <IoTrophyOutline className="w-8 h-8 text-[#191C1F]" />
            <div className="flex flex-col gap-0 items-start">
              <h2 className="text-[14px] text-[#191C1F] font-[500] leading-0">
                24 HOUR RETURN
              </h2>
              <p className="text-[#5F6C72] text-[13px] font-[500] leading-0">
                100% money-back guarantee
              </p>
            </div>
          </div> */}
          <div className="p-6 lg:p-3 whitespace-nowrap lg:whitespace-wrap flex justify-between items-center gap-5">
            <PiCreditCardLight className="w-8 h-8 text-[#191C1F]" />
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
      </div>

      <div className="text-[#191C1F] py-[24px] lg:py-[56px] bg-[#FFFCF5] mb-[40px] lg:mb-[90px] relative  min-h-[400px] overflow-hidden">
        <h2 className="text-center font-[600] text-[26px] pb-[24px]">
          Shop By
        </h2>
        <Image
          src="/first.svg"
          alt=""
          width={430}
          height={386}
          className="hidden lg:block absolute right-0 top-0"
        />{" "}
        <Image
          src="/second.svg"
          alt=""
          width={430}
          height={386}
          className="hidden lg:block absolute left-0 bottom-0"
        />
        <div
          id="location"
          className="lg:py-10 px-10 lg:px-20 w-full flex justify-center items-center lg:gap-x-[140px] gap-y-5 gap-x-8 lg:gap-y-10 flex-wrap"
        >
          {location.length > 0 &&
            location.map((loc: any, i: any) => {
              return (
                <Link
                  href={`/category/${loc._id}`}
                  key={i}
                  className="flex flex-col items-center justify-center gap-1"
                  onClick={() => Cookies.set("location", loc.location)}
                >
                  <div className="w-[72px] lg:w-[112px] h-[72px] lg:h-[112px] flex justify-center items-center bg-[#FBDFDF3D] relative z-[99] rounded-full">
                    <Image
                      src={loc.image}
                      alt=""
                      width={68}
                      height={50}
                      quality={100}
                      unoptimized={true}
                      className="w-[30px] h-[20px] lg:w-[32px] lg:h-[24px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-150"
                    />
                  </div>
                  <p className="text-[14px] lg:text-[20px] relative z-[99]">
                    {loc.location}
                  </p>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Landing;
