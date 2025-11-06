import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import WorkHorseMain from "./pages/WorkHorseMain";
import WorkHorseDashboard from "./pages/WorkHorseDashboard";
import RoleSelector from "./Components/RoleSelector";

export default function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<WorkHorseDashboard />} />
        <Route path="/RoleSelector" element={<RoleSelector />} />
      </Routes>
      <Footer />
    </div>
  );
}
