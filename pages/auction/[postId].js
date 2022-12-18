import Head from "next/head";
import { useState, useEffect } from "react";
import Specific from "../../components/Specific";

export async function getServerSideProps({ query }) {
  const { postId } = query;
  const res = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${postId}?_active=true&_seller=true&_bids=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: undefined,
  });
  const data = await res.json();
  return {
    props: {
      results: data,
    },
  };
}

export default function AuctionCard({ results }) {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
  }, [results]);

  return (
    <>
      <Head>
        <title>{results.title} | Auction House</title>
        <meta name="description" content="Auction" />
        <link rel="icon" href="/favicon.ico" />
        <lang lang="en-us" />
      </Head>

      <div className="debug-screens flex items-center justify-center py-32">
        <Specific info={results} />
      </div>
    </>
  );
}
