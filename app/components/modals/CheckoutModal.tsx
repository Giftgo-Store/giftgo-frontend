//@ts-ignore
"use client";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import Cookies from "js-cookie";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import { useRefetch } from "../../context/refetchContext";
import { useAppToast } from "@/app/providers/useAppToast";

interface ModalProps {
  showCheckoutModal: boolean;
  closeCheckoutModal: () => void;
}

const CheckoutModal: React.FC<ModalProps> = ({
  showCheckoutModal,
  closeCheckoutModal,
}) => {
  const toast = useAppToast();
  const { refetch, triggerRefetch } = useRefetch();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/cart`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        // Handle successful response, e.g., save token, redirect, etc.
        setCartItems(response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource",
          // error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchCartItems();
  }, [refetch]);

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
        toast({
          status: "success",
          description: response.data.message || "Success",
        });
      } catch (error) {
        toast({
          status: "error",
          description:
            //@ts-expect-error
            error?.response?.data.message || error?.message || "an error occurred ",
        });
      } finally {
        // Any cleanup or final actions
      }
      triggerRefetch();
      alert("Item deleted from cart");
      console.log("Successful", response.data.data);
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

  const total: any = cartItems.map(
    (item: any) => Number(item.quantity) * Number(item.product && item.product.salePrice)
  );

  function formatNumberWithCommas(amount: number): string {
    return new Intl.NumberFormat("en-US").format(amount);
  }

  return (
    <div
      className={classNames(
        "absolute inset-0 z-50 flex l items-center justify-center",
        { "bg-overlayy ": showCheckoutModal, hidden: !showCheckoutModal }
      )}
    >
      <div className="absolute lg:right-[120px] bg-white rounded-[4px] top-[100px] lg:top-[195px] shadow-lg w-[90%] lg:w-[375px] py-3">
        <button
          className="absolute z-40 top-0 right-0 mt-1 mr-2 text-[20px] text-gray-600"
          onClick={closeCheckoutModal}
        >
          ×
        </button>
        <div className="rounded-[4px]">
          <div className="px-6 pb-5">
            <h2 className="text-[18px] font-[500] text-[#191C1F]">
              Shopping Cart{" "}
              <span className="text-[#5F6C72]">({cartItems.length})</span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 px-5 w-full border-y-[#E4E7E9] border-y-[1px] py-3">
            {cartItems.length > 0 ? (
              cartItems.map((item: any, i: any) => {
                return (
                  <div
                    key={i}
                    className="flex justify-start gap-4 w-full items-center"
                  >
                    <Image
                      src={item && item?.product?.images[0]}
                      alt=""
                      width={72}
                      height={72}
                      className="relative z-0 object-cover w-[72px] h-[72px]"
                    />
                    <div className="flex justify-between items-center w-full ">
                      <div className="w-[80%]">
                        <p className="text-[14px] font-[400]">
                          {item && item?.product?.brandName}{" "}
                          {item && item?.product?.productName}{" "}
                          {item && item?.product?.description.split(0, 20)}...
                        </p>
                        <p className="text-[14px] font-[400]">
                          {item.quantity} x{" "}
                          <span className="font-[700] text-[14px]">
                            ₦
                            {formatNumberWithCommas(
                              item && item?.product && item?.product.salePrice
                            )}
                          </span>
                        </p>
                      </div>
                      <button
                        className="text-[20px] text-gray-600"
                        onClick={() => handleDeleteCartItem(item._id)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <>No item available</>
            )}
          </div>

          <div className="flex flex-col items-start gap-3 px-5 pt-4">
            <div className="flex justify-between items-center w-full">
              <p className="text-[#5F6C72] text-[14px]">Sub-total</p>
              <p className="text-[#191C1F] text-[14px] font-[700]">
                ₦
                {formatNumberWithCommas(
                  total.reduce(
                    (accumulator: any, currentValue: any) =>
                      accumulator + currentValue,
                    0
                  )
                )}
              </p>
            </div>
          </div>

          <div className="flex justify-center flex-col gap-3 items-center my-6 mx-5">
            <Link
              href={"/checkout"}
              onClick={closeCheckoutModal}
              className="flex justify-center w-full items-center gap-2 text-white px-8 py-4 bg-primary hover:bg-primary/80  rounded-[3px] font-[700]"
            >
              <p>CHECKOUT NOW</p>
              <FiArrowRight className="w-4 h-4 cursor-pointer" />
            </Link>
            <Link
              href={"/shopping-card"}
              onClick={closeCheckoutModal}
              className="flex justify-center items-center w-full gap-[35px] text-primary px-7 py-4 border-primary border-[2px] rounded-[3px] font-[700] text-[14px]"
            >
              <p>VIEW CART</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
