import BookingsDetails from "@/components/Bookings/BookingsDetails";
import Layout from "@/components/Layout/Layout";
import { fetchBookings } from "@/store/slices/bookingsSlice";
import { wrapper } from "@/store/store";
import React from "react";
import { useDispatch } from "react-redux";

const BookingsDetailsPage = () => {
  return (
    <Layout>
      <BookingsDetails />
    </Layout>
  );
};

export default BookingsDetailsPage;

//Also check for authentication ##########################IMP#################################################################
// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       try {
//         await store.dispatch(fetchBookings({ req }));
//       } catch (error) {
//         console.error(error);
//       }
//     }
// );
