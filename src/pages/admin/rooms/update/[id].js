import Layout from "@/components/Layout/Layout";
import { wrapper } from "@/store/store";
import React from "react";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";
import UpdateRoom from "@/components/admin/UpdateRoom";

const UpdateRoomPage = () => {
  return (
    <Layout>
      <UpdateRoom />
    </Layout>
  );
};

export default UpdateRoomPage;
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
