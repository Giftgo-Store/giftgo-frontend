"use client";

import { FiEye, FiEyeOff } from "react-icons/fi";
import React, { useState } from "react";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import Cookies from "js-cookie";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState('')
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };  

    const handlePasswordChange = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if(newPassword.length < 8) {
        alert("Password must be at least 8 characters")
        return
      }
      if(newPassword !== confirmPassword) {
        alert("Passwords do not match")
        return
      }

      try {
        const response = await axios.put(
          `${BASE_URL}/api/v1/user/change-password`,
          {
            currentPassword,
            newPassword,
            confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        console.log(response.data);
        // Handle successful response, e.g., save token, redirect, etc.
        alert("Successful" + response);
      } catch (error) {
        //@ts-ignore
        //@ts-expect-error
        alert("Error fetching resource", error?.response?.data || error?.message);
      } finally {
        // Any cleanup or final actions
      }
    };

  return (
    <div className="">
      <div className="p-[24px] mb-[56px]">
        <h1 className="text-[18px] font-[500] leading-[24px] text-[#191C1F] mb-[24px]">
          Account Settings
        </h1>

        <form action="" className="flex flex-col items-start gap-4">
          <fieldset className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="" className="text-[#191C1F] text-[14px]">
              User Name
            </label>
            <div className="w-full flex justify-between items-center gap-4">
              <input
                type="text"
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-[50%]"
                placeholder="First Name"
              />
              <input
                type="text"
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-[50%]"
                placeholder="Last Name"
              />
            </div>
          </fieldset>
          <fieldset className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="" className="text-[#191C1F] text-[14px]">
              Display Name
            </label>
            <input
              type="text"
              className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
            />
          </fieldset>
          <div className="w-full flex justify-between items-center gap-4">
            <fieldset className="flex flex-col items-start gap-2 w-[50%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Email Address
              </label>
              <input
                type="email"
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
              />
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 w-[50%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Phone Number
              </label>
              <input
                type="tel"
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
              />
            </fieldset>
          </div>
          <button className="mt-2 flex justify-center items-center w-[204px] gap-[35px] text-white px-6 py-4 bg-primary rounded-[3px] font-[700] text-[14px]">
            SAVE CHANGES
          </button>
        </form>
      </div>

      <div className="p-[24px] mb-[56px]">
        <h1 className="text-[18px] font-[500] leading-[24px] text-[#191C1F] mb-[24px]">
          Shipping Information
        </h1>

        <form action="" className="flex flex-col items-start gap-4">
          <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4">
            <fieldset className="w-full flex flex-col items-start gap-2 lg:w-[50%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                User Name
              </label>
              <div className="w-full flex-col lg:flex-row flex justify-between items-center gap-4">
                <input
                  type="text"
                  className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full lg:w-[50%]"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full lg:w-[50%]"
                  placeholder="Last Name"
                />
              </div>
            </fieldset>
            <fieldset className="flex w-full flex-col items-start gap-2 lg:w-[50%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Company Name <span className="text-[#929FA5]">(Optional)</span>
              </label>
              <input
                type="text"
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
                placeholder="First Name"
              />
            </fieldset>
          </div>

          <fieldset className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="" className="text-[#191C1F] text-[14px]">
              Address
            </label>
            <input
              type="text"
              className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
            />
          </fieldset>
          <div className="w-full flex justify-between items-center gap-4 flex-wrap lg:flex-nowrap">
            <fieldset className="flex flex-col items-start gap-2 w-[47%] lg:w-[25%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Country
              </label>
              <select
                name=""
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] text-[#929FA5] w-full"
              >
                <option value="" selected disabled>
                  Select...
                </option>
              </select>
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 w-[47%] lg:w-[25%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Region/State
              </label>
              <select
                name=""
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] text-[#929FA5] w-full"
              >
                <option value="" selected disabled>
                  Select...
                </option>
              </select>
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 w-[47%] lg:w-[25%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                City
              </label>
              <select
                name=""
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] text-[#929FA5] w-full"
              >
                <option value="" selected disabled>
                  Select...
                </option>
              </select>
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 w-[47%] lg:w-[25%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Zip Code
              </label>
              <input
                type="tel"
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
              />
            </fieldset>
          </div>
          <div className="w-full flex justify-between items-center gap-4">
            <fieldset className="flex flex-col items-start gap-2 lg:w-[50%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Email Address
              </label>
              <input
                type="email"
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
              />
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 lg:w-[50%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Phone Number
              </label>
              <input
                type="tel"
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
              />
            </fieldset>
          </div>
          <button className="mt-2 flex justify-center items-center w-[204px] gap-[35px] text-white px-6 py-4 bg-primary rounded-[3px] font-[700] text-[14px]">
            SAVE CHANGES
          </button>
        </form>
      </div>

      <div className="mb-[56px] border-[1px] border-[#E4E7E9] rounded-[4px]">
        <h1 className="text-[14px] font-[500] leading-[24px] border-b-[1px] border-b-[#E4E7E9] text-[#191C1F] py-[16px] px-[24px]">
          CHANGE PASSWORD
        </h1>

        <form action="" className="flex flex-col items-start gap-4 p-[24px]">
          <fieldset className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="" className="text-[#191C1F] text-[14px]">
              Current Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              {!showPassword ? (
                <FiEyeOff
                  onClick={handlePassword}
                  className="absolute right-3 top-3"
                />
              ) : (
                <FiEye
                  onClick={handlePassword}
                  className="absolute right-3 top-3"
                />
              )}
            </div>
          </fieldset>
          <fieldset className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="" className="text-[#191C1F] text-[14px]">
              New Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
                placeholder="8+ characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {!showPassword ? (
                <FiEyeOff
                  onClick={handlePassword}
                  className="absolute right-3 top-3"
                />
              ) : (
                <FiEye
                  onClick={handlePassword}
                  className="absolute right-3 top-3"
                />
              )}
            </div>
          </fieldset>
          <fieldset className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="" className="text-[#191C1F] text-[14px]">
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!showPassword ? (
                <FiEyeOff
                  onClick={handlePassword}
                  className="absolute right-3 top-3"
                />
              ) : (
                <FiEye
                  onClick={handlePassword}
                  className="absolute right-3 top-3"
                />
              )}
            </div>
          </fieldset>
          <button
            onClick={(e) => handlePasswordChange(e)}
            className="mt-2 flex justify-center items-center w-[204px] gap-[35px] text-white px-6 py-4 bg-primary rounded-[3px] font-[700] text-[14px]"
          >
            CHANGE PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;