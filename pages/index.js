import { useState } from "react";
import Header from "../components/Header";
import { BsFillLightningChargeFill } from "react-icons/bs";
import AuctionCard from "../components/AuctionCard";
import Link from "next/link";
import { filterResults } from "../components/tools/SearchFilter";
import { GoSearch } from "react-icons/go";
import PageButton from "../components/PageButton";
import Head from "next/head";

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

export default function Home({ results }) {
  const [search, setSearch] = useState(filterResults("", { results }));

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
  };

  return (
    <>
      <Head>
        <title>Home | Auction House</title>
        <meta name="description" content="Auction" />
        <link rel="icon" href="/favicon.ico" />
        <lang lang="en-us" />
      </Head>
      <div className="debug-screens pt-20">
        <Header />
        <div className="flex justify-center pt-6">
          <form onSubmit={searchButton} className="flex justify-center items-center">
            <label htmlFor="searchThings"></label>
            <input type="text" name="searchThings" id="searchThings" onChange={searchInput} className="rounded-lg pl-2" />
            <button className="pl-4" type="submit">
              <GoSearch size={24} aria-label="Button to search through different listings" />
            </button>
          </form>
        </div>

        <div className="mt-6">
          <div className="flex justify-center items-center gap-1">
            <BsFillLightningChargeFill size={20} className="text-red" />
            <div className=" text-2xl font-semi">Recent Auctions</div>
          </div>
          <div className="mt-6"></div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:max-w-3xl lg:grid-cols-3 lg:max-w-6xl xl:grid-cols-4 xl:max-w-[1450px] mx-auto">
            {search.length !== undefined ? (
              search.slice(0, 12).map((result) => {
                return <AuctionCard key={result.id} auctions={result} />;
              })
            ) : (
              <div className="text-2xl">No auctions found</div>
            )}
          </div>
          <div className="mt-6 mb-24 flex justify-center">
            <Link href="/auction">
              <PageButton text="All Listings" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
