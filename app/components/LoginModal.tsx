// components/Modal.tsx
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal }) => {
      const [activeNav, setActiveNav] = useState("1");
      const [showPassword, setShowPassword] = useState(false);

      const handlePassword = () => {
        setShowPassword(!showPassword);
      }

    // useEffect(() => {
    //   if (showModal) {
    //     document.body.classList.add("overflow-hidden");
    //   } else {
    //     document.body.classList.remove("overflow-hidden");
    //   }

    //   // Cleanup function to remove the class when the component is unmounted
    //   return () => {
    //     document.body.classList.remove("overflow-hidden");
    //   };
    // }, [showModal]);

  return (
    <div
      className={classNames(
        "absolute inset-0 z-50 flex l items-center justify-center",
        { "bg-overlayy ": showModal, hidden: !showModal }
      )}
    >
      <div className="absolute lg:right-[120px] bg-white rounded-[4px] top-[100px] lg:top-[195px] shadow-lg w-[90%] lg:w-[426px] py-3">
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
            <form className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#191C1F]">
                  Email Address
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full p-2 border h-[44px] border-gray-300 rounded-[2px]"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="text-sm font-medium text-[#191C1F] flex justify-between items-center">
                  Password
                  <button className="text-sm">Forgot Password?</button>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
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
                className="w-full bg-primary text-white py-2 h-[48px] rounded-[2px] flex justify-center items-center gap-4 font-[700]"
              >
                SIGN IN
                <FaArrowRight />
              </button>
            </form>
            <div className="flex justify-between px-6 items-center">
              <div className="bg-[#E4E7E9] h-[2px] w-[45%]"></div>
              <button className="text-sm text-[#77878F">or</button>
              <div className="bg-[#E4E7E9] h-[2px] w-[45%]"></div>
            </div>
            <div className="text-center px-6 py-4">
              <button className="w-full bg-white border-[1px] border-[#E4E7E9] text-[#191C1F] py-2 rounded-[2px] h-[44px] mb-2 relative">
                <Image
                  src="/Google.png"
                  alt=""
                  width={20}
                  height={20}
                  className="absolute left-5"
                />
                Login with Google
              </button>
              <button className="w-full bg-white border-[1px] border-[#E4E7E9] text-[#191C1F] py-2 rounded-[2px] h-[44px] relative">
                <Image
                  src="/apple.png"
                  alt=""
                  width={20}
                  height={20}
                  className="absolute left-5"
                />
                Login with Apple
              </button>
            </div>
          </>
        )}

        {activeNav === "2" && (
          <>
            <form className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#191C1F]">
                  Name
                </label>
                <input
                  type="name"
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
                className="w-full bg-primary text-white py-2 h-[48px] rounded-[2px] flex justify-center items-center gap-4 font-[700]"
              >
                SIGN UP
                <FaArrowRight />
              </button>
            </form>
            <div className="flex justify-between px-6 items-center">
              <div className="bg-[#E4E7E9] h-[2px] w-[45%]"></div>
              <button className="text-sm text-[#77878F">or</button>
              <div className="bg-[#E4E7E9] h-[2px] w-[45%]"></div>
            </div>
            <div className="text-center px-6 py-4">
              <button className="w-full bg-white border-[1px] border-[#E4E7E9] text-[#191C1F] py-2 rounded-[2px] h-[44px] mb-2 relative">
                <Image
                  src="/Google.png"
                  alt=""
                  width={20}
                  height={20}
                  className="absolute left-5"
                />
                Sign up with Google
              </button>
              <button className="w-full bg-white border-[1px] border-[#E4E7E9] text-[#191C1F] py-2 rounded-[2px] h-[44px] relative">
                <Image
                  src="/apple.png"
                  alt=""
                  width={20}
                  height={20}
                  className="absolute left-5"
                />
                Sign up with Apple
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
