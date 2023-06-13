import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { postNewReview } from "@/store/slices/reviewsSlice";
import { checkReview } from "@/store/slices/reviewsSlice";

const NewReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;

  const { error, success } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(checkReview({ id }));
    }
    if (error) {
      toast.error(error);
      // dispatch(clearErrors());
    }
    if (success) {
      toast.success("review is posted");
      // dispatch(newreviewreset);
    }
  }, [dispatch]);

  const submitHandler = () => {
    const reviewData = {
      rating,
      comment,
      roomId: id,
    };
    console.log("reviewData", reviewData);
    dispatch(postNewReview({ reviewData }));
  };

  const setUserRatings = () => {
    //Need to make a hover or click rating section
  };
  const showRatings = () => {
    //show star ratings just like at rooms page
  };

  //Need to make this a modal later on

  //Need to use help of persistant state here
  const { room } = useSelector((state) => state.singleRoom);
  const { isAvailable } = useSelector((state) => state.reviews);
  console.log("room", room.reviews);

  return (
    <div className="bg-[#fff7f3] w-full h-full text-black">
      {isAvailable && (
        <div>
          <div>Post your rating</div>
          <input
            type="number"
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <input
            type="text"
            name="comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button type="submit" onClick={submitHandler}>
            Submit
          </button>
          <div>
            Reviews
            <div>
              {room.reviews &&
                room.reviews.map((review, index) => (
                  //Numbering is must and need to show total reviews as well
                  <div key={index}>
                    <div>By:- {review.name}</div>
                    <div>rating:- {review.rating}</div>
                    <div>Comment:- {review.comment}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewReview;
