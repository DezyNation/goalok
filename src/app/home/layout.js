"use client";
import Navbar from "@/components/global/Navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
