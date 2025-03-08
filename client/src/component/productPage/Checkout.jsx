import React, { useState } from "react";
import CheckOutProducts from "./CheckOutProducts";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useErrorLogout from "../hooks/use-error-logout";
import useRazorpay from "../hooks/use-razorpay";
import { toast } from "sonner";
import { emptyCart } from "@/redux/slices/cartSlice";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleErrorLogout } = useErrorLogout();
  const { generatePayment, verifyPayment } = useRazorpay();

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast("Cart is empty", {
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }

    if (!address.trim()) {
      toast("Please provide a shipping address", {
        style: {
          backgroundColor: "red",
          color: "white",
          fontWeight: "bold",
        },
      });
      return;
    }

    const productArray = cartItems.map((item) => ({
      id: item._id,
      quantity: item.quantity,
    }));

    setIsLoading(true);
    try {
      const amountInPaise = totalPrice * 100; // Convert rupees to paise

      const options = await generatePayment(amountInPaise);
      if (options) {
        await verifyPayment(options, productArray, address);
        toast("Order placed successfully!", {
          style: { backgroundColor: "green", color: "white" },
        });
        dispatch(emptyCart());
        navigate("/success");
      } else {
        toast("Failed to generate payment order", {
          style: {
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
          },
        });
      }
    } catch (error) {
      handleErrorLogout(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-[90vw] sm:w-[60vw] flex justify-between items-center sm:my-20">
      <div className="flex flex-col sm:flex-row gap-4 mx-auto my-10">
        {/* Product Details */}
        <div className="space-y-8">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-medium">Order Summary</h2>
            <div className="space-y-1 text-3xl">
              {cartItems.length === 0 ? (
                <h2 className="text-primary text-3xl">
                  Nothing to show, Please add some products.
                </h2>
              ) : (
                cartItems.map((item) => (
                  <CheckOutProducts key={item?._id} {...item} />
                ))
              )}
            </div>
            <hr />
            <div className="p-3 rounded-md">
              <p className="flex justify-between items-center">
                <span className="font-semibold text-customGray">Subtotal:</span>
                <span className="font-bold">₹{totalPrice}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-semibold text-customGray">Tax:</span>
                <span className="font-bold">₹0</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-semibold text-customGray">Shipping Cost:</span>
                <span className="font-bold">₹0</span>
              </p>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="w-[90vw] sm:w-[20vw]">
          <Card className="p-4 shadow-md space-y-4">
            <h2 className="text-xl font-medium">Billing Information</h2>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="w-full"
                value={user?.name || ""}
                readOnly // Added to fix warning
              />
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@gmail.com"
                className="w-full mt-1"
                value={user?.email || ""}
                readOnly // Added to fix warning
              />
              <Label htmlFor="address">Shipping Address</Label>
              <Textarea
                rows="7"
                id="address"
                placeholder="City, Area, Landmark and Pincode"
                className="w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <Button
              className="bg-orange-600 text-white"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Place Order"}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;