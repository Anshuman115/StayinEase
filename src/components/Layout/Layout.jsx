import Head from "next/head.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children, title = "Stayin" }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
