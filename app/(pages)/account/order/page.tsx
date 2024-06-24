"use client";

import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import Cookies from "js-cookie";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppToast } from "@/app/providers/useAppToast";

const Order = () => {
  const toast = useAppToast();
  const [showDetails, setShowDetails] = useState(true);
  const [single, setSingle] = useState<any>([]);
  const [id, setId] = useState<any>("");

  const location = Cookies.get("location");
  const handleFetchOrder = async () => {
    if (!id) {
      toast({
        status: "error",
        description: "please enter your tracking ID",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/orders/track/track?orderId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setSingle(response.data.data);
      setShowDetails(false);
      toast({
        status: "success",
        description: response.data.message || "Success",
      });
    } catch (error) {
      toast({
        status: "error",
        description:
          //@ts-expect-error
          error?.response?.data || error?.message || "an error occurred ",
      });
    } finally {
      // Any cleanup or final actions
    }
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleHideDetails = () => {
    setShowDetails(!showDetails);
  };

  const progress =
    single.status === "pending"
      ? 5
      : single.status === "processing"
      ? 30
      : single.status === "shipped"
      ? 70
      : single.status === "delivered"
      ? 100
      : 0;

  return (
    <>
      {showDetails ? (
        <div className="w-[95vw] lg:w-full flex flex-col items-start gap-[16px] lg:pb-[300px]">
          <h1 className="font-[600] text-[32px] leading-[40px] text-[#191C1F]">
            Track Order
          </h1>
          <p className="text-[16px] leading-[24px] text-[#5F6C72] w-full lg:w-[80%]">
            Please input your order ID into the field provided below and click
            the &quot;Track Order&quot; button to monitor the status of your
            order. You can find your order ID on your receipt or in the
            confirmation email that was sent to you.
          </p>

          <form action="">
            <fieldset className="flex flex-col items-start gap-2">
              <label
                htmlFor=""
                className="text-[14px] leading-[20px] text-[#191C1F]"
              >
                OrderID
              </label>
              <input
                type="text"
                className="border-[#E4E7E9] rounded-[2px] h-[44px] outline-none w-full lg:w-[424px] border-[1px] px-[18px] text-[14px] text-[#475156]"
                placeholder="ID..."
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </fieldset>
          </form>
          <div className="flex justify-start items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="#5F6C72"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.25 11.25H12V16.5H12.75"
                stroke="#5F6C72"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.8125 9C12.4338 9 12.9375 8.49632 12.9375 7.875C12.9375 7.25368 12.4338 6.75 11.8125 6.75C11.1912 6.75 10.6875 7.25368 10.6875 7.875C10.6875 8.49632 11.1912 9 11.8125 9Z"
                fill="#5F6C72"
              />
            </svg>
            <p className="text-[#5F6C72] text-[14px] ">
              Order ID that we sent to you in your email address.
            </p>
          </div>

          <div className="flex w-full justify-center items-center">
            <button
              className="py-[14px] px-[24px] rounded-[2px] bg-primary text-white text-[16px] font-[600] flex justify-center items-center gap-2"
              onClick={handleFetchOrder}
            >
              TRACK ORDER <FaArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center w-full border-[#E4E7E9] border-[1px] px-[24px] rounded-t-[4px] mb-[24px]">
            <div
              className="flex justify-center items-center gap-2 cursor-pointer"
              onClick={handleHideDetails}
            >
              <Image src="/ArrowLeft.png" alt="" width={24} height={24} />

              <p className="py-[16px] px-[24px] text-[14px] leading-[20px] font-[500] text-[#191C1F]">
                TRACK ORDER
              </p>
            </div>
          </div>

          <div className="border-[#FF8D08] border-[3px] px-[18px] py-[32px] w-[60%] rounded-[15px] bg-[#FFEADA]">
            <div className="flex justify-start items-center gap-[26px] pb-[18px]">
              <Image src="/truck.svg" alt="" width={40} height={30} />
              <p className="text-[24px] font-[600] leading-[30px]">
                ID {single.orderId}{" "}
              </p>
            </div>

            <div className="flex px-[90px] justify-between w-full items-center gap-[26px] pb-[22px]">
              <p className="text-[15px] text-[#787C82] leading-[19px]">
                From :{" "}
                <span className="text-black font-[500]"> {location}</span>
              </p>{" "}
              <p className="text-[15px] text-[#787C82] leading-[19px]">
                To :{" "}
                <span className="text-black font-[500]">
                  {" "}
                  {single &&
                    single.customerAddress &&
                    single.customerAddress.address}
                </span>
              </p>
            </div>

            <div className="px-[90px]">
              <p className="text-[15px] text-[#787C82] leading-[19px]">
                Delivery progress -{" "}
                {single && single.status === "pending"
                  ? 5
                  : single.status === "processing"
                  ? 30
                  : single.status === "shipped"
                  ? 70
                  : single.status === "delivered"
                  ? 100
                  : 0}
                %
              </p>
              <div className="flex justify-between w-full items-center pt-[10px]">
                <div className="w-[80%]">
                  <div className="w-full bg-[#D9D9D9] rounded-full h-3">
                    <div
                      className="bg-[#FF7A00] h-3 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-[20%]">
                  <p className="text-right w-full text-[14px] font-[600] text-[#FF7A00]">
                    Details
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start mt-4">
            <div className="flex flex-col items-start">
              <div className="flex justify-start items-center gap-[40px] pb-[56px] relative">
                <div
                  className={`w-[1px] h-[80px] top-8 left-3 absolute ${
                    single.status !== "shipped" && single.status !== "delivered"
                      ? "bg-[#FF7A00]"
                      : single.status === "processing"
                      ? "bg-[#FF7A00]"
                      : "bg-[#B6B9C1]"
                  } `}
                ></div>
                <div
                  className={`w-[25px] h-[25px] rounded-full ${
                    single.status !== "shipped" && single.status !== "delivered"
                      ? "bg-[#FF7A00]"
                      : "bg-[#B6B9C1]"
                  }`}
                ></div>
                <div>
                  <p className="text-[16px] font-[600] leading-[24px]">
                    Courier service picks up package{" "}
                  </p>
                  <p className="text-[14px] text-[#8B909A] font-[500] leading-[20px]">
                    2nd April 2024
                  </p>
                </div>
              </div>
              <div className="flex justify-start items-center gap-[40px] pb-[56px] relative">
                <div
                  className={`w-[1px] h-[80px] top-8 left-3 absolute ${
                    single.status === "delivered"
                      ? "bg-[#FF7A00]"
                      : "bg-[#B6B9C1]"
                  }`}
                ></div>
                <div
                  className={`w-[25px] h-[25px] rounded-full ${
                    single.status === "delivered"
                      ? "bg-[#FF7A00]"
                      : "bg-[#B6B9C1]"
                  }`}
                ></div>
                <div>
                  <p className="text-[16px] font-[600] leading-[24px]">
                    Package sorted and loaded
                  </p>
                  <p className="text-[14px] text-[#8B909A] font-[500] leading-[20px]">
                    5th April 2024
                  </p>
                </div>
              </div>
              <div className="flex justify-start items-center gap-[40px] pb-[56px]">
                <div
                  className={`w-[25px] h-[25px] rounded-full ${
                    single.status === "delivered"
                      ? "bg-[#FF7A00]"
                      : "bg-[#B6B9C1]"
                  }`}
                ></div>
                <div>
                  <p className="text-[16px] font-[600] leading-[24px]">
                    Package delivered{" "}
                  </p>
                  <p className="text-[14px] text-[#8B909A] font-[500] leading-[20px]">
                    15th April 2024{" "}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[20px] font-[600] leading-[24px] text-[#A0A1A4]">
                Status :{" "}
                <span className="text-primary">
                  {single.status === "completed" ? "Arrived" : "In Transit"}
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Order;
