import { useRouter } from "next/router";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { RiAuctionFill } from "react-icons/ri";
import { convertDateToHours, formatTimeLeft } from "./tools/DateFormatter";
import { useState, useEffect } from "react";
import MediaGallery from "./MediaGallery";

export default function Specific({ info }) {
  const { id, title, description, media, endsAt, bids } = info;
  const router = useRouter();
  const [sortedBids, setSortedBids] = useState([]);

  useEffect(() => {
    setSortedBids(bids.sort((a, b) => b.amount - a.amount));
  }, [bids]);

  const highestBid = () => {
    if (bids.length === 0) {
      return "No bids yet";
    } else {
      return sortedBids[0]?.amount;
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
        if (json.statusCode) {
          const error = json.errors;
          error.map((err) => toast.error(err.message));
        } else if (json.id) {
          toast.success("You have successfully placed a bid");
        }
      });
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  const deletePost = () => {
    const res = fetch(`https://api.noroff.dev/api/v1/auction/listings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.statusCode) {
          const error = json.errors;
          error.map((err) => toast.error(err.message));
        } else {
          toast.success("You have successfully deleted your post");
        }
      });
    setTimeout(() => {
      router.push("/auction");
      toast.success("You have successfully deleted your post");
    }, 1000);
    setTimeout(() => {
      router.reload();
    }, 2000);
  };

  return (
    <div className="w-[95%] sm:w-[70%] max-w-[950px] shadow-2xl rounded-3xl ">
      <div className="">
        {/* Title */}
        <div className="flex justify-center items-center gap-1 pt-6">
          <BsFillLightningChargeFill size={20} className="text-red" />
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        {/* Groups */}
        <div className="">
          {/* Photo gallery */}
          <div className="h-[300px] w-[80%] mx-auto sm:h-[350px] md:h-[400px] lg:h-[500px] 2xl:w-[100%] ">
            <MediaGallery media={media} />
          </div>
          {/* Description */}
          <div className="w-[80%] max-w-[800px]  pt-12 pb-8 px-4 mx-auto">
            <h2 className="text-lg lg:text-xl text-red underline">{title}</h2>
            <p className="text-sm lg:text-base text-gray-800 md:max-w-[80%] 2xl:max-w-[100%] pt-3">{description}</p>
            <div className="flex justify-between items-center pt-4">
              <div>
                {bids.length === 0 ? (
                  <p className="text-gray-700">No bids yet</p>
                ) : (
                  <p className="text-gray-700">
                    Current Bid: <span className="text-red text-xl">{highestBid()}</span> Credits
                  </p>
                )}

                <p className="text-sm text-gray-700">Auction ends in {formatTimeLeft(endsAt)}</p>
              </div>
              <button onClick={deletePost} className="bg-red text-white w-[20%] h-8 rounded-xl">
                Delete
              </button>
            </div>
          </div>
          {/* Bidding */}
          <div className="w-[80%] 2xl:w-[90%] pb-12 px-4 mx-auto max-w-[450px] pt-10 ">
            <div className="flex flex-col justify-around shadow-2xl rounded-3xl bg-white  h-32 mx-auto">
              <div className="mx-5">
                <h4 className="font-bold text-xl">Place Bid</h4>
                <p className="text-sm">Minimum Bid: {minBidDisplay()}</p>

                <form onSubmit={placeBid} className="flex justify-between pt-2">
                  <input
                    type="number"
                    name="bidAmount"
                    id="bidAmount"
                    className="w-[70%] h-8 rounded-md border-2 border-black pl-1 focus:outline-none focus:border-red"
                    placeholder="Enter bid amount"
                    min={minBid()}
                  />
                  <button type="submit" className="bg-red text-white w-[20%] h-8 rounded-xl">
                    Bid
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* History */}
          <div className="w-[80%] 2xl:w-[90%] pb-12 px-4 mx-auto max-w-[450px]">
            <div className="shadow-2xl rounded-3xl bg-white">
              <div className="ml-4 pt-4">
                <h5 className="font-bold text-xl">Bidding History (recents)</h5>
              </div>
              <div className="p-4">
                <ul className="mt-4">
                  {sortedBids.slice(0, 4).map((bid) => (
                    <li key={bid.id} className="flex justify-between items-center px-6 mb-4 border border-black rounded-xl">
                      <div className="flex gap-4 items-center">
                        <RiAuctionFill size={24} className="text-red" />
                        <div>
                          <p className="truncate w-24 ">{bid.bidderName.charAt(0).toUpperCase() + bid.bidderName.slice(1)}</p>
                          <p className="text-sm text-gray-500">{bid.amount} Credits</p>
                        </div>
                      </div>

                      <div className="ml-6">{convertDateToHours(bid.created)} Ago</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
