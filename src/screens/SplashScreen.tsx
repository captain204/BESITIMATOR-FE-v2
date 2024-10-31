"use client"
import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-white flex items-center justify-center transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 1000 }} 
    >
      <img  src="/logo.png" alt="Logo" className="w-auto h-32" />
    </div>
  );
};

export default SplashScreen;
