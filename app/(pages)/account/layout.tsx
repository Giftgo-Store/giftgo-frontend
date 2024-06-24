"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type ChildProps = {
  children: React.ReactNode;
};

const Account = ({ children }: ChildProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <>
      <div className="py-[20px] px-[4%] lg:px-[8%] bg-secondary text-center mb-[56px]">
        {" "}
        <h2 className="font-[600] leading-[32px] text-[28px] text-[#191C1F] pb-1">
          My Account
        </h2>
        <p className="text-[#475156] text-[18px] font-[500]">
          Home / <span className="cursor-pointer">My account</span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start px-[4%] lg:px-[8%] w-full gap-[32px] mb-[90px]">
        <div className="py-[16px] flex justify-start items-start flex-col w-full lg:w-[19%] border-[#E4E7E9] border-[1px] rounded-[4px] shadow-md">
          <Link
            href={"/account"}
            className={`${
              pathname === "/account" ? "bg-primary" : "bg-white"
            } flex justify-start px-[24px] py-[10px] items-center gap-3 w-full`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.2"
                d="M2.5 6.25L10 10.625L17.5 6.25L10 1.875L2.5 6.25Z"
                fill={pathname === "/account" ? "white" : "#5F6C72"}
              />
              <path
                d="M2.5 13.75L10 18.125L17.5 13.75"
                stroke={pathname === "/account" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 10L10 14.375L17.5 10"
                stroke={pathname === "/account" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 6.25L10 10.625L17.5 6.25L10 1.875L2.5 6.25Z"
                stroke={pathname === "/account" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p
              className={`${
                pathname === "/account"
                  ? "text-white font-[600]"
                  : "font-[400] text-[#5F6C72]"
              } text-[14px] leading-[20px] w-full`}
            >
              Dashboard
            </p>
          </Link>
          <Link
            href={"/account/history"}
            className={`${
              pathname === "/account/history" ? "bg-primary" : "bg-white"
            } flex justify-start px-[24px] py-[10px] items-center gap-3 w-full`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 10.9062V16.25C3.75 16.4158 3.81585 16.5747 3.93306 16.6919C4.05027 16.8092 4.20924 16.875 4.375 16.875H15.625C15.7908 16.875 15.9497 16.8092 16.0669 16.6919C16.1842 16.5747 16.25 16.4158 16.25 16.25V10.9062"
                stroke={pathname === "/account/history" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.21875 3.125H15.7812C15.9168 3.12612 16.0485 3.17075 16.1568 3.25233C16.2651 3.33391 16.3443 3.44812 16.3828 3.57812L17.5 7.5H2.5L3.61719 3.57812C3.65568 3.44812 3.73492 3.33391 3.84322 3.25233C3.95152 3.17075 4.08317 3.12612 4.21875 3.125V3.125Z"
                stroke={pathname === "/account/history" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.5 7.5V8.75C7.5 9.41304 7.23661 10.0489 6.76777 10.5178C6.29893 10.9866 5.66304 11.25 5 11.25C4.33696 11.25 3.70107 10.9866 3.23223 10.5178C2.76339 10.0489 2.5 9.41304 2.5 8.75V7.5"
                stroke={pathname === "/account/history" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.5 7.5V8.75C12.5 9.41304 12.2366 10.0489 11.7678 10.5178C11.2989 10.9866 10.663 11.25 10 11.25C9.33696 11.25 8.70107 10.9866 8.23223 10.5178C7.76339 10.0489 7.5 9.41304 7.5 8.75V7.5"
                stroke={pathname === "/account/history" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5 7.5V8.75C17.5 9.41304 17.2366 10.0489 16.7678 10.5178C16.2989 10.9866 15.663 11.25 15 11.25C14.337 11.25 13.7011 10.9866 13.2322 10.5178C12.7634 10.0489 12.5 9.41304 12.5 8.75V7.5"
                stroke={pathname === "/account/history" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p
              className={`${
                pathname === "/account/history"
                  ? "text-white font-[600]"
                  : "text-[#5F6C72] font-[400]"
              } text-[14px] leading-[20px] w-full`}
            >
              Order History
            </p>
          </Link>
          <Link
            href={"/account/order"}
            className={`${
              pathname === "/account/order" ? "bg-primary" : "bg-white"
            } flex justify-start px-[24px] py-[10px] items-center gap-3 w-full`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.375 18.125H15.625"
                stroke={pathname === "/account/order" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.25 8.125C16.25 13.75 10 18.125 10 18.125C10 18.125 3.75 13.75 3.75 8.125C3.75 6.4674 4.40848 4.87769 5.58058 3.70558C6.75269 2.53348 8.3424 1.875 10 1.875C11.6576 1.875 13.2473 2.53348 14.4194 3.70558C15.5915 4.87769 16.25 6.4674 16.25 8.125V8.125Z"
                stroke={pathname === "/account/order" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 10.625C11.3807 10.625 12.5 9.50571 12.5 8.125C12.5 6.74429 11.3807 5.625 10 5.625C8.61929 5.625 7.5 6.74429 7.5 8.125C7.5 9.50571 8.61929 10.625 10 10.625Z"
                stroke={pathname === "/account/order" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p
              className={`${
                pathname === "/account/order"
                  ? "text-white font-[600]"
                  : "text-[#5F6C72] font-[400]"
              } text-[14px] leading-[20px] w-full`}
            >
              Track Order
            </p>
          </Link>
          <Link
            href={"/account/settings"}
            className={`${
              pathname === "/account/settings" ? "bg-primary" : "bg-white"
            } flex justify-start px-[24px] py-[10px] items-center gap-3 w-full`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 13.75C12.0711 13.75 13.75 12.0711 13.75 10C13.75 7.92893 12.0711 6.25 10 6.25C7.92893 6.25 6.25 7.92893 6.25 10C6.25 12.0711 7.92893 13.75 10 13.75Z"
                stroke={pathname === "/account/settings" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.3516 5.08594C14.5495 5.26823 14.737 5.45573 14.9141 5.64844L17.0469 5.95313C17.3944 6.55665 17.6622 7.20265 17.8438 7.875L16.5469 9.60156C16.5469 9.60156 16.5703 10.1328 16.5469 10.3984L17.8438 12.125C17.6631 12.7976 17.3952 13.4437 17.0469 14.0469L14.9141 14.3516C14.9141 14.3516 14.5469 14.7344 14.3516 14.9141L14.0469 17.0469C13.4434 17.3944 12.7974 17.6622 12.125 17.8438L10.3984 16.5469C10.1333 16.5703 9.86667 16.5703 9.60156 16.5469L7.875 17.8438C7.20236 17.6631 6.55625 17.3952 5.95313 17.0469L5.64844 14.9141C5.45573 14.7318 5.26823 14.5443 5.08594 14.3516L2.95312 14.0469C2.60561 13.4434 2.33776 12.7974 2.15625 12.125L3.45313 10.3984C3.45313 10.3984 3.42969 9.86719 3.45313 9.60156L2.15625 7.875C2.33692 7.20236 2.60481 6.55625 2.95312 5.95313L5.08594 5.64844C5.26823 5.45573 5.45573 5.26823 5.64844 5.08594L5.95313 2.95312C6.55665 2.60561 7.20265 2.33776 7.875 2.15625L9.60156 3.45313C9.86667 3.42968 10.1333 3.42968 10.3984 3.45313L12.125 2.15625C12.7976 2.33692 13.4437 2.60481 14.0469 2.95312L14.3516 5.08594Z"
                stroke={pathname === "/account/settings" ? "white" : "#5F6C72"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p
              className={`${
                pathname === "/account/settings"
                  ? "text-white font-[600]"
                  : "text-[#5F6C72] font-[400]"
              } text-[14px] leading-[20px] w-full`}
            >
              Setting
            </p>
          </Link>
          <button
            className="flex justify-start px-[24px] py-[10px] items-center gap-3"
            onClick={() => handleLogout()}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5938 6.71875L16.875 10L13.5938 13.2812"
                stroke="#EB6363"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.125 10H16.875"
                stroke="#EB6363"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.125 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V3.75C3.125 3.58424 3.19085 3.42527 3.30806 3.30806C3.42527 3.19085 3.58424 3.125 3.75 3.125H8.125"
                stroke="#EB6363"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p className="text-[14px] leading-[20px] font-[400] text-primary w-full">
              Log-out
            </p>
          </button>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default Account;
