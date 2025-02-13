import React from 'react';
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";


const RootLayout = ({children}) => {
  return (
    <>
        <Navbar />
        {children}
        <Footer />
        
    </>
  )
}

export default RootLayout
