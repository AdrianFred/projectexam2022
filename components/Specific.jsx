import { useRouter } from "next/router";
import { BsChatRight, BsFillLightningChargeFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { RiAuctionFill } from "react-icons/ri";
import { convertDateToHours } from "./tools/DateFormatter";
import { useState } from "react";
import MediaGallery from "./MediaGallery";

export default function Specific({ info }) {
  const { id, title, description, media, endsAt, bids } = info;
  const router = useRouter();
  const sortedBids = bids.sort((a, b) => b.amount - a.amount);

  const highestBid = () => {
    if (bids.length === 0) {
      return "No bids yet";
    } else {
      return sortedBids[0].amount;
    }
  };

  const minBidDisplay = () => {
    if (bids.length === 0) {
      return "No bids yet";
    } else {
      return bids[0].amount + 1;
    }
  };

  const minBid = () => {
    if (bids.length === 0) {
      return 1;
    } else {
      return bids[0].amount + 1;
    }
  };

  const placeBid = (e) => {
    e.preventDefault();
    const data = { amount: parseInt(e.target.bidAmount.value) };
    const res = fetch(`https://api.noroff.dev/api/v1/auction/listings/${id}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.statusCode) {
          const error = json.errors;
          error.map((err) => toast.error(err.message));
        } else if (json.id) {
          toast.success("You have successfully placed a bid");
        }
      });
    setTimeout(() => {
      router.reload();
    }, 2000);
  };

  return (
    <>
      <div className="w-[70%]">
        <div className="flex justify-center items-center gap-1">
          <BsFillLightningChargeFill size={20} className="text-green" />
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <MediaGallery media={media} />
        <div className="pt-12 pb-8">
          <p className="text-md text-green mx-4 underline">{title}</p>
          <p className="text-sm text-gray-500 mx-4 max-w-[280px] pt-1">{description}</p>
          <p className="mx-4">Current Bid: {highestBid()}</p>
        </div>
        <div className="pb-12">
          <div className="flex flex-col justify-around shadow-2xl rounded-3xl bg-white  h-32 mx-auto">
            <div className="mx-5">
              <h4 className="font-bold text-xl">Place Bid</h4>
              <p className="text-sm">Minimum Bid: {minBidDisplay()}</p>
            </div>
            <form onSubmit={placeBid} className="mx-5">
              <input min={minBid()} name="bidAmount" type="number" className="w-40 border-2 border-black rounded-lg pl-2" />
              <button type="submit" className="bg-green text-white ml-4 w-[80px] h-[30px] rounded-lg text-sm">
                Place Bid
              </button>
            </form>
          </div>
        </div>
        <div className="pb-44">
          <div className="pt-6 shadow-2xl rounded-3xl bg-white w-[300px] h-[275px]">
            <div className="ml-4">
              <h5 className="font-bold text-xl">Bidding History (recents)</h5>
            </div>
            <div className="ml-4">
              <ul className="mt-4">
                {sortedBids.slice(0, 4).map((bid) => (
                  <li key={bid.id} className="flex items-center gap-4 pt-1">
                    <RiAuctionFill size={24} className="text-green" />
                    <div>
                      <p className="truncate w-24 ">{bid.bidderName.charAt(0).toUpperCase() + bid.bidderName.slice(1)}</p>
                      <p className="text-sm text-gray-500">{bid.amount} Credits</p>
                    </div>
                    <div className="ml-6">{convertDateToHours(bid.created)} Ago</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
