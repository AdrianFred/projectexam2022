import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
      <Footer />
    </>
  );
}

export default MyApp;
