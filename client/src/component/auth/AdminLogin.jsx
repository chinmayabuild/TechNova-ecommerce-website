import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const AdminLogin = () => {
  return (
    <div className="w-[60vh] lg:w-[25vw] mx-auto my-32 grid gap-10">
      <h1 className=" text-2xl font-bolt">Login into your Account</h1>
      <form className="grid gap-3">
        <Input
          placeholder="Username Here..."        
          type="text"
          name="username"
        />
        <Input
          placeholder="Password Here..."
          type="password"
          name="password"
          className="text-sm font-medium leeding-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        />
        <Button> Login </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
