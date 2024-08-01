"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppToast } from "@/app/providers/useAppToast";
import { RxAvatar } from "react-icons/rx";

const Account = () => {
  const toast = useAppToast();
  const [user, setUser] = useState<any>([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/profile`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        console.log(response.data.data);
        // Handle successful response, e.g., save token, redirect, etc.
        setUser(response.data.data);
      } catch (error) {
        console.log(error)
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchUser();
  }, [toast]);

  const pendingOrders =
    user &&
    user.orders &&
    user.orders.filter(
      (item: any) =>
        item.orderStatus === "pending" || item.orderStatus === "processing" || item.orderStatus === "shipped"
    );
  const completedOrders =
    user &&
    user.orders &&
    user.orders.filter(
      (item: any) =>
        item.orderStatus === "delivered" ||
        item.orderStatus === "picked" ||
        item.orderStatus === "confirmed"
    );

  return (
    <>
      <div className="w-full md:w-[50%] pb-[32px]">
        <h1 className="text-[20px] leading-[28px] font-[600] text-[#191C1F] pb-[12px]">
          Hello, {user && user?.name && user?.name.split(" ")[0]}
        </h1>
        <p className="text-[14px] leading-[20px] font-[400]">
          From your account dashboard. you can easily check & view your{" "}
          <span className="text-primary font-[500]"><Link href={'/account/order'}>Recent Orders</Link></span>, manage
          your{" "}
          <span className="text-primary font-[500]">
            <Link href={'/account/settings'}>Shipping and Billing Addresses</Link>
          </span>{" "}
          and edit your{" "}
          <span className="text-primary font-[500]"><Link href={'/account/settings'}>Password</Link></span> and{" "}
          <span className="text-primary font-[500]"><Link href={'/account/settings'}>Account Details.</Link></span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] w-full">
        <div className="col-span-1 border-[#E4E7E9] border-[1px] rounded-[4px]">
          <div className="px-[24px] py-[10px] border-b-[#E4E7E9] border-b-[1px]">
            <p className="text-[#191C1F] text-[14px] leading-[20px] font-[500]">
              ACCOUNT INFO
            </p>
          </div>
          <div className="pt-[36px] px-[24px]">
            <div className="flex justify-start items-center gap-4 mb-[20px]">
              {/* <Image src="/avatarr.svg" alt="" width={48} height={48} /> */}
              <RxAvatar className="w-[48px] h-[48px]" />

              <div className="flex justify-start items-start flex-col gap-1">
                <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F]">
                  {user && user?.name && user?.name}
                </p>
                <p className="font-[500] text-[14px] leading-[20px] text-[#5F6C72]">
                  {user && user?.address && user?.address.country},{" "}
                  {user && user?.address && user?.address.state}{" "}
                  {user && user?.address && user?.address.city}
                </p>
              </div>
            </div>

            <div className="mb-[32px]">
              <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F] mb-[8px]">
                Email:{" "}
                <span className="text-[#5F6C72]">{user && user?.email}</span>
              </p>

              <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F]">
                Phone:{" "}
                <span className="text-[#5F6C72]">{user && user?.phone}</span>
              </p>
            </div>

            <div className="mb-[24px]">
              <Link
                href={"/account/settings"}
                className="border-[#D5EDFD] border-[3px] px-[24px] py-2 text-[14px] font-[700] leading-[48px] text-primary rounded-[2px]"
              >
                EDIT ACCOUNT
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1 border-[#E4E7E9] border-[1px] rounded-[4px]">
          <div className="px-[24px] py-[10px] border-b-[#E4E7E9] border-b-[1px]">
            <p className="text-[#191C1F] text-[14px] leading-[20px] font-[500]">
              SHIPPING ADDRESS
            </p>
          </div>
          <div className="pt-[36px] px-[24px]">
            <div className="flex justify-start items-center gap-4 mb-[20px]">
              <div className="flex justify-start items-start flex-col gap-1">
                <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F]">
                  {user && user?.name}
                </p>
                <p className="font-[500] text-[14px] leading-[20px] text-[#5F6C72]">
                  {user && user?.address && user?.address.country},{" "}
                  {user && user?.address && user?.address.state}{" "}
                  {user && user?.address && user?.address.city}
                </p>
              </div>
            </div>

            <div className="mb-[32px]">
              <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F]">
                Phone:{" "}
                <span className="text-[#5F6C72]">{user && user?.phone}</span>
              </p>
              <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F] mb-[8px]">
                Email:{" "}
                <span className="text-[#5F6C72]">{user && user?.email} </span>
              </p>
            </div>

            <div className="mb-[24px]">
              <Link
                href={"/account/settings"}
                className="border-[#D5EDFD] border-[3px] px-[24px] py-2 text-[14px] font-[700] leading-[48px] text-primary rounded-[2px]"
              >
                EDIT ADDRESS
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1 rounded-[4px] flex justify-between items-start w-full flex-col gap-[24px]">
          <div className="py-[16px] px-[12px] flex justify-start items-center gap-4 rounded-[4px] bg-[#EAF6FE] w-full">
            <Image src="/icon1.svg" alt="" width={56} height={56} />
            <div className="flex flex-col justify-start items-start gap-1">
              <p className="font-[600] text-[20px] leading-[28px] text-[#191C1F]">
                {user && user.orders ? user.orders.length : 0}
              </p>
              <p className="text-[14px] font-[400] leading-[20px] text-[#475156]">
                Total Orders
              </p>
            </div>
          </div>
          <div className="py-[16px] px-[12px] flex justify-start items-center gap-4 rounded-[4px] bg-[#FFF3EB] w-full">
            <Image src="/icon2.svg" alt="" width={56} height={56} />
            <div className="flex flex-col justify-start items-start gap-1">
              <p className="font-[600] text-[20px] leading-[28px] text-[#191C1F]">
                {user && pendingOrders ? pendingOrders.length : 0}
              </p>
              <p className="text-[14px] font-[400] leading-[20px] text-[#475156]">
                Pending Orders
              </p>
            </div>
          </div>
          <div className="py-[16px] px-[12px] flex justify-start items-center gap-4 rounded-[4px] bg-[#EAF7E9] w-full">
            <Image src="/icon3.svg" alt="" width={56} height={56} />
            <div className="flex flex-col justify-start items-start gap-1">
              <p className="font-[600] text-[20px] leading-[28px] text-[#191C1F]">
                {user && completedOrders ? completedOrders.length : 0}
              </p>
              <p className="text-[14px] font-[400] leading-[20px] text-[#475156]">
                Completed Orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
