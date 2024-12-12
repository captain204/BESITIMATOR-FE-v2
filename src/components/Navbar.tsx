"use client";
import React from "react";
import {
  Navbar,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  CodeBracketSquareIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import TopNav from "./TopNav";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegWindowClose } from "react-icons/fa";
import MobileNavbile from "./MobileNavbar";
import Link from "next/link";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/Globals/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { logoutUser } from "@/Globals/Slices/AuthSlices/Logout";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${
                  isLastItem ? "text-red-500" : "text-white"
                }`, // Icons are white by default
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal text-white" // Text is white by default
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list menu (for Pages)
const navListMenuItems = [
  {
    title: "Automated Building Estimator",
  },
  {
    title: "Custom Building Estimator and Building Budget Calculator",
  },
  {
    title: "Construction Inventory/ Cost Tracker",
  },

  {
    title: "Applicable Material and Labour Pricelist/Rates",
  },

  {
    title: "Construction events and workshops",
  },

  {
    title: "Trades men and Construction Vendors log",
  },
  {
    title: "Blog",
  },
];

function NavListMenu({ label, icon }: any) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ title }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
      <MenuHandler className="">
        <Typography as="a" href="#" variant="small" className="font-normal">
          <MenuItem className="hidden items-center gap-2 font-medium text-white lg:flex lg:rounded-full hover:bg-transparent hover:text-inherit">
            {isMenuOpen ? (
              <FaRegWindowClose
                className="text-white"
                size={30}
                strokeWidth={2}
              />
            ) : (
              <GiHamburgerMenu
                size={30}
                strokeWidth={2}
                className="transition-transform text-white"
                // Chevron icon is white
              />
            )}
          </MenuItem>
        </Typography>
      </MenuHandler>
      <MenuList className="hidden   overflow-visible lg:grid mt-5 border-primary">
        <ul className="col-span-3 flex w-full flex-col">{renderItems}</ul>
      </MenuList>
    </Menu>
  );
}

// nav list component
const navListItems = [
  {
    label: "Docs",
    icon: CodeBracketSquareIcon,
  },
];

// nav list component with Signup button replacing "Pages"
// function NavList() {
//   return (
//     <ul className="mt-2 mb-4 flex flex-col md:gap-10 lg:mb-0 lg:mt-0 lg:flex-row md:items-center ">
//       <li>
//         <Link
//           style={{ border: "1px solid white" }}
//           href="/signup"
//           className="flex  justify-end  py-2  text-yellow-500 font-bold rounded-lg shadow-sm px-6   transition-colors duration-300"
//         >
//           Sign Up
//         </Link>
//       </li>
//       {/* {navListItems.map(({ label, icon }) => (
//         <NavListMenu key={label} label={label} icon={icon} />
//       ))} */}
//     </ul>
//   );
// }





function NavList() {
  // const dispatch: AppDispatch = useDispatch();
  const response = useSelector((state: RootState) => state.getUser.response);
  // const success = useSelector((state: RootState) => state.logout.success);
  // const handleLogout = () => {
  //   dispatch(logoutUser());
  // };

  // useEffect(() => {
  //   if (success) {
  //     dispatch(getUser());
  //   }
  // }, [success, dispatch]);


  // Check if the response is null, undefined, or an empty object
  // const isLoggedIn =
  //   response && Object.keys(response).length !== 0 && response.constructor === Object;

  return (
    <ul className="mt-2 mb-4 flex flex-col md:gap-10 lg:mb-0 lg:mt-0 lg:flex-row md:items-center ">
    <li>
      {/* {!isLoggedIn ? ( */}
        <Link
          style={{ border: "1px solid white" }}
          href="/signup"
          className="flex  justify-end  py-2  text-yellow-500 font-bold rounded-lg shadow-sm px-6 transition-colors duration-300"
        >
          Sign Up
        </Link>
      {/* ) : (
        <button
          onClick={handleLogout}
          style={{ border: "1px solid white" }}
          className="flex justify-end py-2 text-yellow-500 font-bold rounded-lg shadow-sm px-6 transition-colors duration-300"
        >
          Logout
        </button>
      )} */}
    </li>
  </ul>
  );
}


const ComplexNavbar = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const dispatch: AppDispatch = useDispatch();
  // const response = useSelector((state: RootState) => state.getUser.response);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  // useEffect(() => {
  //   dispatch(getUser());
  // }, []);

  return (
    <div className="">
      <div className="lg:hidden block">
        <MobileNavbile />
      </div>

      <div className="p-0 m-0 lg:max-w-screen-2xl lg:mx-[4rem]  mx-auto lg:block hidden">
        <TopNav />
        <Navbar
          style={{ backgroundColor: "#315aac", border: "#315aac" }}
          className="  p-4 rounded-none  bg-primary"
        >
          <div className="relative mx-auto flex items-center justify-between text-white">
            {" "}
            {/* Default text color to white */}
            <Link href="/">
              <div className="mr-4  cursor-pointer  font-bold ">
                <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
              </div>
            </Link>
            <div className="hidden lg:block">
              <NavList />
            </div>
            <IconButton
              size="sm"
              color="blue-gray"
              variant="text"
              onClick={toggleIsNavOpen}
              className="ml-auto mr-2 lg:hidden text-white" // White icon button
            >
              <Bars2Icon className="h-6 w-6 text-white" /> {/* White icon */}
            </IconButton>
            <ProfileMenu />
          </div>
          {/* <MobileNav open={isNavOpen} className="overflow-scroll">
      <NavList />
    </MobileNav> */}
        </Navbar>
      </div>
    </div>
  );
};

export default ComplexNavbar;
