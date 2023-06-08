import Layout from "@/components/Layout/Layout";
import { wrapper } from "@/store/store";
import React from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";
import AllBookings from "@/components/admin/AllBookings";

const AdminBookingsPage = () => {
  return (
    <Layout>
      <AllBookings />
    </Layout>
  );
};

export default AdminBookingsPage;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });

      if (!session || session.user.role !== "admin") {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      //   await store.dispatch(fetchBookings(req.headers.cookie, req));
    }
);
