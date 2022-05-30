import React from "react";
import { Body } from "./UI/Body";
import { Footer } from "./UI/Footer";
import { Navbar } from "./UI/Navbar";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Body />
      <Footer />
    </>
  );
};
