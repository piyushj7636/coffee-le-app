import { useGetProductsQuery } from '../services/apiSlice';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  rating: number;
  time: string;
  id: number;
  imageId: string;
  category: string;
}

const Menu = () => {

  const {data} = useGetProductsQuery(undefined)
  const navigate = useNavigate()

  return (
    <section id='menu' className="bg-black text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
            Explore Our <span className='text-pink-400 cursor-pointer underline' onClick={() => navigate("/menu")}>Menu</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Handcrafted selections with love, speed, and great taste ☕
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid gap-8 sm:grid-cols-2">
          {data && data.map((item: MenuItem, idx: number) => (
            <div
              key={idx}
              onClick={() => navigate(`/product/${item.id}`)}
              className="border border-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition flex justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>₹{item.price/100}</span>
                </div>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_300,c_fit/${item.imageId}`}
                  alt={item.name}
                  className="max-h-80 rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          )).slice(0, 8)}
        </div>
      </div>
    </section>
  );
};

export default Menu;