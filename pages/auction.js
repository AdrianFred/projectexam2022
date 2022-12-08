import AuctionCard from "../components/AuctionCard";
import { useState, useEffect } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";

export default function Auction() {
  const [auctions, setAuctions] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.noroff.dev/api/v1/auction/listings", {
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
    <div className="debug-screens">
      <div>
        <div>
          <div className="flex justify-center items-center gap-1">
            <BsFillLightningChargeFill className="text-green" />
            <div className=" text-2xl">Recent Auctions</div>
          </div>
        </div>
        <div className="pt-6">
          <AuctionCard auctions={auctions} />
        </div>
      </div>
    </div>
  );
}
