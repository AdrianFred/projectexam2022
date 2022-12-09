import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const [button, setButton] = useState(false);
  const router = useRouter();
  console.log(userInfo);

  const uppercaseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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

  const handleButton = () => {
    setButton(!button);
  };

  return (
    <div className="debug-screens">
      <div className="flex justify-center">
        <div>
          <div className="text-2xl text-green">Profile</div>
          <div className="pt-6">
            {!userInfo.avatar ? (
              <img src="/assets/man.jpg" className="w-[300px] rounded-2xl border-2"></img>
            ) : (
              <img src={userInfo.avatar} className="w-[300px] rounded-2xl border-2"></img>
            )}

            <div className="flex justify-center pt-6">
              <button onClick={handleButton} className="bg-green p-3 rounded-3xl text-white ">
                Change profile picture?
              </button>
            </div>
            {button ? (
              <div className="flex justify-center pt-6">
                <label for="file-upload" className=" p-3 ">
                  Test
                </label>
                <input type="text" className="p-3 rounded-3xl text-white" />
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="text-lg pt-8">
            <div>
              <p className="text-green">Name</p>
              <p className="ml-4">{userInfo.name}</p>
              <p className="ml-4">{uppercaseFirstLetter(userInfo.name)}</p>
            </div>
            <div>
              <p className="text-green">Email</p>
              <p className="ml-4">{userInfo.email}</p>
              <p className="ml-4">{uppercaseFirstLetter(userInfo.email)}</p>
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
