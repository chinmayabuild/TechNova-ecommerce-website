import React from "react";

const OrderProductTitle = () => {
  return (
    <div className="flex justify-between items-start sm:items-center p-3 rounded-lg bg-gray-100 dark:bg-zinc-900">
      <div className="flex flex-row items-center gap-2">
        <img
          src="https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Cosmic Byte Keyboard"
          className="w-20 sm:w-24 rounded-lg"
        />

        <div className="grid sm:gap-1">
          <h1 className="font-semibold text-sm sm:text-base">
            Cosmic Byte Keyboard
          </h1>

          <p className="flex flex-col sm:flex-row sm:gap-2 text-gray-500 dark:text-customGray text-xs sm:text-sm my-0">
            <span className="font-semibold">
              Color: <span style={{ backgroundColor: "#ffffff" }}>#ffffff</span>
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Qty: <span className="font-medium text-customYello"> 2 </span>
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Price: <span className="font-medium text-customYello"> ₹567 </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductTitle;
