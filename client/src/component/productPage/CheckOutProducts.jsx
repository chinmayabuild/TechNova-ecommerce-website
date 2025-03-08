import React from "react";
import { Colors } from "../constants/Color";

const CheckOutProducts = ({
  name = "Custom Keyboard",
  price = 299,
  quantity = 2,
  image = {
    url: "https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  color = Colors.customYello, // Assuming this is a typo in your Colors object
}) => {
  return (
    <div className="flex justify-between items-start p-3 rounded-lg bg-gray-100 dark:bg-zinc-900 my-2">
      <div className="flex flex-row gap-2 items-center">
        <img src={image} alt="loading..." className="w-20 sm:w-24 rounded-lg" />

        <div className="grid sm:gap-1">
          <h1 className="font-semibold text-sm sm:text-base">{name}</h1> {/* Fixed hardcoded name */}
          <p className="flex flex-col sm:flex-row sm:gap-2 text-gray-500 dark:text-customGray text-xs sm:text-sm my-0">
            <span className="font-semibold">
              Color: <span style={{ color: color }}>{color}</span> {/* Fixed inline style */}
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Qty: <span className="font-medium text-customYello">{quantity}</span> {/* Fixed typo in className */}
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Price: <span className="font-medium text-customYello">₹{price}</span> {/* Fixed typo in class name */}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckOutProducts;