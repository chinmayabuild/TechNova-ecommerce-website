import React from "react";
import HeaderDisplay from "./HeaderDisplay";
import FilterMenu from "./FilterMenu";
import ProductList from "../productPage/ProductList";
import SlidingProduct from "./SlidingProduct";
import TestimonialSection from "./TEstimonial";
import Category from "./Category";

const Home = () => {
  return (
    <>
      <HeaderDisplay />
      <Category />
      <SlidingProduct />
      {/* <FilterMenu />
      <ProductList /> */}
      <TestimonialSection />
    </>
  );
};

export default Home;
