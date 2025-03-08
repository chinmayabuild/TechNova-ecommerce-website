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
import { toast } from "sonner";
import useErrorLogout from "../hooks/use-error-logout";
import axios from "axios"; // Added missing axios import

const CreateProducts = () => {
  const [currentColor, setCurrentColor] = useState("#000000");
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const { handleErrorLogout } = useErrorLogout(); // Fixed typo in variable name

  const addColor = (e) => {
    e.preventDefault();
    if (!colors.includes(currentColor)) {
      setColors([...colors, currentColor]);
    }
  };

  const removeColor = (colorToRemove) => {
    setColors(colors.filter((color) => color !== colorToRemove));
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        preview: URL.createObjectURL(file), // Fixed syntax error
        file: file,
      }));
      setImages((prevImages) => [...prevImages, ...newImages].slice(0, 4));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Added to show loading state

    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const stock = e.target.stock.value;
    const category = e.target.category.value;

    if (!name || !description || !price || !stock || !category || colors.length === 0 || images.length === 0) {
      toast("Please fill all fields");
      setIsLoading(false);
      return;
    }

    if (name.trim() === "" || description.trim() === "" || price <= 0 || stock <= 0 || category.trim() === "") {
      toast("Fields can't be empty or invalid");
      setIsLoading(false);
      return;
    }

    if (images.length < 4) { // Fixed condition (was <= 4)
      toast("Please upload at least 4 images");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    colors.forEach((color) => formData.append("colors", color));
    images.forEach((image) => formData.append("images", image.file)); // Fixed typo and access

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Fixed typo
          },
        }
      );

      toast("Product added successfully");
    } catch (error) {
      handleErrorLogout(error, "Error uploading product"); // Fixed function name
    } finally {
      setIsLoading(false); // Moved to finally block
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center absolute inset-0">
        <Loader2 className="h-12 w-12 animate-spin" /> {/* Fixed typo */}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl -z-10">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Product</CardTitle>
        <CardDescription>
          Enter the details of the product you want to add to your e-commerce store.
        </CardDescription>
      </CardHeader>

      <form onSubmit={onSubmit}>
        <div className="flex flex-col lg:flex-row lg:w-[70vw]">
          <CardContent className="w-full">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input type="text" id="name" placeholder="Enter product name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                rows="4"
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
              <Input type="number" id="stock" placeholder="20" min="0" required />
            </div>
          </CardContent>

          <CardContent className="w-full">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required>
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
                    <span className="text-sm mr-1 dark:text-slate-900">{color}</span>
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
                {images.map((image, index) => ( // Fixed map syntax
                  <div className="relative" key={index}>
                    <img
                      src={image.preview} // Fixed image source
                      alt={`Product image ${index + 1}`} // Fixed template literal
                      width={100}
                      height={100}
                      className="rounded-md object-cover" // Fixed typo
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => removeImage(index)} // Fixed to use index
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove image</span>
                    </Button>
                  </div>
                ))}
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
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Images
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Upload up to 4 images. Supported Formats: JPG, PNG, GIF
              </p>
            </div>
          </CardContent>
        </div>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Adding Product..." : "Add Product"}
          </Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default CreateProducts;