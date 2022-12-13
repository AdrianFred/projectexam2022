import Link from "next/link";
import { formatTimeLeft } from "./tools/DateFormatter";

const AuctionCard = (props) => {
  return (
    <>
      <div key={props.auctions.id} className="flex shadow-2xl  rounded-tr-3xl rounded-bl-3xl bg-white p-4 min-w-[250px] max-w-[300px] mt-4 mx-auto ">
        <div>
          <div className="pt-4 text-center">Time Remaining</div>
          <div className="text-green font-bold pt-2 text-center">{formatTimeLeft(props.auctions.endsAt)}</div>
          <div>
            <img className="pt-3 rounded-tr-3xl rounded-bl-3xl object-cover h-[200px]" src={props.auctions.media[0]} alt="/" width="250px" />
          </div>
          <div className="font-bold ml-6 mt-4 max-w-[230px] break-words">{props.auctions.title}</div>
          <div className="ml-6 mt-2">{props.auctions.bids}</div>
          <div className="">
            <Link href={`/auction/${props.auctions.id}`}>
              <button className="bg-green p-2 ml-4 mt-8 rounded-3xl text-white min-w-[150px]">Check Item</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionCard;
