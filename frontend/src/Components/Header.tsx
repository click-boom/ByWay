"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function HeaderTab() {
  const [headerState, setHeaderState] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeaderState(true);
    } else {
      setHeaderState(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, []);

  return (
    <header
      className={`left-0 top-0 z-40 flex w-full font-sans font-bold text-lg items-center h-24 px-10  ${
        headerState
          ? "text-white dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-green-800 !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
          : "absolute bg-transparent text-green-700"
      }`}
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Image
          width={80}
          height={60}
          src={
            headerState
              ? "/assets/logos/logodark.png"
              : "/assets/logos/logo.png"
          }
          alt="BYWAY"
        />
      </div>
      <button
        onClick={navbarToggleHandler}
        id="navbarToggler"
        aria-label="Mobile Menu"
        className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-green-600 focus:ring-2 lg:hidden"
      >
        <span
          className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
            navbarOpen ? " top-[7px] rotate-45" : " "
          }`}
        />
        <span
          className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
            navbarOpen ? "opacity-0 " : " "
          }`}
        />
        <span
          className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
            navbarOpen ? " top-[-8px] -rotate-45" : " "
          }`}
        />
      </button>
      <nav
        id="navbarCollapse"
        className={`absolute right-0 z-30 w-[250px] bg-green-700 bg-opacity-60 px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
          navbarOpen
            ? "visibility top-full opacity-100 text-white"
            : "invisible top-[120%] opacity-0"
        }`}
      >
        <ul className="block lg:ml-20 lg:mt-4 lg:gap-20 sm:ml-0 lg:flex lg:space-x-12">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/packages">Explore Packages</Link>
          </li>
          <li>
            <Link href="/blogs">Explore Blogs</Link>
          </li>
          <li>
            <Link href="/contactUs">Contact Us</Link>
          </li>
          <li>
            <Link href="/planTrip">Plan Your Trip</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderTab;
