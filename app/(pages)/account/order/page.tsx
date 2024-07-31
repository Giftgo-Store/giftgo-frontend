"use client";

import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import Cookies from "js-cookie";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppToast } from "@/app/providers/useAppToast";
import Link from "next/link";

const Order = () => {
  const toast = useAppToast();
  const [showDetails, setShowDetails] = useState(true);
  const [single, setSingle] = useState<any>([]);
  const [id, setId] = useState<any>("");

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
        `${BASE_URL}/api/v1/orders/track/order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if(response.data.status === 200 || response.data.status === 201){
        setSingle(response.data.data);
        setShowDetails(false);
        toast({
          status: "success",
          description: response.data.message || "Success",
        });
        return
      }
      toast({
        status: "error",
        description: response.data.message || "Order not found",
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

          <div className="border-[#FF8D08] border-[3px] px-[18px] py-[32px] w-[60%] rounded-[15px] bg-[white]">
            <div className="flex justify-start items-center gap-[26px] pb-[18px]">
              <div className="bg-[#FFEADA] flex justify-center items-center h-[70px] w-[70px] rounded-full">
                <Image src="/truck.svg" alt="" width={40} height={30} />
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="flex justify-start gap-3 items-center">
                  <p className="text-[24px] font-[600] leading-[30px]">
                    TRK35E279H
                  </p>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.1747 20.8541H6.32467C2.74051 20.8541 1.14551 19.2591 1.14551 15.6749V11.8249C1.14551 8.24075 2.74051 6.64575 6.32467 6.64575H10.1747C13.7588 6.64575 15.3538 8.24075 15.3538 11.8249V15.6749C15.3538 19.2591 13.7588 20.8541 10.1747 20.8541ZM6.32467 8.02075C3.48301 8.02075 2.52051 8.98325 2.52051 11.8249V15.6749C2.52051 18.5166 3.48301 19.4791 6.32467 19.4791H10.1747C13.0163 19.4791 13.9788 18.5166 13.9788 15.6749V11.8249C13.9788 8.98325 13.0163 8.02075 10.1747 8.02075H6.32467Z"
                      fill="black"
                    />
                    <path
                      d="M15.6747 15.3541H14.6663C14.2905 15.3541 13.9788 15.0424 13.9788 14.6666V11.8249C13.9788 8.98325 13.0163 8.02075 10.1747 8.02075H7.33301C6.95717 8.02075 6.64551 7.70909 6.64551 7.33325V6.32492C6.64551 2.74075 8.24051 1.14575 11.8247 1.14575H15.6747C19.2588 1.14575 20.8538 2.74075 20.8538 6.32492V10.1749C20.8538 13.7591 19.2588 15.3541 15.6747 15.3541ZM15.3538 13.9791H15.6747C18.5163 13.9791 19.4788 13.0166 19.4788 10.1749V6.32492C19.4788 3.48325 18.5163 2.52075 15.6747 2.52075H11.8247C8.98301 2.52075 8.02051 3.48325 8.02051 6.32492V6.64575H10.1747C13.7588 6.64575 15.3538 8.24075 15.3538 11.8249V13.9791Z"
                      fill="black"
                    />
                  </svg>
                </div>

                <p className="text-[15px] text-[#787C82]">
                  Courier: <span className="text-[#000000]"> FedX</span>
                </p>
              </div>
            </div>

            <div className="flex justify-start items-center gap-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0003 18.9584C5.05866 18.9584 1.04199 14.9417 1.04199 10.0001C1.04199 5.05841 5.05866 1.04175 10.0003 1.04175C14.942 1.04175 18.9587 5.05841 18.9587 10.0001C18.9587 14.9417 14.942 18.9584 10.0003 18.9584ZM10.0003 2.29175C5.75033 2.29175 2.29199 5.75008 2.29199 10.0001C2.29199 14.2501 5.75033 17.7084 10.0003 17.7084C14.2503 17.7084 17.7087 14.2501 17.7087 10.0001C17.7087 5.75008 14.2503 2.29175 10.0003 2.29175Z"
                  fill="#70706E"
                />
                <path
                  d="M10 11.4584C9.65833 11.4584 9.375 11.1751 9.375 10.8334V6.66675C9.375 6.32508 9.65833 6.04175 10 6.04175C10.3417 6.04175 10.625 6.32508 10.625 6.66675V10.8334C10.625 11.1751 10.3417 11.4584 10 11.4584Z"
                  fill="#70706E"
                />
                <path
                  d="M10.0003 14.1667C9.89199 14.1667 9.78366 14.1417 9.68366 14.1C9.58366 14.0583 9.49199 14 9.40866 13.925C9.33366 13.8417 9.27533 13.7583 9.23366 13.65C9.19199 13.55 9.16699 13.4417 9.16699 13.3333C9.16699 13.225 9.19199 13.1167 9.23366 13.0167C9.27533 12.9167 9.33366 12.825 9.40866 12.7417C9.49199 12.6667 9.58366 12.6083 9.68366 12.5667C9.88366 12.4833 10.117 12.4833 10.317 12.5667C10.417 12.6083 10.5087 12.6667 10.592 12.7417C10.667 12.825 10.7253 12.9167 10.767 13.0167C10.8087 13.1167 10.8337 13.225 10.8337 13.3333C10.8337 13.4417 10.8087 13.55 10.767 13.65C10.7253 13.7583 10.667 13.8417 10.592 13.925C10.5087 14 10.417 14.0583 10.317 14.1C10.217 14.1417 10.1087 14.1667 10.0003 14.1667Z"
                  fill="#292D32"
                />
              </svg>

              <p className="text-[14px] font-[400] text-[#70706E]">
                Copy the code and track it at{" "}
                <span className="text-[#FFB157]">
                  <Link href={"https://google.com"}>www.fedex.com</Link>
                </span>
              </p>
            </div>

            {/* <div className="flex px-[90px] justify-between w-full items-center gap-[26px] pb-[22px]">
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
            </div> */}

            {/* <div className="px-[90px]">
              <p className="text-[15px] text-[#787C82] leading-[19px]">
                Delivery progress -{" "}
                {single.status === "pending"
                  ? 5
                  : single.status === "processing"
                  ? 30
                  : single.status === "shipped"
                  ? 70
                  : single.status === "delivered" ||
                    single.status === "picked" ||
                    single.status === "confirmed"
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
            </div> */}
          </div>
          {/* <div className="flex justify-between items-start mt-4">
            <div className="flex flex-col items-start">
              <div className="flex justify-start items-center gap-[40px] pb-[56px] relative">
                <div
                  className={`w-[1px] h-[80px] top-8 left-3 absolute ${
                    single.status !== "delivered"
                      ? "bg-[#FF7A00]"
                      : single.status === "processing"
                      ? "bg-[#FF7A00]"
                      : "bg-[#B6B9C1]"
                  } `}
                ></div>
                <div
                  className={`w-[25px] h-[25px] rounded-full ${
                    single.status !== "delivered"
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
                    single.status !== "delivered"
                      ? "bg-[#FF7A00]"
                      : "bg-[#B6B9C1]"
                  }`}
                ></div>
                <div
                  className={`w-[25px] h-[25px] rounded-full ${
                    single.status !== "delivered"
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
          </div> */}
        </>
      )}
    </>
  );
};

export default Order;
