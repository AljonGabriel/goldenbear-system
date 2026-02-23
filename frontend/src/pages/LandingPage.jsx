import React, { useState, useEffect } from "react";
import ScrollToTopButton from "../components/website/ScrollToTopButton";
import Navbar from "../components/website/Navbar";
import Footer from "../components/website/Footer";
import Contact from "../components/website/Contact";
import Catalog from "../components/website/Catalog";
import About from "../components/website/About";
import Hero from "../components/website/Hero";

const LandingPage = () => {
  const fbLink = "https://www.facebook.com/YourJewelryPage";

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F4]">
      <Navbar />
      <Hero fbLink={fbLink} />
      <About />
      <Catalog fbLink={fbLink} />
      <Contact />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default LandingPage;
