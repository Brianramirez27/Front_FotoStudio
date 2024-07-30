import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Admin" element={<Admin/>} />
    </Routes>
  );
};

export default RoutesApp;
