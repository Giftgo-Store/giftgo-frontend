import Image from "next/image";

const Account = () => {
  return (
    <>
      <div className="w-full md:w-[50%] pb-[32px]">
        <h1 className="text-[20px] leading-[28px] font-[600] text-[#191C1F] pb-[12px]">
          Hello, Paschal
        </h1>
        <p className="text-[14px] leading-[20px] font-[400]">
          From your account dashboard. you can easily check & view your{" "}
          <span className="text-primary font-[500]">Recent Orders</span>, manage
          your{" "}
          <span className="text-primary font-[500]">
            Shipping and Billing Addresses
          </span>{" "}
          and edit your{" "}
          <span className="text-primary font-[500]">Password</span> and{" "}
          <span className="text-primary font-[500]">Account Details.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] w-full">
        <div className="col-span-1 border-[#E4E7E9] border-[1px] rounded-[4px]">
          <div className="px-[24px] py-[10px] border-b-[#E4E7E9] border-b-[1px]">
            <p className="text-[#191C1F] text-[14px] leading-[20px] font-[500]">
              ACCOUNT INFO
            </p>
          </div>
          <div className="pt-[36px] px-[24px]">
            <div className="flex justify-start items-center gap-4 mb-[20px]">
              <Image src="/avatarr.svg" alt="" width={48} height={48} />
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
                Phone: <span className="text-[#5F6C72]">+234 909090909</span>
              </p>
            </div>

            <div className="mb-[24px]">
              <button className="border-[#D5EDFD] border-[3px] px-[24px] text-[14px] font-[700] leading-[48px] text-primary rounded-[2px]">
                EDIT ACCOUNT
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 border-[#E4E7E9] border-[1px] rounded-[4px]">
          <div className="px-[24px] py-[10px] border-b-[#E4E7E9] border-b-[1px]">
            <p className="text-[#191C1F] text-[14px] leading-[20px] font-[500]">
              SHIPPING ADDRESS
            </p>
          </div>
          <div className="pt-[36px] px-[24px]">
            <div className="flex justify-start items-center gap-4 mb-[20px]">
              <div className="flex justify-start items-start flex-col gap-1">
                <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F]">
                  Paschal Nwanks
                </p>
                <p className="font-[500] text-[14px] leading-[20px] text-[#5F6C72]">
                  Detailed address here
                </p>
              </div>
            </div>

            <div className="mb-[32px]">
              <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F]">
                Phone: <span className="text-[#5F6C72]">+234 909090909</span>
              </p>
              <p className="font-[500] text-[14px] leading-[20px] text-[#191C1F] mb-[8px]">
                Email:{" "}
                <span className="text-[#5F6C72]">
                  nwankwopaschal017@gmail.com
                </span>
              </p>
            </div>

            <div className="mb-[24px]">
              <button className="border-[#D5EDFD] border-[3px] px-[24px] text-[14px] font-[700] leading-[48px] text-primary rounded-[2px]">
                EDIT ADDRESS
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 rounded-[4px] flex justify-between items-start w-full flex-col gap-[24px]">
          <div className="py-[16px] px-[12px] flex justify-start items-center gap-4 rounded-[4px] bg-[#EAF6FE] w-full">
            <Image src="/icon1.svg" alt="" width={56} height={56} />
            <div className="flex flex-col justify-start items-start gap-1">
              <p className="font-[600] text-[20px] leading-[28px] text-[#191C1F]">
                222
              </p>
              <p className="text-[14px] font-[400] leading-[20px] text-[#475156]">
                Total Orders
              </p>
            </div>
          </div>
          <div className="py-[16px] px-[12px] flex justify-start items-center gap-4 rounded-[4px] bg-[#FFF3EB] w-full">
            <Image src="/icon2.svg" alt="" width={56} height={56} />
            <div className="flex flex-col justify-start items-start gap-1">
              <p className="font-[600] text-[20px] leading-[28px] text-[#191C1F]">
                22
              </p>
              <p className="text-[14px] font-[400] leading-[20px] text-[#475156]">
                Pending Orders
              </p>
            </div>
          </div>
          <div className="py-[16px] px-[12px] flex justify-start items-center gap-4 rounded-[4px] bg-[#EAF7E9] w-full">
            <Image src="/icon3.svg" alt="" width={56} height={56} />
            <div className="flex flex-col justify-start items-start gap-1">
              <p className="font-[600] text-[20px] leading-[28px] text-[#191C1F]">
                22
              </p>
              <p className="text-[14px] font-[400] leading-[20px] text-[#475156]">
                Completed Orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
