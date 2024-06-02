"use client";

import { FiEye, FiEyeOff } from "react-icons/fi";
import React, { useState } from "react";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };  

  return (
    <>
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
          <div className="w-full flex justify-between items-center gap-4">
            <fieldset className="flex flex-col items-start gap-2 w-[50%]">
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
            <fieldset className="flex flex-col items-start gap-2 w-[50%]">
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
          <div className="w-full flex justify-between items-center gap-4">
            <fieldset className="flex flex-col items-start gap-2 w-[25%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Country
              </label>
              <select
                name=""
                id=""
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] text-[#929FA5] w-full"
              >
                <option value="" selected disabled>
                  Select...
                </option>
              </select>
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 w-[25%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Region/State
              </label>
              <select
                name=""
                id=""
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] text-[#929FA5] w-full"
              >
                <option value="" selected disabled>
                  Select...
                </option>
              </select>
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 w-[25%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                City
              </label>
              <select
                name=""
                id=""
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] text-[#929FA5] w-full"
              >
                <option value="" selected disabled>
                  Select...
                </option>
              </select>
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 w-[25%]">
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
          <button className="mt-2 flex justify-center items-center w-[204px] gap-[35px] text-white px-6 py-4 bg-primary rounded-[3px] font-[700] text-[14px]">
            CHANGE PASSWORD
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;