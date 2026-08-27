import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchBookings } from "@/store/slices/bookingsSlice";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { jsPDF } from "jspdf";

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, error } = useSelector((state) => state.bookings);
  const { user } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  //   const setBookings = () => {};
  console.log("bookings", bookings);

  const downloadInvoice = (booking) => {
    const doc = new jsPDF();
    const line = (label, value, y) => doc.text(`${label}: ${value}`, 20, y);

    doc.setFontSize(18);
    doc.text("StayinEase Invoice", 20, 20);
    doc.setFontSize(11);
    line("Booking ID", booking._id, 35);
    line("Guest", booking.user?.name || "", 45);
    line("Email", booking.user?.email || "", 55);
    line("Room", booking.room?.name || "", 65);
    line("Check In", new Date(booking.checkInDate).toLocaleString("en-US"), 75);
    line("Check Out", new Date(booking.checkOutDate).toLocaleString("en-US"), 85);
    line("Days of Stay", booking.daysOfStay, 95);
    line("Amount Paid", `$${booking.amountPaid}`, 105);
    line("Payment Status", booking.paymentInfo?.status || "", 115);
    doc.save(`invoice_${booking._id}.pdf`);
  };

  return (
    <div className=" w-full p-8 flex flex-col items-center">
      {user ? (
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
              {bookings ? (
                bookings.map((item, index) => (
                  <tr key={index}>
                    <th>{item?._id}</th>
                    <td>
                      {new Date(item?.checkInDate).toLocaleString("en-US")}
                    </td>
                    <td>
                      {new Date(item?.checkOutDate).toLocaleString("en-US")}
                    </td>
                    <td>$ {item?.amountPaid}</td>
                    <td>
                      <div className="flex flex-row items-center ">
                        <div className="px-1">
                          <FaFileInvoiceDollar
                            onClick={() => {
                              downloadInvoice(item);
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
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <div> No Reviews Yet</div>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">
          Please login to check your bookings
        </div>
      )}
    </div>
  );
};

export default MyBookings;
