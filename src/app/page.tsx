"use client";
// import Header from "@/components";
import About from "@/screens/LandingPageScreen/About";
import WorkTogetherSection from "@/screens/LandingPageScreen/ContactInfo";
import Experience from "@/screens/LandingPageScreen/Experience";
import Footer from "@/components/Footer";
// import MobileNavbile from "@/components/MobileNavbar";
import Pricing from "@/screens/LandingPageScreen/Pricing";
// import Services from "@/screens/LandingPageScreen/Services";
import SlideSection from "@/screens/LandingPageScreen/SlideSection";
import SubscriptionForm from "@/screens/LandingPageScreen/Subscribe";
import Testimonia from "@/screens/LandingPageScreen/Testimonia";
import NavbarWithMegaMenu from "@/screens/Navbar/Navbar";
import HeroReal from "@/screens/LandingPageScreen/Herotwo";
import Subservices from "@/screens/LandingPageScreen/SubServices";
import BrandsSection from "@/screens/LandingPageScreen/Brands";

export default function Home() {
  return (
    <div className=" overflow-hidden">
      {/* <div className="md:hidden">
        <MobileNavbile />
      </div> */}
      {/* <NavbarWithMegaMenu /> */}
      <NavbarWithMegaMenu/>
      {/* <Header /> */}
      <HeroReal />
      <Subservices  />
      <Experience />
      {/* <About /> */}
      {/* <SlideSection /> */}
      {/* <Pricing /> */}
      {/* <Testimonia /> */}
      <SubscriptionForm />
      < BrandsSection />
      {/* <WorkTogetherSection /> */}
      <Footer />

    </div>
  );
}
