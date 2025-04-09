import React from "react";
import HeaderDisplay from "./HeaderDisplay";
import FilterMenu from "./FilterMenu";
import ProductList from "../productPage/ProductList";
import SlidingProduct from "./SlidingProduct";
import Testimonial from "./Testimonial";
import ProductShowcase from "./ProductShowcase";

const Home = () => {
  return (
    <>
      <HeaderDisplay />
      
      <SlidingProduct />
      <ProductShowcase />
      {/* <FilterMenu />
      <ProductList /> */}
      <Testimonial />
    </>
  );
};

export default Home;
