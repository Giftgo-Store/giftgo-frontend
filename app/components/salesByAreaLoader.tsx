import { Skeleton } from "@nextui-org/react";
export function SalesByAreaLoader() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2  justify-between w-full items-center">
        <div className="flex flex-col gap-3 items-center justify-center">
          <Skeleton className="w-[50px] h-3"></Skeleton>
          <Skeleton className="w-[70px] h-3"></Skeleton>
        </div>
        <div className="w-full flex  items-center justify-center">
          <Skeleton className="sm:w-[200px] w-[150px] h-3"></Skeleton>
        </div>
        <Skeleton className="w-[50px] h-3"></Skeleton>
      </div>
    </div>
  );
}
