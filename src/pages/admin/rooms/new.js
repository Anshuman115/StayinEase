import Layout from "@/components/Layout/Layout";
import { wrapper } from "@/store/store";
import React from "react";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";
import NewRoom from "@/components/admin/NewRoom";

const NewRoomPage = () => {
  return (
    <Layout>
      <NewRoom />
    </Layout>
  );
};

export default NewRoomPage;
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
