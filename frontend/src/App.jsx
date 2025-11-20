import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import WorkHorseMain from "./pages/WorkHorseMain";
import WorkHorseDashboard from "./pages/app/WorkHorseDashboard";
import RoleSelector from "./Components/RoleSelector";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Portfolio from "./pages/app/Portfolio";
import Home from "./pages/Home/Home";
import useStore from "./Store";

export default function App() {
  const fetchUser = useStore((s) => s.fetchUser);
  useEffect(() => {
    fetchUser()
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<WorkHorseDashboard />} />
        <Route path="/RoleSelector" element={<RoleSelector />} />
        <Route path="/role" element={<Portfolio />} />
      </Routes>
    </div>
  );
}
