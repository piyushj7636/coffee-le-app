import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Search } from "lucide-react";

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

const ExploreMenu = () => {
	const {data, isLoading} = useGetProductsQuery()
	const [text, setText] = useState("")
	const navigate = useNavigate()
	const [filteredData, setFilteredData] = useState(data)

	useEffect(() => {
		if(data){
			setFilteredData(data.filter((p) => p.name.toLowerCase().includes(text.toLowerCase())))
		}
	}, [text, data])
  return (
		<>
		<Navbar />
		<div className="flex flex-col items-center justify-center py-8 bg-black">

      <div className="flex items-center gap-2 text-white text-sm tracking-widest mb-6 ">
        <span className="text-gray-400">⎯⎯</span>
        <span className="uppercase font-bold text-2xl">Menu</span>
        <span className="text-gray-400">⎯⎯</span>
      </div>

      <div className="sm:w-full w-75 max-w-xl">
        <div className="flex items-center bg-gray-100 rounded-full px-5 sm:py-3 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Search for your favourite coffee"
						value={text}
						onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 font-medium"
          />
          <Search className="text-gray-400 w-5 h-5" />
        </div>
      </div>
    </div>
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <div>
          <h2 className="sm:text-3xl text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
            Brews & Bites
          </h2>

          <div className="grid sm:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-8">
						{isLoading ? (
							<h1>Loading the menu...</h1>
						) : (filteredData && filteredData.filter((item: MenuItem)=> item.category === "Brews And Bites").map((item: MenuItem) => (
							<div
								key={item.id}
								onClick={() => navigate(`/product/${item.id}`)}
								className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-pink-500/20 transition">
								<div className="h-48 w-full bg-gray-700 flex items-center justify-center">
									<img
										src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_full,c_fit/${item.imageId}`}
										alt="Product"
										className="h-full w-full object-cover"
									/>
								</div>
								<div className="p-5 flex flex-col">
									<h3 className="sm:text-xl font-semibold mb-2">{item.name}</h3>
									<p className="text-sm text-gray-400 mb-3 line-clamp-2">
										{item.description}
									</p>
									<div className="flex items-center justify-between mt-auto">
										<span className="sm:text-lg text font-bold text-pink-400">
											₹{(item.price/100).toFixed(2)}
										</span>
										<button className="sm:px-4 sm:py-2 hidden sm:flex rounded-lg bg-pink-600 hover:bg-pink-700 font-semibold text-white transition">
											Add
										</button>
									</div>
								</div>
							</div>
						)))}

          </div>
        </div>

				<div>
          <h2 className="sm:text-3xl text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
            Matcha
          </h2>

          <div className="grid sm:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-8">
						{filteredData && filteredData.filter((item: MenuItem)=> item.category === "Matcha").map((item: MenuItem) => (
							<div
								key={item.id}
								onClick={() => navigate(`/product/${item.id}`)}
								className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-pink-500/20 transition">
								<div className="h-48 w-full bg-gray-700 flex items-center justify-center">
									<img
										src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_full,c_fit/${item.imageId}`}
										alt="Product"
										className="h-full w-full object-cover"
									/>
								</div>
								<div className="p-5 flex flex-col">
									<h3 className="sm:text-xl font-semibold mb-2">{item.name}</h3>
									<p className="text-sm text-gray-400 mb-3 line-clamp-2">
										{item.description}
									</p>
									<div className="flex items-center justify-between mt-auto">
										<span className="sm:text-lg font-bold text-pink-400">
											₹{(item.price/100).toFixed(2)}
										</span>
										<button className="sm:px-4 sm:py-2 hidden sm:flex rounded-lg bg-pink-600 hover:bg-pink-700 font-semibold text-white transition">
											Add
										</button>
									</div>
								</div>
							</div>
						))}

          </div>
        </div>

				<div>
          <h2 className="sm:text-3xl text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
            Combos
          </h2>

          <div className="grid sm:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-8">
						{filteredData && filteredData.filter((item: MenuItem)=> item.category === "Combos").map((item: MenuItem) => (
							<div
								key={item.id}
								onClick={() => navigate(`/product/${item.id}`)}
								className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-pink-500/20 transition">
								<div className="h-48 w-full bg-gray-700 flex items-center justify-center">
									<img
										src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_full,c_fit/${item.imageId}`}
										alt="Product"
										className="h-full w-full object-cover"
									/>
								</div>
								<div className="p-5 flex flex-col">
									<h3 className="sm:text-xl font-semibold mb-2">{item.name}</h3>
									<p className="text-sm text-gray-400 mb-3 line-clamp-2">
										{item.description}
									</p>
									<div className="flex items-center justify-between mt-auto">
										<span className="sm:text-lg font-bold text-pink-400">
											₹{(item.price/100).toFixed(2)}
										</span>
										<button className="sm:px-4 sm:py-2 hidden sm:flex rounded-lg bg-pink-600 hover:bg-pink-700 font-semibold text-white transition">
											Add
										</button>
									</div>
								</div>
							</div>
						))}

          </div>
        </div>

      </div>
    </div>
		</>
  );
};

export default ExploreMenu;
