import { useState, useEffect } from "react";
import Specific from "../../components/Specific";
import formatDate from "../../components/tools/DateFormatter";

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
    <div className="flex flex-col items-center justify-center pt-32">
      <Specific info={results} />
    </div>
  );
}
