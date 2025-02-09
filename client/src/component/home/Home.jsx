import React from 'react';
import HeaderDisplay from "./HeaderDisplay";
import FilterMenu from "./FilterMenu";
import ProductList from "../productPage/ProductList"

const Home = () => {
  return (
    <div>
     <HeaderDisplay/>
     <FilterMenu/>
     <ProductList/>
    </div>
  )
}

export default Home
