import { Star } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import LinkButton from "./LinkButton"
import { starGenerator } from "../constants/Helper";


const ProductCard = ({
  name = "Product Title",
  price = 2000,
  ratings = 2.5,
  image = {
    url: "https://images.pexels.com/photos/3801990/pexels-photo-3801990.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Product Image",
  },
}) => {
  return (
    <div className="relative border w-fit overflow-clip hover:shadow-md rounded-2xl">
      <img
        src={image.url}
        alt={name}
        className="object-cover w-[30rem] h-[20rem]  "
      />

      <div className="px-5 grid gap-2 py-2 absolute bg-white dark:bg-zinc-900 w-full bottom-0 translate-y-[3rem] hover:translate-y-0 transform transition-all ease-in-out rounded-xl duration-300">
        <h2>{name}</h2>
        <div className="flex justify-between">
          <div className="flex">
              {starGenerator(ratings)}
          </div>
          <span> ₹{price} </span>
        </div>
        <LinkButton  to ={'/product/id'}  text="View Product" />
      </div>
    </div>
  );
};

export default ProductCard;
