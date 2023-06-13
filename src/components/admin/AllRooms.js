import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useRouter } from "next/router";
import { deleteRoom, getAdminRooms } from "@/store/slices/adminRoomsSlice";

const AllRooms = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getAdminRooms());
    if (error) {
      toast.error(error);
      // dispatch(clearErrors)
    }
  }, []);
  const { loading, error, rooms } = useSelector((state) => state.adminRooms);
  console.log(rooms, "hel");

  return (
    <div className="bg-[#fff7f3] w-full p-8">
      <div className="overflow-x-auto">
        {
          <Link href="/admin/rooms/new">
            <div className="text-lg text-black ">Post New Room</div>
          </Link>
        }
        <table className="table w-full">
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((item, index) => (
              <tr key={index}>
                <th>{item?._id}</th>
                <td>{item?.name}</td>
                <td>{item?.pricePerNight}</td>
                <td>{item?.category}</td>
                <td>
                  <div className="flex flex-row items-center ">
                    <Link href={`rooms/update/${item._id}`}>
                      <div className="px-1">
                        <FaFileInvoiceDollar
                          onClick={() => {
                            //   downloadInvoice(item);
                            //Edit Room
                          }}
                          color="green"
                          size={20}
                        />
                      </div>
                    </Link>
                    <div className="mx-3 p-2 flex flex-row items-center bg-red-700 rounded-lg">
                      <div className="text-white">
                        <button
                          onClick={() => {
                            dispatch(deleteRoom({ id: item?._id }));
                          }}
                        >
                          Delete Room{" "}
                        </button>
                      </div>
                      <AiOutlineDoubleRight color="white" size={20} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRooms;
