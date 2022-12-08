import Image from "next/image";
import Link from "next/link";

// export default function AuctionCard({ auctions }) {
//   const [data, setData] = useState([]);
//   const [url, setUrl] = useState("https://api.noroff.dev/api/v1/auction/listings?limit=10");

//   useEffect(() => {
//     async function fetchData() {
//       const res = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: undefined,
//       });
//       const data = await res.json();
//       setData(data);
//     }
//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center gap-4">
//         {data.map((auctions) => {
//           if (auctions.media.length !== 0) {
//             return (
//               <div key={auctions.id} className="flex shadow-2xl  rounded-tr-3xl rounded-bl-3xl bg-white p-4 min-w-[250px]">
//                 <div>
//                   <div className="pt-4 text-center">Time Remaining</div>
//                   <div className="text-green font-bold pt-2 text-center">{auctions.endsAt}</div>
//                   <div>
//                     <img className="pt-3 rounded-tr-3xl rounded-bl-3xl" src={auctions.media} alt="/" width={250} height={150} />
//                   </div>
//                   <div className="font-bold ml-6 mt-4">{auctions.title}</div>
//                   <div className="ml-6 mt-2">{auctions.bids}</div>
//                   <div className="">
//                     <Link href={`/auction/${auctions.id}`}>
//                       <button className="bg-green p-2 ml-4 mt-8 rounded-3xl text-white min-w-[150px]">Check Item</button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             );
//           }
//         })}
//       </div>
//     </>
//   );
// }

const AuctionCard = (props) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        {props.auctions.map((auction) => {
          if (auction.media.length !== 0) {
            return (
              <div key={auction.id} className="flex shadow-2xl  rounded-tr-3xl rounded-bl-3xl bg-white p-4 min-w-[250px]">
                <div>
                  <div className="pt-4 text-center">Time Remaining</div>
                  <div className="text-green font-bold pt-2 text-center">{auction.endsAt}</div>
                  <div>
                    <img className="pt-3 rounded-tr-3xl rounded-bl-3xl" src={auction.media} alt="/" width={250} height={150} />
                  </div>
                  <div className="font-bold ml-6 mt-4 max-w-[230px]">{auction.title}</div>
                  <div className="ml-6 mt-2">{auction.bids}</div>
                  <div className="">
                    <Link href={`/auction/${auction.id}`}>
                      <button className="bg-green p-2 ml-4 mt-8 rounded-3xl text-white min-w-[150px]">Check Item</button>
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
