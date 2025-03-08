import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Trigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProducts } from "@/redux/slices/productSlice";
import { Search, SearchCheckIcon } from "lucide-react";

const categoryData = {
  trigger: "Category",
  items: ["Keyboard", "Mouse", "Headset"],
};
const priceData = { 
  trigger: "Price",
  items: [10000, 15000, 25000, 30000],
};

const FilterMenu = () => {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  

  useEffect(() => {
    const getFilterProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-products`,
          {
            params: {
              category,
              price: price ? Number(price) : undefined,
              search,
            },
          }
        );
        
        
        dispatch(setProducts(res.data.data));
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Optionally dispatch an error state to Redux
      }
    }; 
    const debounceTimer = setTimeout(() => {
      getFilterProducts();
    }, 300);
 

    return () => clearTimeout(debounceTimer);
  }, [category, price, search, dispatch]);


  return (
    <div className="w-[93vw] flex flex-col sm:flex-row  justify-between  items-center mx-auto  my-10 gap-3 ">
      {/* Dropdown filters */}
      <div className="flex sm:w-[30%]  w-full gap-3">
        {/* For category */}
        <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger id={categoryData.trigger} className="w-[180px]">
            <SelectValue placeholder={categoryData.trigger} />
          </SelectTrigger>
          <SelectContent position="popper">
            {categoryData.items.map((items, index) => (
              <SelectItem value={items} key={index} className="capitalize">
                {items}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* for price */}
        <Select onValueChange={(value) => setPrice(value)}>
          <SelectTrigger id={priceData.trigger} className="w-[180px]">
            <SelectValue placeholder={priceData.trigger} />
          </SelectTrigger>
          <SelectContent position="popper">
            {priceData.items.map((item, index) => (
              <SelectItem value={item.toString()} key={index} className="capitalize  ">
              Less Than ₹{item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search Input */}

      <div className="sm:w-[60%] w-full">
        <Input
           className="bg-[#18181B] text-white px-3 py-2 rounded-md  focus:ring-2 focus:ring-gray-500"
          id="search"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterMenu;
