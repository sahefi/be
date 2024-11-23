// ShareMeals.jsx
import { useEffect, useState } from 'react';
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import { motion } from "framer-motion";
import CardShareMeals from "../../../components/dashboard/sharemeals/CardShareMeals";
import { Link } from 'react-router-dom';

const ShareMeals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch('/productData.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data.filter(product => product.category === 'Makanan'));
      })
      .catch(error => console.error('Error fetching product data:', error));
    
  }, []);

  return (
    <motion.div
      className="flex min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar />
      <section className="bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <Navbar />
          
          <div className="p-10">
            <h1 className="text-[#45c517] text-2xl font-bold mb-4">Share Meals</h1>
            
            <section>
              <h2 className="text-xl font-semibold text-[#45c517] mb-3">
                Produk yang anda bagikan
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <CardShareMeals key={product.id} product={product} />
                ))}
              </div>
            </section>

            <div className="fixed right-10 bottom-10">
              <Link to="/share-meals/form">
                <button className="bg-[#47cb18] hover:bg-green-600 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl">
                  Bagikan Produk
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ShareMeals;