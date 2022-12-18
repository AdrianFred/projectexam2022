import { useState } from "react";

export default function Search({ results }) {
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
    <div className="flex justify-center pt-6">
      <form onSubmit={searchButton}>
        <input type="text" onChange={searchInput} />
        <button className="pl-4" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
