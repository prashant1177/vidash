import React from "react";
import Hero from "./Components/Hero";
import Features2 from "./Components/Features2";
import Features from "./Components/Features";
import LockYourself from "./Components/LockYourself";
import Preview from "./Components/Preview";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero />
      <Features />
      <LockYourself />
      <Preview/>
      <Features2 />
      <Footer/>
    </div>
  );
}
