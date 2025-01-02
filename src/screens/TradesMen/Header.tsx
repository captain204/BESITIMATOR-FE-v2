"use client"
import React, { useState } from "react";
import RegisterForm from "./Register";
import { FaArrowLeft } from "react-icons/fa"; // Importing an icon for the back button
import SearchTrade from "./SearchTradesman";

const Header = () => {
  const [view, setView] = useState("default");

  const renderDefaultView = () => (
    <>
      <p className="text-gray-600 text-lg">
        You can either register as a construction tradesman or a construction
        vendor OR Search for a construction tradesman or construction vendor.
        Choose an option below.
      </p>
      <div className="mt-6 flex justify-center space-x-6">
        <button
          onClick={() => setView("register")}
          className="px-10 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-800 border border-gray-500 hover:border-yellow-800 hover:text-white transition"
        >
          Register
        </button>
        <button
          onClick={() => setView("search")}
          className="px-10 py-3 bg-white text-gray-700 border border-gray-500 font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-800 hover:border-yellow-800 hover:text-white transition"
        >
          Search
        </button>
      </div>
    </>
  );

  const renderRegisterView = () => (
    <p className="text-gray-600 text-lg">
      Register as a construction tradesman or vendor.
    </p>
  );

  const renderSearchView = () => (
    <p className="text-gray-600 text-lg">
      Search for a construction tradesman or vendor.
    </p>
  );

  return (
    <div>
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-8 text-start">
        <h1 className="md:text-3xl text-2xl font-extrabold text-gray-800 mb-4 tracking-tight">
          Construction Tradesmen/Construction Vendors
        </h1>
        {view !== "default" && (
          <button
            onClick={() => setView("default")}
            className="mb-4 flex items-center justify-center space-x-2 px-6 py-2 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-800 border border-gray-500 hover:border-yellow-800 hover:text-white transition"
          >
            <FaArrowLeft className="mr-2" /> {/* Adding the back icon */}
            <span>Back</span>
          </button>
        )}
        {view === "default" && renderDefaultView()}
        {view === "register" && <RegisterForm />}
        {view === "search" && <SearchTrade/>}
      </div>
    </div>
  );
};

export default Header;
