import Link from "next/link";
import { formatTimeLeft } from "./tools/DateFormatter";

const AuctionCard = (props) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 max-w-[1200px] mx-auto md:grid md:grid-cols-3 md:gap-3 2xl:grid-cols-4 2xl:max-w-[1600px] ">
        {props.auctions?.map((auction) => {
          if (auction.media?.length !== 0) {
            return (
              <div key={auction.id} className="flex shadow-2xl  rounded-tr-3xl rounded-bl-3xl bg-white p-4 min-w-[250px] max-w-[300px] mt-4 mx-auto ">
                <div>
                  <div className="pt-4 text-center">Time Remaining</div>
                  <div className="text-red font-bold pt-2 text-center">{formatTimeLeft(auction.endsAt)}</div>
                  <div>
                    <img className="pt-3 rounded-tr-3xl rounded-bl-3xl object-cover h-[200px]" src={auction.media[0]} alt="/" width="250px" />
                  </div>
                  <div className="font-bold ml-6 mt-4 max-w-[230px] break-words">{auction.title}</div>
                  <div className="ml-6 mt-2">{auction.bids}</div>
                  <div className="">
                    <Link href={`/auction/${auction.id}`}>
                      <button className="bg-red p-2 ml-4 mt-8 rounded-3xl text-white min-w-[150px]">Check Item</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default AuctionCard;
