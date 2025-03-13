import React, { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { Link } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import { User, Menu } from "lucide-react";
import LogoutToggle from "./LogoutToggle";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 flex justify-between items-center max-sm:px-6 px-14 py-5 border-b dark:bg-zinc-900 bg-white z-50">
      {/* Left Section: Mobile Menu and Desktop Links */}
      <div className="flex items-center">
        {/* Mobile Menu Icon and Sidebar */}
        <div className="sm:hidden">
          <Menu
            size={28}
            strokeWidth={1.4}
            className="text-[#e9660d] cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {isMenuOpen && (
            <ul className="absolute top-16 left-0 w-48 bg-white dark:bg-zinc-900 border-r border-b p-4 flex flex-col gap-3 text-[#e9660d] z-50 hover:scale-105 transition-all ease-in-out">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/orders"
                      className="nav-link hover:scale-105 transition-all ease-in-out"
                      data-text="Orders"
                    >
                      <span>Orders</span>
                    </Link>
                  </li>
                  <Link
                    to="/logout"
                    className="nav-link hover:scale-105 transition-all ease-in-out"
                    data-text="Logout"
                  >
                    <span>Logout</span>
                  </Link>
                </>
              ) : (
                <li>
                  <Link to="/login">
                    <User
                      size={28}
                      strokeWidth={1.4}
                      className="text-gray-800 dark:text-white hover:scale-105 transition-all ease-in-out"
                    />
                  </Link>
                </li>
              )}
              <li>
                <Link to="/about" className="nav-link" data-text="About">
                  <span>About</span>
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden sm:flex gap-3 text-m justify-center text-[#e9660d] items-center">
          {isAuthenticated ? (
            <LogoutToggle user={user} />
          ) : (
            <Link to="/login">
              <User
                size={28}
                strokeWidth={1.4}
                className="text-gray-800 dark:text-white hover:scale-105 transition-all ease-in-out"
              />
            </Link>
          )}
          <Link to="/" className="nav-link" data-text="Home">
            <span>Home</span>
          </Link>
          <Link to="/about" className="nav-link" data-text="About">
            <span>About</span>
          </Link>
          <Link to="/product/page" className="nav-link" data-text="Product">
            <span>Product</span>
          </Link>
          <Link to="/orders" className="nav-link" data-text="Orders">
            <span>Orders</span>
          </Link>
        </ul>
      </div>

      {/* Center Section: Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to="/" className="text-3xl  sm:text-2xl font-semibold">
          Sonix Store
        </Link>
      </div>

      {/* Right Section: ModeToggle and CartDrawer */}
      <div className="flex gap-3 justify-center items-center text-[#e9660d]">
        <ModeToggle />
        <CartDrawer />
      </div>
    </nav>
  );
};

export default Navbar;