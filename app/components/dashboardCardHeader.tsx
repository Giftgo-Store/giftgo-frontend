import { Button } from "@nextui-org/react";
import { MouseEventHandler } from "react";
import { HiDotsVertical } from "react-icons/hi";
type headerprops = {
  title: string;
  supportText?: string;
  option?: MouseEventHandler<HTMLButtonElement>;
};
export function DashboardCardHeader({
  title,
  supportText,
  option,
}: headerprops) {
  return (
    <div className="flex justify-between py-3">
      <div className="flex flex-col">
        <p className="font-semibold text-lg text-[#23272E]">{title}</p>
        <span className="text-[#8B909A] text-base">{supportText}</span>
      </div>
    </div>
  );
}
