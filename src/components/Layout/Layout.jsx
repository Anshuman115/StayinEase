import Head from "next/head.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title = "StayinEase" }) => {
  return (
    <div className="h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <ToastContainer position="bottom-right" />
      {children}
      <hr />
      <Footer />
    </div>
  );
};

export default Layout;
