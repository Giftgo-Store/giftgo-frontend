"use client";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useAppToast } from "@/app/providers/useAppToast";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();
  const toast = useAppToast();
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        status: "error",
        description: "please enter your email",
      });
      return;
    }
    setIsSending(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/forgot-password`,
        { email }
      );
      // Handle successful response, e.g., save token, redirect, etc.
      toast({
        status: "success",
        description: response.data.message || "Success",
      });
      router.push("/reset-password");
    } catch (error: any) {
      toast({
        status: "error",
        description: error.response.data.message,
      });
      // console.error("Sign In Error", error.response?.data.message);
    } finally {
      setIsSending(false);
    }
  };
  return (
    <>
      <div className="my-10 flex justify-center items-center h-[60vh]">
        <div className="flex flex-col justify-center items-center w-[80%] lg:w-[25%] rounded-[8px] border border-primary p-6 ">
          <h1 className="flex justify-center items-center font-semibold">
            Forgot Password
          </h1>

          <form className="p-6" onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#191C1F]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border h-[44px] border-gray-300 rounded-[2px]"
                required
              />
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
                  Send Code
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

export default ForgotPassword;
