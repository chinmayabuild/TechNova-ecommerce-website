import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setUserLogin } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux"; 

const Login = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;
    if (email.value.trim() === "" || password.value.trim() === "") {
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email: email.value,
          password: password.value,
        }
      );

      dispatch(
        setUserLogin({
          role: data.role || "user",
          user: data.user || { name: email.value, email: email.value }, // Defaulting to email if user data is missing
          token: data.token,
        })
      );

      toast(data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
          fontWeight: "bold",
        },
      });

      setTimeout(() => navigate("/"), 0);
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error);

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
    <div className="w-[40vh] lg:w-[25vw] mx-auto my-32 grid gap-10">
      <h1 className="text-2xl font-bold">Login into your Account</h1>
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <Input placeholder="Enter Your Email" type="email" name="email" />
        <Input
          placeholder="Enter Your Password"
          type="password"
          name="password"
          autoComplete="current-password"
          className="text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        />
        <Button>Login</Button>

        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium leading-none">
            Don't have an account?
          </label>
          <Link to="/signup">
            <span className="text-yellow-500 cursor-pointer font-medium">Signup</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
