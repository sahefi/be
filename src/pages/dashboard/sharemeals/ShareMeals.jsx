// ShareMeals.jsx
import { useEffect, useState } from 'react';
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import { motion } from "framer-motion";
import CardShareMeals from "../../../components/dashboard/sharemeals/CardShareMeals";
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShareMeals = () => {
  const [products, setProducts] = useState([]);  

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8085/produk");
      setProducts(response.data); // Perbarui state dengan data dari API
    } catch (error) {
      console.error("Gagal memuat produk:", error);
      alert("Terjadi kesalahan saat memuat produk.");
    }
  };

  useEffect(() => {
    fetchProducts(); // Muat data produk saat pertama kali render
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar without animation */}
      <Sidebar />

      <section className="bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <Navbar />

          <motion.div
            className="p-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Page Title */}
            <motion.h1
              className="text-[#45c517] text-3xl font-bold mb-6"
              variants={itemVariants}
            >
              Share Meals
            </motion.h1>

            {/* Products Section */}
            <motion.section variants={containerVariants}>
              <motion.h2
                className="text-xl font-semibold text-[#45c517] mb-6"
                variants={itemVariants}
              >
                Produk yang anda bagikan
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <CardShareMeals key={product.id} product={product} onDelete={fetchProducts} />
                ))}
              </div>
            </section>

            {/* Floating Button */}
            <motion.div
              className="fixed right-10 bottom-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5,
              }}
            >
              <Link to="/share-meals/form">
                <motion.button
                  className="bg-[#47cb18] hover:bg-green-600 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(71, 203, 24, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Bagikan Produk
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShareMeals;
