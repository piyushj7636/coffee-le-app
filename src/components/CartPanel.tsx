import { useState } from 'react';
import { useDecreaseItemQuantityMutation, useGetCartQuery, useIncreaseItemQuantityMutation, useRemoveFromCartMutation } from '../services/apiSlice';
import { Minus, Plus } from "lucide-react";
import Navbar from './Navbar';

type Product = {
  _id: string;
  name: string;
  price: number;
  imageId: string;
};

type CartItem = {
  productId: Product;
  selectedQuantity: number;
  selectedSize: string;
  _id: string;
}

export const CartPanel: React.FC = () => {
  const [payment, setPayment] = useState(false)
  const {data, isLoading} = useGetCartQuery()
  const [removeFromCart] = useRemoveFromCartMutation()
  const [increaseCartQuantity] = useIncreaseItemQuantityMutation()
  const [decreaseCartQuantity] = useDecreaseItemQuantityMutation()
  const subtotal = data?.products.reduce((acc, item) => acc + (item.productId.price * item.selectedQuantity), 0) || 0;
  const deliveryFee = 3500;
  const taxes = 2000;
  const total = subtotal + deliveryFee + taxes;

  const handleRemoveItem = async (id: string) => {
    await removeFromCart(id)
  }

  const handleIncreaseQuantity = async (item: CartItem) => {
    const id = item?._id
    await increaseCartQuantity(id).unwrap()
  }

  const handleDecreaseQuantity = async (item: CartItem) => {
    if(item.selectedQuantity > 1){
      const id = item?._id
      await decreaseCartQuantity(id).unwrap()
    }
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* 🛒 Left: Cart Items */}
        <div className="flex-1 bg-gray-900 rounded-xl p-6 shadow-lg space-y-6">
          <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">Your Items</h2>

          {isLoading ? (
            <h1>Loading...</h1>
          ) : data?.products.length === 0 ? (
            <p className="text-gray-400">Your cart is empty.</p>
          ) : (
            data?.products.map((item) => (
              <div key={item.productId._id} className="flex items-center gap-4 border-b border-gray-800 pb-4">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_300,c_fit/${item.productId.imageId}`}
                  alt={item.productId.name}
                  className="w-20 h-20 object-cover rounded-lg bg-gray-700"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                  <p className="text-sm text-gray-400">₹{(item.productId.price / 100).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item)}
                      className="p-1 bg-gray-800 rounded hover:bg-gray-700"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-2">{item.selectedQuantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      className="p-1 bg-gray-800 rounded hover:bg-gray-700"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.productId._id)}
                  className="bg-yellow-300 hover:bg-yellow-400 transition-all font-semibold p-2 rounded-lg text-black"
                >Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* 💰 Right: Bill Summary */}
        <div className="w-full md:w-96 bg-gray-900 rounded-xl p-6 shadow-lg space-y-6">
          <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">Bill Details</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span>₹{(subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{(deliveryFee/100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Charges</span>
              <span>₹{(taxes/100).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-700 pt-3 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{(total / 100).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setPayment(true)}
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-bold text-white transition"
          >
            { payment ? "Order placed successfully" :"PROCEED TO PAY" }
          </button>
          {payment && (
            <div className='text-center'>
              <h1 >Your shot will be ready soon !! 😊</h1>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};
