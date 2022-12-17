import Head from "next/head.js";
import NewListings from "../components/NewListings.jsx";

export default function NewListing() {
  return (
    <>
      <Head>
        <title>New Listings</title>
      </Head>
      <div className="pt-32">
        <NewListings />
      </div>
    </>
  );
}
