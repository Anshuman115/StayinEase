import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Roomcard from "../Roomcard";
import { fetchAllRooms } from "@/store/slices/allRoomsSlice";

const Rooms = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllRooms());
  }, []);

  const data = useSelector((state) => state.rooms);
  console.log("data", data);

  return (
    <div className="flex justify-between p-12 bg-[#fff7f3]">
      {data?.rooms.map((room, i) => (
        <div key={i} className="px-2">
          <Roomcard room={room} />
        </div>
      ))}
    </div>
  );
};

export default Rooms;
