"use client";

import Image from "next/image";
import { useState } from "react";
import { FiMinus, FiPlus, FiArrowLeft, FiArrowRight } from "react-icons/fi";

const History = () => {
  const [showDetails, setShowDetails] = useState(true);
  const handleShowDetails = () => {
    setShowDetails(false);
  };

  const handleHideDetails = () => {
    setShowDetails(true);
  };
  return (
    <>
      {showDetails ? (
        <div>
          <p className="py-[16px] px-[24px] text-[14px] leading-[20px] font-[500] text-[#191C1F]">
            ORDER HISTORY
          </p>

          <div>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium border-[#D9E2E6] mx-[10px] rounded-md mb-4">
                        <tr className="bg-[#F2F4F5] rounded-md mb-4 text-[#475156]">
                          <th
                            scope="col"
                            className="px-6 text-[12px] font-[5OO] text-[500] py-4"
                          >
                            ORDER ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 text-[12px] font-[5OO] text-[500] py-4"
                          >
                            STATUS
                          </th>
                          <th
                            scope="col"
                            className="px-6 text-[12px] font-[5OO] text-[500] py-4"
                          >
                            DATE
                          </th>
                          <th
                            scope="col"
                            className="px-6 text-[12px] font-[5OO] text-[500] py-4"
                          >
                            TOTAL
                          </th>
                          <th
                            scope="col"
                            className="px-6 text-[12px] font-[5OO] text-[500] py-4"
                          >
                            ACTION
                          </th>
                        </tr>
                      </thead>
                      <tbody className="mt-3">
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-[#2DB224] text-[14px]">
                            COMPLETED
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-[#2DB224] text-[14px]">
                            COMPLETED
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-[#FA8232] text-[14px]">
                            IN PROGRESS
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-[#FA8232] text-[14px]">
                            IN PROGRESS
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-primary text-[14px]">
                            CANCELLED
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-primary text-[14px]">
                            CANCELLED
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-[#FA8232] text-[14px]">
                            IN PROGRESS
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-[#F2F4F5] text-[14px]">
                          <td className="whitespace-nowrap px-6 py-4 font-[500] text-[#191C1F] text-[14px]">
                            #96459761
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-[600] text-[#2DB224] text-[14px]">
                            COMPLETED
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium leading-[20px] text-[14px] text-[#5F6C72]">
                            April 30, 2024 07:52
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#475156] leading-[20px] text-[14px]">
                            ₦160 (5 Products)
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 text-[14px] font-[600] cursor-pointer text-primary flex justify-center items-start gap-2"
                            onClick={handleShowDetails}
                          >
                            View Details
                            <Image
                              src="/ArrowRight.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex justify-center items-center px-10 py-6">
                      <div className="flex items-center gap-2">
                        <div className="flex justify-between items-center gap-2">
                          <Image
                            src="/arrow1.png"
                            alt=""
                            width={40}
                            height={40}
                            className="mr-[12px]"
                          />
                          <div className="w-[40px] text-white text-[14px] leading-[20px] h-[40px] bg-primary rounded-full border-[#E4E7E9] border-[1px] flex justify-center text-center items-center">
                            01
                          </div>
                          <div className="w-[40px] text-[#191C1F] text-[14px] leading-[20px] h-[40px] bg-white rounded-full border-[#E4E7E9] border-[1px] flex justify-center text-center items-center">
                            02
                          </div>
                          <div className="w-[40px] text-[#191C1F] text-[14px] leading-[20px] h-[40px] bg-white rounded-full border-[#E4E7E9] border-[1px] flex justify-center text-center items-center">
                            03
                          </div>
                          <div className="w-[40px] text-[#191C1F] text-[14px] leading-[20px] h-[40px] bg-white rounded-full border-[#E4E7E9] border-[1px] flex justify-center text-center items-center">
                            04
                          </div>
                          <div className="w-[40px] text-[#191C1F] text-[14px] leading-[20px] h-[40px] bg-white rounded-full border-[#E4E7E9] border-[1px] flex justify-center text-center items-center">
                            05
                          </div>
                          <Image
                            src="/arrow2.png"
                            alt=""
                            width={40}
                            height={40}
                            className="ml-[12px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center w-full border-[#E4E7E9] border-[1px] px-[24px] rounded-t-[4px] mb-[24px]">
            <div
              className="flex justify-center items-center gap-2 cursor-pointer"
              onClick={handleHideDetails}
            >
              <Image src="/ArrowLeft.png" alt="" width={24} height={24} />

              <p className="py-[16px] px-[24px] text-[14px] leading-[20px] font-[500] text-[#191C1F]">
                ORDER HISTORY
              </p>
            </div>

            <div className="flex justify-center items-center gap-2">
              <p className="text-[14px] text-primary leading-[20px[">
                Leave a Rating
              </p>
              <Image src="/Plus.png" alt="" width={24} height={24} />
            </div>
          </div>

          <div className="p-[24px] border-[#FFE7D6] border-[1px] bg-[#FEEFD3] flex justify-between items-center rounded-[1px] mb-[24px]">
            <div className="flex justify-center items-start gap-2 flex-col text-[#475156] text-[14px] leading-[20px]">
              <p className="text-[#191C1F] text-[20px] leading-[28px]">
                #96459761
              </p>
              <p className="flex justify-center items-center">
                2 Products
                <span className=" rounded-full mx-2 h-[2px] w-[2px] bg-[#475156]"></span>
                Order Placed on April 30, 2024 07:52
              </p>
            </div>

            <p className="text-[28px] leading-[32px] font-[600] text-primary">
              ₦150,000
            </p>
          </div>

          <div>
            <div>
              <h2 className="text-[18px] font-[400] text-[#191C1F] mb-[20px]">
                Product <span className="text-[#475156]">(02)</span>
              </h2>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full pb-2 sm:px-6 lg:px-8">
                  <div className="">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="font-medium00 bg-[#E4E7E9]">
                        <tr>
                          <th
                            scope="col"
                            className="px-3 lg:px-6 text-[#475156] text-[12px] font-[500] py-[10px]"
                          >
                            PRODUCT
                          </th>
                          <th
                            scope="col"
                            className="px-3 lg:px-6 text-[#475156] text-[12px] font-[500] py-[10px]"
                          >
                            PRICE
                          </th>
                          <th
                            scope="col"
                            className="px-3 lg:px-6 text-[#475156] text-[12px] font-[500] py-[10px]"
                          >
                            QUANTITY
                          </th>
                          <th
                            scope="col"
                            className="px-3 lg:px-6 text-[#475156] text-[12px] font-[500] py-[10px]"
                          >
                            SUB TOTAL
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="transition duration-300 ease-in-out">
                          <td className=" px-2 lg:px-6 py-4 text-[14px] text-[#191C1F] ">
                            <div className="flex justify-start items-center gap-2 lg:gap-3">
                              <Image
                                src="/cam.png"
                                alt=""
                                width={72}
                                height={72}
                                className="relative z-0"
                              />
                              <div>
                                <h1 className="text-primary text-[12px] font-[600] mb-1">
                                  SMARTPHONE
                                </h1>
                                <p className="text-[#191C1F] lg:text-[14px] font-[400]">
                                  Simple Mobile 5G LTE Galexy 12 Mini 512GB
                                  Gaming Phone
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-[14px] font-[400] px-2 lg:px-6 text-[#475156] py-4">
                            ₦12,000
                          </td>
                          <td className=" px-1 lg:px-6 py-4">
                            <p className="font-[400] text-[#475156] text-[14px]">
                              x1
                            </p>
                          </td>
                          <td className="text-[14px] font-[600] text-[#475156] px-2 lg:px-6 py-4">
                            ₦12,000
                          </td>
                        </tr>
                        <tr className="transition duration-300 ease-in-out">
                          <td className=" px-2 lg:px-6 py-4 text-[14px] text-[#191C1F]">
                            <div className="flex justify-start items-center gap-2 lg:gap-3">
                              <Image
                                src="/cam.png"
                                alt=""
                                width={72}
                                height={72}
                                className="relative z-0"
                              />
                              <div>
                                <h1 className="text-primary text-[12px] font-[600] mb-1">
                                  ACCESSORIES
                                </h1>
                                <p className="text-[#191C1F] lg:text-[14px] font-[400]">
                                  Simple Mobile 5G LTE Galexy 12 Mini 512GB
                                  Gaming Phone
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-[14px] font-[400] px-2 lg:px-6 text-[#475156] py-4">
                            ₦12,000
                          </td>
                          <td className=" px-1 lg:px-6 py-4">
                            <p className="font-[400] text-[#475156] text-[14px]">
                              x1
                            </p>
                          </td>
                          <td className="text-[14px] font-[600] text-[#475156] px-2 lg:px-6 py-4">
                            ₦12,000
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="flex items-center lg:flex-row gap-6 justify-center p-[24px]">
                <div className="w-[310px] h-[220px] border-[#E4E7E9] border-[1px] rounded-[4px]">
                  <div className="px-[24px] py-[10px] border-b-[#E4E7E9] border-b-[1px]">
                    <p className="text-[#191C1F] text-[14px] leading-[20px] font-[500]">
                      SHIPPING ADDRESS
                    </p>
                  </div>
                  <div className="pt-[22px] px-[24px]">
                    <div className="flex justify-start items-center gap-4 mb-[20px]">
                      <div className="flex justify-start items-start flex-col gap-1">
                        <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F]">
                          Paschal Nwanks
                        </p>
                        <p className="font-[500] text-[14px] leading-[20px] text-[#5F6C72]">
                          My address here
                        </p>
                      </div>
                    </div>

                    <div className="mb-[32px]">
                      <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F] mb-[8px]">
                        Email:{" "}
                        <span className="text-[#5F6C72]">
                          nwankwopaschal017@gmail.com
                        </span>
                      </p>

                      <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F]">
                        Phone:{" "}
                        <span className="text-[#5F6C72]">+234 909090909</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#E4E7E9] w-[1px] h-[180px]"></div>

                <div className="w-[310px] h-[220px] border-[#E4E7E9] border-[1px] rounded-[4px]">
                  <div className="px-[24px] py-[10px] border-b-[#E4E7E9] border-b-[1px]">
                    <p className="text-[#191C1F] text-[14px] leading-[20px] font-[500]">
                      ORDER NOTES
                    </p>
                  </div>
                  <div className="pt-[22px] px-[24px]">
                    <div className="flex justify-start items-center gap-4 mb-[20px]">
                      <div className="flex justify-start items-start flex-col gap-1">
                        <p className="font-[500] text-[14px] leading-[20px] text-[#5F6C72]">
                          Donec ac vehicula turpis. Aenean sagittis est eu arcu
                          ornare, eget venenatis purus lobortis. Aliquam erat
                          volutpat. Aliquam magna odio.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default History;
