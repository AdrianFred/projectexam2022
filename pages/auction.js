import AuctionCard from "../components/AuctionCard";

export default function Auction() {
  const auctions = async () => {
    const res = await fetch("https://api.noroff.dev/api/v1/auction/listings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: undefined,
    });
    const json = await res.json();
    console.log(json);
  };

  return (
    <div className="debug-screens">
      <div>Hello</div>
      <AuctionCard />
      <button onClick={auctions}>Click</button>
    </div>
  );
}
