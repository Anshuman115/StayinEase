import MyBookings from "@/components/Bookings";
import Layout from "@/components/Layout/Layout";
import { fetchBookings } from "@/store/slices/bookingsSlice";
import { wrapper } from "@/store/store";
import React from "react";
import { useDispatch } from "react-redux";

const BookingsPage = () => {
  return (
    <Layout>
      <MyBookings />
    </Layout>
  );
};

export default BookingsPage;
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
