import React, { useState, useRef } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import { Loader2, Upload, X } from "lucide-react";
import { Textarea } from "../ui/textarea";

const CreateProducts = () => {
  const [currentColor, setCurrentColor] = useState("#000000");
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  const addColor = (e) => {
    e.preventDefault(); // Prevent form submission
    if (!colors.includes(currentColor)) {
      setColors([...colors, currentColor]);
    }
  };

  const removeColor = (colorToRemove) => {
    setColors(colors.filter((color) => color !== colorToRemove));
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter)((_, index) => index !== indexToRemove);
  };

  const handleImageUpload = (e) => {};

  return (
    <div className="w-full max-w-2xl -z-10 ">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Product</CardTitle>
        <CardDescription>
          Enter the details of the product you want to add to your e-commerce
          store.
        </CardDescription>
      </CardHeader>

      <form>
        <div className="flex flex-col lg:flex-row lg:w-[70vw]">
          <CardContent className="w-full">
            <div className="space-y-2">


              <Label htmlFor="name">Product Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
              rows="4"
                type="text"
                id="description"
                placeholder="Enter product description"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                type="number"
                id="stock"
                placeholder="20"
                min="0"
                required
              />
            </div>


          </CardContent>



          <CardContent className="w-full">

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select id="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Headset">Headset</SelectItem>
                  <SelectItem value="Keyboard">Keyboard</SelectItem>
                  <SelectItem value="Mouse">Mouse</SelectItem>
                </SelectContent>
              </Select>
            </div>


            <div className="space-y-2">
              <Label htmlFor="color">Colors</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-12 h-12 p-1 rounded-md"
                />
                <Button variant="outline" onClick={addColor}>
                  Add Color
                </Button>
              </div>

            <div className="flex flex-wrap mt-2">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 rounded-full px-2 py-1 mx-2"
                >
                  <div
                    className="w-5 h-5 mr-2 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-sm mr-1  dark:text-slate-900">
                    {color}
                  </span>
                  <Button
                    variant="ghost"
                    className="h-6 w-6 p-2 rounded-full"
                    onClick={(e) => {
                      e.preventDefault();
                      removeColor(color);
                    }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove Color</span>
                  </Button>
                </div>
              ))}
            </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Product Images</Label>
              <div className="flex flex-wrap gap-4">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt={`Product image ${1}`}
                    width={100}
                    height={100}
                    className="rounded-md objext-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => removeImage(0)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>
               
                <div className="space-y-2">
                  <div>
                    {images.length > 4 && (
                      <Button
                        conClick={() => fileInputRef.current?.click()}
                        className="w-[100px] h-[100px]"
                        variant="outline"
                      >
                        <Upload className="h-6 w-6" />
                        <span className="sr-only">Upload Image</span>
                      </Button>
                    )}
                  </div>
                  </div>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                  <p className="text-sm  text-muted-foreground mt-2  ">
                    Upload upto 4 images. Supported Formats: JPF, PNG, GIF
                  </p>
                </div>
              </div>
           
         
          </CardContent>
        </div>



        <CardFooter>
          <Button type="submit" className=" w-full " disabled={isLoading}  >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animated-spin" />}
            {isLoading ? "Adding Product..." : "Add Product"}
          </Button>
        </CardFooter>
       
      </form>
      
    </div>
  );
};

export default CreateProducts;
