import React from "react";
import { Label } from "../ui/label";
import { Edit, Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const AllProducts = () => {
  return (
    <div className="mx-auto px-4   sm:px-8 -z-10">
      <h1 className="text-3xl font-bolt mb-8">Our Products</h1>

      <div className="mb-8">
        <form action="" className="flex gap-4 items-end sm:w-[78vw] ">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Search
            </label>
            <div className="relative">
              <Input
                type="text"
                id="search"
                placeholder="search by name or description"
                className="pl-10"
              />
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-2 text-gray-400"
              />
            </div>
          </div>

          <div className="w-48 mr-10">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Category
            </label>

            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>

                <SelectItem value="headset">Headset</SelectItem>

                <SelectItem value="keyboard">Keyboard</SelectItem>

                <SelectItem value="mouse">Mouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 mx-2 sm:mx-0">
        <Card className="flex flex-col">
          {/* Image Section */}
          <div className="aspect-square relative">
            <img
              src="https://images.pexels.com/photos/585752/pexels-photo-585752.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Keyboard"
              className="rounded-t-lg object-cover w-full h-full"
            />
          </div>

          {/* Content Section */}
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-1">Ant Exports Keyboard</h3>
            <p className="text-sm text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className="text-lg  font-bold text-gray-400">₹564.00</p>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button variant="outline">
              <Edit className="mr-2 h-4" /> Edit
            </Button>
            <Button >Blacklist Product</Button>
          </CardFooter>
        </Card>
      </div>


      
    </div>
  );
};

export default AllProducts;
