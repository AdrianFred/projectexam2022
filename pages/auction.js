import AuctionCard from "../components/AuctionCard";
import { useState, useEffect } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import Head from "next/head";
import useSWR from "swr";

const defaultUrl = "https://api.noroff.dev/api/v1/auction/listings?sort=created&sortOrder=desc&_active=true&_seller=true&limit=12";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Auction({}) {
  const [auctions, setAuctions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hidden, setHidden] = useState(true);

  const { data, error } = useSWR(`${defaultUrl}&offset=${offset}`, fetcher);

  const handlePageNext = () => {
    setOffset(offset + 12);
  };
  const handlePagePrevious = () => {
    setOffset(offset - 12);
  };

  return (
    <>
      <Head>
        <title>Auctions</title>
        <meta name="description" content="Auctions" />
        <lang content="en" />
      </Head>
      <div className="debug-screens">
        <div>
          <div>
            <div className="flex justify-center items-center gap-1">
              <BsFillLightningChargeFill className="text-green" />
              <div className=" text-2xl">Recent Auctions</div>
            </div>
          </div>
          <div className="pt-6">
            <AuctionCard auctions={data} />
          </div>
          <div className="pb-40 pt-10 flex justify-center gap-6">
            <button onClick={offset === 0 ? null : handlePagePrevious} className={offset === 0 ? "hover:cursor-not-allowed" : "bg-red-500"}>
              Previous Page
            </button>
            <div>{offset / 12}</div>
            <button onClick={handlePageNext} className="">
              NextPage
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
