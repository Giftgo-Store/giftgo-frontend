import Image from "next/image";

const Category = () => {
    return (
      <div className="border-[#E4E7E9] border-[1px] bg-white w-[224px] flex flex-col justify-between items-center p-[24px] gap-[16px]">
        <Image src="/flower.png" alt="" width={174} height={148} />
        <p className="text-[#191C1F] text-[13px] font-[500]">Flowers & notes</p>
      </div>
    );
}
 
export default Category;