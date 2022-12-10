import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import formatDate from "../../components/tools/DateFormatter";

export default function AuctionCard({ auctions }) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    if (!postId) {
      return;
    }
    const fetchSomething = async () => {
      const res = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: undefined,
      });
      const data = await res.json();
      setData(data);
    };
    fetchSomething();
    setLoader(false);
  }, [postId]);

  return (
    <div className="flex flex-col items-center justify-center">
      {loader ? (
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl">Loading...</div>
        </div>
      ) : (
        <div className="flex shadow-2xl  rounded-tr-3xl rounded-bl-3xl bg-white p-4 min-w-[250px]">
          <div>
            <div className="pt-4 text-center">Time Remaining</div>
            <div className="text-green font-bold pt-2 text-center">{formatDate(data.endsAt)}</div>
            <div>
              <img className="pt-3 rounded-tr-3xl rounded-bl-3xl" src={data.media} alt="/" width={250} height={150} />
            </div>
            <div className="font-bold ml-6 mt-4">{data.title}</div>
            <div className="ml-6 mt-2">test</div>
            <div className="">
              <button className="bg-green p-2 ml-4 mt-8 rounded-3xl text-white min-w-[150px]">test</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
