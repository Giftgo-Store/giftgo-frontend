"use client";
import Image from "next/image";
import { FiMinus, FiPlus, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Cookies from "js-cookie";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
      setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/cart`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        console.log(response.data.data);
        // Handle successful response, e.g., save token, redirect, etc.
        setCartItems(response.data.data);
        console.log("Successful", response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource",error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchCartItems();
  }, []);

    const handleDeleteCartItem = async (id: string) => {
      try {
        const response = await axios.delete(`${BASE_URL}/api/v1/cart/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        console.log(response.data.data);
        // Handle successful response, e.g., save token, redirect, etc.
        try {
          const response = await axios.get(`${BASE_URL}/api/v1/cart`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          });
          console.log(response.data.data);
          // Handle successful response, e.g., save token, redirect, etc.
          setCartItems(response.data.data);
          console.log("Successful", response.data.data);
        } catch (error) {
          console.error(
            //@ts-ignore
            "Error fetching resource", error?.response?.data || error?.message
          );
        } finally {
          // Any cleanup or final actions
        }
        alert("Item deleted from cart");
        console.log("Successful", response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource", error?.response?.data || error?.message);
      } finally {
        // Any cleanup or final actions
      }
    };

    const total = cartItems.map(
      (item: any) => Number(item.quantity) * Number(item.product.salePrice)
    );

    function formatNumberWithCommas(amount: number): string {
      return new Intl.NumberFormat("en-US").format(amount);
    }

  return (
    <>
      <div className="py-[20px] px-[8%] text-center bg-secondary mb-[56px]">
        <h2 className="font-[600] leading-[32px] text-[28px] text-[#191C1F] pb-1">
          Shopping Card
        </h2>
        <p className="text-[#475156] text-[18px] font-[500]">
          Home / <span className="cursor-pointer"> Shopping card</span>
        </p>
      </div>

      <div className="pt-[20px] lg:pt-[56px] px-[4%] flex-col lg:flex-row lg:px-[8%] mb-[90px] flex justify-between items-center gap-6">
        <div className="border-[#E4E7E9] border-[1px] lg:w-[67%] rounded-[4px]">
          <div className="px-6 py-5">
            <h2 className="text-[18px] font-[500] text-[#191C1F]">
              Shopping Card
            </h2>
          </div>

          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="">
                  <table className="min-w-full text-left text-sm font-light">
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
                      {cartItems.length > 0 ? (
                        cartItems.map((item: any, i: any) => {
                          return (
                            <tr
                              className="transition duration-300 ease-in-out"
                              key={i}
                            >
                              <td className=" px-2 lg:px-6 py-4 text-[14px] text-[#191C1F]">
                                <div className="flex justify-start items-center gap-2 lg:gap-3">
                                  <Image
                                    src="/XCircle.png"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="relative z-0"
                                    onClick={() =>
                                      handleDeleteCartItem(item._id)
                                    }
                                  />

                                  <Image
                                    src={item && item?.product?.images[0]}
                                    alt=""
                                    width={72}
                                    height={72}
                                    className="relative z-0 object-cover w-[72px] h-[72px]"
                                  />
                                  <p className=" lg:text-[14px] font-[400]">
                                    {item && item?.product?.brandName}{" "}
                                    {item && item?.product?.productName}{" "}
                                    {item &&
                                      item?.product?.description.split(0, 20)}
                                    ...
                                  </p>
                                </div>
                              </td>
                              <td className="text-[14px] font-[400] px-2 lg:px-6 py-4">
                                ₦
                                {formatNumberWithCommas(
                                  item && item?.product.salePrice
                                )}
                              </td>
                              <td className=" px-1 lg:px-6 py-4">
                                <div className="flex justify-center flex-col lg:flex-row items-center gap-[10px] lg:gap-[35px] text-[#191C1F] px-1 lg:px-6 py-2 lg:py-4 border-[#E4E7E9] border-[2px] rounded-[3px]">
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
                              </td>
                              <td className="text-[14px] font-[400] px-2 lg:px-5 py-4">
                                ₦{" "}
                                {formatNumberWithCommas(
                                  item && item?.product.salePrice
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <>Cart is empty</>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="border-y-[#E4E7E9] border-y-[1px] flex flex-col lg:flex-row gap-4 justify-between p-[24px]">
              <Link href={'/'} className="flex justify-center items-center gap-[12px] text-primary px-7 py-4 border-primary border-[2px] rounded-[3px] font-[700] text-[14px]">
                <FiArrowLeft className="w-4 h-4 cursor-pointer" />
                <p>RETURN TO SHOP</p>
              </Link>
              <button className="flex justify-center items-center gap-[35px] text-primary px-7 py-4 border-primary border-[2px] rounded-[3px] font-[700] text-[14px]">
                <p>UPDATE CART</p>
              </button>
            </div>
          </div>
        </div>

        <div className="border-[#E4E7E9] border-[1px] lg:w-[33%] rounded-[4px]">
          <div className="px-6 py-5">
            <h2 className="text-[18px] font-[500] text-[#191C1F]">
              Card Totals
            </h2>
          </div>

          <div className="flex flex-col items-start gap-3 px-5">
            <div className="flex justify-between items-center w-full">
              <p className="text-[#5F6C72] text-[14px]">Sub-total</p>
              <p className="text-[#191C1F] text-[14px] font-[700]">
                ₦{" "}
                {formatNumberWithCommas(
                  total.reduce(
                    (accumulator: any, currentValue: any) =>
                      accumulator + currentValue,
                    0
                  )
                )}
              </p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-[#5F6C72] text-[14px]">Shipping</p>
              <p className="text-[#191C1F] text-[14px] font-[700]">Free</p>
            </div>
          </div>

          <div className="bg-[#E4E7E9] h-[1px] w-full my-[16px]"></div>

          <div className="flex justify-between items-center w-full px-5">
            <p className="text-[#191C1F] text-[16px]">Sub-total</p>
            <p className="text-[#191C1F] text-[16px] font-[700]">
              ₦{" "}
              {formatNumberWithCommas(
                total.reduce(
                  (accumulator: any, currentValue: any) =>
                    accumulator + currentValue,
                  0
                )
              )}
            </p>
          </div>

          <div className="flex justify-center items-center my-6">
            <Link href={'/checkout'} className="flex justify-center items-center gap-2 text-white px-8 py-4 bg-primary rounded-[3px] font-[700]">
              <p>PROCEED TO CHECKOUT</p>
              <FiArrowRight className="w-4 h-4 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
