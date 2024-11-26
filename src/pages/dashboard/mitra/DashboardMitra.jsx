import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarMitra from "../../../components/dashboard/mitra/SidebarMitra";
import NavbarMitra from "../../../components/dashboard/mitra/NavbarMitra";
import transaksiData from "../../../assets/user/transaksiData.json";
import { IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import mitraData from "../../../assets/user/mitraData.json";
import { Link } from "react-router-dom";
import PopupTransaksi from "../../../components/dashboard/mitra/PopupTransaksi";


const VerificationPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4 text-[#45c517]">Verifikasi Akun Diperlukan</h2>
                    <p className="mb-6 text-gray-600">Mohon verifikasi akun Anda terlebih dahulu untuk mengakses fitur lengkap.</p>
                    <div className="flex justify-center gap-5">
                        <Link to="/verif-form">
                            <button
                                onClick={onClose}
                                className="bg-[#45c517] text-white px-6 py-2 rounded-full hover:bg-[#3ba313] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#45c517] focus:ring-opacity-50"
                            >
                                Verifikasi
                            </button>
                        </Link>

                        <button
                            onClick={onClose}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                        >
                            Tutup
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


const InfoItem = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);

const DashboardMitra = () => {
    const [selectedTransaksi, setSelectedTransaksi] = useState(null);
    const [allTransaksi, setAllTransaksi] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [transaksiPerPage, setTransaksiPerPage] = useState(15); // Default to 15
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showTransaksiPopup, setShowTransaksiPopup] = useState(false);

    useEffect(() => {
        if (mitraData.status === 'pending') {
            setShowVerificationPopup(true);
        }
    }, []);

    useEffect(() => {
        // Flatten all transactions from all users into a single array
        const flattenedTransaksi = transaksiData.flatMap(user =>
            user.transaksi.map(transaksi => ({
                ...transaksi,
                user: {
                    name: user.name,
                    phone_number: user.phone_number,
                }
            }))
        );
        // Sort by date (descending)
        flattenedTransaksi.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAllTransaksi(flattenedTransaksi);
        setTotalPages(Math.ceil(flattenedTransaksi.length / transaksiPerPage));
    }, [transaksiPerPage]); // Add transaksiPerPage as a dependency


    const closePopup = () => {
        setSelectedTransaksi(null);
    };

    // Handle pagination change
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    // Handle changing the number of transactions per page
    const handleTransaksiPerPageChange = (value) => {
        setTransaksiPerPage(value);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    // Get current transactions to display
    const currentTransactions = allTransaksi.slice(
        (currentPage - 1) * transaksiPerPage,
        currentPage * transaksiPerPage
    );

    const handleDetailClick = (transaksi) => {
        setSelectedTransaksi(transaksi);
        setShowTransaksiPopup(true);
    };

    return (
        <div className="relative flex min-h-screen">
            <SidebarMitra />
            <section className="pb-16 bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <NavbarMitra />
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-10 mt-5"
                    >
                        <h1 className="text-2xl font-bold text-[#45c517]">Dashboard Mitra</h1>
                    </motion.div>

                    {/* Filter for number of transactions */}
                    <div className="mt-5 mx-10 flex max-w-72 items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                        <label htmlFor="transaksiPerPage" className="text-gray-600 font-medium">Show:</label>
                        <select
                            id="transaksiPerPage"
                            value={transaksiPerPage}
                            onChange={(e) => handleTransaksiPerPageChange(Number(e.target.value))}
                            className="form-select block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                        <span className="text-gray-600">entries</span>
                    </div>

                    {/* Table Section */}
                    <motion.div
                        className="overflow-x-auto mt-5 mx-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <table className="min-w-full bg-white shadow-sm rounded-lg overflow-hidden">
                            <thead className="bg-[#45c517]/10">
                                <tr>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">ID</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Produk</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Harga</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Jumlah</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Total</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Detail</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentTransactions.map((transaksi, index) => (
                                    <tr key={`${transaksi.id}-${index}`} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6 text-sm text-gray-600">{transaksi.id}</td>
                                        <td className="py-4 px-6 text-sm text-gray-600">{transaksi.product}</td>
                                        <td className="py-4 px-6 text-sm text-gray-600">Rp {transaksi.price.toLocaleString()}</td>
                                        <td className="py-4 px-6 text-sm text-gray-600">{transaksi.quantity}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-700">Rp {transaksi.total.toLocaleString()}</td>

                                        <td className="py-4 px-6 text-sm text-gray-600">{new Date(transaksi.date).toLocaleDateString()}</td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => handleDetailClick(transaksi)}
                                                className="bg-[#45c517] text-white px-4 py-2 rounded-md text-sm hover:bg-[#3ba714] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#45c517] focus:ring-opacity-50"
                                            >
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-lg shadow-sm">
                            <div className="text-sm text-gray-600">
                                Menampilkan {(currentPage - 1) * transaksiPerPage + 1} -{" "}
                                {Math.min(currentPage * transaksiPerPage, allTransaksi.length)} dari{" "}
                                {allTransaksi.length} transaksi
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 bg-[#45c517] text-white rounded-md hover:bg-[#3ba714] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#45c517] focus:ring-opacity-50"
                                >
                                    <IoChevronBackOutline className="w-5 h-5" />
                                </button>
                                <span className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 bg-[#45c517] text-white rounded-md hover:bg-[#3ba714] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#45c517] focus:ring-opacity-50"
                                >
                                    <IoChevronForwardOutline className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <VerificationPopup
                    isOpen={showVerificationPopup}
                    onClose={() => setShowVerificationPopup(false)}
                />

            </section>

            {/* Popup for Transaksi Detail */}
            <PopupTransaksi
                isOpen={showTransaksiPopup}
                onClose={() => setShowTransaksiPopup(false)}
                dataTransaksi={selectedTransaksi}
            />
        </div>
    );
};

export default DashboardMitra;