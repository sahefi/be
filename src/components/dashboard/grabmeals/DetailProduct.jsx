import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../../dashboard/Sidebar";
import Navbar from "../../dashboard/Navbar";
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';


const DetailProduct = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description'); // New state for active tab

  useEffect(() => {
    fetch('/productData.json')
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find((item) => item.id === parseInt(id, 10));
        setProduct(foundProduct);

        // Get random products
        const filtered = data.filter(item => item.id !== parseInt(id, 10));
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 4));

        if (foundProduct) {
          setTotal(foundProduct.price * quantity);
        }
      });
  }, [id]);

  const tabVariants = {
    inactive: { width: 0, opacity: 0 },
    active: { width: '100%', opacity: 1, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  function handleQuantityChange(currentQty, stock, isIncrease, price) {
    let newQty;

    if (isIncrease) {
      newQty = currentQty < stock ? currentQty + 1 : currentQty;
    } else {
      newQty = currentQty > 1 ? currentQty - 1 : currentQty;
    }

    return {
      quantity: newQty,
      total: newQty * price
    };
  }

  // React component handlers
  const handleIncrease = () => {
    const result = handleQuantityChange(quantity, product.stok, true, product.price);
    setQuantity(result.quantity);
    setTotal(result.total);
  };

  const handleDecrease = () => {
    const result = handleQuantityChange(quantity, product.stok, false, product.price);
    setQuantity(result.quantity);
    setTotal(result.total);
  };

  const handlePurchase = () => {
    navigate(`/payment/${product.id}`, {
      state: {
        total,
        quantity // Pass quantity state to GrandProduct
      }
    });
  };


  useEffect(() => {
    fetch('/productData.json')
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find((item) => item.id === parseInt(id, 10));
        setProduct(foundProduct);
        if (foundProduct) {
          setTotal(foundProduct.price * quantity);
        }
      });
  }, [id]);


  if (!product) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      productName: product.productName,
      price: product.price,
      quantity: quantity,
      total: total,
      image_url: product.image_url,
      owner: product.owner,
      photoProfile: product.photoProfile
    };

    try {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItemIndex = existingCart.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        const newQuantity = existingCart[existingItemIndex].quantity + quantity;
        existingCart[existingItemIndex].quantity = newQuantity;
        existingCart[existingItemIndex].total = newQuantity * product.price;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(existingCart));

      const messageElement = document.getElementById('success-message');
      if (messageElement) {
        messageElement.classList.remove('hidden');
        setTimeout(() => {
          messageElement.classList.add('hidden');
        }, 3000);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <section className="bg-[#f4fef1] w-full  pl-60 pt-20">
        <div className="mt-5 flex-grow">
          <Navbar showSearchBar={true} />

          <section className="min-h-screen  mx-10">
            <div className=" flex mt-5 gap-5 justify-between">

              <div className="mt-10 flex gap-10 p-5 shadow-md w-[650px] rounded-xl min-h-96 bg-white">

                {/* Product */}
                <div className="flex flex-col min-w-48 gap-5">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-48 h-48 object-cover rounded-xl"
                  />
                  <div className="flex items-center gap-3">
                    <img
                      src={product.photoProfile}
                      alt={product.photoProfile}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <p className="text-xs font-semibold">{product.owner}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
                  <h3 className="text-2xl font-bold mb-2">
                    Rp{Number(product.price).toLocaleString('id-ID')}
                  </h3>
                  <h1 className="bg-[#e2f7db] text-xs rounded text-center w-28 py-1 mb-4">
                    Hingga : {product.timeOver} WIB
                  </h1>

                  {/* Tabs */}
                  <div className='w-full flex gap-5  relative'>
                    <button
                      onClick={() => setActiveTab('description')}
                      className={`text-md pb-2 relative ${activeTab === 'description' ? 'text-[#47cb18] font-bold' : 'text-gray-500'
                        }`}
                    >
                      Deskripsi
                      {activeTab === 'description' && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-[#47cb18]"
                          initial="inactive"
                          animate="active"
                          variants={tabVariants}
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('address')}
                      className={`text-md pb-2 relative ${activeTab === 'address' ? 'text-[#47cb18] font-bold' : 'text-gray-500'
                        }`}
                    >
                      Alamat
                      {activeTab === 'address' && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-[#47cb18]"
                          initial="inactive"
                          animate="active"
                          variants={tabVariants}
                        />
                      )}
                    </button>
                  </div>

                  {/* Content based on active tab */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={contentVariants}
                    >
                      {activeTab === 'description' && (
                        <div className="flex max-w-screen flex-col mb-4">
                          <h1 className="font-bold text-sm mb-2">Detail Produk</h1>
                          <p className="text-sm mb-4">{product.category}</p>
                          <h1 className="font-bold text-sm mb-2">Deskripsi Produk</h1>
                          <p className="text-sm">{product.description}</p>
                        </div>
                      )}

                      {activeTab === 'address' && (
                        <div className="flex flex-col mb-4">
                          <h1 className="font-bold text-sm mb-2">Lokasi Pengambilan</h1>
                          <p className="text-sm">{product.address}</p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>



              </div>


              {/* Payment */}
              <div className="mt-10 flex-1 max-h-64 rounded-xl p-5 bg-white shadow-md flex flex-col">
                <h1 className="font-bold text-lg mb-4">Jumlah pembelian</h1>

                {/* Quantity Control */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center border rounded-lg py-1 px-3">
                    <button
                      onClick={handleDecrease}
                      className="text-green-600 text-2xl font-bold px-2"
                    >
                      -
                    </button>
                    <span className="text-green-600 text-xl font-bold mx-4">{quantity}</span>
                    <button
                      onClick={handleIncrease}
                      className="text-green-600 text-2xl font-bold px-2"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm">Sisa stok: {product.stok}</p>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center w-full mb-4">
                  <span className="text-gray-700">Total</span>
                  <span className="text-black font-bold">
                    Rp{total.toLocaleString()}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-2">
                  <button
                    onClick={handlePurchase}
                    className="bg-[#45c517] text-sm py-2 hover:bg-green-600 w-28 text-white px-3 rounded-lg"
                  >
                    Beli
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="hover:bg-green-50 text-sm border py-2 w-28 border-green-600 text-green-600 px-3 rounded-lg"
                  >
                    + Keranjang
                  </button>


                </div>
                <p
                  id="success-message"
                  className="hidden text-green-600 text-xs pt-2 mt-2 transition-all duration-300"
                >
                  Berhasil ditambahkan ke keranjang
                </p>

              </div>

            </div>

            {/* Add before the closing div */}
            <div className="mt-8 px-4">
              <h2 className="text-2xl font-semibold mb-4 text-[#45c517]">Rekomendasi Lainnya</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {randomProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </section >
    </div >
  );
};

export default DetailProduct;
