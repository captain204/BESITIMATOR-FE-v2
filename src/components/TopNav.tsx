import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaRegWindowClose,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/navigation";

const navListMenuItems = [
  {
    title: "Automated Building Estimator",
    path: "/automated-building-estimator",
  },
  {
    title: "Custom Building Estimator and Building Budget Calculator",
    path: "/custom-building-estimator",
  },
  {
    title: "Construction Inventory/Cost Tracker",
    path: "/construction-inventory",
  },
  {
    title: "Applicable Material and Labour Pricelist/Rates",
    path: "/material-labour-pricelist",
  },
  { title: "Construction Events and Workshops", path: "/construction-events" },
  {
    title: "Tradesmen and Construction Vendors Log",
    path: "/tradesmen-vendors-log",
  },
  { title: "Blog", path: "/blog" },
];

function TopNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigateTo = (path: any) => {
    router.push(path);
    setDrawerOpen(false);
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const filteredMenuItems = navListMenuItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative mx-auto flex">
      {/* Black Background Section (80%) */}
      <div className="w-4/5 bg-black text-white flex items-center justify-between p-4">
        {/* Left Side */}
        <div className="flex flex-row items-center justify-center">
          <div className="flex items-center text-sm">
            <p>
              Call Us:{" "}
              <span className="text-grey cursor-pointer hover:text-primary">
                (+234) 702 666 6489
              </span>
            </p>
          </div>
          <div className="flex items-center ml-4">
            <p className="text-sm">
              Visit Us:{" "}
              <span className="text-grey cursor-pointer hover:text-primary">
                60 East 65th Street, New York City, NY 10065
              </span>
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex space-x-4 justify-center items-center">
          <p className="text-sm">Follow us:</p>
          <a href="#" className="hover:text-gray-400 text-sm">
            <FaFacebookF className="text-white cursor-pointer hover:text-primary" />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaTwitter className="text-white cursor-pointer hover:text-primary" />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaYoutube className="text-white cursor-pointer hover:text-primary" />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaInstagram className="text-white cursor-pointer hover:text-primary" />
          </a>
        </div>
      </div>

      {/* Blue Background Section (20%) */}
      <div className="w-1/5 bg-[#315aac] text-white flex items-center justify-between p-4">
        <p className="text-[12px] ml-2 cursor-pointer font-bold">Schedule a Consultation</p>
        <button onClick={toggleDrawer} className="text-white">
          {drawerOpen ? (
            <FaRegWindowClose size={30} />
          ) : (
            <GiHamburgerMenu size={30} />
          )}
        </button>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Drawer Section */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-primary p-4 z-50 transition-transform transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        } duration-500 ease-in-out`}
      >
        <div className="flex justify-end mb-4">
          <button onClick={toggleDrawer} className="text-white text-xl">
            <FaRegWindowClose size={30} />
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <input
          style={{backgroundColor: "black"}}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search here..."
            className="w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-white placeholder-gray-500"
          />
        </div>

        {/* Menu Items */}
        <ul className="space-y-4">
          {filteredMenuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => navigateTo(item.path)}
              className="text-white hover:bg-black p-2 rounded-md cursor-pointer font-semibold transition-colors duration-300"
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TopNav;
