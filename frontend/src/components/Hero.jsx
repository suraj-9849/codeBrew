import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="w-full relative flex flex-col gap-20 items-center h-[80vh] justify-center ">
      <div className="max-w-screen-xl mx-auto leading-none tracking-tight select-none text-center text-[10vw] ">
        Create Your Own Portfolio
      </div>
      <div className="flex w-[30vw] justify-around ">
        <Link to={"/createPortfolio"}>
          <Button title={"Create Portfolio"} />
        </Link>
        <Link to={"/createResume"}>
          <Button title={"Build Resume"} />
        </Link>
      </div>
    </div>
  );
}

export default Hero;
