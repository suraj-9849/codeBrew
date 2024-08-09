import React from 'react'

function MultipleInput() {
    function addAnotherMultipleInput() {

    }
    return (
        <div className='flex gap-5 mb-20 '>
            <input type="text" placeholder="Project Title "
                className="px-7 py-2 border rounded text-black " />
            <input type="text" placeholder="Github Link"
                className="px-7 py-2 border rounded text-black " />
            <button className='bg-green-400 text-black  px-3 w-fit  rounded-md' onClick={addAnotherMultipleInput} >+</button>
        </div>
    )
}

export default MultipleInput
