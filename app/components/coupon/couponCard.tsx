import { Button } from "@nextui-org/react";
import { Copy } from "iconsax-react";
import { IoShareOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiWarningCircleThin } from "react-icons/pi";
import { toast } from "react-toastify";

export default function CouponCard({ coupon }: { coupon: string }) {
  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {}
  }
  return (
    <div className="bg-white p-3 rounded-sm flex flex-col gap-3">
      <p>Active Coupon</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <p className="text-2xl font-semibold tracking-wider">{coupon}</p>
          <div className="flex gap-2">
            <Button
              startContent={<Copy size="24" color="white" />}
              className="bg-[#1EB564] text-white w-[100px] shadow-inner"
              onClick={() => {
                toast.promise(copyTextToClipboard(coupon), {
                  pending: "copying coupon ",
                  success: "coupon copied to clipboard",
                  error: "An error occured , please try again",
                });
              }}
            >
              Copy
            </Button>
            <Button
              startContent={<IoShareOutline size="24" color="#8B909A" />}
              className="bg-white w-[100px] border-1 text-[#8B909A]"
            >
              Share
            </Button>
          </div>
        </div>
        <Button
          startContent={<RiDeleteBin6Line size="24" color="danger" />}
          color="danger"
          variant="flat"
          isIconOnly
        ></Button>
      </div>
      <div className="flex gap-1 items-center">
        <PiWarningCircleThin color="#70706E" />
        <p className="text-[#70706E]">50% off for 31 products</p>
      </div>
    </div>
  );
}
