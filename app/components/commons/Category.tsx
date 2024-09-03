"use client";
import { useRouter } from "next/navigation";

import Image from "next/image";

type CategoryProp = {
  catId: any | string[];
  paramId: any | string;
}
const Category = ({catId, paramId}: CategoryProp) => {
  console.log(catId)
  const router = useRouter();
  return (
    <div
      className="border-[#E4E7E9] border-[1px] bg-white w-[224px] flex flex-col justify-between items-center p-[24px] gap-[16px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
      onClick={() =>
        router.push(`/category/${paramId}/category-detail/${catId && catId.categoryId}`)
      }
    >
      <Image
        src={catId && catId?.categoryImage}
        alt=""
        width={174}
        height={148}
        className="object-cover h-[148px] w-[174px] "
      />
      <p className="text-[#191C1F] text-[13px] font-[500] text-center">
        {catId && catId?.categoryName}
      </p>
    </div>
  );
};

export default Category;
