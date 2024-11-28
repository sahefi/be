import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Sidebar from '../../../components/dashboard/Sidebar';
import Navbar from '../../../components/dashboard/Navbar';

const GrandProduct = () => {
    const { id } = useParams();
    const location = useLocation();
    const { cartItems, total: cartTotal } = location.state || {};
    const [product, setProduct] = useState(null);
    const [total, setTotal] = useState(0);
    const quantity = location.state?.quantity || 1;

    function formatPrice(price) {
        return `Rp${Number(price).toLocaleString('id-ID')}`;
    }

    useEffect(() => {
        if (cartItems) {
            // Handle cart items
            setTotal(cartTotal);
        } else {
            // Handle single product
            fetch('/productData.json')
                .then((response) => response.json())
                .then((data) => {
                    const foundProduct = data.find((item) => item.id === parseInt(id, 10));
                    setProduct(foundProduct);
                    if (foundProduct) {
                        const qty = location.state?.quantity || 1;
                        setTotal(foundProduct.price * qty);
                    }
                })
                .catch((error) => console.error('Error fetching data:', error));
        }
    }, [id, cartItems, cartTotal]);

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
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-grow">
                                    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                                        <h2 className="text-lg font-bold mb-4">Daftar Produk</h2>
                                        {cartItems ? (
                                            cartItems.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                                                    <img
                                                        src={item.image_url}
                                                        alt={item.productName}
                                                        className="w-20 h-20 object-cover rounded"
                                                    />
                                                    <div className="flex-grow">
                                                        <h3 className="text-lg font-semibold">{item.productName}</h3>
                                                        <p className="text-sm text-gray-600">{item.quantity} x {formatPrice(item.price)}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                                                        <p className="text-sm text-gray-500">{item.owner}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex items-center gap-4 py-4">
                                                <img
                                                    src={product?.image_url}
                                                    alt={product?.productName}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                                <div className="flex-grow">
                                                    <h3 className="text-lg font-semibold">{product?.productName}</h3>
                                                    <p className="text-sm text-gray-600">{location.state?.quantity || 1} x {formatPrice(product?.price)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">{formatPrice((product?.price || 0) * (location.state?.quantity || 1))}</p>
                                                    <p className="text-sm text-gray-500">{product?.owner}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="md:w-1/3">
                                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                                        <h2 className="text-lg font-bold mb-4">Ringkasan Belanja</h2>
                                        <div className="flex justify-between mb-2">
                                            <p>Total Harga ({cartItems
                                                ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
                                                : quantity || 1} Produk)</p>
                                            <p>{formatPrice(total)}</p>
                                        </div>
                                        <div className="border-t pt-4 mt-4">
                                            <div className="flex justify-between font-bold">
                                                <p>Total Tagihan</p>
                                                <p>{formatPrice(total)}</p>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/payment-product/${id || 'cart'}`}
                                            state={{ total }}
                                            className="block w-full mt-6"
                                        >
                                            <button className="w-full bg-[#45c517] hover:bg-green-600 text-white font-bold py-2  px-1 rounded-full text-md transition duration-300">
                                                Pilih Metode Pembayaran
                                            </button>
                                        </Link>
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