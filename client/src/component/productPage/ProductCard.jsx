import React from "react";

const ProductCard = ({
  name = "Product Title",
  price = 2000,
  ratings = 4,
  image = {
    url: "https://images.pexels.com/photos/3801990/pexels-photo-3801990.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Product Image",
  },
}) => {
  return <div>
     <img src ={image.url} alt=""/>
  </div>;
};

export default ProductCard;
