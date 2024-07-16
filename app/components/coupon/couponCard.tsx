import { Button } from "@nextui-org/react";
import { Copy } from "iconsax-react";
import { IoShareOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiWarningCircleThin } from "react-icons/pi";
import { toast } from "react-toastify";
import { HiOutlinePower } from "react-icons/hi2";
import { LuPowerOff } from "react-icons/lu";
import { MouseEventHandler } from "react";
export default function CouponCard({
  coupon,
  percentageOff,
  isActive,
  activateCoupon,
  deactivateCoupon,
}: {
  coupon: string;
  percentageOff: number;
  isActive: boolean;
  activateCoupon: MouseEventHandler<HTMLButtonElement>;
  deactivateCoupon: MouseEventHandler<HTMLButtonElement>;
}) {
  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {}
  }
  async function shareCoupon(coupon: string) {
    try {
      const data = {
        title: "giftgo coupon",
        text: coupon,
      };
      await navigator.share(data);
    } catch (err) {
      toast.error("an error occurred, please try again");
    }
  }
  return (
    <div className="bg-white p-4 rounded-md flex flex-col gap-3">
      {isActive ? (
        <p className="text-[#28C76F]">Active Coupon</p>
      ) : (
        <p className="text-[#EA5455]">Inactive coupon</p>
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <p className="text-2xl font-semibold tracking-wider">{coupon}</p>
          <div className="flex gap-2">
            <Button
              startContent={<Copy size="24" color="white" />}
              className="bg-[#1EB564] text-white w-[100px] shadow-inner"
              onClick={() => {
                toast.promise(copyTextToClipboard(coupon), {
                  pending: "Copying coupon ",
                  success: "Coupon copied to clipboard",
                  error: "An error occured , please try again",
                });
              }}
            >
              Copy
            </Button>
            <Button
              startContent={<IoShareOutline size="24" color="#8B909A" />}
              className="bg-white w-[100px] border-1 text-[#8B909A]"
              onClick={
                () => {
                  shareCoupon(coupon)
                }
              }
            >
              Share
            </Button>
          </div>
        </div>
        {isActive ? (
          <Button
            startContent={<LuPowerOff size="24" color="danger" />}
            color="danger"
            variant="flat"
            isIconOnly
            onClick={deactivateCoupon}
          ></Button>
        ) : (
          <Button
            startContent={<HiOutlinePower size="24" color="success" />}
            color="success"
            variant="flat"
            isIconOnly
            onClick={activateCoupon}
          ></Button>
        )}
      </div>
      <div className="flex gap-1 items-center">
        <PiWarningCircleThin color="#70706E" />
        <p className="text-[#70706E]">
          {percentageOff}% off for customer products
        </p>
      </div>
    </div>
  );
}
