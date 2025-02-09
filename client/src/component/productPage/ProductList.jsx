import React from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  return (
    <div className="w-[93vw] grid sm:grid-cols-3 sd:grid:cols-4 lg:frid-5 mx-auto gap-5 place-content-center my- 10 ">
      <ProductCard />
    </div>
  );
};

export default ProductList;
