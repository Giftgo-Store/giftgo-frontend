// components/Modal.tsx
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FiMinus, FiPlus, FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface ModalProps {
  showCheckoutModal: boolean;
  closeCheckoutModal: () => void;
}

const CheckoutModal: React.FC<ModalProps> = ({ showCheckoutModal, closeCheckoutModal }) => {
//   const [activeNav, setActiveNav] = useState("1");
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  // useEffect(() => {
  //   if (showCheckoutModal) {
  //     document.body.classList.add("overflow-hidden");
  //   } else {
  //     document.body.classList.remove("overflow-hidden");
  //   }

  //   // Cleanup function to remove the class when the component is unmounted
  //   return () => {
  //     document.body.classList.remove("overflow-hidden");
  //   };
  // }, [showCheckoutModal]);

  return (
    <div
      className={classNames(
        "absolute inset-0 z-50 flex l items-center justify-center",
        { "bg-overlayy ": showCheckoutModal, hidden: !showCheckoutModal }
      )}
    >
      <div className="absolute lg:right-[120px] bg-white rounded-[4px] top-[100px] lg:top-[195px] shadow-lg w-[90%] lg:w-[375px] py-3">
        <button
          className="absolute z-40 top-0 right-0 mt-1 mr-2 text-[20px] text-gray-600"
          onClick={closeCheckoutModal}
        >
          ×
        </button>
        <div className="rounded-[4px]">
          <div className="px-6 pb-5">
            <h2 className="text-[18px] font-[500] text-[#191C1F]">
              Shopping Cart <span className="text-[#5F6C72]">(02)</span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 px-5 w-full border-y-[#E4E7E9] border-y-[1px] py-3">
            <div className="flex justify-start gap-4 w-full items-center">
              <Image
                src="/cam.png"
                alt=""
                width={72}
                height={72}
                className="relative z-0"
              />
              <div className="flex justify-between items-center w-full ">
                <div className="w-[80%]">
                  <p className="text-[14px] font-[400]">
                    Canon EOS 1500D DSLR Camera Body+ 18-55 mm
                  </p>
                  <p className="text-[14px] font-[400]">
                    1 x <span className="font-[700] text-[14px]">₦250</span>
                  </p>
                </div>
                <button
                  className="text-[20px] text-gray-600"
                  onClick={closeCheckoutModal}
                >
                  ×
                </button>
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
          </div>

          <div className="flex justify-center flex-col gap-3 items-center my-6 mx-5">
            <button className="flex justify-center w-full items-center gap-2 text-white px-8 py-4 bg-primary rounded-[3px] font-[700]">
              <p>CHECKOUT NOW</p>
              <FiArrowRight className="w-4 h-4 cursor-pointer" />
            </button>
            <button className="flex justify-center items-center w-full gap-[35px] text-primary px-7 py-4 border-primary border-[2px] rounded-[3px] font-[700] text-[14px]">
              <p>VIEW CART</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
