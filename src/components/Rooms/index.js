import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Roomcard from "../Roomcard";
import { motion } from "framer-motion";
import { fetchAllRooms } from "@/store/slices/allRoomsSlice";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import Search from "../Search";

const Rooms = () => {
  const router = useRouter();
  let { page = 1 } = router.query;
  page = Number(page);

  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };

  const data = useSelector((state) => state.rooms);

  const handlePagination = (pageNumber) => {
    console.log(pageNumber.selected + 1);
    router.push(`/rooms/?page=${pageNumber.selected + 1}`);
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
      <div className="weo">
        {data?.resPerPage < data?.roomsCount && (
          <motion.div
            variants={paginationVariants}
            initial="hidden"
            animate="visible"
          >
            <ReactPaginate
              breakLabel={<span className="mr-4">...</span>}
              pageRangeDisplayed={data?.resPerPage}
              pageCount={Math.ceil(data?.roomsCount / data?.resPerPage)}
              onPageChange={handlePagination}
              nextLabel={
                <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md">
                  <BsChevronRight />
                </span>
              }
              previousLabel={
                <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md mr-4">
                  <BsChevronLeft />
                </span>
              }
              containerClassName="flex items-center justify-center bg-[#fff7f3] text-black"
              renderOnZeroPageCount={null}
              pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
              activeClassName="font-bold"
            />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Rooms;
