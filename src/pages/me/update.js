import React from "react";
import { getSession } from "next-auth/react";
import User from "../../components/User";
import Layout from "@/components/Layout/Layout";

const UpdateProfilePage = () => {
  return (
    <Layout>
      <User />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    console.log("redirected");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default UpdateProfilePage;
