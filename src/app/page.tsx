"use client";

import { useEffect, useState } from "react";
import Experience from "@/screens/LandingPageScreen/Experience";
import Footer from "@/components/Footer";
import SubscriptionForm from "@/screens/LandingPageScreen/Subscribe";
import NavbarWithMegaMenu from "@/screens/Navbar/Navbar";
import HeroReal from "@/screens/LandingPageScreen/Herotwo";
import Subservices from "@/screens/LandingPageScreen/SubServices";
import BrandsSection from "@/screens/LandingPageScreen/Brands";
import SplashScreen from "@/screens/SplashScreen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplashScreen = localStorage.getItem("hasSeenSplashScreen");

    if (hasSeenSplashScreen) {
      setShowSplash(false); // If splash screen was shown before, skip it
    } else {
      setTimeout(() => {
        setShowSplash(false); // Hide splash screen after delay
        localStorage.setItem("hasSeenSplashScreen", "true"); // Mark splash screen as seen
      }, 3000); // Set splash screen duration here
    }
  }, []);

  return (
    <div className="overflow-hidden">
      {showSplash ? (
        <SplashScreen /> // Show splash screen initially
      ) : (
        <>
          <NavbarWithMegaMenu />
          <HeroReal />
          <Subservices />
          <Experience />
          <SubscriptionForm />
          <BrandsSection />
          <Footer />
        </>
      )}
    </div>
  );
}

// "use client";

// import Experience from "@/screens/LandingPageScreen/Experience";
// import Footer from "@/components/Footer";
// import SubscriptionForm from "@/screens/LandingPageScreen/Subscribe";
// import NavbarWithMegaMenu from "@/screens/Navbar/Navbar";
// import HeroReal from "@/screens/LandingPageScreen/Herotwo";
// import Subservices from "@/screens/LandingPageScreen/SubServices";
// import BrandsSection from "@/screens/LandingPageScreen/Brands";

// export default function Home() {
//   return (
//     <div className=" overflow-hidden">
//       <NavbarWithMegaMenu />

//       <HeroReal />
//       <Subservices />
//       <Experience />

//       <SubscriptionForm />
//       <BrandsSection />

//       <Footer />
//     </div>
//   );
// }
