import AuctionCard from "../components/AuctionCard";
import { useState, useEffect } from "react";

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
        <AuctionCard auctions={auctions} />
      </div>
    </div>
  );
}
