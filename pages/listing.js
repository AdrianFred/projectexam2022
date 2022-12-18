import Head from "next/head.js";
import NewListings from "../components/NewListings.jsx";

export default function NewListing() {
  return (
    <>
      <Head>
        <title>New Listings | Auction House</title>
        <meta name="description" content="New Listings" />
        <link rel="icon" href="/favicon.ico" />
        <lang lang="en-us" />
      </Head>
      <div className="pt-32">
        <NewListings />
      </div>
    </>
  );
}
