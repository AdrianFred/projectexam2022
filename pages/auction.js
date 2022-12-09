import AuctionCard from "../components/AuctionCard";
import { useState, useEffect } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";

export default function Auction({ results }) {
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
          <AuctionCard auctions={results} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://api.noroff.dev/api/v1/auction/listings?sort=created&sortOrder=desc&_active=true&_seller=true", {
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

// export default async function handler(req, res) {
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       try {
//         const auctions = await prisma.auction.findMany();
//         res.status(200).json(auctions);
//       } catch (error) {
//         res.status(400).json({ message: "Something went wrong" });
//       }
//       break;
//     default:
//       res.setHeader("Allow", ["GET"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }
