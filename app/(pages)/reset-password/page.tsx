"use client";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useAppToast } from "@/app/providers/useAppToast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const router = useRouter();
  const toast = useAppToast();
  const [isSending, setIsSending] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast({
        status: "error",
        description: "please enter your email",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        status: "error",
        description: "Passwords do not match",
      });
      return;
    }
    setIsSending(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/reset-password`,
        { otp, newPassword: password, confirmPassword }
      );
      // Handle successful response, e.g., save token, redirect, etc.
      toast({
        status: "success",
        description: response.data.message || "Success",
      });
      router.push("/");
    } catch (error) {
      toast({
        status: "error",
        description: "Invalid token. Please request for another token",
      });
      // console.error("Sign In Error", error.response?.data || error.message);
    } finally {
      setIsSending(false);
    }
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="my-10 flex justify-center items-center h-[60vh]">
        <div className="flex flex-col justify-center items-center w-[80%] lg:w-[25%] rounded-[8px] border border-primary p-6 ">
          <h1 className="flex justify-center items-center font-semibold">
            Reset Password
          </h1>
          <form className="p-6" onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#191C1F]">
                OTP
              </label>
              <input
                type="text"
                name="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full p-2 border h-[44px] border-gray-300 rounded-[2px]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-[#191C1F] flex justify-between items-center">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full p-2 border h-[44px] border-gray-300 rounded-[2px]"
                  placeholder="at least 8 characters"
                  required
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
            </div>{" "}
            <div className="mb-4">
              <label className="text-sm font-medium text-[#191C1F] flex justify-between items-center">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full p-2 border h-[44px] border-gray-300 rounded-[2px]"
                  placeholder="at least 8 characters"
                  required
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
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 h-[48px] rounded-[2px] flex justify-center items-center gap-4 font-[700]"
            >
              {isSending ? (
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
              ) : (
                <>
                  Reset Password
                  <FaArrowRight />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
