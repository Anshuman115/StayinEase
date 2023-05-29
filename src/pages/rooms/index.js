import Layout from "@/components/Layout/Layout";
import Rooms from "@/components/Rooms";
import { fetchAllRooms } from "@/store/slices/allRoomsSlice";
import { wrapper } from "@/store/store";
import React from "react";

const Roomspage = () => {
  return (
    <Layout>
      <Rooms />
    </Layout>
  );
};

export default Roomspage;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      const { page, location } = query;
      try {
        console.log("hei");
        const result = await store.dispatch(
          fetchAllRooms({ req, page, location })
        );
      } catch (error) {
        console.error(error);
      }
    }
);
