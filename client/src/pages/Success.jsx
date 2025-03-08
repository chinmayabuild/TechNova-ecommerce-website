import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

const Success = () => {
    const[count, setCount] = useState(3);


    useEffect(() => {
      if (count === 0) {
        window.location.href = "/";
        return;
      }
  
      const interval = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [count]);

 

  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
        <h className="text-3xl sm:text-5xl font-bold ">Payment Sucessful  </h>
        <Link to={"/"} className='underline text-sm sm-text:base ' >
        Go to Home (Redirecting you in {count}seconds)
        </Link>
    </div>
  )
}

export default Success
