/** @format */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/Globals/store/store";

type NavItem = {
  label: string;
  link?: string;
};

const navItems: NavItem[] = [
  { label: "Automated Building Estimator", link: "/" },
  {
    label: "Custom Building Estimator and Building Budget Calculator",
    link: "#",
  },
  { label: "Construction Inventory/ Cost Tracker", link: "#" },
  { label: "Applicable Material and Labour Pricelist/Rates", link: "#" },
  { label: "Construction events and workshops", link: "#" },
  { label: "Blog", link: "#" },
];
type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;
export default function MobileNavbar() {
  // const [animationParent] = useAutoAnimate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  // const dispatch: AppDispatch = useDispatch();
  // const response = useSelector((state: RootState) => state.getUser.response);

  function openDrawer() {
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }
  // useEffect(() => {
  //   dispatch(getUser());
  // }, []);

  return (
    <>
      <div className="flex justify-between items-center bg-primary text-white px-4 py-2">
        <Link href="/">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>
        <FiMenu onClick={openDrawer} className="cursor-pointer text-3xl" />
      </div>

      {isDrawerOpen && <Drawer closeDrawer={closeDrawer} />}
    </>
  );
}

function Drawer({ closeDrawer }: { closeDrawer: () => void }) {
  const dispatch: AppDispatch = useDispatch();
  const response = useSelector((state: RootState) => state.getUser.response);
  const success = useSelector((state: RootState) => state.logout.success);

  const isLoggedIn = response && Object.keys(response).length;

  useEffect(() => {
    if (success) {
      dispatch(getUser());
    }
  }, [success, dispatch]);

  return (
    <div className="fixed inset-0 z-50 flex h-full w-auto bg-black/70">
      <div className="h-full w-3/4 bg-primary p-4 absolute right-0">
        <section className="flex justify-end items-center">
          <AiOutlineClose
            onClick={closeDrawer}
            className="cursor-pointer text-3xl text-white"
          />
        </section>

        {/* Search bar */}
        <div className="my-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 rounded-lg bg-blue-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col text-base mt-4 gap-3">
          {navItems.map((item, index) => (
            <Link key={index} href={item.link ?? "#"} onClick={closeDrawer}>
              <div className="px-2 py-3 transition-all hover:bg-white hover:bg-opacity-10 rounded-lg">
                <span className="text-neutral-400 group-hover:text-white">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Signup Button */}
        <div className="mt-8">
          {/* <Link href={isLoggedIn ? "/logout" : "/signup"}> */}
          <Link href="/signup">
            <button className="w-full py-3 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              {/* {isLoggedIn ? "Logout" : "Sign Up"} */}
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

