import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";
import { Image, Skeleton } from "@nextui-org/react";
interface dashboardCard {
  title: string;
  amount:string|null;
  profit: boolean;
  percentage: number;
  customstyle?: string;
}
export function DashboardCard({
  title,
  amount,
  profit,
  percentage,
  customstyle,
}: dashboardCard) {
  return (
    <div className={`${customstyle} w-full p-5 bg-white rounded-2xl min-h-[191px]`}>
      <div className="flex flex-col">
        <p className="font-semibold text-lg text-[#23272E]">{title}</p>
        <span className="text-[#8B909A] text-base">Last 7 days</span>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 flex-wrap sm:flex-nowrap flex-row justify-between ">
          <div className="flex gap-6 items-end justify-normal">
            {amount ? (
              <span className="font-bold text-3xl text-[2rem]">{amount}</span>
            ) : (
              <Skeleton className="w-[60px] h-[30px]"></Skeleton>
            )}
          </div>
          <Image
            src={amount&& parseInt(amount)>5 ? "/green-rise.png" : "/red-dip.png"}
            alt="arrow rise or fall"
            className="md:max-w-[500px] md:w-full w-[90%] h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
