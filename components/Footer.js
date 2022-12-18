import { useEffect, useState } from "react";

export default function Footer() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  let TestName = name.charAt(0).toUpperCase() + name.slice(1);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("name")) {
      setLoggedIn(true);
      setName(localStorage.getItem("name"));
    }
  }, []);

  return (
    <footer className="bg-gray-200 py-5 fixed bottom-0 w-full">
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">© Auction House</p>
        </div>
        <div>{loggedIn ? <p className="text-sm">Welcome: {TestName}</p> : <p className="text-sm">Welcome: Guest</p>}</div>
      </div>
    </footer>
  );
}
