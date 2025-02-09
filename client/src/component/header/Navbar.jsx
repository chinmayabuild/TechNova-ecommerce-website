import React, { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { Link } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import { User } from "lucide-react";
import LogutToggle from "./LogoutToggle"

const Navbar = () => {
  const [isAuthenticated, setAuthenticated] = useState(true);

  return (
    <nav className="flex justify-between items-center px-8 py-5 border-b dark:bg-zinc-900">
      <div className="flex gap-3 justify-center items-center">
        <ModeToggle />
        <CartDrawer />
        {isAuthenticated ? (
          <LogutToggle/>
        ) : (
          <Link to="/login">  
            <User
              size={28}
              strock-width={1.4}
              className="text-gray-800 dark:text-white hover:scale-105 transition-all ease-in-out"
            />
          </Link>
        )}
      </div>
      <Link to="/" className="text-2xl font-bold">
        codeStore
      </Link>
      <ul className="hidden sm:flex gap-2 text-xl">
        <Link to="/">About</Link>
        <Link to="/">Faqs</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
