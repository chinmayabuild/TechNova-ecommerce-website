import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Link, useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { setUserLogout } from "@/redux/slices/authSlice";

const LogoutToggle = ({ user }) => { 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(setUserLogout());
    localStorage.removeItem("auth"); // Clear stored auth data
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback className="text-xl">
            <img src="" alt="" />
            {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/orders")}>
          Orders
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogoutToggle;
