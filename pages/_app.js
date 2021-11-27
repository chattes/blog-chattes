import "bootstrap/dist/css/bootstrap.css";
import "../styles/global.css";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header></Header>
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;
