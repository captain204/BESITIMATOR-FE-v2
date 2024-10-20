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
  const [animationParent] = useAutoAnimate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const response = useSelector((state: RootState) => state.getUser.response);

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

// /** @format */
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { IoIosArrowDown } from "react-icons/io";
// import { FiMenu } from "react-icons/fi";
// import { AiOutlineClose } from "react-icons/ai";
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
// import { useAutoAnimate } from "@formkit/auto-animate/react";
// import {
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
// } from "@material-tailwind/react";

// type NavItem = {
//   label: string;
//   link?: string;
//   children?: NavItem[];
//   icon?: React.ElementType;
// };

// const navItems: NavItem[] = [
//   { label: "Automated Building Extimator", link: "/" },
//   {
//     label: "Custom Building Estimator and Building Budget Calculator",
//     link: "#",
//   },
//   { label: "Construction Inventory/ Cost Tracker", link: "#" },
//   {
//     label: "Applicable Material and Labour Pricelist/Rates",
//     link: "/institution",
//   },
//   { label: "Construction events and workshops", link: "#" },
//   { label: "Trades men and Construction Vendors log", link: "#" },
//   { label: "Blog", link: "#" },
// ];

// export default function MobileNavbile() {
//   const [animationParent] = useAutoAnimate();
//   const [isSideMenuOpen, setSideMenue] = useState(false);

//   // Dropdown states
//   const [isCurrencyOpen, setCurrencyOpen] = useState(false);
//   const [isLanguageOpen, setLanguageOpen] = useState<any>(false);

//   // Default selections
//   const [selectedCurrency, setSelectedCurrency] = useState("USD");
//   const [selectedLanguage, setSelectedLanguage] = useState("English");

//   const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"];
//   const languages = ["English", "Spanish", "French"];

//   function openSideMenu() {
//     setSideMenue(true);
//   }

//   function closeSideMenu() {
//     setSideMenue(false);
//   }

//   function isActive(link: string | undefined) {
//     return typeof window !== "undefined" && window.location.pathname === link;
//   }

//   const [isMounted, setIsMounted] = useState(false);

//   // Use useEffect to set isMounted to true after the component mounts
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   return (
//     <>
//       <div className="mx-auto flex w-full justify-between px-4 py-2 text-sm bg-primary">
//         <section ref={animationParent} className="flex items-center gap-10">
//           <div className=" lg:hidden md:hidden block">
//             <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
//           </div>
//           {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}
//           <div className="hidden md:flex items-center gap-4 transition-all">
//             {navItems.map((d, i) => (
//               <Link
//                 key={i}
//                 href={d.link ?? "#"}
//                 className={`relative group px-2 py-3 transition-all ${
//                   isMounted && isActive(d.link)
//                     ? "border-b-2 border-green-500"
//                     : ""
//                 }`}
//               >
//                 <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-primary">
//                   <span>{d.label}</span>
//                   {d.children && (
//                     <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" />
//                   )}
//                 </p>
//                 {d.children && (
//                   <div className="absolute right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 shadow-md transition-all group-hover:flex">
//                     {d.children.map((ch, i) => (
//                       <Link
//                         key={i}
//                         href={ch.link ?? "#"}
//                         className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-white hover:text-black"
//                       >
//                         {ch.icon && <ch.icon className="text-xl" />}
//                         <span className="whitespace-nowrap pl-3">
//                           {ch.label}
//                         </span>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </Link>
//             ))}
//           </div>
//         </section>

//         <section className="hidden md:flex items-center gap-8">
//           <Menu
//             allowHover={true}
//             open={isCurrencyOpen}
//             handler={setCurrencyOpen}
//           >
//             <MenuHandler>
//               <div className="flex items-center gap-2 font-medium cursor-pointer">
//                 {selectedCurrency}
//                 {isCurrencyOpen ? (
//                   <ChevronUpIcon className="w-4 h-4" />
//                 ) : (
//                   <ChevronDownIcon className="w-4 h-4" />
//                 )}
//               </div>
//             </MenuHandler>
//             <MenuList>
//               {currencies.map((currency) => (
//                 <MenuItem
//                   key={currency}
//                   onClick={() => setSelectedCurrency(currency)}
//                 >
//                   {currency}
//                 </MenuItem>
//               ))}
//             </MenuList>
//           </Menu>

//           <Menu
//             allowHover={true}
//             open={isLanguageOpen}
//             handler={setLanguageOpen}
//           >
//             <MenuHandler>
//               <div className="flex items-center gap-2 font-medium cursor-pointer">
//                 {selectedLanguage}
//                 {isLanguageOpen ? (
//                   <ChevronUpIcon className="w-4 h-4" />
//                 ) : (
//                   <ChevronDownIcon className="w-4 h-4" />
//                 )}
//               </div>
//             </MenuHandler>
//             <MenuList>
//               {languages.map((language) => (
//                 <MenuItem
//                   key={language}
//                   onClick={() => setSelectedLanguage(language)}
//                 >
//                   {language}
//                 </MenuItem>
//               ))}
//             </MenuList>
//           </Menu>
//         </section>

//         <FiMenu
//           onClick={openSideMenu}
//           className="cursor-pointer text-3xl md:hidden text-white  "
//         />
//       </div>
//     </>
//   );
// }

// function MobileNav({ closeSideMenu }: { closeSideMenu: () => void }) {
//   // const [animationParent] = useAutoAnimate();
//   // const [isSideMenuOpen, setSideMenue] = useState(false);

//   return (
//     <div className="fixed inset-0 z-50 left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 lg:hidden  overflow-hidden">
//       <div className="h-full w-[65%] bg-primary px-4 py-4">
//         <section className="flex justify-end">
//           <AiOutlineClose
//             onClick={closeSideMenu}
//             className="cursor-pointer text-3xl mr-1"
//           />
//         </section>
//         <div className="flex flex-col text-base gap-2 transition-all">
//           {navItems.map((d, i) => (
//             <Link key={i} href={d.link ?? "#"} onClick={closeSideMenu}>
//               <div className="relative px-2 py-3 transition-all">
//                 <span className="text-neutral-400 group-hover:text-black">
//                   {d.label}
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
