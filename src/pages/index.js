import React from "react";
import Layout from "@/components/Layout/Layout";
import HeroSection from "@/components/HeroSection/HeroSection";

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
    </Layout>
  );
};

export default HomePage;

// export const getServerSideProps = wrapper.getServerSideProps(() => {
//   const { data: rooms } = useGetRoomsQuery();
//   console.log(rooms);
// });

// export const getStaticProps = async () => {
//   //fetch data on build time
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");

//   const users = await res.json();

//   return {
//     props: {
//       users,
//     },
//   };
// };

// export const getServerSideProps = async (context) => {
//   //fetch data on each request
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${context.params.id}`
//   );

//   const user = await res.json();

//   return {
//     props: {
//       user,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   //used to get dynamic paths, with get static props
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users`);

//   const user = await res.json();

//   const ids = user.map((user) => user.id);

//   const paths = ids.map((id) => ({ params: { id: id.toString() } }));

//   //paths :{params:{id:'1',id:'2'}}
//   return {
//     paths,
//     fallback: false,
//   };
// };
