import React from "react";
import Button from "./Button";

function Hero() {
  return (
    <div className='w-full relative flex flex-col gap-20 items-center h-[70vh] justify-center '>
      <div className="max-w-screen-xl mx-auto leading-none tracking-tight select-none text-center text-[10vw] ">
        Create Your Own Portfolio
      </div>
      <div className="flex w-[30vw] justify-around " >
      <Button title={"Create Portfolio"} />
      <Button title={"Build Resume"} />
      </div>
    </div>
  );
}

export default Hero;
