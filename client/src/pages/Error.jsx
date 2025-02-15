import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (  
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
        <h className="text-3xl sm:text-5xl font-bold mb-3 ">400 page not Found !  </h>
        <Link to={"/"} className='underline text-sm sm-text:base' >
        Click here to go to Homepage
        </Link>
    </div>
  )
}

export default Error
