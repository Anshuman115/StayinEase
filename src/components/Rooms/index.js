import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Roomcard from "../Roomcard";
import { fetchAllRooms } from "@/store/slices/allRoomsSlice";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";
import Search from "../Search";

const Rooms = () => {
  const router = useRouter();
  let { page = 1 } = router.query;
  page = Number(page);

  const data = useSelector((state) => state.rooms);

  const handlePagination = (pageNumber) => {
    router.push(`/rooms/?page=${pageNumber}`);
  };

  return (
    <>
      <Search />
      <div className="flex justify-between p-12 bg-[#fff7f3]">
        {data?.rooms.map((item, i) => (
          <div key={i} className="px-2">
            <Roomcard {...item} key={i} />
          </div>
        ))}
      </div>
      {data?.resPerPage < data?.roomsCount && (
        <div className="flex flex-row">
          <Pagination
            activePage={page}
            itemsCountPerPage={data?.resPerPage}
            totalItemsCount={data?.roomsCount}
            onChange={handlePagination}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
          />
        </div>
      )}
    </>
  );
};

export default Rooms;
