import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  const changeInput = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    console.log(name);
  };

  const userAll = async (e) => {
    e.preventDefault();
    const data = { name };
    const res = await fetch("https://api.noroff.dev/api/v1/auction/profiles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: undefined,
    });
    const json = await res.json();
    console.log(json);
  };

  const userCreditCheck = async (e) => {
    e.preventDefault();
    const data = { name };
    const res = await fetch(`https://api.noroff.dev/api/v1/auction/profiles/${name}/credits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: undefined,
    });
    const json = await res.json();
    console.log(json);
  };

  return (
    <div className="debug-screens h-[2000px]">
      <div>Hello</div>
    </div>
  );
}
