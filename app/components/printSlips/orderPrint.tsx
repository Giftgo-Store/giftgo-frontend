import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { DeliverySlip } from "./deliverySlip";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const OrderPrint = ({
  order,
  userDetails,
}: {
  order: any;
  userDetails: any;
}) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
  });

  return (
    <div className=" flex-1 max-w-[100px]  w-full  flex-grow  text-sm font-medium py-4 px-4">
      <button onClick={handlePrint}>
        <p className="flex gap-2">
          <HiOutlineDotsHorizontal
            color="black"
            size={20}
            className="cursor-pointer"
            onClick={() => {
              handlePrint(null, () => componentRef.current);
            }}
          />
        </p>
      </button>
      <div style={{ display: "none" }}>
        <div ref={componentRef} className="p-5">
          <h1 className="text-center font-semibold text-2xl">
            Giftgo Delivery Slip
          </h1>
          <div className="flex gap-3 justify-normal items-center py-2">
            <p className="font-semibold w-[150px] text-lg">Recipient:</p>{" "}
            <span>{order.customer}</span>
          </div>
          <div className="flex gap-3 justify-normal items-center py-2">
            <p className="font-semibold w-[150px] text-lg">Phone number:</p>
            <span>{userDetails?.phone || order.phoneNumber}</span>
          </div>
          <div className="flex gap-3 justify-normal items-center py-2">
            <p className="font-semibold w-[150px] text-lg">Address:</p>
            <span>{userDetails?.address.address || order.address}</span>
          </div>
          {userDetails && (
            <div className="flex gap-3 justify-normal items-center py-2">
              <p className="font-semibold w-[150px] text-lg">Region:</p>

              <span>
                {userDetails?.address.city},{userDetails?.address.state},
                {userDetails?.address.country}
              </span>
            </div>
          )}
          <div className="flex gap-3 justify-normal items-center py-2">
            <p className="font-semibold w-[150px] text-lg">Order Id:</p>
            <span>{order.orderId}</span>
          </div>
          <p className="font-semibold w-[150px] text-lg">Items:</p>
          <div
            className="flex justify-between border-y"
            suppressHydrationWarning={true}
          >
            <div className="flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
              <span>#</span>
            </div>
            <div className=" flex-1   w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
              <span>SKU</span>
            </div>
            <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
              <span>NAME</span>
            </div>
            <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
              <span>PRICE</span>
            </div>
            <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
              <span>QTY</span>
            </div>
            <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
              <span>DISC.</span>
            </div>
            <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-4 px-4">
              <span>TOTAL</span>
            </div>
          </div>
          <ul className="py-2">
            {order.items.map((product: any, index: number) => (
              <div
                key={index}
                className="flex justify-between border-b pl-2"
                suppressHydrationWarning={true}
              >
                <div className=" flex-1  w-full flex-grow text-[#8B909A] text-sm font-medium py-2 px-4">
                  <span className="hidden">#</span>
                </div>
                <div className=" flex-1  w-full  flex-grow text-sm font-medium py-4 px-4">
                  <span>{product.sku}</span>
                </div>
                <div className=" flex-1  w-full  flex-grow  text-sm  py-4 px-4 font-semibold">
                  <span>{product.name}</span>
                </div>
                <div className=" flex-1  w-full  flex-grow  text-sm font-medium py-4 px-4">
                  <span>
                    ₦{product.price && product.price.toLocaleString()}
                  </span>
                </div>
                <div className=" flex-1  w-full  flex-grow  text-sm font-medium py-4 px-4">
                  <span>x{product.quantity}</span>
                </div>
                <div className=" flex-1  w-full  flex-grow text-[#EA5455] text-sm font-medium py-4 px-4">
                  <span>
                    {product.discount && product.discount.toLocaleString()}
                  </span>
                </div>
                <div className=" flex-1  w-full  flex-grow  text-sm font-medium py-4 px-4">
                  <span>
                    ₦{product.total && product.total.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </ul>
          <div className="flex gap-3 justify-normal items-center py-2">
            <p className="font-semibold w-[150px] text-lg">Total:</p>
            <span>₦{order.total.toLocaleString()}</span>
          </div>
          <p className="text-center font-semibold ">
            Thank you for your purchase!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPrint;
