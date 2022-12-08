import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { BsFillLightningChargeFill } from "react-icons/bs";
import AuctionCard from "../components/AuctionCard";
import Link from "next/link";

export default function Home() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.noroff.dev/api/v1/auction/listings?limit=10", {
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
        <div className="mt-6">
          <AuctionCard auctions={auctions} />
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
