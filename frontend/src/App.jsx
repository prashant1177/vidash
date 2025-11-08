import React from "react";
import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import WorkHorseMain from "./pages/WorkHorseMain";
import WorkHorseDashboard from "./pages/app/WorkHorseDashboard";
import RoleSelector from "./Components/RoleSelector";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";

export default function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<WorkHorseDashboard />} />
        <Route path="/RoleSelector" element={<RoleSelector />} />
      </Routes>
    </div>
  );
}
