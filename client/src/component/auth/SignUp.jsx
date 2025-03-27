import React, { useState } from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";  
import axios from "axios"; // Added axios import

const SignUp = () => {
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, password } = e.target.elements;

    if (
      name.value.trim() === "" ||
      email.value.trim() === "" ||
      phone.value.trim() === "" ||
      password.value.trim() === ""
    ) {
      toast("⚠️ Please fill in all the fields!", {
        style: {
          backgroundColor: "red",
          color: "white",
          fontWeight: "bold",
        },
      });
      return;
    }

    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/signup", {
        name: name.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
      });

      const data = res.data;
      console.log("✅ API Response:", data);

      // Success Toast Notification with Green Background & White Text
      toast(data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
          fontWeight: "bold",
        },
      });

      // Redirect after successful signup
      setTimeout(() => navigate("/login"), 1000); // Small delay before redirection

    } catch (error) {
      console.error("❌ Signup Error:", error.response?.data || error);

      // Show error message in toast
      toast(error.response?.data?.message || "An error occurred", {
        style: {
          backgroundColor: "red",
          color: "white",
          fontWeight: "bold",
        },
      });
    }
  };

  return (
    <div className="w-[40vh] lg:w-[25vw] mx-auto my-10 grid gap-10">
      <h1 className="text-2xl font-bold">Register your Account</h1>
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <Input placeholder="Enter Your Name" type="text" name="name" autoComplete="name" />
        <Input placeholder="Enter Your Email" type="email" name="email" autoComplete="email" />
        <Input placeholder="Enter Your Number" type="tel" name="phone" autoComplete="tel" />
        <Input
          placeholder="Enter Your Password"
          type="password"
          name="password"
          autoComplete="new-password"
        />

        <div className="flex items-center space-x-2 cursor-pointer">
          <Checkbox id="terms" onCheckedChange={(checked) => setEnabled(checked)} />
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </Label>
        </div>

        <Button disabled={!enabled}>Sign Up</Button>

        <div className="flex gap-2 items-center">
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Already have an account?
          </Label>
          <Link to="/login">
            <Label className="text-xl font-medium cursor-pointer text-yellow-500  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Login
            </Label>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
