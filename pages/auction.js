import AuctionCard from "../components/AuctionCardTest";
import { useState } from "react";
import Head from "next/head";
import { GoSearch } from "react-icons/go";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { filterResults } from "../components/tools/SearchFilter";
import PageButton from "../components/PageButton";

export async function getServerSideProps() {
  const res = await fetch("https://api.noroff.dev/api/v1/auction/listings?sort=created&sortOrder=desc&_active=true&_seller=true&limit=100", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: undefined,
  });
  const data = await res.json();
  if (!data) {
    return null;
  } else {
    return {
      props: {
        results: data,
      },
    };
  }
}

export default function Auction({ results }) {
  const [search, setSearch] = useState(filterResults("", { results }));
  const [sliceStart, setSliceStart] = useState(0);
  const [slice, setSlice] = useState(12);

  const handlePageNext = () => {
    setSliceStart(sliceStart + 12);
    setSlice(slice + 12);
  };
  const handlePagePrevious = () => {
    setSliceStart(sliceStart - 12);
    setSlice(slice - 12);
  };

  const searchButton = (e) => {
    e.preventDefault();
    const search = e.target[0].value;
    const test = filterResults(search, { results });
    console.log(test);
  };

  const searchInput = (e) => {
    const search = e.target.value;
    const test = filterResults(search, { results });
    setSearch(test);
    setSliceStart(0);
    setSlice(12);
  };

  return (
    <>
      <Head>
        <title>Auctions</title>
        <meta name="description" content="Auctions" />
        <lang content="en" />
      </Head>
      <div className="debug-screens pt-32">
        <div>
          <div>
            <div className="flex justify-center items-center gap-1">
              <BsFillLightningChargeFill size={20} className="text-red" />
              <div className=" text-2xl font-bold">Live Auctions</div>
            </div>
          </div>
          <div className="flex justify-center pt-6">
            <form onSubmit={searchButton} className="flex justify-center items-center">
              <input type="text" onChange={searchInput} />
              <button className="pl-4" type="submit">
                <GoSearch size={24} />
              </button>
            </form>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:max-w-3xl lg:grid-cols-3 lg:max-w-6xl xl:grid-cols-4 xl:max-w-[1450px] mx-auto">
            {search.length !== undefined ? (
              search.slice(sliceStart, slice).map((result) => {
                return <AuctionCard key={result.id} auctions={result} />;
              })
            ) : (
              <div className="text-2xl">No auctions found</div>
            )}
          </div>

          <div className="pb-40 pt-10 flex justify-center items-center gap-6">
            <div onClick={sliceStart === 0 ? null : handlePagePrevious} className={sliceStart === 0 ? "hover:cursor-not-allowed" : ""}>
              <PageButton text={"Previous Page"} />
            </div>
            <div className="text-3xl font-bold">{sliceStart / 12 + 1}</div>
            <div onClick={handlePageNext}>
              <PageButton text={"Next Page"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
