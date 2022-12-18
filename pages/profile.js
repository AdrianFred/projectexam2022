import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import safetyImg from "../public/assets/man.jpg";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const [button, setButton] = useState(false);
  const [avatar, setAvatar] = useState("");
  const router = useRouter();

  const uppercaseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/auth/login");
    } else {
      async function fetchData() {
        const res = await fetch(`https://api.noroff.dev/api/v1/auction/profiles/${localStorage.getItem("name")}?_listings=true`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: undefined,
        });
        const data = await res.json();
        setUserInfo(data);
      }
      fetchData();
    }
  }, []);

  const handleButton = () => {
    setButton(!button);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://api.noroff.dev/api/v1/auction/profiles/${userInfo.name}/media`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
    router.reload();
  };

  return (
    <div className="debug-screens py-32 ">
      <div className="flex justify-center">
        <div className="shadow-xl p-12 rounded-xl bg-white">
          <div className="text-2xl text-red font-semibold">Profile</div>
          <div className="pt-6">
            {!userInfo.avatar ? (
              <Image src={safetyImg} className="w-[300px] rounded-2xl border-2" alt="An image of a default user with no avatar" />
            ) : (
              <img src={userInfo.avatar} className="w-[300px] rounded-2xl border-2" alt="A profile picture of a user with an avatar"></img>
            )}

            <div className="flex justify-center pt-6">
              <button onClick={handleButton} className="bg-red p-3 rounded-3xl text-white ">
                Change profile picture?
              </button>
            </div>
            {button ? (
              <form onSubmit={handleSubmit} className="flex flex-col justify-center pt-6">
                <label className=" p-3 ">New Url:</label>
                <input
                  type="textarea"
                  className="p-3 rounded-3xl  max-w-[300px] border-2 border-black"
                  onChange={(e) => {
                    setAvatar(e.target.value);
                  }}
                  pattern="https://.*"
                  required
                  title="Please enter a valid url, starting with https://"
                  placeholder="https://..."
                />
                <button type="submit" className="bg-red p-3 rounded-3xl text-white max-w-[150px] min-w-[150px] mx-auto mt-6">
                  Submit
                </button>
              </form>
            ) : (
              <div></div>
            )}
          </div>
          <div className="text-lg pt-8">
            <div>
              <p className="text-red">Name</p>
              <p className="ml-4">{name}</p>
              <p className="ml-4">{userInfo.name}</p>
              {/* <p className="ml-4">{uppercaseFirstLetter(userInfo.name)}</p> */}
            </div>
            <div>
              <p className="text-red">Email</p>
              <p className="ml-4">{userInfo.email}</p>
              {/* <p className="ml-4">{uppercaseFirstLetter(userInfo.email)}</p> */}
            </div>
            <div>
              <p className="text-red">Credits</p>
              <p className="ml-4">
                <span className="font-bold">{userInfo.credits}</span> Credits available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
