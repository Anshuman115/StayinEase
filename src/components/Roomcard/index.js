import { fetchRoom } from "@/store/slices/singleRoomsSlice";
import { truncate } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";

const Roomcard = ({ room }) => {
  const dispatch = useDispatch();
  return (
    <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl">
      <Image
        src={room.images[0].url}
        alt="plant"
        className="h-60 w-full rounded-xl object-cover"
        height={800}
        width={800}
      />
      <div className="p-5">
        <div className="text-lg text-black">{room.name}</div>
        <p className="text-sm text-gray-700">
          {truncate(room.description, { length: 80 })}
        </p>
        <div className="flex flex-row justify-between items-center py-4">
          <div className="text-black text-lg">₹ {room.pricePerNight}</div>
          <div className={`w-[{$/5*100}%] flex`}>
            <StarRatings
              rating={room.ratings}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension={15}
              starSpacing={2}
            />
          </div>
        </div>
        <Link href={`/rooms/${room._id}`}>
          <button
            onClick={() => {
              dispatch(fetchRoom(room._id));
            }}
            className="w-full rounded-md bg-[#391f14]  py-2 text-white hover:bg-[#663b28] hover:shadow-md duration-75"
          >
            Book now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Roomcard;
