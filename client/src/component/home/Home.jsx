import React from 'react';
import HeaderDisplay from "./HeaderDisplay";
import FilterMenu from "./FilterMenu";
import ProductList from "../productPage/ProductList"
import SlidingProduct from './SlidingProduct';
import TestimonialSection from './TEstimonial';

const Home = () => {
  return (
    <div>
    <HeaderDisplay/>
    <SlidingProduct/>
     <FilterMenu/>
     <ProductList/>
     <TestimonialSection/>
    </div>
  )
}

export default Home;