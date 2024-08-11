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
          "Error fetching resource",
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
      <div className="mx-[4%] lg:mx-[8%] mt-[30px] lg:mt-[96px] bg-secondary pt-[20px] lg:pt-[40px] px-[20px] lg:px-[40px] rounded-[8px] flex justify-between item-end mb-[32px] flex-col lg:flex-row">
        <div className="flex flex-col items-start justify-center lg:pb-[40px]">
          <motion.div
            ref={ref3}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: inView3 ? 1 : 0, y: inView3 ? 0 : -100 }}
            transition={{ duration: 0.5 }}
          >
            <Image src="/icon.svg" alt="" width={118} height={48} />
          </motion.div>

          <motion.h1
            ref={ref2}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: inView2 ? 1 : 0, x: inView2 ? 0 : -100 }}
            transition={{ duration: 0.8 }}
            className="pt-2 lg:leading-[72px] text-[25px] lg:text-[48px] font-[600] text-[#191C1F] pb-[40px]"
          >
            Shop the Best Selection <br className="hidden lg:block" /> from
            Around the Globe at <br className="hidden lg:block" /> GiftGo!
          </motion.h1>

          <Link
            href={"#location"}
            className="py-[18px] px-[40px] rounded-[4px] bg-primary hover:bg-primary/80 text-white text-[16px] font-[600]"
          >
            Shop Now
          </Link>
        </div>
        <motion.div
          ref={ref1}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: inView1 ? 1 : 0, y: inView1 ? 0 : -100 }}
          transition={{ duration: 0.8 }}
          className="flex justify-end items-end"
        >
          <Image src="/teddy.png" alt="" width={430} height={386} />
        </motion.div>
      </div>

      <div className="border-[#E4E7E9] border-[1px] bg-[#F5F5F5] flex gap-2 justify-between items-center p-2 mx-[4%] lg:mx-[8%] rounded-[8px] mb-[84px] overflow-x-auto">
        <div className="p-6 lg:p-4 whitespace-nowrap lg:whitespace-wrap flex justify-between items-center bg-white gap-2">
          <LiaShippingFastSolid className="w-10 h-10 text-[#191C1F]" />
          <div className="flex flex-col gap-0 items-start">
            <h2 className="text-[14px] text-[#191C1F] font-[500] leading-0">
              FREE SHIPPING
            </h2>
            <p className="text-[#5F6C72] text-[13px] font-[500] leading-0">
              Delivery in 24/7
            </p>
          </div>
        </div>

        <div className="p-6 lg:p-4 whitespace-nowrap lg:whitespace-wrap flex justify-between items-center bg-white gap-2">
          <PiHeadphones className="w-10 h-10 text-[#191C1F]" />
          <div className="flex flex-col gap-0 items-start">
            <h2 className="text-[14px] text-[#191C1F] font-[500] leading-0">
              SUPPORT 24/7
            </h2>
            <p className="text-[#5F6C72] text-[13px] font-[500] leading-0">
              Live contact/message
            </p>
          </div>
        </div>

        <div className="p-6 lg:p-4 whitespace-nowrap lg:whitespace-wrap flex justify-between items-center bg-white gap-2">
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

        <div className="p-6 lg:p-4 whitespace-nowrap lg:whitespace-wrap flex justify-between items-center bg-white gap-2">
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

      <div className="mx-[4%] lg:mx-[8%] text-[#191C1F] mb-[90px]">
        <h2 className="text-center font-[600] text-[26px] pb-[24px]">
          Shop By
        </h2>

        <div
          id="location"
          className="bg-[#F5F5F5] py-10 px-10 lg:px-20 w-full flex justify-center items-center lg:gap-x-[140px] gap-y-5 gap-x-14 lg:gap-y-10 flex-wrap"
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
                  <div className="w-[90px] lg:w-[112px] h-[90px] lg:h-[112px] flex justify-center items-center bg-[#05031A] rounded-full">
                    <Image src={loc.image} alt="" width={68} height={50} />
                  </div>
                  <p className="text-[20px]">{loc.location}</p>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Landing;
