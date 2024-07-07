import {
  Button,
  avatar,
  Image,
  Progress,
  DropdownTrigger,
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { MouseEventHandler } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoArrowUpOutline } from "react-icons/io5";
interface cardprops {
  avatar: string;
  EditProduct: MouseEventHandler<HTMLLIElement>;
  PinProduct: MouseEventHandler;
  DeleteProduct: MouseEventHandler<HTMLLIElement>;
  productName: string;
  productCategory: string;
  productPrice: string | number;
  productSummary: string;
  productStock: string | number;
  productSold: string | number;
}
export default function ProductListCard({
  avatar,
  productName,
  productCategory,
  productPrice,
  productSummary,
  productStock,
  productSold,
  EditProduct,
  PinProduct,
  DeleteProduct,
}: cardprops) {
  return (
    <div className="bg-white p-4 sm:max-w-[360px] w-full flex flex-col gap-4 rounded-lg">
      <div className="flex gap-2 w-full h-max">
        <Image
          removeWrapper
          src={avatar}
          alt="Preview"
          className="object-cover w-[84px] h-[84px] rounded-lg"
          width={100}
          height={100}
        />
        <div className="flex justify-between w-full items-start ">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-[15px] leading-[17.63px] max-w-[150px] w-full whitespace-wrap whitespace-pre-wrap text-ellipsis overflow-hidden line-clamp-2">
                {productName}
              </p>
              <span className="text-sm text-[#8B909A] max-w-[140px] overflow-hidden text-ellipsis">
                {productCategory}
              </span>
            </div>
            <p className="text-[15px] font-semibold leading-[22px]">
              ₦{productPrice}
            </p>
          </div>
          <div className="flex justify-normal gap-1">
            <Button onClick={PinProduct} isIconOnly className="bg-transparent">
              <Image
                removeWrapper
                src={"/pin.svg"}
                alt="Preview"
                className="object-cover rounded-lg w-[20px] h-[20px]"
                width={100}
                height={100}
              />
            </Button>
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    startContent={<HiDotsVertical size={24} color="#8B909A" />}
                    className="bg-transparent"
                  ></Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="action options">
                  <DropdownItem key="Edit products" onClick={EditProduct}>
                    Edit product
                  </DropdownItem>
                  <DropdownItem key="Pin products" onClick={PinProduct}>
                    Pin product
                  </DropdownItem>
                  <DropdownItem
                    className="text-danger"
                    key="Delete Product"
                    onClick={DeleteProduct}
                  >
                    Delete Product
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-base">Summary</p>
        <p className="text-[#8B909A] text-sm max-h-[60px] whitespace-wrap whitespace-pre-wrap text-ellipsis overflow-hidden line-clamp-2">
          {productSummary}
        </p>
      </div>
      <div className="p-3 border-1 border-[#2323214D] rounded-lg">
        <div className="flex flex-col">
          <div className="justify-between flex items-center py-1 border-b-1 border-[#2323214D] ">
            <span>Sales</span>
            <div className="flex gap-2 justify-normal items-center ">
              <IoArrowUpOutline color="#1EB564" size={16} />
              <span>{productSold}</span>
            </div>
          </div>
          <div className="justify-between flex items-center py-1 w-full">
            <span>Remaining products</span>
            <div className="flex gap-2 justify-end items-center max-w-[130px] w-full ">
              <Progress
                aria-label="sales"
                value={60}
                className="max-w-[70px] w-full "
                classNames={{
                  indicator: "!bg-[#1EB564]",
                }}
                size="sm"
              />
              <span>{productStock}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
