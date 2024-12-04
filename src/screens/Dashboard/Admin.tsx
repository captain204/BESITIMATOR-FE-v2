"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaBan,
  FaBlog,
  FaChevronDown,
  FaCog,
  FaDatabase,
  FaEdit,
  FaListAlt,
  FaPlus,
  FaQuestion,
  FaRegCreditCard,
  FaRegNewspaper,
  FaUser,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import {
  MdCategory,
  MdDashboard,
  MdEvent,
  MdEventNote,
  MdKeyboardOptionKey,
} from "react-icons/md";
import { GrAnnounce, GrUserAdmin } from "react-icons/gr";
import {
  FaCalculator,
  FaList,
  FaListCheck,
  FaNoteSticky,
  FaPeopleRoof,
  FaUsersRectangle,
} from "react-icons/fa6";
import { BiNoEntry, BiSolidTrafficCone } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import { GoIssueTrackedBy, GoTasklist } from "react-icons/go";
import {
  IoIosConstruct,
  IoIosNotifications,
  IoIosNotificationsOff,
  IoIosPricetags,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { TbHeartRateMonitor } from "react-icons/tb";
import { IoNewspaper, IoOptions } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import axiosInstance from "@/Globals/Interceptor";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { LuListMusic } from "react-icons/lu";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/Globals/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { Badge } from "@material-tailwind/react";
import { PiMapPinSimpleLineFill } from "react-icons/pi";

type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

const Admin = ({ children }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const response = useSelector((state: RootState) => state.getUser.response);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isSubListOpen, setIsSubListOpen] = useState(false);

  const [IsRequestOpen, setRequestOpen] = useState(false);
  const [isManageBlogOpen, setIsManageBlogOpen] = useState(false);
  const [isManageListOpen, setIsManageListOpen] = useState(false);
  const [isManageEstimateOpen, setManageEstimateOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);
  // const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    {
      dispatch(getUser());
    }
  }, [dispatch]);

  // const toggleDropdown = (dropdown: string) => {
  //   setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  // };

  // const navigateTo = (path: string) => {
  //   setActiveDropdown(null);
  //   router.push(path);
  // };

  const [counts, setCounts] = useState({
    allUsers: 0,
    verifiedUsers: 0,
    bannedUsers: 0,
    unverifiedUsers: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [allUsers, verifiedUsers, bannedUsers, unverifiedUsers] =
          await Promise.all([
            axiosInstance.get("/api/admin/users/count"),
            axiosInstance.get("/api/admin/verified-users/count"),
            axiosInstance.get("/api/admin/banned-users/count"),
            axiosInstance.get("/api/admin/unverified-users/count"),
          ]);

        setCounts({
          allUsers: allUsers.data.total_users,
          verifiedUsers: verifiedUsers.data.total_verified_users,
          bannedUsers: bannedUsers.data.total_banned_users,
          unverifiedUsers: unverifiedUsers.data.total_unverified_users,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  React.useEffect(() => {
    if (
      pathname?.startsWith("/admin/allposts") ||
      pathname?.startsWith("/admin/addblog")
    ) {
      setIsManageBlogOpen(true);
    } else {
      setIsManageBlogOpen(false);
    }
  }, [pathname]);

  React.useEffect(() => {
    if (
      pathname?.startsWith("/admin/users/all") ||
      pathname?.startsWith("/admin/users/verified-users") ||
      pathname?.startsWith("/admin/users/unverified-users") ||
      pathname?.startsWith("/admin/users/banned-users")
    ) {
      setUserOpen(true);
    } else {
      setUserOpen(false);
    }
  }, [pathname]);

  React.useEffect(() => {
    if (
      pathname?.startsWith("/admin/estimate-builder/category") ||
      pathname?.startsWith("/admin/estimate-builder/option") ||
      pathname?.startsWith("/admin/estimate-builder/suboption") ||
      pathname?.startsWith("/admin/estimate-builder/option")
    ) {
      setManageEstimateOpen(true);
    } else {
      setManageEstimateOpen(false);
    }
  }, [pathname]);

  React.useEffect(() => {
    if (
      pathname?.startsWith("/admin/price-list/labour-price-list") ||
      pathname?.startsWith("/admin/estimate-builder/option") ||
      pathname?.startsWith("/admin/estimate-builder/suboption") ||
      pathname?.startsWith("/admin/estimate-builder/option")
    ) {
      setIsManageListOpen(true);
    } else {
      setIsManageListOpen(false);
    }
  }, [pathname]);

  React.useEffect(() => {
    if (
      pathname?.startsWith("/admin/subscribers/all-subscribers") ||
      pathname?.startsWith("/admin/subscribers/unsubscribers") ||
      pathname?.startsWith("/admin/subscribers/news-letter")
    ) {
      setIsSubListOpen(true);
    } else {
      setIsSubListOpen(false);
    }
  }, [pathname]);

  return (
    <div>
      <nav className="fixed shadow-sm      top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3  lg:pl-3  mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500  sm:hidden hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <Link href="/" className=" md:block hidden">
                <img
                  src="/logo.png"
                  className="h-10 me-3"
                  alt="buildingextimateBite Logo"
                />
              </Link>
            </div>
            <div>
              <div>
                <div>
                  <div className="flex text-sm justify-space items-center  rounded-full focus:ring-4">
                    <div className="mr-3">
                      <Badge
                        placement="top-start"
                        content="5"
                        className="flex justify-center items-center"
                      >
                        <IoMdNotificationsOutline size={24} color="black" />
                      </Badge>
                    </div>
                    <span className="text-black font-bold">
                      {response?.name}
                    </span>
                    {/* <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 shadow-md transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin/dashboard"
                className={`flex items-center p-3 text-gray-900     dark:text-white 
                  
                   ${
                     pathname?.startsWith("/admin/dashboard")
                       ? "bg-black text-white"
                       : ""
                   }
                  
                  `}
              >
                <MdDashboard className="w-5 h-5 text-yellow-700" />
                <span className="ms-3 font-normal">Dashboard</span>
              </Link>
            </li>

            <li>
              <button
                onClick={() => setManageEstimateOpen(!isManageEstimateOpen)}
                className="flex items-center justify-start w-full p-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IoIosConstruct className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">
                  Estimate Builder
                </span>
                <FaChevronDown
                  className={`w-4 h-4 ms-auto transition-transform ${
                    isManageEstimateOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isManageEstimateOpen && (
                <ul className="pl-10 space-y-1">
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/estimate-builder/questions"
                      className={`flex items-center justify-start p-2 font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith(
                          "/admin/estimate-builder/questions"
                        )
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <BsFillQuestionSquareFill className="w-4 h-4 me-2 text-green-800" />
                      Questions
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/estimate-builder/category"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/estimate-builder/category")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <MdCategory className="w-4 h-4 me-2 text-" />
                      Category
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/estimate-builder/option"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/estimate-builder/option")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <IoOptions className="w-4 h-4 me-2 text-yellow-900" />
                      Option
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/estimate-builder/suboption"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith(
                          "/admin/estimate-builder/suboption"
                        )
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <MdKeyboardOptionKey className="w-4 h-4 me-2 text-purple-800" />
                      Sub Option
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button
                onClick={() => setIsManageListOpen(!isManageListOpen)}
                className="flex items-center justify-start w-full p-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IoIosPricetags className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">
                  Price Lists
                </span>
                <FaChevronDown
                  className={`w-4 h-4 ms-auto transition-transform ${
                    isManageListOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isManageListOpen && (
                <ul className="pl-10 space-y-1">
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/price-list/material-price-list"
                      className={`flex items-center justify-start p-2 font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith(
                          "/admin/price-list/material-price-list"
                        )
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <GoTasklist className="w-4 h-4 me-2 bg-green-900" />
                      Material Price List
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/price-list/labour-price-List"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith(
                          "/admin/price-list/labour-price-List"
                        )
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <LuListMusic className="w-4 h-4 me-2 text-yellow-900" />
                      Labour Price List
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/admin/manage-plan"
                className={`flex items-center p-3 text-gray-900 dark:text-white 
                  
                   ${
                     pathname?.startsWith("/admin/manage-plan")
                       ? "bg-black text-white"
                       : ""
                   }
                  
                  `}
              >
                <PiMapPinSimpleLineFill className="w-5 h-5 text-yellow-700" />
                <span className="ms-3 font-normal">Manage Plan</span>
              </Link>
            </li>

            <li>
              <Link
                href="/admin/event"
                className={`flex items-center p-3 text-gray-900     dark:text-white 
                  
                   ${
                     pathname?.startsWith("/admin/event")
                       ? "bg-black text-white"
                       : ""
                   }
                  
                  `}
              >
                <MdEvent className="w-5 h-5 text-yellow-700" />
                <span className="ms-3 font-normal"> Event</span>
              </Link>
            </li>

            <li>
              <button
                onClick={() => setUserOpen(!isUserOpen)}
                className="flex items-center justify-start w-full p-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaUsersRectangle className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">Users</span>
                <FaChevronDown
                  className={`w-4 h-4 ms-auto transition-transform ${
                    isUserOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isUserOpen && (
                <ul className="pl-9 space-y-1">
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/users/all"
                      className={`flex items-center justify-between p-2  font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/users/all")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center">
                        <FaListAlt className="w-3 h-3 me-2" />
                        All
                      </div>
                      <span className="text-sm font-bold text-yellow-900">
                        {counts.allUsers}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/users/verified-users"
                      className={`flex items-center justify-between p-2  font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/users/verified-users")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center ">
                        <MdOutlineVerified className="w-4 h-4 me-2 text-green-800" />
                        Verified Users
                      </div>
                      <span className="text-sm font-bold text-yellow-900 ">
                        {counts.verifiedUsers}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/users/unverified-users"
                      className={`flex items-center justify-between p-2 font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/users/unverified-users")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center ">
                        <VscUnverified className="w-4 h-4 me-2 text-red-900" />
                        Unverified Users
                      </div>
                      <span className="text-sm text-yellow-900 font-bold">
                        {counts.unverifiedUsers}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/users/banned-users"
                      className={`flex items-center justify-between p-2 font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/users/banned-users")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center">
                        <FaBan className="w-3 h-3 me-2 text-red-800" />
                        Banned Users
                      </div>
                      <span className="text-sm text-yellow-900 font-bold">
                        {counts.bannedUsers}
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button
                onClick={() => setIsManageBlogOpen(!isManageBlogOpen)}
                className="flex items-center justify-start w-full p-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaBlog className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">
                  Manage Blog
                </span>
                <FaChevronDown
                  className={`w-4 h-4 ms-auto transition-transform ${
                    isManageBlogOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isManageBlogOpen && (
                <ul className="pl-10 space-y-1">
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/allposts"
                      className={`flex items-center justify-start p-2 font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/allposts")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <FaListAlt className="w-4 h-4 me-2" />
                      All Posts
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/addblog"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/addblog")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <FaPlus className="w-4 h-4 me-2" />
                      Add Post
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button
                onClick={() => setIsSubListOpen(!isSubListOpen)}
                className="flex items-center justify-start w-full p-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaPeopleRoof className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">
                  Subscriber
                </span>
                <FaChevronDown
                  className={`w-4 h-4 ms-auto transition-transform ${
                    isSubListOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isSubListOpen && (
                <ul className="pl-10 space-y-1">
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/subscribers/all-subscribers"
                      className={`flex items-center justify-start p-2 font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith(
                          "/admin/subscribers/all-subscribers"
                        )
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <FaListCheck className="w-4 h-4 me-2" />
                      All
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="#"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("#")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <IoIosNotifications className="w-5 h-5 me-2 text-green-900" />
                      Subscribe
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="#"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("#")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <IoIosNotificationsOff className="w-5 h-5 me-2 text-red-900" />
                      Unubscribe
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/subscribers/news-letter"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/subscribers/news-letter")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <IoNewspaper className="w-4 h-4 me-2" />
                      Send Newletter
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* <li>
              <button
                onClick={() => setIsSubListOpen(!isSubListOpen)}
                className="flex items-center justify-start w-full p-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaList className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">
                  Subscribers
                </span>
                <FaChevronDown
                  className={`w-4 h-4 ms-auto transition-transform ${
                    isSubListOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isSubListOpen && (
                <ul className="pl-10 space-y-1">
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/subscribers/all-subscribers"
                      className={`flex items-center justify-start p-2 font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith(
                          "/admin/subscribers/all-subscribers"
                        )
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <GoTasklist className="w-4 h-4 me-2 bg-green-900" />
                      Subscribers
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/subscribers/unsubscribers"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/subscribers/unsubscribers")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <LuListMusic className="w-4 h-4 me-2 text-yellow-900" />
                      UnSubscribers
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/newsletter"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/subscribers/newsletter")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <FaRegNewspaper className="w-4 h-4 me-2 text-yellow-900" />
                      News Letter
                    </Link>
                  </li>
                </ul>
              )}
            </li> */}

            {/* <li>
              <button
                onClick={() => setRequestOpen(!IsRequestOpen)}
                className="flex items-center justify-start w-full p-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaList className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">
                  Call Request
                </span>
                <FaChevronDown
                  className={`w-4 h-4 ms-auto transition-transform ${
                    IsRequestOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {IsRequestOpen && (
                <ul className="pl-10 space-y-1">
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/response"
                      className={`flex items-center justify-start p-2 font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/response")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <GoTasklist className="w-4 h-4 me-2 bg-green-900" />
                      Response
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/unresponse"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/unresponse")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <LuListMusic className="w-4 h-4 me-2 text-yellow-900" />
                      No Resonse
                    </Link>
                  </li>
                </ul>
              )}
            </li> */}

            <li>
              <button
                onClick={() => setRequestOpen(!IsRequestOpen)}
                className="flex items-center justify-start w-full p-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaQuestion className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">
                  Call Request
                </span>
                <FaChevronDown
                  className={`w-4 h-4 ms-auto transition-transform ${
                    IsRequestOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {IsRequestOpen && (
                <ul className="pl-10 space-y-1">
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/call-request/response"
                      className={`flex items-center justify-start p-2 font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/call-request/response")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <GiCheckMark className="w-4 h-4 me-2 text-green-500" />
                      Response
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/call-request/unresponse"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/call-request/unresponse")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <FaQuestion className="w-4 h-4 me-2 text-red-900" />
                      No Response
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button
                onClick={() => setIsManageBlogOpen(!isManageBlogOpen)}
                className="flex items-center justify-start w-full p-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IoIosConstruct className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">
                  Constructor
                </span>
                <FaChevronDown
                  className={`w-4 h-4 ms-auto transition-transform ${
                    isManageBlogOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isManageBlogOpen && (
                <ul className="pl-10 space-y-1">
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/allposts"
                      className={`flex items-center justify-start p-2 font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/allposts")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <BiNoEntry className="w-4 h-4 me-2" />
                      Tradesman
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/addblog"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/addblog")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <BiNoEntry className="w-4 h-4 me-2" />
                      Vendor
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <GoIssueTrackedBy className="w-5 h-5 text-yellow-700" />
                <span className="ms-3 font-normal">Cost tracker</span>
              </a>
            </li>

            {/* <li>
              <button
                onClick={() => setEventOpen(!isEventOpen)}
                className="flex items-center justify-start w-full p-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MdEventNote className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">Event</span>
                <FaChevronDown
                  className={`w-4 h-4 ms-auto transition-transform ${
                    isEventOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isEventOpen && (
                <ul className="pl-10 space-y-1">
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/event/create-event"
                      className={`flex items-center justify-start p-2 font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/allposts")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <BiNoEntry className="w-4 h-4 me-2 text-green-500" />
                      Create New Event
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/addblog"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/addblog")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <BiNoEntry className="w-4 h-4 me-2 text-red-900" />
                      All Event
                    </Link>
                  </li>
                </ul>
              )}
            </li> */}

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaRegCreditCard className="w-5 h-5 text-yellow-700" />
                <span className="ms-3">Payment</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaEdit className="w-5 h-5 text-yellow-700" />
                <span className="ms-3">CMS</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <GrUserAdmin className="w-5 h-5 text-yellow-700" />
                <span className="ms-3">Administrator</span>
              </a>
            </li>

            <li>
              <button
                onClick={() => setIsAddOpen(!isAddOpen)}
                className="flex items-center w-full p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <GrAnnounce className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left ">Advertisement</span>
                <FaChevronDown
                  className={`transition-transform ${
                    isAddOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isAddOpen && (
                <ul className="pl-10 space-y-1">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-sm text-gray-700  dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Add Ad
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-sm text-gray-700  dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Delete Ad
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/admin/traffic"
                className={`flex items-center p-2    hover:bg-gray-100 dark:hover:bg-gray-700    
                  
                   ${
                     pathname?.startsWith("/admin/traffic")
                       ? "bg-black text-white"
                       : " hover:bg-gray-100 text-gray-900"
                   }
                  
                  `}
              >
                <BiSolidTrafficCone className="w-5 h-5 text-yellow-700" />
                <span className="ms-3 ">Total Traffic</span>
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaUser className="w-5 h-5 text-yellow-700" />
                <span className="ms-3 ">Profile</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaDatabase className="w-5 h-5 text-yellow-700" />
                <span className="ms-3 ">Database Backup</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaCog className="w-5 h-5 text-yellow-700" />
                <span className="ms-3 ">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64"> {children}</div>
    </div>
  );
};

export default Admin;

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { FaQuestionCircle } from "react-icons/fa";
// import axiosInstance from "../path/to/axiosInstance";

// const AdminSidebar = ({ pathname }: { pathname: string }) => {
//   const [counts, setCounts] = useState({
//     allUsers: 0,
//     verifiedUsers: 0,
//     bannedUsers: 0,
//     unverifiedUsers: 0,
//   });

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const [allUsers, verifiedUsers, bannedUsers, unverifiedUsers] =
//           await Promise.all([
//             axiosInstance.get("/api/admin/users/count"),
//             axiosInstance.get("/api/admin/verified-users/count"),
//             axiosInstance.get("/api/admin/banned-users/count"),
//             axiosInstance.get("/api/admin/unverified-users/count"),
//           ]);

//         setCounts({
//           allUsers: allUsers.data.total_users,
//           verifiedUsers: verifiedUsers.data.total_verified_users,
//           bannedUsers: bannedUsers.data.total_banned_users,
//           unverifiedUsers: unverifiedUsers.data.total_unverified_users,
//         });
//       } catch (error) {
//         console.error("Error fetching counts:", error);
//       }
//     };

//     fetchCounts();
//   }, []);

//   return (
//     <ul className="space-y-4">
//       <li>
//         <Link
//           href="/admin/questions"
//           className={`flex items-center justify-between p-3 text-gray-900 dark:text-white ${
//             pathname?.startsWith("/admin/questions")
//               ? "bg-black text-white"
//               : ""
//           }`}
//         >
//           <div className="flex items-center">
//             <FaQuestionCircle className="w-5 h-5 text-yellow-700" />
//             <span className="ms-3 font-normal">Questions</span>
//           </div>
//           <span className="text-sm font-medium text-gray-500">
//             {counts.allUsers}
//           </span>
//         </Link>
//       </li>
//       <li>
//         <div className="flex justify-between items-center p-3">
//           <span>Verified Users</span>
//           <span className="text-sm font-medium text-gray-500">
//             {counts.verifiedUsers}
//           </span>
//         </div>
//       </li>
//       <li>
//         <div className="flex justify-between items-center p-3">
//           <span>Unverified Users</span>
//           <span className="text-sm font-medium text-gray-500">
//             {counts.unverifiedUsers}
//           </span>
//         </div>
//       </li>
//       <li>
//         <div className="flex justify-between items-center p-3">
//           <span>Banned Users</span>
//           <span className="text-sm font-medium text-gray-500">
//             {counts.bannedUsers}
//           </span>
//         </div>
//       </li>
//     </ul>
//   );
// };

// export default AdminSidebar;
