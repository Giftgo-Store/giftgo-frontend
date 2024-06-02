import { FaArrowRight } from "react-icons/fa6";

const Order = () => {
  return (
    <>
      <div className="flex flex-col items-start gap-[16px] pb-[300px]">
        <h1 className="font-[600] text-[32px] leading-[40px] text-[#191C1F]">
          Track Order
        </h1>
        <p className="text-[16px] leading-[24px] text-[#5F6C72] w-[80%]">
          Please input your order ID into the field provided below and click the
          &quot;Track Order&quot; button to monitor the status of your order.
          You can find your order ID on your receipt or in the confirmation
          email that was sent to you.
        </p>

        <form action="">
          <fieldset className="flex flex-col items-start gap-2">
            <label
              htmlFor=""
              className="text-[14px] leading-[20px] text-[#191C1F]"
            >
              OrderID
            </label>
            <input
              type="text"
              className="border-[#E4E7E9] rounded-[2px] h-[44px] outline-none w-[424px] border-[1px] px-[18px] text-[14px] text-[#475156]"
              placeholder="ID..."
            />
          </fieldset>
        </form>
        <div className="flex justify-start items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
              stroke="#5F6C72"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.25 11.25H12V16.5H12.75"
              stroke="#5F6C72"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.8125 9C12.4338 9 12.9375 8.49632 12.9375 7.875C12.9375 7.25368 12.4338 6.75 11.8125 6.75C11.1912 6.75 10.6875 7.25368 10.6875 7.875C10.6875 8.49632 11.1912 9 11.8125 9Z"
              fill="#5F6C72"
            />
          </svg>
          <p className="text-[#5F6C72] text-[14px] ">
            Order ID that we sent to you in your email address.
          </p>
        </div>

        <div className="flex w-full justify-center items-center">
          <button className="py-[14px] px-[24px] rounded-[2px] bg-primary text-white text-[16px] font-[600] flex justify-center items-center gap-2">
            TRACK ORDER <FaArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Order;
