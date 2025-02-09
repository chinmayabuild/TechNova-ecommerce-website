import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="w-[60vh] lg:w-[25vw] mx-auto my-32 grid gap-10">
        <h1 className=" text-2xl font-bolt  ">Login into your Account</h1>
        <form className="grid gap-3">
          <Input placeholder="Enter Your Email" type="Email" name="email" />
          <Input
            placeholder="Enter Your Password"
            type="password"
            name="password"
            className="text-sm font-medium leeding-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          />

          <Button> Login </Button>

          <div className="flex gap-2 items-center">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Don't have an account ?
            </label>
            <Link to={"/signup"}>
              <label
                htmlFor="terms"
                className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Signup
              </label>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
