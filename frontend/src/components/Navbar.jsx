import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className=" w-full mx-auto h-[10vh] px-3 py-6 flex items-center  ">
      <div className="flex items-center h-full w-full justify-between">
        <h1 className="text-3xl ">CodeBrew</h1>
        <div className="flex gap-4 justify-between items-center  ">
          <Link
            to="/"
            className="ml-20 hover:scale-105 hover:duration-150 text-sm flex items-center opacity-80 justify-center gap-2"
          >
            Home
          </Link>
          <Link
            to="/createPortfolio"
            className="ml-20 hover:scale-105 hover:duration-150 text-sm flex items-center opacity-80 justify-center gap-2"
          >
            Portfolio
          </Link>
          <Link
            to="/createResume"
            className="ml-20 hover:scale-105 hover:duration-150 text-sm flex items-center opacity-80 justify-center gap-2"
          >
            Resume
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
