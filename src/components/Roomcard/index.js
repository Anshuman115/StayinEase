import { fetchRoom } from "@/store/slices/singleRoomsSlice";
import { truncate } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";

const Roomcard = ({
  name,
  description,
  pricePerNight,
  ratings,
  _id,
  images,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="max-w-sm h-full overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl">
      <Image
        src={images[0].url}
        alt="plant"
        className="h-40 md:h-60 w-full rounded-xl object-cover"
        height={800}
        width={800}
      />
      <div className="p-5">
        <div className="text-base md:text-lg text-black">{name}</div>
        <p className="text-sm text-gray-700">
          {truncate(description, { length: 80 })}
        </p>
        <div className="flex flex-row justify-between items-center py-1 md:py-4">
          <div className="text-black text-lg">₹ {pricePerNight}</div>
          <div className={`w-[{$/5*100}%] flex`}>
            <StarRatings
              rating={ratings}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="15"
              starSpacing="2px"
            />
          </div>
        </div>
        <button className="w-full rounded-md bg-[#391f14]  py-1 md:py-2 text-white hover:bg-[#663b28] hover:shadow-md duration-75">
          <Link href={`/rooms/${_id}`}>Book Now</Link>
        </button>
      </div>
    </div>
  );
};

export default Roomcard;
