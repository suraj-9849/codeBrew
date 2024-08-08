import React from "react";
import Hero from "./components/Hero";
import "./index.css";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className=" montserrat text-white bg-black h-[100vh] w-full">
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
