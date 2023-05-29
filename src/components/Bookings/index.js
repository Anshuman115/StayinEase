import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchBookings } from "@/store/slices/bookingsSlice";
import booking from "@/models/booking";

const MyBookings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      //   dispatch(clearErrors());
    }
    dispatch(fetchBookings());
  }, [dispatch]);

  const { bookings, error } = useSelector((state) => state.bookings);
  //   const setBookings = () => {};
  console.log("bookings", bookings);

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
            {bookings.map((item) => (
              <tr>
                <th>{item?._id}</th>
                <td>{new Date(item?.checkInDate).toLocaleString("en-US")}</td>
                <td>{new Date(item?.checkOutDate).toLocaleString("en-US")}</td>
                <td>$ {item?.amountPaid}</td>
                <td>Actions</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
