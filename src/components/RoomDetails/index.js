import room from "@/models/room";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { useRouter } from "next/router";
import { fetchRoom } from "@/store/slices/singleRoomsSlice";

const d = {
  success: true,
  room: {
    _id: "63fb9a48bc1ed9882082e63c",
    name: "Downtown Portsmouth Private Getaway! Hot Tub",
    pricePerNight: 85,
    description:
      "Absolutely the best location in Portsmouth! Beautifully furnished, this spacious and private home is perfectly suited for taking in all of the must-see sights and historic landmarks that make this vibrant city so unique. Situated near the banks of the Piscataqua River just minutes away from Strawbery Banke Museum, Prescott Park, USS Albacore Museum, Market Square and more!",
    address: "3747 Parkway Street, Apple Valley, CA, 92307",
    guestCapacity: 3,
    numOfBeds: 2,
    internet: true,
    breakfast: true,
    airConditioned: true,
    petsAllowed: true,
    roomCleaning: false,
    ratings: 3.8,
    numOfReviews: 0,
    images: [
      {
        public_id: "Stayin/12_bi31fa.jpg",
        url: "https://res.cloudinary.com/degcjqpbu/image/upload/v1677067581/Stayin/12_bi31fa.jpg",
        _id: "63fb9a48bc1ed9882082e63d",
      },
    ],
    category: "King",
    reviews: [],
    createdAt: "2023-02-26T17:43:36.418Z",
    __v: 0,
  },
};

const RoomDetails = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!router.isReady) {
      console.log(router.query);
      return;
    }
    const { query } = router;
    dispatch(fetchRoom(query));
  }, [router]);

  const data = useSelector((state) => state.singleRoom.room);

  return (
    <div className="bg-[#fff7f3] w-full">
      <div className="p-5 flex justify-between">
        <div>
          {data?.images && (
            <Image
              src={data?.images[0]?.url}
              alt="hotel"
              width={700}
              height={700}
            />
          )}
        </div>
        <div className="flex flex-col p-2 w-[30%]">
          <div className="text-black">{data?.description}</div>
          <div className="flex flex-col p-2">
            <div className="flex flex-row items-center">
              <div>{data?.internet ? <FcCheckmark /> : <FcCancel />}</div>
              <span className="text-black px-2 font-semibold">Wifi</span>
            </div>
            <div className="flex flex-row items-center">
              <div>{data?.roomCleaning ? <FcCheckmark /> : <FcCancel />}</div>
              <span className="text-black px-2 font-semibold">
                Room Cleaning
              </span>
            </div>
            <div className="flex flex-row items-center">
              <div>{data?.airConditioned ? <FcCheckmark /> : <FcCancel />}</div>
              <span className="text-black px-2 font-semibold">AC</span>
            </div>
            <div className="flex flex-row items-center">
              <div>{data?.breakfast ? <FcCheckmark /> : <FcCancel />}</div>
              <span className="text-black px-2 font-semibold">Breakfast</span>
            </div>
            <div className="flex flex-row items-center">
              <div>{data?.petsAllowed ? <FcCheckmark /> : <FcCancel />}</div>
              <span className="text-black px-2 font-semibold">
                Pets Allowed
              </span>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col h-full bg-[#6e3a24] shadow-lg rounded-lg p-5 max-w-xs">
          <div className="absolute top-0 right-5 ">
            <div className="text-xs inline-flex font-semibold bg-green-100 text-green-600 rounded-full text-center px-3 py-1.5 shadow-sm transform -translate-y-1/2">
              Most Popular
            </div>
          </div>

          <header className="pb-4 mb-4 border-b border-indigo-200 border-opacity-30">
            <h3 className="text-xl font-extrabold text-indigo-50 leading-snug mb-2">
              {data?.name}
            </h3>

            <div className="font-extrabold mb-1">
              <span className="text-2xl text-indigo-200">$ </span>
              <span className="text-4xl text-indigo-50">
                {data?.pricePerNight}
              </span>
            </div>
          </header>

          <button className="font-semibold text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow transition duration-150 ease-in-out w-full bg-green-700 hover:bg-green-600 text-white focus:outline-none focus-visible:ring-2">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
