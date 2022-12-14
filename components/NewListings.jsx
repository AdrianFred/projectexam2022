import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { convertDate } from "./tools/DateFormatter";
import { HiPlusSm } from "react-icons/hi";

export default function NewListings() {
  const router = useRouter();
  const [input, setInput] = useState({
    title: "",
    description: "",
    media: [""],
    endsAt: "",
  });

  const onChangers = (e) => {
    if (e.target.name === "media") {
      setInput({ ...input, media: [...input.media, e.target.value] });
    } else if (e.target.name === "endsAt") {
      let dates = convertDate(e.target.value);
      setInput({ ...input, endsAt: dates });
    } else if (e.target.name === "title" || e.target.name === "description") {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (dataInput) => {
    const res = await fetch("https://api.noroff.dev/api/v1/auction/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: dataInput,
    });
    const data = await res.json();

    if (res.status === 201) {
      toast.success("Listing created");
      router.push(`/auction/${data.id}`);
    } else {
      const errors = data.errors;
      errors.forEach((error) => toast.error(error.message));
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    handleSubmit(JSON.stringify(input));
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="">
          <div className="bg-white h-[100%] w-[350px] rounded-xl shadow-xl p-6">
            <div className="text-red text-3xl">Make New Listing</div>
            <div className="flex justify-center items-center ">
              <form onSubmit={formSubmit}>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label className="text-sm font-bold">Post-Title</label>
                  <input
                    onChange={onChangers}
                    placeholder="A nice car"
                    name="title"
                    type="text"
                    className="border-b border-gray-300 focus:outline-none focus:border-red"
                    required
                    minLength={3}
                    maxLength={20}
                  />
                </div>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label className="text-sm font-bold">Description</label>
                  <textarea
                    onChange={onChangers}
                    name="description"
                    type="textarea"
                    className="border-b border-gray-300 focus:outline-none focus:border-red"
                    required
                    title="Please enter a valid URL"
                  />
                </div>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label className="text-sm font-bold">Media/URL</label>
                  <div id="mediaInput">
                    {input.media.map((media, index) => (
                      <input
                        className="border-b border-gray-300 focus:outline-none focus:border-red w-full"
                        key={index}
                        type="url"
                        value={media}
                        required
                        pattern="https?://.+"
                        onChange={(e) =>
                          setInput({
                            ...input,
                            media: input.media.map((m, i) => (i === index ? e.target.value : m)),
                          })
                        }
                      />
                    ))}
                    <button onClick={() => setInput({ ...input, media: [...input.media, ""] })}>
                      <HiPlusSm size={24} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label className="text-sm font-bold">Ending Date</label>
                  <input
                    onChange={onChangers}
                    name="endsAt"
                    type="date"
                    className="border-b border-gray-300 focus:outline-none focus:border-red"
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="pt-24 text-center">
                  <button type="submit" className="bg-red h-12 w-36 rounded-lg text-white transition duration-200 hover:scale-125 ">
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
