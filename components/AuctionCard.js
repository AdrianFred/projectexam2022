import Image from "next/image";
import { useState, useEffect } from "react";

// export default function AuctionCard({ auction }) {
//   return (
//     <div className="flex flex-col items-center justify-center">
//       <div className="flex flex-col items-center shadow-2xl w-[300px] h-[500px] rounded-tr-3xl rounded-bl-3xl bg-white">
//         <div className="pt-4">Time Remaining</div>
//         <div className="text-green font-bold pt-2">4D:3H:50M:50S</div>
//         <div>
//           <Image className=" pt-2 rounded-tr-3xl rounded-bl-3xl" src="/../public/assets/Car.jpg" alt="/" width={250} height={150} />
//         </div>
//         <div>Title of the item</div>
//         <div>Current Bid</div>
//         <div className="">
//           <button className="bg-green p-2 rounded-3xl text-white">Check Item</button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default function AuctionCard({ auction }) {
//   return (
//     <div className="flex flex-col items-center justify-center">
//       <div className="flex shadow-2xl  rounded-tr-3xl rounded-bl-3xl bg-white p-4 min-w-[250px]">
//         <div>
//           <div className="pt-4 text-center">Time Remaining</div>
//           <div className="text-green font-bold pt-2 text-center">4D:3H:50M:50S</div>
//           <div>
//             <Image className="pt-3 rounded-tr-3xl rounded-bl-3xl" src="/../public/assets/Car.jpg" alt="/" width={250} height={150} />
//           </div>
//           <div className="font-bold ml-6 mt-4">Title of the item</div>
//           <div className="ml-6 mt-2">Current Bid</div>
//           <div className="">
//             <button className="bg-green p-2 ml-4 mt-8 rounded-3xl text-white min-w-[150px]">Check Item</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function AuctionCard({ auctions }) {
  const [data, setData] = useState([]);
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
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        {data.map((auctions) => {
          if (auctions.media.length !== 0) {
            return (
              <div key={auctions.id} className="flex shadow-2xl  rounded-tr-3xl rounded-bl-3xl bg-white p-4 min-w-[250px]">
                <div>
                  <div className="pt-4 text-center">Time Remaining</div>
                  <div className="text-green font-bold pt-2 text-center">{auctions.endsAt}</div>
                  <div>
                    <img className="pt-3 rounded-tr-3xl rounded-bl-3xl" src={auctions.media} alt="/" width={250} height={150} />
                  </div>
                  <div className="font-bold ml-6 mt-4">{auctions.title}</div>
                  <div className="ml-6 mt-2">{auctions.bids}</div>
                  <div className="">
                    <button className="bg-green p-2 ml-4 mt-8 rounded-3xl text-white min-w-[150px]">Check Item</button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
