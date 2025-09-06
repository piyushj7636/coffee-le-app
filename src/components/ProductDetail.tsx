import React from "react";
import { useParams } from "react-router-dom";
import { useAddToCartMutation, useGetProductQuery } from "../services/apiSlice";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setQuantity, setSize } from "../features/auth/cartSlice";
import type { RootState } from "../app/store";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  inStock: boolean;
  rating?: number;
  stock: number;
  size: string[];
}

export const ProductDetail: React.FC = () => {
  const {id} = useParams()
  const {data: product} = useGetProductQuery(id)
  const [addToCart] = useAddToCartMutation()
  const dispatch = useDispatch()
  const {
      quantity,
      size: selectedSize
    } = useSelector((state: RootState) => state.auth.cart);

  const handleDecreaseQuanity = () => {
    const newQuanity = Math.max(1, quantity - 1)
    dispatch(setQuantity(newQuanity))
  }

  const handleIncreaseQuantity = () => {
    dispatch(setQuantity(quantity + 1))
  }

  const handleAddToCart = async() => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    await addToCart({id, quantity, selectedSize}).unwrap()
    console.log(id)
  }

  return (
    <>
    <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center px-6 py-10">
        {product && (
          <div className="flex flex-col md:flex-row w-full md:w-5/6 lg:w-4/5 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
            {/* Left: Image */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-6">
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400,h_400,c_fit/${product.imageId}`}
                alt={product.name}
                className="rounded-xl shadow-xl max-h-[450px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Right: Product Details */}
            <div className="flex-1 p-8 flex flex-col">
              {/* Title */}
              <h1 className="text-4xl font-extrabold text-white mb-3">
                {product.name}
              </h1>

              <span
                className="px-3 py-1 rounded-full text-xs font-semibold w-fit mb-4 bg-green-900 text-green-300"
              >
                In Stock
              </span>

              {/* Price */}
              <div className="text-3xl font-bold text-pink-500 mb-6">
                ₹{(product.price/100).toFixed(2)}
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Select Size
                </h3>
                <div className="flex gap-3">
                  {["Small", "Medium", "Large"].map((option) => (
                    <button
                      key={option}
                      className={`px-4 py-2 rounded-lg font-medium transition-all border ${
                        selectedSize === option
                          ? "bg-pink-600 text-white border-pink-600 shadow-lg"
                          : "border-gray-600 text-gray-300 hover:border-pink-500 hover:text-pink-400"
                      }`}
                      onClick={() => dispatch(setSize(option))}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Quantity
                  </h3>
                  <div className="flex items-center gap-4">
                    <button
                      className="w-10 h-10 rounded-lg border border-gray-700 text-white hover:border-pink-500 transition"
                      onClick={handleDecreaseQuanity}
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold text-white">
                      {quantity}
                    </span>
                    <button
                      className="w-10 h-10 rounded-lg border border-gray-700 text-white hover:border-pink-500 transition"
                      onClick={handleIncreaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="px-6 py-3 rounded-xl shadow-lg font-bold text-lg transition bg-pink-600 hover:bg-pink-700 text-white"
                  onClick={handleAddToCart}
                >
                  🛒 Add to Basket
                </button>
              </div>

              {/* Description */}
              <div className="text-gray-400 leading-relaxed">
                {product.description}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};