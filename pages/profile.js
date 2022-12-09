import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://api.noroff.dev/api/v1/auction/profiles/${localStorage.getItem("name")}`, {
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
  }, []);

  return (
    <div className="debug-screens">
      <div className="flex justify-center">
        <div>
          <div className="text-2xl text-green">Profile</div>
          <div className="pt-6">
            {!userInfo.image ? (
              <img src="/assets/man.jpg" className="w-[300px] rounded-2xl"></img>
            ) : (
              <img src={userInfo.image} className="w-[300px] rounded-2xl"></img>
            )}

            <div className="flex justify-center pt-6">
              <button className="bg-green p-3 rounded-3xl text-white ">Change profile picture?</button>
            </div>
          </div>
          <div className="text-lg pt-8">
            <div>
              <p className="text-green">Name</p>
              <p className="ml-4">{userInfo.name}</p>
            </div>
            <div>
              <p className="text-green">Email</p>
              <p className="ml-4">{userInfo.email}</p>
            </div>
            <div>
              <p className="text-green">Credits</p>
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
