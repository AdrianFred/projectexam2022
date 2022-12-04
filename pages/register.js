import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const changeInput = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    }
  };

  const userRegisterIn = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    const res = await fetch("https://api.noroff.dev/api/v1/auction/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);
    if (json.statusCode === 400) {
      const error = json.errors;
      error.map((err) => toast.error(err.message));
    } else if (json.id) {
      router.push("/login");
      toast.success("You have successfully registered");
    }
  };

  return (
    <div className="debug-screens min-h-screen flex justify-center items-center">
      <div className="">
        <div className="bg-white h-[500px] w-[350px] rounded-xl shadow-xl p-6">
          <div className="text-green-500 text-2xl">Register</div>
          <div className="flex justify-center items-center h-[450px]">
            <form onSubmit={userRegisterIn}>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold">Name</label>
                <input
                  onChange={changeInput}
                  name="name"
                  type="text"
                  className="border-b border-gray-300 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold">Email</label>
                <input
                  onChange={changeInput}
                  name="email"
                  type="email"
                  className="border-b border-gray-300 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold">Password</label>
                <input
                  onChange={changeInput}
                  name="password"
                  type="password"
                  className="border-b border-gray-300 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="pt-24 text-center">
                <button className="bg-green-500 h-12 w-24 rounded-lg text-white">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
