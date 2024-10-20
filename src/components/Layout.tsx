// components/Layout.tsx
"use client"
import React from 'react';
import Footer from "@/components/Footer";
import ComplexNavbar from './Navbar';
import NavbarWithMegaMenu from '@/screens/Navbar/Navbar';


interface LayoutProps {
  children: React.ReactNode;
  showNavFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNavFooter = true }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showNavFooter && <NavbarWithMegaMenu  />}
      <main className="flex-grow">{children}</main>
      {showNavFooter && <Footer />}
    </div>
  );
};

export default Layout;
