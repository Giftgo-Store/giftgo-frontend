/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Card from "@/app/components/cards/Card";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAppToast } from "@/app/providers/useAppToast";
import Link from "next/link";

const Page = () => {
  const toast = useAppToast();
  const router = useRouter();
  const params = useParams();

  const handleBack = () => {
    router.back();
  };

  const [category, setCategory] = useState([]);
  const [sort, setSort] = useState("none");
  const [allItems, setAllItems] = useState<any>([]);
  const [originalItems, setOriginalItems] = useState<any>([]); // To store the original data

  const location = Cookies.get("location");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/products/locate/${location}`
        );
        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.category, location]); // Added location as a dependency in case it changes

  useEffect(() => {
    // Assuming 'category' is your fetched data
    if (category?.length) {
      const flatItems = category.flatMap((cat: any) => cat.products || []);
      setAllItems(flatItems);
      setOriginalItems(flatItems); // Save the original items
    }
  }, [category]);

  // Flatten the nested products structure whenever 'category' changes
  useEffect(() => {
    if (category?.length) {
      const flatItems = category.flatMap((cat: any) => cat.products || []);
      setAllItems(flatItems);
    }
  }, [category]);

  // Sorting logic whenever 'sort' or 'allItems' changes
  useEffect(() => {
    if (!allItems?.length) return;

    let sortedProducts = [...allItems]; // Create a shallow copy to avoid mutating state

    if (sort === "price-low") {
      sortedProducts.sort((a: any, b: any) => a.salePrice - b.salePrice);
    } else if (sort === "price-high") {
      sortedProducts.sort((a: any, b: any) => b.salePrice - a.salePrice);
    } else if (sort === "express") {
      sortedProducts = sortedProducts.filter(
        (a: any) => a.expressShipping === "true"
      );
    } else if (sort === "none") {
      sortedProducts = [...originalItems]; // Reset to the original items
    } else if (sort === "alphabetic") {
      sortedProducts.sort((a: any, b: any) => {
        if (a.productName < b.productName) return -1;
        if (a.productName > b.productName) return 1;
        return 0;
      });
    } else if (sort === "best-selling") {
      // Sort by the number of reviews in descending order
      sortedProducts.sort(
        (a: any, b: any) => b.reviews.length - a.reviews.length
      );
    }

    setAllItems(sortedProducts); // Update state with sorted products
  }, [sort, allItems, originalItems]);

  return (
    <>
      <div className="py-[20px] px-[4%] lg:px-[8%] bg-secondary mb-[56px]">
        <h2 className="font-[600] leading-[32px] text-[28px] text-[#191C1F]">
          {location} Store
        </h2>
        <p className="text-[#475156] text-[18px] font-[500]">
          <span className="cursor-pointer" onClick={() => router.push("/")}>
            Home
          </span>{" "}
          /{" "}
          <span className="cursor-pointer" onClick={handleBack}>
            Shop
          </span>{" "}
          /{" "}
          <span className="cursor-pointer" onClick={handleBack}>
            {location} store
          </span>{" "}
          / All Products
        </p>
      </div>

      <div className="mx-[4%] lg:mx-[8%] mb-[90px]">
        <div>
          <div className="flex justify-between flex-col lg:flex-row items-start lg:items-center mb-6 gap-2">
            <h2 className="text-[#475156] text-[16px] text-left lg:text-center font-[400]">
              Showing 1-{allItems && allItems.length} of{" "}
              {allItems && allItems.length} results
            </h2>
            <div className="flex justify-end items-center gap-4">
              <p className="text-[#475156] text-[14px] font-[400] gap-2">
                Sort by:
              </p>
              <select
                name=""
                id=""
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-[14px] text-[#475156] border-[#E4E7E9] py-3 rounded-[2px] px-4 border-[1px] outline-none"
              >
                <option value="none" className="text-[14px]">
                  All
                </option>
                <option value="best-selling" className="text-[14px]">
                  Best selling{" "}
                </option>
                <option value="alphabetic" className="text-[14px]">
                  Alphabetical{" "}
                </option>
                <option value="express" className="text-[14px]">
                  Express Shipping{" "}
                </option>
                <option value="price-low" className="text-[14px]">
                  Price High to low{" "}
                </option>
                <option value="price-high" className="text-[14px]">
                  Price low to high
                </option>
              </select>
            </div>
          </div>
          <div className="flex justify-center items-center flex-wrap gap-2 gap-y-4 lg:gap-6">
            {allItems ? (
              allItems.map((product: any, i: any) => {
                return <Card key={i} lists={product} />;
              })
            ) : (
              <p className="text-center font-medium">No product available</p>
            )}
          </div>
        </div>

        {/* <div className="flex gap-4 justify-between items-center flex-col lg:flex-row my-[64px]">
          <div className="lg:w-[50%] bg-[#F2F4F5] pt-[36px] pl-[36px] flex justify-between flex-col lg:flex-row items-center lg:items-end rounded-[4px]">
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

              <Link
                href={"/#location"}
                className="py-[14px] px-[10px] lg:px-[24px] rounded-[2px] hover:bg-[#05031A]  bg-primary text-white text-[16px] font-[600] flex justify-center items-center gap-2"
              >
                SHOP NOW <FaArrowRight className="w-5 h-5" />
              </Link>
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
          <div className="lg:w-[50%] bg-[#191C1F] pt-[36px] lg:pl-[36px] flex justify-between items-center lg:items-end flex-col lg:flex-row rounded-[4px]">
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

              <Link
                href={"/#location"}
                className="py-[14px] px-[24px] rounded-[2px] bg-primary text-white text-[16px] font-[600] flex justify-center items-center gap-2"
              >
                SHOP NOW <FaArrowRight className="w-5 h-5" />
              </Link>
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
        </div> */}
      </div>
    </>
  );
};

export default Page;
