import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { BsFillLightningChargeFill } from "react-icons/bs";
import AuctionCard from "../components/AuctionCardTest";
import Link from "next/link";

export default function Home({ results }) {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.noroff.dev/api/v1/auction/listings?limit=10&sort=created&sortOrder=desc", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: undefined,
      });
      const data = await res.json();
      setAuctions(data);
    }
    fetchData();
  }, []);

  return (
    <div className="debug-screens ">
      {/* <Navbar /> */}
      <Header />
      <div className="mt-6">
        <div className="flex justify-center items-center gap-1">
          <BsFillLightningChargeFill className="text-green" />
          <div className=" text-2xl">Recent Auctions</div>
        </div>
        {/* <div className="mt-6">
          <AuctionCard auctions={auctions} />
        </div> */}
        <div className="flex flex-col items-center justify-center gap-4 max-w-[1200px] mx-auto md:grid md:grid-cols-3 md:gap-3 2xl:grid-cols-4 2xl:max-w-[1600px] ">
          {results?.map((result) => {
            return <AuctionCard key={result.id} auctions={result} />;
          })}
        </div>
        <div className="mt-6 mb-24 flex justify-center">
          <Link href="/auction">
            <button className="bg-green p-2 mt-8 rounded-3xl text-white min-w-[200px]">Check Out All Listings</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://api.noroff.dev/api/v1/auction/listings?sort=created&sortOrder=desc&_active=true&_seller=true&limit=12", {
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
