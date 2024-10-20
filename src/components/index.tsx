"use client";

import HeroReal from "../screens/LandingPageScreen/Herotwo";

// import NavbarItems from "./NavbarItems";

const Header = () => {
  return (
    <div>
      <div
        className="bg-black lg:bg-[length:125%] bg-cover "
        style={{
          // backgroundImage: 'url("/hero.jpg")',

          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          // backgroundSize: "125%",
          width: "100%",
          height: "auto",
          overflowX: "hidden",
        }}
      >
        {/* <div className="md:block hidden ">
          <ComplexNavbar />
        </div> */}
        {/* <nav className="w-full  ">
          <NavbarNav />
        </nav> */}
        <HeroReal />
      </div>
    </div>
  );
};

export default Header;
