import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function DeliverySlip({
  props,
  userDetails,
  ref,
}: {
  props:any;
  userDetails:any;
  ref:any;
}) {
  return (
    <div ref={ref}>
      <h1>Giftgo Delivery Slip</h1>
      <p>Recipient: {props.customer}</p>
      <p>Phone number:{userDetails?.phone} </p>
      <p>Address: {userDetails?.address.address}</p>
      <p>Region: </p>
      <p>Order Number: {props.orderId}</p>
      <p>Items:</p>
      <ul>
        {props.items.map((product: any, index: number) => (
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
              <span>₦{product.price && product.price.toLocaleString()}</span>
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
              <span>₦{product.total && product.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </ul>
      <p>Thank you for your purchase!</p>
    </div>
  );
}
