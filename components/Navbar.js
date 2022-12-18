import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";
import logoImg from "../public/assets/Logo.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [credits, setCredits] = useState(0);
  let uppercaseName = name.charAt(0).toUpperCase() + name.slice(1);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
      setName(localStorage.getItem("name"));
      setCredits(localStorage.getItem("credits"));
    }
  }, []);

  const toggleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("credits");
    localStorage.removeItem("name");
    setLoggedIn(false);
    router.reload();
  };

  return (
    <div className="fixed w-full h-20 shadow-xl z-[100] bg-white">
      <div className="flex justify-between items-center w-full h-full px-8 2xl:px-16 ">
        <Link href="/">
          <Image src={logoImg} alt="/" width={100} height={100} priority />
        </Link>
        <div>
          {!loggedIn ? (
            <ul className="hidden md:flex items-center gap-8 ">
              <Link href="/">
                <li className=" text-sm uppercase hover:border-b border-red ">Home</li>
              </Link>
              <Link href="/auction">
                <li className=" text-sm uppercase hover:border-b border-red">Auctions</li>
              </Link>
              <Link href="/profile">
                <li className=" text-sm uppercase hover:border-b border-red">Profile</li>
              </Link>
              <Link href="/auth/login">
                <li className=" text-sm uppercase hover:border-b border-red">Log in</li>
              </Link>
              <Link href="/auth/register">
                <li className=" text-sm uppercase hover:border-b border-red">register</li>
              </Link>
            </ul>
          ) : (
            <ul className="hidden md:flex items-center gap-8">
              <Link href="/">
                <li className=" text-sm uppercase hover:border-b border-red ">Home</li>
              </Link>
              <Link href="/auction">
                <li className=" text-sm uppercase hover:border-b border-red">Auctions</li>
              </Link>
              <Link href="/listing">
                <li className=" text-sm uppercase hover:border-b border-red">Post A Listing</li>
              </Link>
              <Link href="/profile">
                <li className=" text-sm uppercase hover:border-b border-red">Profile</li>
              </Link>
              <Link href="/auth/login">
                <li onClick={handleLogout} className=" text-sm uppercase hover:border-b border-red">
                  Logout
                </li>
              </Link>
            </ul>
          )}

          <div onClick={toggleNav} className="md:hidden">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>
      <div className={nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70 z-20" : ""}>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[100%] sm:w-[70%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-125%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Link href="/">
                <Image src={logoImg} alt="/" width={150} height={150} />
              </Link>
              <div onClick={toggleNav} className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer">
                <AiOutlineClose size={25} />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4">
              <p className="w-[85%] md:w-[90%] py-4">The #1 place to buy your dreams!</p>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            {!loggedIn ? (
              <ul>
                <Link href="/">
                  <li onClick={toggleNav} className="py-4 text-base">
                    Home
                  </li>
                </Link>
                <Link href="/auction">
                  <li onClick={toggleNav} className="py-4 text-base">
                    Auctions
                  </li>
                </Link>
                <Link href="/profile">
                  <li onClick={toggleNav} className="py-4 text-base">
                    Profile
                  </li>
                </Link>
                <Link href="/auth/login">
                  <li onClick={toggleNav} className="py-4 text-base">
                    Log in
                  </li>
                </Link>
                <Link href="/auth/register">
                  <li onClick={toggleNav} className="py-4 text-base">
                    Register
                  </li>
                </Link>
              </ul>
            ) : (
              <ul>
                <Link href="/">
                  <li onClick={toggleNav} className="py-4 text-base ">
                    Home
                  </li>
                </Link>
                <Link href="/auction">
                  <li onClick={toggleNav} className="py-4 text-base">
                    Auctions
                  </li>
                </Link>
                <Link href="/listing">
                  <li onClick={toggleNav} className="py-4 text-base">
                    Post A Listing
                  </li>
                </Link>
                <Link href="/profile">
                  <li onClick={toggleNav} className="py-4 text-base">
                    Profile
                  </li>
                </Link>
                <Link href="/auth/login">
                  <li onClick={handleLogout} className="py-4 text-base">
                    Logout
                  </li>
                </Link>
              </ul>
            )}

            <div className="pt-10">
              {loggedIn ? (
                <div>
                  <div>
                    <p className="uppercase tracking-widest text-red ">Logged in as</p>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-2 mt-4">
                      <p className="text-lg">Name: </p>
                      <p className="text-lg font-bold">{uppercaseName}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-lg">Credits: </p>
                      <p className="text-lg font-bold">{credits}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
