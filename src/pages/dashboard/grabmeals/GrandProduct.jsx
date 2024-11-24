import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Sidebar from '../../../components/dashboard/Sidebar';
import Navbar from '../../../components/dashboard/Navbar';
import axios from 'axios'; // Import axios

const GrandProduct = () => {
    const { id } = useParams();
    const location = useLocation();
    const { cartItems, total: cartTotal } = location.state || {};
    const [product, setProduct] = useState(null);
    const [total, setTotal] = useState(0);
    const quantity = location.state?.quantity || 1;
    const userData = JSON.parse(localStorage.getItem('user')) || {};

    function formatPrice(price) {
        return `Rp${Number(price).toLocaleString('id-ID')}`;
    }

    useEffect(() => {
        if (cartItems) {
            // Handle cart items
            setTotal(cartTotal);
        } else {
            // Handle single product with axios
            axios.get(`http://localhost:8085/produk/${id}`)
                .then((response) => {
                    const foundProduct = response.data;
                    setProduct(foundProduct);
                    if (foundProduct) {
                        setTotal(foundProduct.harga * quantity);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [id, cartItems, cartTotal, quantity]); // Include quantity as a dependency

    if (!product && !cartItems) return <p>Loading...</p>;

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <section className="bg-[#f4fef1] pl-60 pt-20 w-full">
                <div className="flex-grow">
                    <Navbar showSearchBar={true} />
                    <h1 className="mt-10 mx-10 text-2xl font-bold text-[#45c517]">Pembayaran</h1>


                    <section className="min-h-screen mx-5">
                        <div className="p-5 rounded-lg">
                            <div className="flex flex-col gap-4 p-4 border rounded-lg mb-4 bg-white shadow-md">
                                <h2 className="text-lg font-bold mb-4">Daftar Produk</h2>

                                {cartItems ? (
                                    // Render cart items
                                    cartItems.map((item) => (
                                        <div key={item.id} className="border-b pb-4 last:border-b-0">
                                            <div className='flex gap-3 items-center mb-3'>
                                                <img
                                                    src={item?.user?.avatar || '../../../../public/profile.png'}
                                                    alt={item?.user?.nama_user || 'User'}
                                                    className="w-10 h-10 object-cover rounded-full"
                                                />
                                                <p className="text-sm font-semibold">{item?.user?.nama_user || 'User'}</p>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <img
                                                    src={item.image_url}
                                                    alt={item.nama_produk}
                                                    className="w-28 h-20 object-cover rounded"
                                                />
                                                <div>
                                                    <h3 className="text-xl font-bold">{item.nama_produk}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {item.quantity} x {formatPrice(item.harga)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : ( 
                                    <div>
                                        <div className='flex gap-3 items-center'>
                                            <img
                                                src={product?.user?.avatar || '../../../../public/profile.png'}
                                                alt={product?.user?.user_nama || 'User'}
                                                className="w-10 h-10 object-cover rounded-full"
                                            />
                                            <p className="text-sm font-semibold">{product?.user?.user_nama || 'User'}</p>
                                        </div>

                                        <div className="flex items-start gap-4 mt-4">
                                            <img
                                                src={product?.filename[0]}
                                                alt={product?.nama_produk}
                                                className="w-28 h-20 object-cover rounded"
                                            />
                                            <div>
                                                <h3 className="text-xl font-bold">{product?.nama_produk}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {location.state?.quantity || 1} x {formatPrice(product?.harga)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md mt-5">
                                <h2 className="text-lg font-bold mb-4">Total Transaksi</h2>
                                <div className="flex justify-between">
                                    <h2>
                                        Total Harga : {cartItems
                                            ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
                                            : quantity || 1} Produk
                                    </h2>
                                    <h2 className="text-xl font-bold">
                                        {formatPrice(total)}
                                    </h2>
                                </div>

                                <Link
                                    to={`/payment-product/${id || 'cart'}`}
                                    state={{ total,idUser:userData.id,idProduk:id }}
                                >
                                    <div className="flex justify-end mt-3">
                                        <button className="bg-[#45c517] hover:bg-green-600 text-xs text-white font-bold py-2 px-4 rounded-full">
                                            Pilih Metode Pembayaran
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default GrandProduct;
