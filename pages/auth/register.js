import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Head from "next/head";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("e");
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
    } else if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "passwordConfirmation") {
      setPasswordConfirmation(e.target.value);
    }
  };

  const passwordMatch = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match");
    } else {
      toast.success("Passwords match");
      userRegisterIn(e);
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
    if (json.statusCode) {
      const error = json.errors;
      error.map((err) => toast.error(err.message));
    } else if (json.id) {
      router.push("/auth/login");
      toast.success("You have successfully registered");
    }
  };

  return (
    <>
      <Head>
        <title>Register | Auction House</title>
        <meta name="description" content="Register" />
        <lang lang="en-us" />
        <icon rel="icon" href="/favicon.ico" />
      </Head>
      <div className="debug-screens min-h-screen flex justify-center items-center">
        <div className="">
          <div className="bg-white sm:w-[400px] rounded-xl shadow-xl p-6">
            <div className="text-red text-3xl">Register</div>
            <div className="flex justify-center items-center h-[350px] sm:h-[400px]">
              <form onSubmit={passwordMatch}>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label htmlFor="name" className="text-sm font-bold">
                    Name
                  </label>
                  <input
                    onChange={changeInput}
                    id="name"
                    placeholder="Peter Griffin"
                    name="name"
                    type="text"
                    className="border-b border-gray-300 focus:outline-none focus:border-red"
                    required
                    minLength={3}
                    maxLength={20}
                  />
                </div>
                <div className="flex flex-col mt-4 min-w-[]">
                  <label htmlFor="email" className="text-sm font-bold">
                    Email
                  </label>
                  <input
                    onChange={changeInput}
                    id="email"
                    placeholder="example.noroff.no"
                    name="email"
                    type="email"
                    className="border-b border-gray-300 focus:outline-none focus:border-red"
                    required
                    pattern="^[\w\-.]+@stud.?noroff.no$|^[\w\-.]+@?noroff.no$"
                    title="Only users with a Noroff email account may sign up. Email must end in (stud.)noroff.no"
                  />
                </div>
                <div className="flex flex-col mt-4 min-w-[]">
                  <label htmlFor="password" className="text-sm font-bold">
                    Password
                  </label>
                  <input
                    onChange={changeInput}
                    id="password"
                    name="password"
                    type="password"
                    className="border-b border-gray-300 focus:outline-none focus:border-red"
                    required
                    minLength={8}
                  />
                </div>
                <div className="flex flex-col mt-4 min-w-[]">
                  <label htmlFor="passwordConfirm" className="text-sm font-bold">
                    Confirm Password
                  </label>
                  <input
                    onChange={changeInput}
                    id="passwordConfirm"
                    name="passwordConfirmation"
                    type="password"
                    className="border-b border-gray-300 focus:outline-none focus:border-red"
                    required
                    minLength={8}
                  />
                </div>
                <div className="pt-16 text-center">
                  <button className="bg-red h-12 w-24 rounded-lg text-white">Register</button>
                </div>
              </form>
            </div>
            <div className="text-center pt-4">
              <Link href="/auth/login">
                <button>Click Here to Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
