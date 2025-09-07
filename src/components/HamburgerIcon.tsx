import { useState } from "react";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";

const HamburgerIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Hamburger toggled={isOpen} toggle={setIsOpen} size={24} />
      {isOpen && (
        <div className="h-100vh bg-white/30 backdrop-blur p-6 shadow-xl text-center border border-gray-700 fixed inset-0 bg-opacity-90 z-40 items-start w-[50%]">
          <div className="text-center">
            <ul
              onClick={() => setIsOpen(false)}
              className="text-black font-bold text-lg space-y-4 mt-20"
            >
              <li className="border-b border-gray-500 w-full pb-2">
                <Link
                  to="/"
                  className="hover:text-gray-400 transition-transform duration-300"
                >
                  HOME
                </Link>
              </li>
              <li className="border-b border-gray-500 w-full pb-2">
                <Link
                  to="/menu"
                  className="hover:text-gray-400 transition-transform duration-300"
                >
                  MENU
                </Link>
              </li>
              <li className="border-b border-gray-500 w-full pb-2">
                <Link
                  to="/cart"
                  className="hover:text-gray-400 transition-transform duration-300"
                >
                  CART
                </Link>
              </li>
              <li className="border-b border-gray-500 w-full pb-2">
                <Link
                  to="/about"
                  className="hover:text-gray-400 transition-transform duration-300"
                >
                  ABOUT
                </Link>
              </li>
              <li className="border-b border-gray-500 w-full pb-2">
                <Link
                  to="/contact"
                  className="hover:text-gray-400 transition-transform duration-300"
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerIcon;
