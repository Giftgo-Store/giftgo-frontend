import { Skeleton } from "@nextui-org/react";

export default function CouponLoader() {
  return (
    <div className="bg-white p-4 rounded-md flex flex-col justify-between gap-3 min-h-[144px] h-fit">
      <Skeleton className="block w-[120px] h-4"></Skeleton>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-[100px]"></Skeleton>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <Skeleton className="w-[250px] h-4"></Skeleton>
      </div>
    </div>
  );
}
