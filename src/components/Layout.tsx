"use client";
import React, { useState, useRef } from 'react';
import Footer from "@/components/Footer";
import NavbarWithMegaMenu from '@/screens/Navbar/Navbar';
// import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
// import TawkChat from './tawk-chat';

interface LayoutProps {
  children: React.ReactNode;
  showNavFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNavFooter = true }) => {
  // State to track if Tawk has loaded
  // const [isTawkLoaded, setIsTawkLoaded] = useState(false);
  
  // Example handler to minimize the chat
  // const handleMinimize = () => {
  //   if (isTawkLoaded && window.Tawk_API) {
  //     window.Tawk_API.minimize();
  //   } else {
  //     console.error("Tawk_API is not available or Tawk has not loaded yet.");
  //   }
  // };

  return (
    <div className="flex flex-col min-h-screen">
      {showNavFooter && <NavbarWithMegaMenu />}
      <main className="flex-grow">{children}</main>
      {showNavFooter && <Footer />}

      {/* <TawkChat /> */}


    </div>
  );
};

export default Layout;

