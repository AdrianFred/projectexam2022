import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useRouter } from "next/router";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#ecf0f3");
  const [navColor, setNavColor] = useState("#1f2937");
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/property") {
      setNavBg("transparent");
      setNavColor("#ecf0f3");
    } else {
      setNavBg("#ecf0f3");
      setNavColor("#1f2937");
    }
  }, [router]);

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

  return (
    <div style={{ backgroundColor: `${navBg}` }} className={shadow ? "fixed w-full h-20 shadow-xl z-[100]" : "fixed w-full h-20 z-[100]"}>
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
              ? "fixed left-0 top-0 w-[100%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
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
              <Link href="/about">
                <li onClick={toggleNav} className="py-4 text-sm">
                  About
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
              <div className="flex items-center justify-around my-4 w-full sm:w-[80%]">
                <Link href="/login">
                  <button className="p-3 bg-green rounded-xl">Log in</button>
                </Link>
                <Link href="/register">
                  <button className="p-3 bg-green rounded-xl">Sign up</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
