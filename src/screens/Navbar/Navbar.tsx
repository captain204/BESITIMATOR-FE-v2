import React from "react";
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

const navListMenuItems = [
  {
    title: "Automated Building Extimator",

    icon: SquaresPlusIcon,
  },
  {
    title: "Construction Inventory/Cost Tracker",

    icon:   AdjustmentsHorizontalIcon,
  },
  {
    title: "Custom Building Estimator and Building Budget Calculator",

    icon: CalculatorIcon,
  },
  {
    title: "Construction events and workshops",

    icon:  UserGroupIcon,
  },

  {
    title: "Applicable Material and Labour Pricelist/Rates",

    icon: CurrencyDollarIcon,
  },

  {
    title: "Trades men and Construction Vendors log",

    icon:  BookOpenIcon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(({ icon, title }, key) => (
    <a href="#" key={key}>
      <MenuItem className="flex items-center border-none gap-5  rounded-none md:py-5 ">
        <div className="flex items-center justify-center rounded-none p-1 bg-yellow-100 ">
          {" "}
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
          {/* <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography> */}
        </div>
      </MenuItem>
    </a>
  ));

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
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
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
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">About</ListItem>
      </Typography>

      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Pricing
        </ListItem>
      </Typography>

      <NavListMenu />

      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Blog</ListItem>
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">FAQ</ListItem>
      </Typography>
    </List>
  );
}

const NavbarWithMegaMenu = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // React.useEffect(() => {
  //   window.addEventListener(
  //     "resize",
  //     () => window.innerWidth >= 960 && setOpenNav(false),
  //   );
  // }, []);

  return (
    <div className=" !w-full !bg-white">
      <Navbar className="fixed shadow-xl !bg-white top-0 left-0 xl:max-w-[100%]  mx-auto right-0 w-full z-50 px-4 py-2 rounded-none">
        <div className="flex items-center justify-between text-black">
          {/* <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Material Tailwind
        </Typography> */}
          <Link href="/" className="mr-4 cursor-pointer py-1.5 ">
            <div className="mr-4  cursor-pointer  font-bold ">
              <img src="/logo.png" alt="Logo" className="md:h-14 h-10 w-auto" />
            </div>
          </Link>

          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex">
            <Button variant="text" size="sm" color="blue-gray">
              Get Started
            </Button>
            <Button className="bg-yellow-700" size="sm">
              Sign In
            </Button>
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
            <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
              Get started
            </Button>
            <Button size="sm" fullWidth className="bg-yellow-600">
              Sign In
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarWithMegaMenu;
