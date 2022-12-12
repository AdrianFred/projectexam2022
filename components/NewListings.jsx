import { use, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NewListings() {
  const router = useRouter();
  const [input, setInput] = useState({
    title: "",
    description: "",
    media: [],
    endsAt: "2022-12-14T21:44:58.853Z",
  });
  const changeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  };
  const changeMedia = (e) => {
    if (e.target.name === "media") {
      setInput({ ...input, media: [e.target.value] });
    }
    console.log(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://api.noroff.dev/api/v1/auction/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();

    if (res.status === 201) {
      toast.success("Listing created");
      router.push(`/auction/${data.id}`);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="debug-screens flex justify-center items-center">
        <div className="">
          <div className="bg-white h-[500px] w-[350px] rounded-xl shadow-xl p-6">
            <div className="text-green text-3xl">Make New Listing</div>
            <div className="flex justify-center items-center h-[450px]">
              <form>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label className="text-sm font-bold">Post-Title</label>
                  <input
                    onChange={changeInput}
                    placeholder="A nice car"
                    name="title"
                    type="text"
                    className="border-b border-gray-300 focus:outline-none focus:border-green"
                    required
                    minLength={3}
                    maxLength={20}
                  />
                </div>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label className="text-sm font-bold">Description</label>
                  <textarea
                    onChange={changeInput}
                    name="description"
                    type="textarea"
                    className="border-b border-gray-300 focus:outline-none focus:border-green"
                    required
                    pattern="https?://.+"
                    Title="Please enter a valid URL"
                  />
                </div>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label className="text-sm font-bold">Media/URL</label>
                  <input
                    onChange={changeMedia}
                    name="media"
                    type="text"
                    className="border-b border-gray-300 focus:outline-none focus:border-green"
                    required
                    minLength={8}
                    pattern="https?://.+"
                    Title="Please enter a valid URL"
                  />
                </div>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label className="text-sm font-bold">Ending Date</label>
                  <input
                    // onChange={changeInput}
                    name="endsAt"
                    type="date"
                    className="border-b border-gray-300 focus:outline-none focus:border-green"
                    required
                  />
                </div>
                <div className="pt-24 text-center">
                  <button onClick={handleSubmit} className="bg-green h-12 w-36 rounded-lg text-white transition duration-200 hover:scale-125 ">
                    Post Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
