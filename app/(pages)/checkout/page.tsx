"use client";

import Image from "next/image";
import { FiMinus, FiPlus, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useRef, useState } from "react";

const Page = () => {
  const [image, setImage] = useState<string[]>([]);
  const [customizable, setCustomizable] = useState(true);
  const photoInput: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const handleValidChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files.item(0);
      // if (file instanceof File) {
      //   try {
      //     const downloadURL = await upload(file);
      //     console.log("File uploaded successfully:", downloadURL);
      //     setImage([downloadURL]);
      //   } catch (error) {
      //     console.error("Error uploading file:", error);
      //   }
      //   if (!file) return;
      // }
    }
  };
  return (
    <>
      <div className="py-[20px] px-[4%] lg:px-[8%] text-center bg-secondary mb-[56px]">
        <h2 className="font-[600] leading-[32px] text-[28px] text-[#191C1F] pb-1">
          Checkout
        </h2>
        <p className="text-[#475156] text-[18px] font-[500]">
          Home / <span className="cursor-pointer"> Shopping card</span> /
          Checkout
        </p>
      </div>

      <div className="px-[4%] lg:px-[8%] mb-[90px] flex-col lg:flex-row flex justify-between items-start gap-6">
        <div className="lg:w-[67%] rounded-[4px]">
          <div className="py-5">
            <h2 className="text-[18px] font-[500] text-[#191C1F]">
              Shipping Information
            </h2>
          </div>

          <div className="flex flex-col items-start w-full gap-4">
            <div className="flex justify-between flex-col lg:flex-row items-start lg:items-end w-full gap-4">
              <div className="flex flex-col gap-2 w-full lg:w-[30%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  User name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                  placeholder="First name"
                />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[30%]">
                <input
                  type="text"
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                  placeholder="Last name"
                />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[40%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Company Name{" "}
                  <span className="text-[#929FA5]">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                  placeholder="Company name"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="username" className="text-[#191C1F] text-[14px]">
                Address
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                placeholder="Address"
              />
            </div>
            <div className="flex justify-between items-start flex-wrap lg:items-end w-full gap-4">
              <div className="flex flex-col gap-2 w-[45%] lg:w-[23%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Country
                </label>
                <select className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none text-[#929FA5]">
                  <option value="">select</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 w-[45%] lg:w-[23%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Region/State
                </label>
                <select className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none text-[#929FA5]">
                  <option value="">select</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 w-[45%] lg:w-[23%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  City
                </label>
                <select className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none text-[#929FA5]">
                  <option value="">select</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 w-[45%] lg:w-[23%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                  placeholder="Zip Code"
                />
              </div>
            </div>
            <div className="flex justify-between items-end w-full gap-4 flex-wrap">
              <div className="flex flex-col gap-2 w-full lg:w-[48%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="username"
                  id="username"
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                  placeholder="Email Address"
                />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[48%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>

          <div className="pt-10 pb-6">
            <h2 className="text-[18px] font-[500] text-[#191C1F]">
              Additional Information
            </h2>
          </div>
          {customizable ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full gap-4 lg:gap-2">
              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Order Notes <span className="text-[#929FA5]">(Optional)</span>
                </label>
                <textarea
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[150px] lg:h-full py-2 px-5 outline-none"
                  placeholder="Notes about your order, e.g. special notes for delivery. This notes may or may not be checked."
                />
              </div>

              <div className="flex flex-col items-start">
                <label className="text-[#191C1F]">
                  Upload Image you want printed
                </label>
                <input
                  type="file"
                  required
                  className="hidden"
                  ref={photoInput}
                  onChange={handleValidChange}
                />
                <div
                  className="border-[2px] border-dashed border-[##E4E7E9] rounded-[8px] px-8 w-full flex flex-col justify-center items-center cursor-pointer py-[26px]"
                  onClick={() => {
                    if (photoInput.current) {
                      // @ts-ignore
                      photoInput.current.click();
                    }
                  }}
                >
                  {image.length < 1 ? (
                    <>
                      <Image width={64} height={64} src="/image.png" alt="" />{" "}
                      <p className="text-[#929FA5] text-center">
                        Drop your image here, or{" "}
                        <span className="text-primary">Browse</span> <br />
                        Jpeg, png are allowed
                      </p>
                    </>
                  ) : (
                    <p className="text-green-400">
                      File uploaded successfully!
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <label htmlFor="username" className="text-[#191C1F] text-[14px]">
                Order Notes <span className="text-[#929FA5]">(Optional)</span>
              </label>
              <textarea
                className="border-[#E4E7E9] text-[14px] border-[1px] h-[150px] py-2 px-5 outline-none"
                placeholder="Notes about your order, e.g. special notes for delivery. This notes may or may not be checked."
              />
            </div>
          )}
        </div>
        <div className="border-[#E4E7E9] border-[1px] lg:w-[33%] rounded-[4px]">
          <div className="px-6 py-5">
            <h2 className="text-[18px] font-[500] text-[#191C1F]">
              Order Summary
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 px-5">
            <div className="flex justify-between w-full items-center">
              <Image
                src="/cam.png"
                alt=""
                width={72}
                height={72}
                className="relative z-0"
              />
              <div>
                <p className="text-[14px] font-[400]">
                  Canon EOS 1500D DSLR Camera Body+ 18-5..
                </p>
                <p className="text-[14px] font-[400]">
                  1 x <span className="font-[700] text-[14px]">₦250</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full items-center">
              <Image
                src="/cam.png"
                alt=""
                width={72}
                height={72}
                className="relative z-0"
              />
              <div>
                <p className="text-[14px] font-[400]">
                  Canon EOS 1500D DSLR Camera Body+ 18-5..
                </p>
                <p className="text-[14px] font-[400]">
                  1 x <span className="font-[700] text-[14px]">₦250</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 px-5 pt-4">
            <div className="flex justify-between items-center w-full">
              <p className="text-[#5F6C72] text-[14px]">Sub-total</p>
              <p className="text-[#191C1F] text-[14px] font-[700]">₦32220</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-[#5F6C72] text-[14px]">Shipping</p>
              <p className="text-[#191C1F] text-[14px] font-[700]">Free</p>
            </div>
          </div>

          <div className="bg-[#E4E7E9] h-[1px] w-full my-[16px]"></div>

          <div className="flex justify-between items-center w-full px-5">
            <p className="text-[#191C1F] text-[16px]">Sub-total</p>
            <p className="text-[#191C1F] text-[16px] font-[700]">₦32220</p>
          </div>

          <div className="flex justify-center items-center my-6">
            <button className="flex justify-center items-center gap-2 text-white px-8 py-4 bg-primary rounded-[3px] font-[700]">
              <p>PLACE ORDER</p>
              <FiArrowRight className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
