"use client";
import { useRouter } from "next/navigation";

import Image from "next/image";

const Category = () => {
  const router = useRouter();

  return (
    <div
      className="border-[#E4E7E9] border-[1px] bg-white w-[224px] flex flex-col justify-between items-center p-[24px] gap-[16px] cursor-pointer"
      onClick={() => router.push("/category/2")}
    >
      <Image src="/flower.png" alt="" width={174} height={148} />
      <p className="text-[#191C1F] text-[13px] font-[500] text-center">
        Flowers & notes
      </p>
    </div>
  );
};

export default Category;
