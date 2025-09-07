import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { ProfileCard } from "./ProfileCard";
import HamburgerIcon from "./HamburgerIcon";
import { ArrowLeft } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);
  const navigate = useNavigate();

  const toggleProfileCard = () => {
    setIsProfileCardVisible((prev) => !prev);
  };
  return (
    <>
      {location.pathname === "/" ? (
        <header className="flex items-center justify-between px-6 py-4 bg-black text-white shadow-md sticky top-0 z-50">
          <div className="sm:hidden flex">
            <HamburgerIcon />
          </div>
          {/* Logo Section */}
          <div className="flex items-center sm:gap-3 gap-2">
            <div className="text-pink-500 text-2xl">☕</div>
            <h1 className="sm:text-xl text-lg font-semibold">Coffee Le</h1>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex gap-6 text-md font-medium">
              <li>
                <ScrollLink
                  to="menu"
                  smooth={true}
                  duration={500}
                  className="hover:text-pink-300 transition sm:flex hidden"
                >
                  Menu
                </ScrollLink>
              </li>
              <li>
                <div className="hover:text-pink-300 transition sm:flex hidden">
                  About
                </div>
              </li>
              <li>
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="hover:text-pink-300 transition sm:flex hidden"
                >
                  Contact
                </ScrollLink>
              </li>
              <li>
                <Link
                  to="cart"
                  className="hover:text-pink-300 transition sm:flex hidden"
                >
                  Cart
                </Link>
              </li>
              <li>
                <a>
                  <CgProfile size={24} onClick={toggleProfileCard} />
                </a>
              </li>
            </ul>
          </nav>
        </header>
      ) : (
        <header className="flex items-center justify-between px-6 py-4 bg-black text-white shadow-md sticky top-0 z-50">
          {/* Logo Section */}
          <div className="sm:hidden flex">
            <button
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
            </button>
            
          </div>
          <div
            onClick={() => navigate("/")}
            className="flex items-center sm:gap-3 gap-2 cursor-pointer"
          >
            <div className="text-pink-500 sm:text-2xl text-lg">☕</div>
            <h1 className="sm:text-xl text-lg font-semibold">Coffee Le</h1>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex gap-6 text-md font-medium">
              <li>
                <RouterLink
                  to="/cart"
                  className="hover:text-pink-300 transition"
                >
                  Cart
                </RouterLink>
              </li>
            </ul>
          </nav>
        </header>
      )}
      {isProfileCardVisible && (
        <div className="absolute top-16 right-4 z-50">
          <ProfileCard
            isOpen={isProfileCardVisible}
            toggleProfileCard={toggleProfileCard}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
