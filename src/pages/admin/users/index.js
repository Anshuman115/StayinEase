import Layout from "@/components/Layout/Layout";
import { wrapper } from "@/store/store";
import React from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";
import AllUsers from "@/components/admin/AllUsers";

const AdminUsersPage = () => {
  return (
    <Layout>
      <AllUsers />
    </Layout>
  );
};

export default AdminUsersPage;
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
