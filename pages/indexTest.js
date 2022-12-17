import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { BsFillLightningChargeFill } from "react-icons/bs";
import AuctionCard from "../components/AuctionCardTest";
import Link from "next/link";

export default function Home({ results }) {
  const [slice, setSlice] = useState(12);
  const [search, setSearch] = useState(results);

  const filterResults = (searchTerm) => {
    const filteredResults = [];
    results.map((result) => {
      if (result.description === null) {
        if (result.title.toLowerCase().includes(searchTerm.toLowerCase()) || result.seller.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          filteredResults.push(result);
        }
      } else {
        if (
          result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          filteredResults.push(result);
        }
      }
    });
    return filteredResults;
  };

  const searchButton = (e) => {
    e.preventDefault();
    const search = e.target[0].value;
    const test = filterResults(search);
    console.log(test);
  };

  const searchInput = (e) => {
    const search = e.target.value;
    const test = filterResults(search);
    setSearch(test);
  };

  return (
    <div className="debug-screens ">
      {/* <Navbar /> */}
      <Header />
      <div className="flex justify-center pt-6">
        <form onSubmit={searchButton}>
          <input type="text" onChange={searchInput} />
          <button className="pl-4" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="mt-6">
        <div className="flex justify-center items-center gap-1">
          <BsFillLightningChargeFill className="text-green" />
          <div className=" text-2xl">Recent Auctions</div>
        </div>
        {/* <div className="mt-6">
          <AuctionCard auctions={results} />
        </div> */}
        <div className="flex flex-col items-center justify-center gap-4 max-w-[1200px] mx-auto md:grid md:grid-cols-3 md:gap-4 2xl:grid-cols-4 2xl:max-w-[1600px] 2xl:gap-x-0">
          {search.length !== undefined ? (
            search.slice(0, slice).map((result) => {
              return <AuctionCard key={result.id} auctions={result} />;
            })
          ) : (
            <div className="text-2xl">No auctions found</div>
          )}
        </div>
        <div className="mt-6 mb-24 flex justify-center">
          <Link href="/auction">
            <button className="bg-green p-2 mt-8 rounded-3xl text-white min-w-[200px]">Check Out All Listings</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

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
