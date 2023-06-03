import { fetchBookingsDetails } from "@/store/slices/bookingsDetailsSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BookingsDetails = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  useEffect(() => {
    if (error) {
      toast.error(error);
      //   dispatch(clearErrors());
    }
    if (!router.isReady) {
      // console.log(router.query);
      return;
    }
    const { query } = router;
    console.log("query", query);
    dispatch(fetchBookingsDetails(query));
  }, [dispatch]);

  const { bookingsDetails: booking, error } = useSelector(
    (state) => state.bookingsDetails
  );

  console.log("bookigns single:", booking);

  const demo = {
    paymentInfo: {
      id: "STRIPE_PAYMENT_ID",
      status: "STRIPE_PAYMENT_STATUS",
    },
    _id: "6460c32998882991da699743",
    room: {
      _id: "63fb9a48bc1ed9882082e638",
      name: "Charming Studio < 10 Miles to Wells' Beaches!",
      pricePerNight: 168,
      images: [
        {
          public_id: "Stayin/16_zkooja.jpg",
          url: "https://res.cloudinary.com/degcjqpbu/image/upload/v1677067581/Stayin/16_zkooja.jpg",
          _id: "63fb9a48bc1ed9882082e639",
        },
      ],
    },
    user: {
      _id: "64392d65ae8152a71ec3a4b3",
      name: "Anshuman Tripathy1",
      email: "anshumantripathy1234@gmail.com",
    },
    checkInDate: "2023-05-15T18:30:00.000Z",
    checkOutDate: "2023-05-17T18:30:00.000Z",
    amountPaid: 90,
    daysOfStay: 3,
    paidAt: "2023-05-14T11:10:03.050Z",
    createdAt: "2023-05-14T11:10:03.050Z",
    __v: 0,
  };

  return (
    <div className="bg-[#fff7f3] w-full text-black p-16">
      <div className="w-full text-[2rem] ">Booking at {demo.room.name}</div>
      <div>Booking Information :-</div>
      <div>
        <div>Checkin Date : {demo.checkInDate}</div>
        <div>Checkout Date : {demo.checkOutDate}</div>
        <div>Booking Amount : {demo.amountPaid}</div>
        <div>Days of Stay : {demo.daysOfStay}</div>
        <div>Paid on : {demo.paidAt}</div>
      </div>
      <div>
        Payment Details :
        <div>
          <div>Stripe Payment Id: {demo.paymentInfo.id}</div>
          <div>Status: {demo.paymentInfo.status}</div>
        </div>
      </div>
      <div>
        Room Details:
        <div>
          <div>name: {demo.room.name}</div>
          {/* <image></image> */}
        </div>
      </div>
      <div>
        User Details:
        <div>
          <div>name: {demo.user.name}</div>
          <div>email: {demo.user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default BookingsDetails;
