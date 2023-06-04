import Layout from "@/components/Layout/Layout";
import { fetchBookings } from "@/store/slices/bookingsSlice";
import { wrapper } from "@/store/store";
import React from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

const MyBookingsClientSide = dynamic(
  () => import("../../components/Bookings/index"),
  {
    ssr: false,
  }
);

const BookingsPage = () => {
  return (
    <Layout>
      <MyBookingsClientSide />
    </Layout>
  );
};

export default BookingsPage;
// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       const session = await getSession({ req });

//       if (!session) {
//         return {
//           redirect: {
//             destination: "/login",
//             permanent: false,
//           },
//         };
//       }

//       await store.dispatch(fetchBookings(req.headers.cookie, req));
//     }
// );
