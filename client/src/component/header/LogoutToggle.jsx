import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";

const LogutToggle = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className=" cursor-pointer">
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback className="text-xl" >CD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger >
      <DropdownMenuContent>
        <DropdownMenuItem>Logout</DropdownMenuItem>
       <Link to ='/orders'>
        <DropdownMenuItem>orders</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default LogutToggle;
