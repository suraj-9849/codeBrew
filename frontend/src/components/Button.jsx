import React from 'react'
import { IoIosReturnRight } from "react-icons/io";

function Button({title}) {
  return (
    <div className='w-44 px-4 py-2 flex  items-center justify-between bg-zinc-100 rounded-full hover:scale-105 hover:duration-150 text-black cursor-pointer'>
      <span className='text-sm '>{title}</span>
      <IoIosReturnRight />
    </div>
  )
}

export default Button
