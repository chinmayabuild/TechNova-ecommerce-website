import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Settings = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-screen sm:w-[80vw] sm:justify-start ">
      {/*Change username  */}
      <div>
        <h2 className="text-2xl font-bold  margin-">Change Username</h2>
        <form action="" className="grid gap-3 w-[80vw] sm:w-[30vw]">
          <Input
            type="text"
            placeholder="Enter previous username"
            name="previousUsername"
            className=""
          />
          <Input
            type="text"
            placeholder="Enter new username"
            name="newUsername"
            className=""
          />
          <Button type="submit" className="w-fit" >Change Username</Button>
        </form>
      </div>
      {/* change password */}
      <div>
        <h2 className="text-2xl font-bold  margin-">Change Password</h2>
        <form action="" className="grid gap-3 w-[80vw] sm:w-[30vw]">
          <Input
            type="text"
            placeholder="Enter previous password"
            name="previousUsername"
            className=""
          />
          <Input
            type="text"
            placeholder="Enter new password"
            name="newUsername"
            className=""
          />
          <Button type="submit" className="w-fit" >Change Password </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
