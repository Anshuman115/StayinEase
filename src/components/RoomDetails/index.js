import room from "@/models/room";
import React from "react";
import { useSelector } from "react-redux";

const RoomDetails = () => {
  const data = useSelector((state) => state.singleRoom.room);
  console.log("anshu", data);
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen">
    //   <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
    //     {/* Room image */}
    //     <div className="relative">
    //       {/* <Image src="/images/room.jpg" alt="Room" /> */}
    //       <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
    //         <h1 className="text-4xl font-bold mb-2">Deluxe Room</h1>
    //         <p className="text-lg font-semibold">
    //           Starting from $150 per night
    //         </p>
    //       </div>
    //     </div>
    //     {/* Room details */}
    //     <div className="p-4">
    //       <div className="flex flex-wrap justify-between items-center mb-4">
    //         <div className="flex items-center">
    //           <FaBed className="text-gray-500 mr-2" />
    //           <p className="text-gray-600">2 King Beds</p>
    //         </div>
    //         <div className="flex items-center">
    //           <FaWifi className="text-gray-500 mr-2" />
    //           <p className="text-gray-600">Free Wi-Fi</p>
    //         </div>
    //         <div className="flex items-center">
    //           <FaShower className="text-gray-500 mr-2" />
    //           <p className="text-gray-600">Private Bathroom</p>
    //         </div>
    //       </div>
    //       <p className="text-gray-600 mb-4">
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
    //         tempor metus vitae quam auctor, id luctus urna consequat. Nullam ac
    //         nulla non erat tincidunt convallis. Nam eu est justo. Integer
    //         consectetur neque ac urna bibendum imperdiet. In sagittis quam ac
    //         ante dictum, eu laoreet mi pellentesque.
    //       </p>
    //       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //         Book Now
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-[#fff7f3] w-full">
      <div className="p-5 flex justify-end">
        <div className="relative flex flex-col h-full bg-indigo-700 shadow-lg rounded-lg p-5">
          <div className="absolute top-0 right-5">
            <div className="text-xs inline-flex font-semibold bg-green-100 text-green-600 rounded-full text-center px-3 py-1.5 shadow-sm transform -translate-y-1/2">
              Most Popular
            </div>
          </div>

          <header className="pb-4 mb-4 border-b border-indigo-200 border-opacity-30">
            <h3 className="text-xl font-extrabold text-indigo-50 leading-snug mb-2">
              {data.name}
            </h3>

            <div className="font-extrabold mb-1">
              <span className="text-2xl text-indigo-200">$ </span>
              <span className="text-4xl text-indigo-50">
                {data.pricePerNight}
              </span>
            </div>
          </header>

          <ul className="text-indigo-200 text-sm space-y-2 flex-grow mb-6">
            <li className="flex items-center">
              <svg
                className="w-3 h-3 fill-current text-green-500 mr-3 flex-shrink-0"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Lorem ipsum dolor sit amet consecte.</span>
            </li>
            <li className="flex items-center">
              <svg
                className="w-3 h-3 fill-current text-green-500 mr-3 flex-shrink-0"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Lorem ipsum dolor sit amet consecte.</span>
            </li>
            <li className="flex items-center">
              <svg
                className="w-3 h-3 fill-current text-green-500 mr-3 flex-shrink-0"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Lorem ipsum dolor sit amet consecte.</span>
            </li>
            <li className="flex items-center">
              <svg
                className="w-3 h-3 fill-current text-green-500 mr-3 flex-shrink-0"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Lorem ipsum dolor sit amet consecte.</span>
            </li>
          </ul>
          <button className="font-semibold text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow transition duration-150 ease-in-out w-full bg-green-400 hover:bg-green-500 text-white focus:outline-none focus-visible:ring-2">
            Call To Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
