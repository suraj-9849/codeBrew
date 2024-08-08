import React from 'react'
import LocomotiveScroll from 'locomotive-scroll';
function App() {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className='text-white bg-black h-screen w-full' >
    <div className="no-scrollbar overflow-y-auto">Hello CodeBrew</div>
    </div>
  )
}

export default App
