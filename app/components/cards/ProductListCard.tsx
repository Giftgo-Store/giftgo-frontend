import {
  Button,
  avatar,
  Image,
  Progress,
  DropdownTrigger,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Spacer,
} from "@nextui-org/react";
import { MouseEventHandler } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoArrowUpOutline } from "react-icons/io5";
interface cardprops {
  _id: string;
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
  isPinned: boolean;
}
export default function ProductListCard({
  _id,
  avatar,
  productName,
  productCategory,
  productPrice,
  productSummary,
  productStock,
  productSold,
  isPinned,
  EditProduct,
  PinProduct,
  DeleteProduct,
}: cardprops) {
  return (
    <div className="bg-white p-4 sm:max-w-[360px] w-full flex flex-col gap-4 rounded-lg">
      <div className="flex gap-2 w-full h-max">
        <div className="max-w-[90px] w-full h-[80px]">
          <Image
            removeWrapper
            src={avatar}
            alt="Preview"
            className="object-cover w-[90px] h-[80px] rounded-lg"
            width={100}
            height={100}
          />
        </div>
        <div className="flex justify-between items-start w-full ">
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
                className="object-contain rounded-lg w-[20px] h-[20px]"
                width={40}
                height={40}
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
                  <DropdownItem
                    key="View reviews"
                    href={`/admin/reviews/${_id}`}
                  >
                    View reviews
                  </DropdownItem>
                  <DropdownItem
                    key="Pin products"
                    onClick={PinProduct}
                    className={`${isPinned && "hidden"}`}
                  >
                    {!isPinned && "Pin product"}
                  </DropdownItem>

                  <DropdownItem
                    className="text-danger"
                    key="Delete Product"
                    onClick={DeleteProduct}
                    color="danger"
                  >
                    {isPinned ? "Unpin Product" : "Delete Product"}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <Spacer y={2}></Spacer>
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
