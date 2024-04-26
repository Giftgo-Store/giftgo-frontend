import Image from "next/image";

const page = () => {
  return (
    <>
      <div className="py-[20px] px-[8%] bg-secondary mb-[56px]">
        <h2 className="font-[600] leading-[32px] text-[28px] text-center text-[#191C1F]">
          Confirmation
        </h2>
        <p className="text-[#475156] text-[18px] text-center font-[500]">
          Home / Shop Card / Checkout
        </p>
      </div>

      <div className="flex justify-center flex-col items-center pt-0 lg:pt-[50px] pb-[100px] lg:pb-[200px]">
        <div className="flex justify-center flex-col items-center gap-[35px]">
          <Image src="/check.png" alt="" width={90} height={90} />

          <div className="flex justify-center items-center flex-col">
            <h2 className="text-[#191C1F] text-[24px] font-[600]">
              Your order is completed!
            </h2>
            <p className="text-[14] text-[#5F6C72] w-[80%] lg:w-[60%] text-center pt-[12px]">
              Thank you for your order! Your order is being processed and will
              be completed within 3-6 hours. You will receive an email
              confirmation when your order is completed.
            </p>
          </div>
          <button className="py-[14px] px-[24px] rounded-[2px] bg-primary text-white text-[16px] font-[600] flex justify-center items-center gap-2">
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
