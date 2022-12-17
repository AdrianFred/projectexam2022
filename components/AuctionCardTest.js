// import Link from "next/link";
// import { formatTimeLeft } from "./tools/DateFormatter";

// const AuctionCard = (props) => {
//   return (
//     <>
//       <div key={props.auctions.id} className="flex shadow-2xl  rounded-tr-3xl rounded-bl-3xl bg-white p-4 min-w-[250px] max-w-[300px] mt-4 mx-auto ">
//         <div>
//           <div className="pt-4 text-center">Time Remaining</div>
//           <div className="text-green font-bold pt-2 text-center">{formatTimeLeft(props.auctions.endsAt)}</div>
//           <div className="relative">
//             <img
//               className="pt-3 rounded-tr-3xl rounded-bl-3xl object-cover h-[200px]"
//               src={props.auctions.media[0]}
//               alt="/Image of the item they auctioned"
//               width="250px"
//             />
//             <div className="absolute bottom-0 right-0 bg-green p-2 rounded-tl-3xl text-white">{props.auctions.media.length} Images</div>
//           </div>
//           <div className="font-bold ml-6 mt-4 max-w-[230px] break-words h-12 line-clamp-2 ">{props.auctions.title}</div>
//           <div className="ml-6 mt-2">{props.auctions.bids}</div>
//           <div className="">
//             <Link href={`/auction/${props.auctions.id}`}>
//               <button className="bg-green p-2 ml-4 mt-8 rounded-3xl text-white min-w-[150px]">Check Item</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AuctionCard;
import Link from "next/link";
import { formatTimeLeft } from "./tools/DateFormatter";

const AuctionCard = (props) => {
  return (
    <>
      <div key={props.auctions.id} className="flex shadow-2xl  rounded-tr-3xl rounded-bl-3xl bg-white p-4 w-[300px] mt-4 mx-auto ">
        <div className="mx-auto w-[100%]">
          <div className="pt-4 text-center">Time Remaining</div>
          <div className="text-green font-bold pt-2 text-center">{formatTimeLeft(props.auctions.endsAt)}</div>
          <div className="relative">
            <img
              className="pt-3 rounded-tr-3xl rounded-bl-3xl object-cover h-[200px] w-[100%] "
              src={props.auctions.media[0]}
              alt="/Image of the item they auctioned"
            />
            <div className="absolute bottom-0 right-0 bg-green p-2 rounded-tl-3xl text-white">{props.auctions.media.length} Images</div>
          </div>
          <div className="font-semibold underline ml-1 mt-3 max-w-[230px] break-words h-12 line-clamp-2 ">{props.auctions.title}</div>
          {props.auctions.description ? (
            <div className="ml-1 mt-2 h-12 line-clamp-2">{props.auctions.description}</div>
          ) : (
            <div className="ml-1 mt-2 h-12">No description</div>
          )}

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
