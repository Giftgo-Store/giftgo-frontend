"use client";

import ReviewModal from "@/app/components/ReviewModal";
import Image from "next/image";
import Cookies from "js-cookie";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const History = () => {
  const [showDetails, setShowDetails] = useState(true);
  const [show, setShow] = useState(false);
  const [single, setSingle] = useState<any>([])

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(!show);
  };

  const handleShowDetails = (order:any) => {
    setSingle(order)
    setShowDetails(false);
  };

  const handleHideDetails = () => {
    setShowDetails(true);
  };

        const [user, setUser] = useState<any>([]);
        const [order, setOrder] = useState<any>([]);

        useEffect(() => {
          const fetchUser = async () => {
            try {
              const response = await axios.get(
                `${BASE_URL}/api/v1/user/profile`,
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                  },
                }
              );
              console.log(response.data.data);
              // Handle successful response, e.g., save token, redirect, etc.
              setUser(response.data.data);
              console.log("Successful", response.data.data);
            } catch (error) {
              console.error(
                //@ts-ignore
                "Error fetching resource",error?.response?.data || error?.message);
            } finally {
              // Any cleanup or final actions
            }
          };
          fetchUser();
        }, []);

                useEffect(() => {
                  const fetchUser = async () => {
                    try {
                      const response = await axios.get(
                        `${BASE_URL}/api/v1/orders/order/all`,
                        {
                          headers: {
                            Authorization: `Bearer ${Cookies.get("token")}`,
                          },
                        }
                      );
                      console.log(response.data.data);
                      // Handle successful response, e.g., save token, redirect, etc.
                      setOrder(response.data.data);
                      console.log("Successful", response.data.data);
                    } catch (error) {
                      console.error(
                        //@ts-ignore
                        "Error fetching resource", error?.response?.data || error?.message);
                    } finally {
                      // Any cleanup or final actions
                    }
                  };
                  fetchUser();
                }, []);

        function formatDateString(dateString: string): string {
          const date = new Date(dateString);

          // Format the date part
          const dateOptions: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          const formattedDate = new Intl.DateTimeFormat(
            "en-US",
            dateOptions
          ).format(date);

          // Format the time part
          const timeOptions: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // for 24-hour format
            timeZone: "UTC", // ensure the time is in UTC
          };
          const formattedTime = new Intl.DateTimeFormat(
            "en-US",
            timeOptions
          ).format(date);

          return `${formattedDate} ${formattedTime}`;
        }  

          const total = single && single.orderedItems &&
            single.orderedItems.map(
              (item: any) =>
                Number(item.quantity) * Number(item.product.salePrice)
            ); 

                function formatNumberWithCommas(amount: number): string {
                  return new Intl.NumberFormat("en-US").format(amount);
                }

        console.log(user && user.orders)

  return (
    <>
      {showDetails ? (
        <div className="w-[90vw] lg:w-full">
          <p className="py-[16px] px-[24px] text-[14px] leading-[20px] font-[500] text-[#191C1F] w-fit">
            ORDER HISTORY
          </p>

          <div>
            <div className="flex flex-col lg:w-full">
              <div className="overflow-x-auto lg:-mx-8">
                <div className="inline-block py-2 lg:w-full lg:px-8">
                  <div className="overflow-x-auto w-full">
                    <table className=" text-left text-sm font-light lg:w-full">
                      <thead className="border-b font-medium border-[#D9E2E6] lg:mx-[10px] rounded-md mb-4">
                        <tr className="bg-[#F2F4F5] rounded-md mb-4 text-[#475156]">
                          <th
                            scope="col"
                            className="px-6 text-[12px] font-[5OO] text-[500] py-4"
                          >
                            ORDER ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 text-[12px] font-[5OO] text-[500] py-4"
                          >
                            STATUS
                          </th>
                          <th
                            scope="col"
                            className="px-6 text-[12px] font-[5OO] text-[500] py-4"
                          >
                            DATE
                          </th>
                          <th
                            scope="col"
                            className="px-6 text-[12px] font-[5OO] text-[500] py-4"
                          >
                            TOTAL
                          </th>
                          <th
                            scope="col"
                            className="px-6 text-[12px] font-[5OO] text-[500] py-4"
                          >
                            ACTION
                          </th>
                        </tr>
                      </thead>
                      <tbody className="mt-3">
                        {order &&
                          order.length > 0 &&
                          order.map((order: any, i: any) => {
                            return (
                              <tr
                                className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]"
                                key={i}
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                                  {order.orderId}
                                </td>
                                <td
                                  className={`${
                                    order.orderStatus === "complete"
                                      ? "text-[#2DB224]"
                                      : order.orderStatus === "pending"
                                      ? "text-[#FA8232]"
                                      : "text-primary"
                                  } whitespace-nowrap px-6 py-4 font-[600]  text-[14px]`}
                                >
                                  {order.orderStatus}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                                  {formatDateString(order.createdAt)}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                                  ₦160 ({order.quantity} Products)
                                </td>
                                <td
                                  className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                                  onClick={() => handleShowDetails(order)}
                                >
                                  View Details
                                  <Image
                                    src="/ArrowRight.svg"
                                    alt=""
                                    width={16}
                                    height={16}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-[#2DB224] text-[14px]">
                            COMPLETED
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-[#2DB224] text-[14px]">
                            COMPLETED
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-[#FA8232] text-[14px]">
                            IN PROGRESS
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-[#FA8232] text-[14px]">
                            IN PROGRESS
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-primary text-[14px]">
                            CANCELLED
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-primary text-[14px]">
                            CANCELLED
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-[#FA8232] text-[14px]">
                            IN PROGRESS
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-[#2DB224] text-[14px]">
                            COMPLETED
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex justify-center items-center px-10 py-6">
                      <div className="flex items-center gap-2">
                        <div className="flex justify-between items-center gap-2">
                          <Image
                            src="/arrow1.png"
                            alt=""
                            width={40}
                            height={40}
                            className="lg:mr-[12px]"
                          />
                          <div className="w-[40px] text-white text-[14px] leading-[20px] h-[40px] bg-primary rounded-full border-[#E4E7E9] border-[1px] flex justify-center text-center items-center">
                            01
                          </div>
                          <div className="w-[40px] text-[#191C1F] text-[14px] leading-[20px] h-[40px] bg-white rounded-full border-[#E4E7E9] border-[1px] flex justify-center text-center items-center">
                            02
                          </div>
                          <div className="w-[40px] text-[#191C1F] text-[14px] leading-[20px] h-[40px] bg-white rounded-full border-[#E4E7E9] border-[1px] flex justify-center text-center items-center">
                            03
                          </div>
                          <div className="w-[40px] text-[#191C1F] text-[14px] leading-[20px] h-[40px] bg-white rounded-full border-[#E4E7E9] border-[1px] flex justify-center text-center items-center">
                            04
                          </div>
                          <div className="w-[40px] text-[#191C1F] text-[14px] leading-[20px] h-[40px] bg-white rounded-full border-[#E4E7E9] border-[1px] flex justify-center text-center items-center">
                            05
                          </div>
                          <Image
                            src="/arrow2.png"
                            alt=""
                            width={40}
                            height={40}
                            className="lg:ml-[12px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center border-[#E4E7E9] border-[1px] px-[24px] rounded-t-[4px] mb-[24px]">
            <div
              className="flex justify-center items-center gap-2 cursor-pointer"
              onClick={handleHideDetails}
            >
              <Image src="/ArrowLeft.png" alt="" width={24} height={24} />

              <p className="py-[16px] px-[24px] text-[14px] leading-[20px] font-[500] text-[#191C1F]">
                ORDER HISTORY
              </p>
            </div>

            <div
              className="flex justify-center items-center gap-2 cursor-pointer"
              onClick={handleShow}
            >
              <p className="text-[14px] text-primary leading-[20px[">
                Leave a Rating
              </p>
              <Image src="/Plus.png" alt="" width={20} height={20} />
            </div>
          </div>

          <div className=" p-[24px] border-[#FFE7D6] border-[1px] bg-[#FEEFD3] flex justify-between flex-col lg:flex-row items-start gap-2 lg:items-center rounded-[1px] mb-[24px]">
            <div className="flex justify-center items-start gap-2 flex-col text-[#475156] text-[14px] leading-[20px]">
              <p className="text-[#191C1F] text-[20px] leading-[28px]">
                {single ? single.orderId : "#444"}
              </p>
              <p className="flex justify-center items-center">
                {single && single.orderedItems && single.orderedItems.length}{" "}
                Products
                <span className=" rounded-full mx-2 h-[2px] w-[2px] bg-[#475156]"></span>
                Order Placed on{" "}
                {single &&
                  single.createdAt &&
                  formatDateString(single.createdAt)}
              </p>
            </div>

            <p className="text-[28px] leading-[32px] font-[600] text-primary">
              ₦
              {total
                ? formatNumberWithCommas(
                    total.reduce(
                      (accumulator: any, currentValue: any) =>
                        accumulator + currentValue,
                      0
                    )
                  )
                : "00"}
            </p>
          </div>

          <div>
            <div>
              <h2 className="text-[18px] font-[400] text-[#191C1F] mb-[20px]">
                Product{" "}
                <span className="text-[#475156]">
                  ({" "}
                  {single && single.orderedItems && single.orderedItems.length})
                </span>
              </h2>
            </div>
            <div className="flex overflow-x-auto w-[90vw] lg:w-full flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full pb-2 sm:px-6 lg:px-8">
                  <div className="overflow-x-auto">
                    <table className="overflow-x-auto min-w-full text-left text-sm font-light">
                      <thead className="font-medium00 bg-[#E4E7E9]">
                        <tr>
                          <th
                            scope="col"
                            className="px-3 lg:px-6 text-[#475156] text-[12px] font-[500] py-[10px]"
                          >
                            PRODUCT
                          </th>
                          <th
                            scope="col"
                            className="px-3 lg:px-6 text-[#475156] text-[12px] font-[500] py-[10px]"
                          >
                            PRICE
                          </th>
                          <th
                            scope="col"
                            className="px-3 lg:px-6 text-[#475156] text-[12px] font-[500] py-[10px]"
                          >
                            QUANTITY
                          </th>
                          <th
                            scope="col"
                            className="px-3 lg:px-6 text-[#475156] text-[12px] font-[500] py-[10px]"
                          >
                            SUB TOTAL
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {single &&
                          single.orderedItems &&
                          single.orderedItems.map((item: any, i: any) => {
                            return (
                              <tr
                                className="transition duration-300 ease-in-out"
                                key={i}
                              >
                                <td className=" px-2 lg:px-6 py-4 text-[14px] text-[#191C1F] ">
                                  <div className="flex justify-start items-center gap-2 lg:gap-3">
                                    <Image
                                      src={item && item?.product?.images[0]}
                                      alt=""
                                      width={72}
                                      height={72}
                                      className="relative z-0"
                                    />
                                    <div>
                                      <h1 className="text-primary text-[12px] font-[600] mb-1">
                                        SMARTPHONE
                                      </h1>
                                      <p className="text-[#191C1F] lg:text-[14px] font-[400]">
                                        {item.product.description}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-[14px] font-[400] px-2 lg:px-6 text-[#475156] py-4">
                                  ₦
                                  {formatNumberWithCommas(
                                    item.product.salePrice
                                  )}
                                </td>
                                <td className=" px-1 lg:px-6 py-4">
                                  <p className="font-[400] text-[#475156] text-[14px]">
                                    x{item.quantity}
                                  </p>
                                </td>
                                <td className="text-[14px] font-[600] text-[#475156] px-2 lg:px-6 py-4">
                                  ₦
                                  {formatNumberWithCommas(
                                    item.product.salePrice
                                  )}
                                </td>
                              </tr>
                            );
                          })}

                        <tr className="transition duration-300 ease-in-out">
                          <td className=" px-2 lg:px-6 py-4 text-[14px] text-[#191C1F]">
                            <div className="flex justify-start items-center gap-2 lg:gap-3">
                              <Image
                                src="/cam.png"
                                alt=""
                                width={72}
                                height={72}
                                className="relative z-0"
                              />
                              <div>
                                <h1 className="text-primary text-[12px] font-[600] mb-1">
                                  ACCESSORIES
                                </h1>
                                <p className="text-[#191C1F] lg:text-[14px] font-[400]">
                                  Simple Mobile 5G LTE Galexy 12 Mini 512GB
                                  Gaming Phone
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-[14px] font-[400] px-2 lg:px-6 text-[#475156] py-4">
                            ₦12,000
                          </td>
                          <td className=" px-1 lg:px-6 py-4">
                            <p className="font-[400] text-[#475156] text-[14px]">
                              x1
                            </p>
                          </td>
                          <td className="text-[14px] font-[600] text-[#475156] px-2 lg:px-6 py-4">
                            ₦12,000
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="flex items-center flex-col lg:flex-row gap-6 justify-center p-[24px]">
                <div className="w-[310px] h-[220px] border-[#E4E7E9] border-[1px] rounded-[4px]">
                  <div className="px-[24px] py-[10px] border-b-[#E4E7E9] border-b-[1px]">
                    <p className="text-[#191C1F] text-[14px] leading-[20px] font-[500]">
                      SHIPPING ADDRESS
                    </p>
                  </div>
                  <div className="pt-[22px] px-[24px]">
                    <div className="flex justify-start items-center gap-4 mb-[20px]">
                      <div className="flex justify-start items-start flex-col gap-1">
                        <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F]">
                          {user && user.name}
                        </p>
                        <p className="font-[500] text-[14px] leading-[20px] text-[#5F6C72]">
                          {single &&
                            single.customerAddress &&
                            single.customerAddress.address}
                        </p>
                      </div>
                    </div>

                    <div className="mb-[32px]">
                      <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F] mb-[8px]">
                        Email:{" "}
                        <span className="text-[#5F6C72]">
                          {user && user.email}
                        </span>
                      </p>

                      <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F]">
                        Phone:{" "}
                        <span className="text-[#5F6C72]">
                          {user && user.phone}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#E4E7E9] w-[1px] h-[180px] hidden lg:block"></div>

                <div className="w-[310px] h-[220px] border-[#E4E7E9] border-[1px] rounded-[4px]">
                  <div className="px-[24px] py-[10px] border-b-[#E4E7E9] border-b-[1px]">
                    <p className="text-[#191C1F] text-[14px] leading-[20px] font-[500]">
                      ORDER NOTES
                    </p>
                  </div>
                  <div className="pt-[22px] px-[24px]">
                    <div className="flex justify-start items-center gap-4 mb-[20px]">
                      <div className="flex justify-start items-start flex-col gap-1">
                        <p className="font-[500] text-[14px] leading-[20px] text-[#5F6C72]">
                          Donec ac vehicula turpis. Aenean sagittis est eu arcu
                          ornare, eget venenatis purus lobortis. Aliquam erat
                          volutpat. Aliquam magna odio.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {show && (
            <ReviewModal isOpen={show} onClose={handleClose}>
              <p className="text-[14px] font-[500] text-[#191C1F] pb-[16px] border-b-[1px] border-b-[#E4E7E9] px-6 py-4 mb-[24px]">
                LEAVE A REVIEW
              </p>

              <div className="flex justify-center items-center mb-6">
                <div className="flex justify-center items-center gap-[24px] w-[80%]">
                  {/* <div className=" bg-red-400"> */}
                  <Image
                    src="/cam.png"
                    alt=""
                    width={61}
                    height={64}
                    className="relative z-0 border-[#EDEDED] rounded-[12px] border-[6px]"
                  />
                  {/* </div> */}
                  <div>
                    <div className="">
                      <div>
                        <p className="font-[400] text-[14px] leading-[20px] text-[#475156]">
                          2-Barrel Carburetor Carb 2100 Engine Increase
                          Horsepower
                        </p>
                      </div>
                      <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F]">
                        ₦13,000
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 mb-6">
                <form action="">
                  <fieldset className="flex flex-col items-start gap-2">
                    <label
                      htmlFor=""
                      className="text-[14px] leading-[20px] text-[#191C1F]"
                    >
                      Rating
                    </label>
                    <select
                      name=""
                      id=""
                      className="border-[#E4E7E9] rounded-[2px] h-[44px] outline-none w-full border-[1px] px-[18px] text-[14px] text-[#475156]"
                    >
                      <option value="">5 Star Rating</option>
                      <option value="">4 Star Rating</option>{" "}
                      <option value="">3 Star Rating</option>{" "}
                      <option value="">2 Star Rating</option>{" "}
                      <option value="">1 Star Rating</option>
                    </select>
                  </fieldset>
                  <fieldset className="flex flex-col items-start gap-2 mb-[24px]">
                    <label
                      htmlFor=""
                      className="text-[14px] leading-[20px] text-[#191C1F]"
                    >
                      Feedback
                    </label>
                    <input
                      type="text"
                      className="border-[#E4E7E9] rounded-[2px] h-[44px] outline-none w-full border-[1px] px-[18px] text-[14px] text-[#475156]"
                      placeholder="Review Heading"
                    />
                    <textarea
                      name=""
                      className="border-[#E4E7E9] rounded-[2px] mt-2 h-[124px] outline-none w-full border-[1px] px-[18px] text-[14px] text-[#475156]"
                      id=""
                      placeholder="Write down your feedback about our product & services"
                    ></textarea>
                  </fieldset>

                  <button className="flex justify-center items-center w-[204px] gap-[35px] text-white px-7 py-4 bg-primary rounded-[3px] font-[700] text-[14px]">
                    PUBLISH REVIEW
                  </button>
                </form>
              </div>
            </ReviewModal>
          )}
        </>
      )}
    </>
  );
};

export default History;
