"use client";
import Link from "next/link";
import React, { useState } from "react";
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
  FaQuestionCircle,
  FaRegCreditCard,
  FaUser,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { MdCategory, MdDashboard, MdEventNote } from "react-icons/md";
import { GrAnnounce, GrUserAdmin } from "react-icons/gr";
import { FaCalculator, FaList, FaListCheck, FaNoteSticky, FaUsersRectangle } from "react-icons/fa6";
import { BiNoEntry, BiSolidTrafficCone } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import { HiOutlineMailOpen } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneSlash } from "react-icons/fa6"
import { FaPhone } from "react-icons/fa6";
import { GoIssueTrackedBy } from "react-icons/go";
import { IoIosConstruct, IoIosNotifications, IoIosNotificationsOff } from "react-icons/io";
import { TbHeartRateMonitor } from "react-icons/tb";
import { IoNewspaper } from "react-icons/io5";

const Admin = ({ children }: any) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isManageBlogOpen, setIsManageBlogOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const navigateTo = (path: string) => {
    setActiveDropdown(null);
    router.push(path);
  };

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
      pathname?.startsWith("/admin/users/all")
    ) {
      setUserOpen(true);
    } else {
      setUserOpen(false);
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
                className="inline-flex items-center p-2 text-sm text-gray-500  sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
              <a href="/" className="flex ms-2 md:me-24">
                <img
                  src="/logo.png"
                  className="h-10 me-3"
                  alt="FlowBite Logo"
                />
              </a>
            </div>
            <div>
              <div>
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full "
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
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
              <Link
                href="/admin/categories"
                className={`flex items-center p-3 text-gray-900     dark:text-white 
                  
                   ${
                     pathname?.startsWith("/admin/categories")
                       ? "bg-black text-white"
                       : ""
                   }
                  
                  `}
              >
                <MdCategory className="w-5 h-5 text-yellow-700" />
                <span className="ms-3 font-normal">Categories</span>
              </Link>
            </li>


            <li>
              <Link
                href="/admin/questions"
                className={`flex items-center p-3 text-gray-900     dark:text-white 
                  
                   ${
                     pathname?.startsWith("/admin/questions")
                       ? "bg-black text-white"
                       : ""
                   }
                  
                  `}
              >
                <FaQuestionCircle className="w-5 h-5 text-yellow-700" />
                <span className="ms-3 font-normal">Questions</span>
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
                <ul className="pl-10 space-y-1">
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/admin/users/all"
                      className={`flex items-center justify-start p-2 font-normal mt-1 text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/admin/users/all")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <FaListAlt className="w-4 h-4 me-2" />
                      All
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/#"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("#")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <GiCheckMark className="w-5 h-5  me-2 text-green-700" />
                      Active
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/#"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/#")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <FaBan className="w-4 h-4 me-2 text-red-800" />
                      Ban
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/#"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/#")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <HiOutlineMailOpen className="w-4 h-4 me-2 text-green-800" />
                      Email-Verify
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/#"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/#")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <HiOutlineMail  className="w-4 h-4 me-2 text-red-900" />
                      Email-UnVerify
                    </Link>
                  </li>




                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/#"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/#")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <FaPhone  className="w-4 h-4 me-2 text-green-900" />
                      Phone-verify
                    </Link>
                  </li>



                  <li>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href="/#"
                      className={`flex items-center justify-start p-2 font-normal text-gray-700 dark:text-gray-400 ${
                        pathname?.startsWith("/#")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <FaPhoneSlash  className="w-4 h-4 me-2 text-red-900" />
                      Phone-UnVerify
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










            <li>
              <button
                onClick={() => setIsManageBlogOpen(!isManageBlogOpen)}
                className="flex items-center justify-start w-full p-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaList className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">
                  Price List
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
                      <FaListCheck className="w-4 h-4 me-2" />
                      Material Price List
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
                      <TbHeartRateMonitor className="w-4 h-4 me-2" />
                      Labour rates
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
                <FaList className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">
                  Subscriber
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
                      <FaListCheck className="w-4 h-4 me-2" />
                      All
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
                      <IoIosNotifications className="w-5 h-5 me-2 text-green-900" />
                      Subscribe
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
                      <IoIosNotificationsOff className="w-5 h-5 me-2 text-red-900" />
                      Unubscribe
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
                      <IoNewspaper className="w-4 h-4 me-2" />
                    Send Newletter
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
                <FaQuestion className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">
                  Call Request
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
                      <GiCheckMark className="w-4 h-4 me-2 text-green-500" />
                      Response
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
                <MdEventNote className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left font-normal">
                  Event
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
            </li>









            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaNoteSticky className="w-5 h-5 text-yellow-700" />
                <span className="ms-3">Manage Plan</span>
              </a>
            </li>





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
                <GrUserAdmin  className="w-5 h-5 text-yellow-700" />
                <span className="ms-3">Administrator</span>
              </a>
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
                onClick={() => setIsAddOpen(!isAddOpen)}
                className="flex items-center w-full p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <GrAnnounce className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left ">
                  Advertisement
                </span>
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
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center w-full p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaCalculator className="w-5 h-5 text-yellow-700" />
                <span className="flex-1 ms-3 text-left ">
                  Estimates
                </span>
                <FaChevronDown
                  className={`transition-transform ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isCategoryOpen && (
                <ul className="pl-10 space-y-1">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-sm text-gray-700  dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Categories
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-sm text-gray-700  dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Category Options
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

      <div className="p-4 sm:ml-64">{children}</div>
    </div>
  );
};

export default Admin;
