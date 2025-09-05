import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
import { ProfileCard } from './ProfileCard';

const Navbar: React.FC = () => {

  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileCardVisible, setIsProfileCardVisible] = useState(false)
  const navigate = useNavigate()

  const toggleProfileCard = () => {
		setIsProfileCardVisible((prev) => !prev)
	}
  return (
    <>
    {
      (location.pathname === '/') ?
    <header className="flex items-center justify-between px-6 py-4 bg-black text-white shadow-md sticky top-0 z-50">
      {/* Logo Section */}
      <div
        className="flex items-center gap-3">
        <div className="text-pink-500 text-2xl">
          ☕
        </div>
        <h1 className="text-xl font-semibold">Coffee Le</h1>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="flex gap-6 text-md font-medium">
          <li>
						<ScrollLink
							to="menu"
							smooth={true}
							duration={500}
							className="hover:text-pink-300 transition"
						>
							Menu
						</ScrollLink>
          </li>
          <li>
						<div className='hover:text-pink-300 transition'>About</div>
          </li>
          <li>
						<ScrollLink
							to="contact"
							smooth={true}
							duration={500}
							className="hover:text-pink-300 transition"
						>
							Contact
						</ScrollLink>
          </li>
          <li>
						<Link
							to="cart"
							className="hover:text-pink-300 transition"
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
    : (
      <header className="flex items-center justify-between px-6 py-4 bg-black text-white shadow-md sticky top-0 z-50">
      {/* Logo Section */}
      <div
      onClick={() => navigate('/')}
      className="flex items-center gap-3 cursor-pointer">
        <div className="text-pink-500 text-2xl">
          ☕
        </div>
        <h1 className="text-xl font-semibold">Coffee Le</h1>
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