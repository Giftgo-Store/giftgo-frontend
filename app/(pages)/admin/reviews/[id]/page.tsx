"use client";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import BASE_URL from "@/app/config/baseurl";
import { useEffect, useState } from "react";
import ReviewCard from "@/app/components/review/reviewCard";
import { toast } from "react-toastify";
import { Input, Spinner } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
interface review {
  reviewerName: string;
  rating: number;
  _id: string;
  createdAt: string;
  comment: string;
}
export default function Reviews({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const id = params.id;
  const sesssion = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/admin/auth/login");
    },
  });
  const session: any = useSession();
  const token = session?.data?.token;
  const API = BASE_URL + "/api/v1";

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await fetch(`${API}/products/${id}/reviews`, {
        headers: {
          "Content-Type": "application/json",
          AUTHORIZATION: "Bearer " + token,
        },
        method: "GET",
      });
      const productData = await data.json();
      setLoading(false);
      if (productData.data) {
        setReviews(productData.data);
      } else if (productData.data === null) {
        setReviews([]);
      } else if ((productData.data = [])) {
        setReviews([]);
      }
    } catch (error) {
      setLoading(true);
      toast.error("An error has occured, please refresh the page");
    }
  };
  async function DeleteReview(reviewId: string) {
    try {
      const res = await fetch(`${API}/products/${id}/reviews/${reviewId}`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
        method: "DELETE",
      });

      const resData = await res.json();
      console.log(resData);
      setReviews((prevReviews) =>
        prevReviews.filter((review: any) => review._id !== reviewId)
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

 // Filter categories based on filterValue
  const filteredReviews = reviews?.filter(
    (review: review) =>
      review.reviewerName.toLowerCase().includes(filterValue.toLowerCase()) ||
      review.comment.toLowerCase().includes(filterValue.toLowerCase())
  );
  return (
    <div>
      <div className="flex w-full justify-between items-center gap-4">
        <Input
          placeholder="Search using reviewer name or keyword"
          endContent={<CiSearch size={28} color="#8B909A" />}
          size="md"
          radius="sm"
          aria-label="search"
          className="max-w-[350px] w-full shadow-none"
          classNames={{
            label: "text-lg",
            input: "py-2 text-base",
            inputWrapper: [
              "bg-white",
              "data-focus-[within=true]:bg-white",
              "data-[hover=true]:bg-white",
              "group-data-[focus=true]:bg-white",
            ],
          }}
          value={filterValue}
          onChange={(e) => {
            setFilterValue(e.target.value);
          }}
        ></Input>
      </div>
      <div className="flex flex-wrap w-full justify-between ">
        {filteredReviews.map((review: review) => (
          <ReviewCard
            DeleteReview={() => {
              toast.promise(DeleteReview(review._id), {
                pending: "Deleting review ",
                success: "Review deleted ",
                error: "An error occured , please try again",
              });
            }}
            reviewRating={review.rating}
            comment={review.comment}
            userName={review.reviewerName}
            timestamp={review.createdAt}
          />
        ))}
        {filteredReviews.length < 1 && !loading && (
          <div className="min-h-[40vh] flex justify-center items-center w-full">
            <p className="text-lg font-semibold ">No reviews found !</p>
          </div>
        )}
        {filteredReviews.length < 1 && loading && (
          <div className="min-h-[40vh] w-full flex justify-center items-center mx-auto">
            <Spinner color="default" className="mx-auto"></Spinner>
          </div>
        )}
      </div>
    </div>
  );
}
Reviews.requireAuth = true;
