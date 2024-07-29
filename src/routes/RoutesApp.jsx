import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
};

export default RoutesApp;
