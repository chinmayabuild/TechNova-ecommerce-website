import React, { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/slices/productSlice";
import axios from "axios";
import useErrorLogout from "../hooks/use-error-logout";
import { toast } from "sonner";
import Success from "@/pages/Success";
import { removeFromCart } from "@/redux/slices/cartSlice";

const AllProducts = () => {
  const { products } = useSelector((state) => state.product);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [blacklistedProducts, setBlacklistedProducts] = useState(new Set()); // Track blacklist state

  const dispatch = useDispatch();
  const { handleErrorLogout } = useErrorLogout();

  useEffect(() => {
    const getFilterProducts = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/get-products?category=${category}&search=${searchTerm}`
        );

        dispatch(setProducts(res.data.data));

        // Update blacklist state
        const blacklistedSet = new Set(
          res.data.data.filter((product) => product.isBlacklisted).map((p) => p._id)
        );
        setBlacklistedProducts(blacklistedSet);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getFilterProducts();
  }, [searchTerm, category, dispatch]);

  const removeFromBlacklist = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/remove-from-blacklist/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const { message } = res.data;
      setBlacklistedProducts((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });

      toast.success(message, {
        action: {
          label: "Undo",
          onClick: () => blacklistProduct(id),
        },
      });
    } catch (error) {
      handleErrorLogout(error, "Error occurred while reverting changes");
    }
  };

  const blacklistProduct = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/blacklist-product/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const { message } = res.data;
      setBlacklistedProducts((prev) => new Set(prev).add(id));

      toast.success(message);
    } catch (error) {
      handleErrorLogout(error);
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-8 -z-10">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      <div className="mb-8">
        <form className="flex gap-4 items-end sm:w-[78vw]">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Search Products
            </label>
            <div className="relative">
              <Input
                type="text"
                id="search"
                placeholder="Search by name or description"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

            <Select value={category} onValueChange={setCategory}>
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

      {products?.length === 0 ? (
        <p className="text-center text-gray-500">
          No product found, Try adjusting your search or category
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-2 sm:mx-0">
          {products?.map((product) => (
            <Card key={product._id} className="flex flex-col">
              <div className="aspect-square relative">
                <img
                  src={product.image.url}
                  alt={product.name}
                  className="rounded-t-lg object-cover w-full h-full"
                />
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-300">{product.description}</p>
                <p className="text-lg font-bold text-gray-400">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline">
                  <Edit className="mr-2 h-4" /> Edit
                </Button>
                <Button
                  onClick={() => {
                    blacklistedProducts.has(product._id)
                      ? removeFromBlacklist(product._id)
                      : blacklistProduct(product._id);
                  }}
                >
                  {blacklistedProducts.has(product._id)
                    ? "Remove from Blacklist"
                    : "Blacklist Product"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 items-center">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" />
              </div>
              <div className="grid gap-4 items-center">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" />
              </div>
              <div className="grid gap-4 items-center">
                <Label htmlFor="price">Price</Label>
                <Input type="number" id="price" name="price" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProducts;
