import { Skeleton } from "@nextui-org/react";
export function TrendingProductLoader() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <Skeleton className="w-[50px] h-[50px]"></Skeleton>
        <div className="flex flex-col gap-3">
          <Skeleton className="w-[150px] h-3"></Skeleton>
          <Skeleton className="w-[100px] h-2"></Skeleton>
        </div>
      </div>
      <Skeleton className="w-[70px] h-3"></Skeleton>
    </div>
  );
}
