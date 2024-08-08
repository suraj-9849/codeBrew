import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Route from "./routings/Routing";
function App() {
  return (
    <div className=" montserrat text-white bg-black h-full w-full">
       <Navbar />
      <Route/>
    </div>
  );
}

export default App;
