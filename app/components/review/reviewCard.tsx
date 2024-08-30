import { Avatar, Button, Link } from "@nextui-org/react";
import { MouseEventHandler } from "react";
import { TbTrash } from "react-icons/tb";
interface ReviewCard {
  reviewRating: number;
  email: string;
  comment: string;
  userName: string;
  timestamp: string;
  reviewerId: string;
  DeleteReview: MouseEventHandler<HTMLButtonElement>;
}
export default function ReviewCard({
  reviewerId,
  reviewRating,
  email,
  comment,
  userName,
  timestamp,
  DeleteReview,
}: ReviewCard) {
  const StarRating = ({ rating }: { rating: number }) => {
    const stars = Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));

    return <div className="flex mt-2">{stars}</div>;
  };
  return (
    <div className="bg-white  rounded-2xl  py-2 pb-3 shadow-lg transition duration-500 px-3 max-w-[350px] w-full">
      <div className="flex justify-between items-center">
        <div className="mt-0 flex items-center space-x-4 py-2">
          <div className="">
            <Avatar size="md"></Avatar>
          </div>
          <Link
            href={`/admin/customer/customer-detail/${reviewerId}`}
            className="flex flex-col max-w-[250px]"
          >
            <p className="text-sm font-semibold text-black w-full whitespace-normal text-ellipsis overflow-hidden">
              {userName}
            </p>
            <p className="text-gray-400 w-full max-w-[280px] whitespace-normal text-ellipsis overflow-hidden">
              {email}
            </p>
          </Link>
        </div>
        <div className="p-5 bg-yellow-400 rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white mt-4 shadow-lg cursor-pointer">
          <Button isIconOnly className="bg-transparent" onClick={DeleteReview}>
            <TbTrash color="white" size={20} />
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <span className="font-semibold text-lg">Rating</span>•{" "}
          <span className=" font-normal text-sm">
            {new Date(timestamp).toDateString()}
          </span>
        <div className="flex gap-2 py-1">
          <StarRating rating={reviewRating} />
        </div>

        <div className="text-wrap">
          <p className="mt-2 text-base text-gray-600  whitespace-normal">
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
}
