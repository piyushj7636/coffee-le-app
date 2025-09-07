import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id='contact' className="bg-black text-white px-6 py-12 text-sm">
      <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">

        {/* Visit Section */}
        <div>
          <h4 className="text-pink-400 font-semibold mb-4 text-base">Visit Coffee Le</h4>
          <p className="text-gray-300">223, Shakti-khand 3, Indirapuram 201014</p>
          <p className="text-gray-300 mt-1">+91 75035 67636</p>
          <p className="text-gray-300 mt-1">piyushj7636@gmail.com</p>
        </div>

        {/* Hours Section */}
        <div>
          <h4 className="text-pink-400 font-semibold mb-4 text-base">Hours</h4>
          <ul className="text-gray-300 space-y-1">
            <li>Monday - Friday: 6:00 AM - 8:00 PM</li>
            <li>Saturday: 7:00 AM - 9:00 PM</li>
            <li>Sunday: 8:00 AM - 6:00 PM</li>
          </ul>
        </div>

        {/* Logo + Copyright */}
        <div className="flex flex-col justify-end items-start sm:col-span-2 md:col-span-1 mt-8 md:mt-0">
          <h1 className="text-pink-400 font-bold text-lg mb-2">Coffee Le</h1>
          <p className="text-gray-400">© 2024 Coffee Le. All rights reserved.</p>
          <p className="text-gray-500">Crafted with <span className="text-pink-400">❤️</span> and lots of <span className="text-yellow-400">☕</span></p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;