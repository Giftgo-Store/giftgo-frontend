"use client";

import { FiEye, FiEyeOff } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import Cookies from "js-cookie";
import { useAppToast } from "@/app/providers/useAppToast";

const Settings = () => {
  const toast = useAppToast();
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [user, setUser] = useState<any>([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [countries, setCountries] = useState<any>([]);
  const [countCity, setCountCity] = useState<any>([]);

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
        console.log(error);
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `https://countriesnow.space/api/v0.1/countries/states`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Handle successful response, e.g., save token, redirect, etc.
        setCountries(response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource", error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchCountries();
  }, []);

  const selectedState =
    countries && countries.filter((count: any) => count.name === country);

  useEffect(() => {
    const fetchCountCity = async () => {
      try {
        const response = await axios.get(
          `https://countriesnow.space/api/v0.1/countries`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Handle successful response, e.g., save token, redirect, etc.
        setCountCity(response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource", error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchCountCity();
  }, []);

  const selectedCity =
    countCity && countCity.filter((count: any) => count.country === country);

  useEffect(() => {
    if (user && user.address) {
      setFirstName(user && user?.name && user?.name.split(" ")[0]);
      setLastName(user && user?.name && user?.name.split(" ")[1]);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address.address);
      // setCountry(user.address.country);
      // setCity(user.address.city);
      // setRegion(user.address.state);
      setZipCode(user.address.postal_code);
    }
  }, [user]);

  const handleProfileUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading1(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/user/update-profile`,
        {
          name: firstName + " " + lastName,
          phone,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(response.data);
      // Handle successful response, e.g., save token, redirect, etc.
      toast({
        status: "success",
        description: response.data.message || "Success",
      });
    } catch (error) {
      //@ts-ignore
      toast({
        status: "error",
        description:
          //@ts-expect-error
          error?.response?.data.message || error?.message ||
          "an error occurred ",
      });
    } finally {
      setLoading1(false);
      // Any cleanup or final actions
    }
  };

  const handleAddressUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading2(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/user/update-address`,
        {
          address,
          city: user?.address?.city,
          state: user?.address?.state,
          country: user?.address?.country,
          postal_code: zipCode,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(response.data);
      // Handle successful response, e.g., save token, redirect, etc.
      toast({
        status: "success",
        description: response.data.message || "Success",
      });
    } catch (error) {
      //@ts-ignore
      toast({
        status: "error",
        description:
          //@ts-expect-error
          error?.response?.data.message || error?.message ||
          "an error occurred ",
      });
    } finally {
      setLoading2(false);
      // Any cleanup or final actions
    }
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast({
        status: "error",
        description: "Password must be at least 8 characters",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        status: "error",
        description: "Passwords do not match",
      });
      return;
    }
    setLoading3(true);
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
      toast({
        status: "success",
        description: response.data.message || "Success",
      });
    } catch (error) {
      //@ts-ignore
      toast({
        status: "error",
        description:
          //@ts-expect-error
          error?.response?.data.message || error?.message ||
          "an error occurred ",
      });
    } finally {
      setLoading3(false);
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-[50%]"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
              value={firstName + " " + lastName}
              onChange={(e) => setLastName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 w-[50%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Phone Number
              </label>
              <input
                type="tel"
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </fieldset>
          </div>
          <button
            onClick={(e) => handleProfileUpdate(e)}
            className="mt-2 flex justify-center items-center w-[204px] gap-[10px] text-white px-6 py-4 bg-primary rounded-[3px] font-[700] text-[14px]"
          >
            {loading1 && (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}{" "}
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full lg:w-[50%]"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                placeholder="Company Name"
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value={user && user?.address && user?.address?.country}>
                  {user && user?.address && user?.address?.country}
                </option>
                {countries.length > 0 &&
                  countries.map((count: any, i: any) => {
                    return (
                      <option key={i} value={count.name}>
                        {count.name}
                      </option>
                    );
                  })}
              </select>
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 w-[47%] lg:w-[25%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Region/State
              </label>
              <select
                name=""
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] text-[#929FA5] w-full"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value={user && user?.address && user?.address?.state}>
                  {user && user?.address && user?.address?.state}
                </option>
                {selectedState.length > 0 &&
                  selectedState[0] &&
                  selectedState[0].states &&
                  selectedState[0].states.map((state: any, i: any) => {
                    return (
                      <option key={i} value={state.name}>
                        {state.name}
                      </option>
                    );
                  })}
              </select>
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 w-[47%] lg:w-[25%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                City
              </label>
              <select
                name=""
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] text-[#929FA5] w-full"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value={user && user?.address && user?.address?.city}>
                  {user && user?.address && user?.address?.city}
                </option>
                {selectedCity.length > 0 &&
                  selectedCity[0] &&
                  selectedCity[0].cities &&
                  selectedCity[0].cities.map((city: any, i: any) => {
                    return (
                      <option key={i} value={city}>
                        {city}
                      </option>
                    );
                  })}
                {selectedCity.length > 0 &&
                  selectedCity.map((count: any, i: any) => {
                    return (
                      <option key={i} value={count.name}>
                        {count.name}
                      </option>
                    );
                  })}
              </select>
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 w-[47%] lg:w-[25%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Zip Code
              </label>
              <input
                type="tel"
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="flex flex-col items-start gap-2 lg:w-[50%]">
              <label htmlFor="" className="text-[#191C1F] text-[14px]">
                Phone Number
              </label>
              <input
                type="tel"
                className="border-[1px] border-[#E4E7E9] rounded-[2px] outline-none h-[44px] px-4 text-[14px] w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </fieldset>
          </div>
          <button
            className="mt-2 flex justify-center items-center w-[204px] gap-[8px] text-white px-6 py-4 bg-primary rounded-[3px] font-[700] text-[14px]"
            onClick={(e) => handleAddressUpdate(e)}
          >
            {loading2 && (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}
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
            {loading3 && (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}
            CHANGE PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
