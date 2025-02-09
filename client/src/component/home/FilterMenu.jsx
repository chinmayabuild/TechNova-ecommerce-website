import React, { useState } from "react";
import { Input } from "../ui/input";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Trigger } from "@radix-ui/react-dialog";

const categoryData = {
  trigger: "Category",
  items: ["Keybord", "Mouse", "headset"],
};
const priceData = {
  trigger: "Price",
  items: [1000, 3000, 5000],
};

const FilterMenu = () => {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");

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
              <SelectItem value={items} Key={index} className="capitalize">
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
            {priceData.items.map((items, index) => (
              <SelectItem value={items} Key={index} className="capitalize ">
                Less Than {price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search Input */}

      <div className="sm:w-[60%] w-full"  >
        <Input id="search"  placeholder = "Search.."   onChange={(e) =>setSearch(e.target.value)}  />
      </div>
    </div>
  );
};

export default FilterMenu;
