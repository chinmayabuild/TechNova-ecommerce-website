import React from "react";
import { useState }  from "react"; 
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";



const SignUp = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <div className="w-[60vh] lg:w-[25vw] mx-auto my-10 grid gap-10">
        <h1 className=" text-2xl font-bolt  ">Register your Account</h1>
        <form className="grid gap-3">
          <Input placeholder="Enter Your Name" type="text" name="name" />
          <Input placeholder="Enter Your Email" type="Email" name="email" />
          <Input placeholder="Enter Your Number" type="phone" name="name" />
          <Input
            placeholder="Enter Your Password"
            type="password"
            name="password"
          />

          <div className="flex items-center space-x-2 cursor-pointer">
            <Checkbox id="terms" onCheckedChange={(e)=> setEnabled(e)} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>

          <Button disabled={!enabled}> Sign Up </Button>


          <div className="flex gap-2 items-center">

            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Already have an account ?
            </label>
            <Link to={"/login"}>
              <label
                htmlFor="terms"
                className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Login
              </label>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
