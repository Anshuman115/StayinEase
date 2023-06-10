import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useRouter } from "next/router";
import {
  deleteBookings,
  getAdminBookings,
} from "@/store/slices/adminBookingsSlice";

const AllBookings = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getAdminBookings());
    if (error) {
      toast.error(error);
      // dispatch(clearErrors)
    }
  }, [dispatch]);
  const { isLoading, error, bookings } = useSelector(
    (state) => state.adminBookings
  );
  console.log(bookings, "hel");

  return (
    <div className="bg-[#fff7f3] w-full p-8">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Amount Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item, index) => (
              <tr key={index}>
                <th>{item?._id}</th>
                <td>{new Date(item?.checkInDate).toLocaleString("en-US")}</td>
                <td>{new Date(item?.checkOutDate).toLocaleString("en-US")}</td>
                <td>$ {item?.amountPaid}</td>
                <td>
                  <div className="flex flex-row items-center ">
                    <div className="px-1">
                      <FaFileInvoiceDollar
                        onClick={() => {
                          //   downloadInvoice(item);
                        }}
                        color="green"
                        size={20}
                      />
                    </div>
                    <div className="mx-3 p-2 flex flex-row items-center bg-red-700 rounded-lg">
                      <div className="text-white">
                        <Link href={`/bookings/${item._id}`}>Details </Link>
                      </div>
                      <AiOutlineDoubleRight color="white" size={20} />
                    </div>
                    <div className="mx-3 p-2 flex flex-row items-center bg-red-700 rounded-lg">
                      <div className="text-white">
                        <button
                          onClick={() => {
                            // console.log(item._id);
                            dispatch(deleteBookings({ id: item?._id }));
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

export default AllBookings;
