"use client";

import Image from "next/image";
import Card from "@/app/components/Card";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import Cookies from "js-cookie";

const Page = () => {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/products/search`,
          {
            query: searchParams?.get("product"),
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        console.log(response.data.data.length);
        // Handle successful response, e.g., save token, redirect, etc.
        if (response.data.data.length > 0) {
          setResult(response.data.data);
          console.log("trueeeeeee");
          setShowResult(true);
          return;
        } else {
          setShowResult(false);
          return;
        }

        console.log("Successful", response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource", error?.response?.data || error?.message );
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchCartItems();
  }, [searchParams]);

  console.log(result);
  console.log(showResult);

  const handleShow = () => {
    setShowResult(true);
  };
  return (
    <>
      <div className="py-[20px] px-[4%] lg:px-[8%] text-center bg-secondary ">
        <h2 className="font-[600] leading-[32px] text-[28px] text-[#191C1F] pb-1">
          Search results for &quot;{searchParams?.get("product")}&quot;
        </h2>
        <p className="text-[#475156] text-[18px] font-[500]">
          Home / <span className="cursor-pointer">Search</span>
        </p>
      </div>

      {!showResult ? (
        <div className="py-[140px] flex justify-center items-center">
          <div>
            <p className="font-[600] text-[20px] text-[#191C1F]">
              No products found matching your description
            </p>
            <div className="flex justify-center items-center">
              <Image width={340} height={340} src="/notFound.png" alt="" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-[4%] lg:mx-[8%] mb-[90px] pt-[56px]">
          <div>
            <div className="flex justify-between flex-col lg:flex-row items-start lg:items-center mb-6 gap-2">
              <h2 className="text-[#475156] text-[16px] text-left lg:text-center font-[400]">
                Showing 1-8 of {result.length} results
              </h2>
              <div className="flex justify-end items-center gap-4">
                <p className="text-[#475156] text-[14px] font-[400] gap-2">
                  Sort by:
                </p>
                <select
                  name=""
                  id=""
                  className="text-[14px] text-[#475156] border-[#E4E7E9] py-3 rounded-[2px] px-4 border-[1px] outline-none"
                >
                  <option value="" className="text-[14px]">
                    Most Popular
                  </option>
                </select>
              </div>
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
              {result.length > 0 ? (
                result.map((product: any, i: any) => {
                  return <Card key={i} lists={product} />;
                })
              ) : (
                <>No product available</>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
