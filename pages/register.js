import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

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
          <div className="text-green text-3xl">Register</div>
          <div className="flex justify-center items-center h-[450px]">
            <form onSubmit={passwordMatch}>
              <div className="flex flex-col mt-4 min-w-[250px]">
                <label className="text-sm font-bold">Name</label>
                <input
                  onChange={changeInput}
                  placeholder="Peter Griffin"
                  name="name"
                  type="text"
                  className="border-b border-gray-300 focus:outline-none focus:border-green"
                  required
                  minLength={3}
                  maxLength={20}
                />
              </div>
              <div className="flex flex-col mt-4 min-w-[250px]">
                <label className="text-sm font-bold">Email</label>
                <input
                  onChange={changeInput}
                  placeholder="example.noroff.no"
                  name="email"
                  type="email"
                  className="border-b border-gray-300 focus:outline-none focus:border-green"
                  required
                  pattern="^[\w\-.]+@stud.?noroff.no$|^[\w\-.]+@?noroff.no$"
                  title="Only users with a Noroff email account may sign up. Email must end in (stud.)noroff.no"
                />
              </div>
              <div className="flex flex-col mt-4 min-w-[250px]">
                <label className="text-sm font-bold">Password</label>
                <input
                  onChange={changeInput}
                  name="password"
                  type="password"
                  className="border-b border-gray-300 focus:outline-none focus:border-green"
                  required
                  minLength={8}
                />
              </div>
              <div className="flex flex-col mt-4 min-w-[250px]">
                <label className="text-sm font-bold">Confirm Password</label>
                <input
                  onChange={changeInput}
                  name="passwordConfirmation"
                  type="password"
                  className="border-b border-gray-300 focus:outline-none focus:border-green"
                  required
                  minLength={8}
                />
              </div>
              <div className="pt-24 text-center">
                <button className="bg-green h-12 w-24 rounded-lg text-white">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
