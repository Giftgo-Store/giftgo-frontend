import { Skeleton } from "@nextui-org/react";

export function ProductListSkeletonCard() {
  return (
    <div className="bg-white p-4 sm:max-w-[360px] w-full  flex flex-col gap-4 rounded-lg">
      <div className="flex gap-2 w-full h-max">
        <div className="flex gap-3 w-full">
          <Skeleton className="object-cover w-full min-w-[84px] max-w-[84px] h-[84px]  rounded-lg" />
          <div className="flex flex-col gap-3 h-full w-full">
            <Skeleton className="w-full h-6"></Skeleton>
            <Skeleton className="w-[60%] h-6"></Skeleton>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-6"></Skeleton>
        <Skeleton className="w-[60%] h-6"></Skeleton>
      </div>
    </div>
  );
}
