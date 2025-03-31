import React from "react";

const ProductShowcase = () => {
  return (
    <div className="flex flex-wrap">
      {/* Earphone Card */}
      <div className="w-1/2 md:w-1/4 p-4">
        <div 
          className="bg-cover bg-center h-60 rounded-lg shadow-lg"
          style={{ backgroundImage: "url('path/to/earphone.jpg')" }}
        >
          <div className="flex justify-center items-center h-full text-white text-lg font-semibold bg-black bg-opacity-40 rounded-lg">
            <p>Earphone</p>
          </div>
        </div>
      </div>
      
      {/* Smartwatch Card */}
      <div className="w-1/2 md:w-1/4 p-4">
        <div 
          className="bg-cover bg-center h-60 rounded-lg shadow-lg"
          style={{ backgroundImage: "url('path/to/smartwatch.jpg')" }}
        >
          <div className="flex justify-center items-center h-full text-white text-lg font-semibold bg-black bg-opacity-40 rounded-lg">
            <p>Smartwatch</p>
          </div>
        </div>
      </div>
      
      {/* Laptop Card */}
      <div className="w-full md:w-1/2 p-4">
        <div 
          className="bg-cover bg-center h-60 rounded-lg shadow-lg"
          style={{ backgroundImage: "url('path/to/laptop.jpg')" }}
        >
          <div className="flex justify-center items-center h-full text-white text-lg font-semibold bg-black bg-opacity-40 rounded-lg">
            <p>Laptop</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
