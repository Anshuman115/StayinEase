import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllRooms } from "@/store/slices/allRoomsSlice";

const Search = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log("hellow");
  //   dispatch(fetchAllRooms({ location: location }));
  // }, [location, dispatch]);

  useEffect(() => {
    if (location.trim()) {
      router.push(`/rooms/?location=${location}`);
    } else {
      router.push("/rooms/");
    }
  }, [location]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#fff7f3] flex justify-center w-full py-2">
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        className="input input-error w-full max-w-xs bg-[#fff7f3]"
      />
    </div>
  );
};

export default Search;
