import React from "react";
import CheckOutProducts from "./CheckOutProducts";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Checkout = () => {
  return (
    <div className="mx-auto w-[90vw] sm:w-[60vw] flex justify-between items-center sm:my-20">
      <div className="flex flex-col sm:flex-row gap-4 mx-auto my-10 ">
        {/* product details */}
        <div className="space-y-8">
          <div className="p-4 space-y-4">
            <h2 className="text-xl fornt-medium">Order Summary</h2>
            <div className="y-1 text-3xl ">
              <CheckOutProducts />
              <CheckOutProducts />
            </div>
            <hr />

            <div className="p-3 rounded-md ">
              <p className="flex justify-between items-center ">
                <span className="font-semibold text-customGray">Subtotal:</span>
                <span className="font-bold">₹599</span>
              </p>
              <p className="flex justify-between items-center ">
                <span className="font-semibold text-customGray">Tax:</span>
                <span className="font-bold">₹0</span>
              </p>
              <p className="flex justify-between items-center ">
                <span className="font-semibold text-customGray">
                  Shipping Cost:
                </span>
                <span className="font-bold">₹0</span>
              </p>
            </div>
          </div>
        </div>

        {/* persional details */}
        <div className="w-[90vw]  sm:w-[20vw]">
          <Card className="p-4 shadow-md  space-y-4">
            <h2 className="text-xl font-medium">Billing Information</h2>
            <div className="space-y-2">
              <Label htmlFor="Name">Full Name</Label>
              <Input id="name" placeholder="John Doe" className="w-full" />
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="name"
                type="email"
                placeholder="Jjohn@gmail.com"
                className="w-full"
              />
              <Label htmlFor="address">Shipping Address</Label>
              <Textarea
                row="7"
                id="address"
                placeholder="123 Min st. city ,state"
                className="w-full"
              />
            </div>
            <Button> Place Order</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
