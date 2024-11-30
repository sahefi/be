import { useEffect, useState } from 'react';
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import ProductCard from "../../../components/dashboard/grabmeals/ProductCard";
import CategoryCard from "../../../components/dashboard/CategoryCard";
import { motion } from 'framer-motion';
import axios from 'axios';

const GrabMeals = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null); // State for the selected filter

  // Data Fetching
  useEffect(() => {
    // Fetch Products
    axios.get('http://localhost:8085/produk')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially show all products
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
    
    // Fetch Categories
    fetch('/categoryList.json')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching category data:', error));
  }, []);

  // Handle Filter Change
  const handleFilterChange = (category) => {        
    setSelectedFilter(category);
    
    if (category) {
      // Filter products based on selected category
      const filtered = products.filter((product) => product.kategori_produk === category.name);
      setFilteredProducts(filtered);
    } else {
      // Show all products if no category is selected
      setFilteredProducts(products);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  // Filter Icon Component
  const FilterIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      className="fill-current text-[#45c517] hover:cursor-pointer bi bi-filter-square-fill"
      viewBox="0 0 16 16"
    >
      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm.5 5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1M4 8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m2 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
    </svg>
  );

  return (
    <motion.div
      className="flex min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Sidebar />

      <section className="bg-[#f4fef1] pl-60 pt-20">
        <div className="flex-grow mb-5">
          {/* Header Section */}
          <Navbar showSearchBar={true} />
          
          <motion.h1 
            className="mt-10 mx-10 text-2xl font-bold text-[#45c517]"
            variants={itemVariants}
          >
            Grab Meals
          </motion.h1>

          {/* Main Content */}
          <motion.section 
            className="min-h-screen mx-10"
            variants={itemVariants}
          >
            {/* Categories Section */}
            <motion.div 
              className="flex items-center gap-3"
              variants={itemVariants}
            >
              <FilterIcon />
              <div className="overflow-x-auto whitespace-nowrap max-w-full">
                <CategoryCard 
                  categories={categories} 
                  onCategoryClick={handleFilterChange} // Pass the click handler to CategoryCard
                  selectedFilter={selectedFilter} // Highlight the selected filter
                />
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div 
              className="flex gap-5 flex-wrap mt-5"
              variants={itemVariants}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </motion.section>
        </div>
      </section>
    </motion.div>
  );
};

export default GrabMeals;
