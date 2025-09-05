import React from "react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Tagline */}
        <p className="text-pink-400 text-sm uppercase tracking-wide mb-4">
          Every Sip Counts
        </p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
          Let your morning <span className="text-pink-400">begin</span> with joy
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-lg sm:text-xl mb-8">
          Whether you love espresso shots or creamy lattes, we've got your back.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="bg-pink-500 hover:bg-pink-400 text-white font-semibold py-2 px-6 rounded transition"
          >
            Order Now
          </button>
          <button
            onClick={() => navigate("/menu")}
            className="border border-pink-500 hover:border-pink-400 text-pink-400 hover:text-pink-300 font-semibold py-2 px-6 rounded transition"
          >
            View Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
