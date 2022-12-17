import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      toast.success("You are already logged in");
      router.push("/");
    }
  }, []);

  const changeInput = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const userSignIn = async (e) => {
    e.preventDefault();
    const data = { email, password };
    const res = await fetch("https://api.noroff.dev/api/v1/auction/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.accessToken) {
      localStorage.setItem("token", json.accessToken);
      localStorage.setItem("credits", json.credits);
      localStorage.setItem("name", json.name);
      router.push("/");
      toast.success("You have successfully logged in");
      setTimeout(() => {
        router.reload();
      }, 1000);
    } else {
      const error = json.errors;
      error.map((err) => toast.error(err.message));
    }
  };

  return (
    <div className="debug-screens min-h-screen flex justify-center items-center">
      <div className="">
        <div className="bg-white h-[500px] w-[350px] rounded-xl shadow-xl p-6">
          <div className="text-green text-3xl">Login</div>
          <div className="flex justify-center items-center h-[450px]">
            <form onSubmit={userSignIn}>
              <div className="flex flex-col mt-4 ">
                <label className="text-md font-bold">Email</label>
                <input
                  onChange={changeInput}
                  name="email"
                  type="email"
                  className="border-b border-gray-300 focus:outline-none focus:border-green"
                  pattern="^[\w\-.]+@stud.?noroff.no$|^[\w\-.]+@?noroff.no$"
                  title="Only users with a Noroff email account may sign up. Email must end in (stud.)noroff.no"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-md font-bold">Password</label>
                <input
                  onChange={changeInput}
                  name="password"
                  type="password"
                  className="border-b border-gray-300 focus:outline-none focus:border-green"
                  required
                  minLength={8}
                />
              </div>
              <div className="pt-24 text-center">
                <button className="bg-green h-12 w-24 rounded-lg text-white">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
