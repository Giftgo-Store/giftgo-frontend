import React, { useState } from "react";
import classNames from "classnames";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import BASE_URL from "../../config/baseurl";
import Cookie from "js-cookie";
import { useAppToast } from "@/app/providers/useAppToast";
import Link from "next/link";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal }) => {
  const toast = useAppToast();
  const [activeNav, setActiveNav] = useState("1");
  const [showPassword, setShowPassword] = useState(false);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData) {
      toast({
        status: "error",
        description: "please enter your credentials",
      });
      return;
    }
    setIsSigningIn(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/log-in`,
        signInData
      );
      toast({
        status: "success",
        description: response.data.message || "Success",
      });
      Cookie.set("token", response.data.data.token);
      closeModal();
    } catch (error) {
      toast({
        status: "error",
        //@ts-ignore
        description:
          error?.response?.data.message || error?.message || "Sign in error",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData) {
      toast({
        status: "error",
        description: "please enter your credentials",
      });
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        status: "error",
        description: "passwords do not match",
      });
      return;
    }
    setIsSigningUp(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/sign-up`,
        signUpData
      );
      toast({
        status: "success",
        description: response.data.message || "Success",
      });
      Cookie.set("token", response.data.data.accessToken.token);
      closeModal();
    } catch (error) {
      toast({
        status: "error",
        //@ts-ignore
        description:
          error.response?.data.message || error?.message || "Sign up error",
      });
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/google/callback`);
      toast({
        status: "success",
        description: response.data.message || "Success",
      });
      Cookie.set("token", response.data.data.accessToken.token);
      closeModal();
    } catch (error) {
      toast({
        status: "error",
        //@ts-ignore
        description:
          error.response?.data.message || error?.message || "Sign up error",
      });
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleSuccess = async (response: any) => {
    // Retrieve token from the credentialResponse object
    const token = response.credential; // This is the JWT token
    Cookie.set("token", token);
    try {
      const response = await fetch(`${BASE_URL}/api/v1/google/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // Send the token in the request body
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      // Handle successful response from the backend
      toast({
        status: "success",
        description: data.message || "Success",
      });

      // Store the access token or other data as needed
      Cookie.set("token", data.data.accessToken.token);
    } catch (error: any) {
      // Handle error if the request fails
      toast({
        status: "error",
        description: error?.message || "Sign up error",
      });
    } finally {
      // Set the signing-up state to false after the request
      setIsSigningUp(false);
    }
    closeModal();

    // You can now send this token to your backend for verification or store it for further use
  };

  const handleFailure = () => {
    toast({
      status: "error",
      //@ts-ignore
      description: "Sign up error",
    });
  };

  const clientId =
    "787438596934-440o4qkmhn6o09170ou6dlms89g1j8tj.apps.googleusercontent.com";

  return (
    <div
      className={classNames(
        "absolute inset-0 z-[99999] flex l items-center justify-center",
        { "bg-overlayy ": showModal, hidden: !showModal }
      )}
    >
      <div className="absolute lg:right-[120px] bg-white z-[9999] rounded-[4px] top-[100px] lg:top-[115px] shadow-lg w-[90%] lg:w-[426px] py-3">
        <button
          className="absolute z-40 top-0 right-0 mt-1 mr-2 text-[20px] text-gray-600"
          onClick={closeModal}
        >
          ×
        </button>
        <div className="pt-[5px] flex justify-center items-center gap-3 border-b-[1px] border-b-[#E4E7E9] w-full">
          <p
            onClick={() => setActiveNav("1")}
            className={`${
              activeNav === "1"
                ? "bg-white text-[#191C1F] border-b-[4px] border-b-primary"
                : "backdrop-blur mx-2 text-[#77878F]"
            } px-4 w-1/2 transition-all ease-out duration-200  hover:scale-95 text-[20px] font-[600] cursor-pointer text-center pb-3`}
          >
            Sign In
          </p>
          <p
            onClick={() => setActiveNav("2")}
            className={`${
              activeNav === "2"
                ? "bg-white text-[#191C1F] border-b-[4px] border-b-primary"
                : "backdrop-blur mx-2 text-[#77878F]"
            } px-4 w-1/2 transition-all ease-out duration-200  hover:scale-95 text-[20px] font-[600] cursor-pointer text-center pb-3`}
          >
            Sign Up
          </p>
        </div>
        {activeNav === "1" && (
          <>
            <form className="p-6" onSubmit={handleSignInSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#191C1F]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={signInData.email}
                  onChange={handleSignInChange}
                  className="mt-1 block w-full p-2 border h-[44px] border-gray-300 rounded-[2px]"
                  required
                />
              </div>
              <div className="mb-6">
                <div className=" flex justify-between items-center w-full">
                  <label className="text-sm font-medium text-[#191C1F] flex justify-between items-center">
                    Password
                  </label>
                  <Link
                    href={"/forgot-password"}
                    onClick={() => closeModal()}
                    className="text-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={signInData.password}
                    onChange={handleSignInChange}
                    className="mt-1 block w-full p-2 border h-[44px] border-gray-300 rounded-[2px]"
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
                className="w-full bg-primary hover:bg-[#05031A]  text-white py-2 h-[48px] rounded-[2px] flex justify-center items-center gap-4 font-[700]"
              >
                {isSigningIn ? (
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
                    SIGN IN
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>
            <div className="flex justify-between px-6 items-center">
              <div className="bg-[#E4E7E9] h-[2px] w-[45%]"></div>
              <button className="text-sm text-[#77878F]">or</button>
              <div className="bg-[#E4E7E9] h-[2px] w-[45%]"></div>
            </div>
            <div className="text-center px-6 py-4">
              <button
                onClick={(e) => handleGoogle(e)}
                className="w-full bg-white border-[1px] border-[#E4E7E9] text-[#191C1F] py-2 rounded-[2px] h-[44px] mb-2 relative"
              >
                <Image
                  src="/Google.png"
                  alt=""
                  width={20}
                  height={20}
                  className="absolute left-5"
                />
                Login with Google
              </button>

              <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleFailure}
                />
              </GoogleOAuthProvider>
            </div>
          </>
        )}

        {activeNav === "2" && (
          <>
            <form className="p-6" onSubmit={handleSignUpSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#191C1F]">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                  className="mt-1 block w-full p-2 border h-[44px] border-gray-300 rounded-[2px]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#191C1F]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  className="mt-1 block w-full p-2 border h-[44px] border-gray-300 rounded-[2px]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#191C1F]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={signUpData.phone}
                  onChange={handleSignUpChange}
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
                    value={signUpData.password}
                    onChange={handleSignUpChange}
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
              <div className="mb-6">
                <label className="text-sm font-medium text-[#191C1F] flex justify-between items-center">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    className="mt-1 block w-full p-2 border h-[44px] border-gray-300 rounded-[2px]"
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

              <div className="mb-8 flex justify-start gap-3 items-start">
                <input
                  type="checkbox"
                  className="mt-1 block p-2 border border-gray-300 rounded-[2px]"
                  required
                />
                <label className="block text-sm font-medium text-[#191C1F]">
                  Do you agree to Gift-Go{" "}
                  <span className="text-[#2DA5F3]">Terms of Condition</span> and{" "}
                  <span className="text-[#2DA5F3]">Privacy Policy</span>.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#05031A] text-white py-2 h-[48px] rounded-[2px] flex justify-center items-center gap-4 font-[700]"
              >
                {isSigningUp ? (
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
                    SIGN UP
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>
            {/* <div className="flex justify-between px-6 items-center">
              <div className="bg-[#E4E7E9] h-[2px] w-[45%]"></div>
              <button className="text-sm text-[#77878F]">or</button>
              <div className="bg-[#E4E7E9] h-[2px] w-[45%]"></div>
            </div>
            <div className="text-center px-6 py-4">
              <div
                onClick={(e) => handleGoogle(e)}
                className="w-full bg-white border-[1px] border-[#E4E7E9] text-[#191C1F] py-2 rounded-[2px] h-[44px] mb-2 relative"
              >
                <Image
                  src="/Google.png"
                  alt=""
                  width={20}
                  height={20}
                  className="absolute left-5"
                />
                Login with Google
              </div>
              <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleFailure}
                />
              </GoogleOAuthProvider>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
