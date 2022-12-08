import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navColor, setNavColor] = useState("#1f2937");
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  const toggleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("credits");
    localStorage.removeItem("name");
    setLoggedIn(false);
    router.reload();
  };

  return (
    <div className={shadow ? "fixed w-full h-20 shadow-xl z-[100] bg-white" : " w-full h-20"}>
      <div className="flex justify-between items-center w-full h-full px-8 2xl:px-16 ">
        <Link href="/">
          <Image src="/../public/assets/Logo.png" alt="/" width={100} height={100} />
        </Link>
        <div>
          <ul style={{ color: `${navColor}` }} className="hidden md:flex">
            <Link href="/">
              <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
            </Link>
            <Link href="/auction">
              <li className="ml-10 text-sm uppercase hover:border-b">Auctions</li>
            </Link>
            <Link href="/about">
              <li className="ml-10 text-sm uppercase hover:border-b">About</li>
            </Link>
            <Link href="/profile">
              <li className="ml-10 text-sm uppercase hover:border-b">Profile</li>
            </Link>
            <Link href="/#contact">
              <li className="ml-10 text-sm uppercase hover:border-b">Contact</li>
            </Link>
          </ul>
          <div onClick={toggleNav} className="md:hidden">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>
      <div className={nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""}>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[100%] sm:w-[70%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Link href="/">
                <Image src="/../public/assets/Logo.png" alt="/" width={150} height={35} />
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
            <ul>
              <Link href="/">
                <li onClick={toggleNav} className="py-4 text-sm">
                  Home
                </li>
              </Link>
              <Link href="/auction">
                <li onClick={toggleNav} className="py-4 text-sm">
                  Auctions
                </li>
              </Link>
              <Link href="/profile">
                <li onClick={toggleNav} className="py-4 text-sm">
                  Profile
                </li>
              </Link>
            </ul>
            <div className="pt-10">
              <p className="uppercase tracking-widest text-green-500 ">Logged in as</p>
              <div className="flex items-center justify-around my-4 w-full ">
                {!loggedIn ? (
                  <Link href="/auth/login">
                    <button onClick={toggleNav} className="py-4 px-8 bg-green rounded-xl text-white">
                      Log in
                    </button>
                  </Link>
                ) : (
                  <Link href="/profile">
                    <button onClick={toggleNav} className="py-4 px-8 bg-green rounded-xl text-white">
                      Profile
                    </button>
                  </Link>
                )}
                {!loggedIn ? (
                  <Link href="/auth/register">
                    <button onClick={toggleNav} className="py-4 px-8 bg-green rounded-xl text-white">
                      Sign up
                    </button>
                  </Link>
                ) : (
                  <button onClick={handleLogout} className="py-4 px-8 bg-red-500 rounded-xl text-white">
                    Log out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
