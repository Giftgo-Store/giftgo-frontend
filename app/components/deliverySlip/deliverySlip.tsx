import { forwardRef } from "react";

export interface order {
  _id?: string;
  email?: string;
  name?: string | undefined;
  phone?: string | undefined;
  orderId?: string;
  created?: string;
  customer?: string;
  total?: number;
  status?: string;
  profit?: number;
  items: [
    {
      sku: string;
      name: string;
      price: number;
      originalPrice: number;
      sellingPrice: number;
      quantity: number;
      discount: number;
      total: number;
    }
  ];
}

const DeliverySlip = forwardRef((props:order, ref:any) => (
  <div ref={ref} className="delivery-slip">
    <h1>Giftgo Delivery Slip</h1>
    <p>Recipient: {props.name}</p>
    <p>Address: </p>
    <p>Order Number: {props.phone}</p>
    <p>Items:</p>
    <ul>
      {props.items.map((product, index:number) => (
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
            <span>{product.discount && product.discount.toLocaleString()}</span>
          </div>
          <div className=" flex-1  w-full  flex-grow  text-sm font-medium py-4 px-4">
            <span>₦{product.total && product.total.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </ul>
    <p>Thank you for your purchase!</p>
  </div>
));

export default DeliverySlip;
