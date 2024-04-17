import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";
import { Image } from "@nextui-org/react";
interface dashboardCard {
  title: string;
  amount: number;
  profit: boolean;
  percentage: number;
}
export function DashboardCard({
  title,
  amount,
  profit,
  percentage,
}: dashboardCard) {
  return (
    <div className="w-full  p-5 bg-white rounded-2xl">
      <div className="flex flex-col">
        <p className="font-semibold text-lg text-[#23272E]">{title}</p>
        <span className="text-[#8B909A] text-base">Last 7 days</span>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5  justify-between ">
          <div className="flex gap-6 items-end justify-normal">
            <span className="font-bold text-3xl text-[2rem]">₦{amount}K</span>
          </div>
          <Image
            src={profit ? "green-rise.png" : "/red-dip.png"}
            alt="arrow rise or fall"
            className="max-w-[500px] w-full h-full object-contain"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex justify-normal items-center gap-1">
            {profit ? (
              <IoArrowUpOutline color="#1EB564" size={16} />
            ) : (
              <IoArrowDownOutline color="#D02626" size={16} />
            )}
            <span
              className={`${
                profit ? "text-[#1EB564]" : "text-[#D02626]"
              } font-medium`}
            >
              {percentage}%
            </span>
          </div>
          <p className="text-[#8B909A] text-base">vs Last 7 days</p>
        </div>
      </div>
    </div>
  );
}
