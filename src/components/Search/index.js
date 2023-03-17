import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllRooms } from "@/store/slices/allRoomsSlice";

const Search = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("hellow");
    dispatch(fetchAllRooms({ location: location }));
  }, [location, dispatch]);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (location.trim()) {
  //     router.push(`/rooms/?location=${location}`);
  //   } else {
  //     router.push("/rooms/");
  //   }
  // };

  //Category & Guest size filters to be added
  return (
    <div className="bg-[#fff7f3] flex justify-center w-full py-2">
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        className="input input-bordered input-accent w-full max-w-xs bg-[#fff7f3]"
      />
    </div>
  );
};

export default Search;
