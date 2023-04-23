import Login from "@/components/Auth/login";
import Layout from "@/components/Layout/Layout";
import { getSession } from "next-auth/react";
import React from "react";

const LoginPage = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  );
};

export default LoginPage;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
