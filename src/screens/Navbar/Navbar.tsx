import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  SquaresPlusIcon,
  CalculatorIcon,
  CurrencyDollarIcon,
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axiosInstance from "@/Globals/Interceptor";

const navListMenuItems = [
  {
    title: "Automated Building Estimator",
    icon: SquaresPlusIcon,
    path: "/automated-estimate",
  },
  {
    title: "Construction Inventory/Cost Tracker",
    icon: AdjustmentsHorizontalIcon,
    path: "/inventory-cost-tracker",
  },
  {
    title: "Custom Building Estimator and Building Budget Calculator",
    icon: CalculatorIcon,
    path: "/custom-estimate",
  },
  {
    title: "Construction events and workshops",
    icon: UserGroupIcon,
    path: "/construction-events-and-workshops",
  },
  {
    title: "Applicable Material and Labour Pricelist/Rates",
    icon: CurrencyDollarIcon,
    path: "/applicable-material-labour-price",
  },
  {
    title: "Trades men and Construction Vendors log",
    icon: BookOpenIcon,
    path: "/trades-men-and-construction-vendors-log",
  },
];

// const navListMenuItems = [
//   {
//     title: "Automated Building Estimatoriiiii",

//     icon: SquaresPlusIcon,
//   },
//   {
//     title: "Construction Inventory/Cost Tracker",

//     icon: AdjustmentsHorizontalIcon,
//   },
//   {
//     title: "Custom Building Estimator and Building Budget Calculator",

//     icon: CalculatorIcon,
//   },
//   {
//     title: "Construction events and workshops",

//     icon: UserGroupIcon,
//   },

//   {
//     title: "Applicable Material and Labour Pricelist/Rates",

//     icon: CurrencyDollarIcon,
//   },

//   {
//     title: "Trades men and Construction Vendors log",

//     icon: BookOpenIcon,
//   },
// ];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ icon, title, path }, key) => (
    <Link href={path} key={key} passHref>
      <MenuItem className="flex items-center border-none gap-5 rounded-none md:py-5">
        <div className="flex items-center justify-center rounded-none p-1 bg-yellow-100">
          {React.createElement(icon, {
            strokeWidth: 1,
            className: "h-4 text-gray-900 w-4 text-yellow-700",
          })}
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm font-bold"
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </Link>
  ));

  // const renderItems = navListMenuItems.map(({ icon, title }, key) => (
  //   <a href="#" key={key}>
  //     <MenuItem className="flex items-center border-none gap-5  rounded-none md:py-5 ">
  //       <div className="flex items-center justify-center rounded-none p-1 bg-yellow-100 ">
  //         {" "}
  //         {React.createElement(icon, {
  //           strokeWidth: 1,
  //           className: "h-4 text-gray-900 w-4 text-yellow-700",
  //         })}
  //       </div>
  //       <div>
  //         <Typography
  //           variant="h6"
  //           color="blue-gray"
  //           className="flex items-center text-sm font-bold"
  //         >
  //           {title}
  //         </Typography>
  //       </div>
  //     </MenuItem>
  //   </a>
  // ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2.5 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList
          style={{ border: "none" }}
          className="hidden max-w-screen-xl shadow-xl rounded-none lg:block   mt-1"
        >
          <ul className="grid grid-cols-2 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Link href="/about" passHref>
        <ListItem className="flex text-sm items-center gap-2 py-2 pr-4 font-medium text-gray-900">
          About
        </ListItem>
      </Link>

      <Link href="/pricing" passHref>
        <ListItem className="flex  text-sm items-center gap-2 py-2 pr-4 font-medium text-gray-900 ">
          Pricing
        </ListItem>
      </Link>

      <NavListMenu />

      <Link href="/blog" passHref aria-disabled>
        <ListItem className="flex items-center gap-2 py-2 pr-4 font-medium text-sm text-gray-900">
          Blog
        </ListItem>
      </Link>

      <Link href="/faq" passHref>
        <ListItem className="flex text-sm items-center gap-2 py-2 pr-4 font-medium text-gray-900">
          FAQ
        </ListItem>
      </Link>
    </List>
  );
}

const NavbarWithMegaMenu = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for token in cookies on component mount
    const storedToken: any = Cookies.get("token");
    setToken(storedToken);
  }, []);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleSignout = () => {
    try {
      // Remove token from cookies
      Cookies.remove("token");
      setToken(null); // Update token state

      // Redirect to the login page
      router.push("/login");
    } catch (error) {
      console.error("Signout failed:", error);
    }
  };

  return (
    <div className=" !w-full !bg-white">
      <Navbar className="fixed shadow-xl !bg-white top-0 left-0 xl:max-w-[100%]  mx-auto right-0 w-full z-50 px-4 py-2 rounded-none">
        <div className="flex items-center justify-between text-black">
          <Link href="/" className="mr-4 cursor-pointer py-1.5 ">
            <div className="mr-4  cursor-pointer  font-bold ">
              <img src="/logo.png" alt="Logo" className="md:h-14 h-10 w-auto" />
            </div>
          </Link>

          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex">
            <div className="w-40">
              <div className="relative flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  style={{ border: "1px solid gre" }}
                  className="w-full  bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Search ..."
                />
              </div>
            </div>
            {/* <Button
              className="bg-yellow-700"
              size="sm"
              onClick={() => router.push("/login")}
            >
              Sign In
            </Button> */}

            <div className="hidden gap-2 lg:flex">
              {token ? (
                <Button
                  className="bg-red-600"
                  size="sm"
                  onClick={handleSignout}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  className="bg-yellow-700"
                  size="sm"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </Button>
              )}
            </div>
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <div className="w-full">
              <div className="relative flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Search ..."
                />
              </div>
            </div>
            {/* <Button
              size="sm"
              fullWidth
              className="bg-yellow-600"
              onClick={() => router.push("/login")}
            >
              Sign In
            </Button> */}

            {token ? (
              <Button
                className="bg-red-600 w-full"
                size="sm"
                onClick={handleSignout}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                className="bg-yellow-700 w-full"
                size="sm"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarWithMegaMenu;
