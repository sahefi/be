import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarMitra from "../../../components/dashboard/mitra/SidebarMitra";
import NavbarMitra from "../../../components/dashboard/mitra/NavbarMitra";
import transaksiData from "../../../assets/user/transaksiData.json";
import { IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import mitraData from "../../../assets/user/mitraData.json";
import { Link } from "react-router-dom";

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
                    className="bg-white rounded-lg p-8 max-w-md w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4 text-red-600">Verifikasi Akun Diperlukan</h2>
                    <p className="mb-6">Mohon verifikasi akun Anda terlebih dahulu untuk mengakses fitur lengkap.</p>
                    <div className="flex justify-center gap-5">
                        <Link to="/verif-form">
                            <button
                                onClick={onClose}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                            >
                                Verifikasi
                            </button>
                        </Link>

                        <button
                            onClick={onClose}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const PopupTransaksi = ({ isOpen, onClose, dataTransaksi }) => {
    if (!isOpen || !dataTransaksi) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-[#45c517] text-white px-6 py-4 flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Detail Transaksi</h2>
                        <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                            <IoCloseOutline size={24} />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <InfoItem label="Nama" value={dataTransaksi.nama} />
                            <InfoItem label="Nomor Telepon" value={dataTransaksi.nomorTelepon} />
                            <InfoItem label="ID Transaksi" value={dataTransaksi.id} />
                            <InfoItem label="Produk" value={dataTransaksi.product} />
                            <InfoItem label="Harga" value={`Rp ${dataTransaksi.price.toLocaleString()}`} />
                            <InfoItem label="Jumlah" value={dataTransaksi.quantity} />
                            <InfoItem label="Total" value={`Rp ${dataTransaksi.total.toLocaleString()}`} />
                            <InfoItem label="Status" value={dataTransaksi.status} />
                            <InfoItem label="Tanggal" value={new Date(dataTransaksi.date).toLocaleDateString()} />
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-[#45c517] text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
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

    const handleDetailClick = (transaksi) => {
        setSelectedTransaksi(transaksi);
    };

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
                    <div className="mx-10 mt-5 flex items-center">
                        <label htmlFor="transaksiPerPage" className="mr-2">Show:</label>
                        <select
                            id="transaksiPerPage"
                            value={transaksiPerPage}
                            onChange={(e) => handleTransaksiPerPageChange(Number(e.target.value))}
                            className="border rounded p-1"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                        <span className="ml-2">entries</span>
                    </div>

                    {/* Table Section */}
                    <motion.div
                        className="overflow-x-auto mt-5 mx-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-left">ID</th>
                                    <th className="py-3 px-4 text-left">Produk</th>
                                    <th className="py-3 px-4 text-left">Harga</th>
                                    <th className="py-3 px-4 text-left">Jumlah</th>
                                    <th className="py-3 px-4 text-left">Total</th>
                                    <th className="py-3 px-4 text-left">Status</th>
                                    <th className="py-3 px-4 text-left">Tanggal</th>
                                    <th className="py-3 px-4 text-left">Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTransactions.map((transaksi, index) => (
                                    <tr key={`${transaksi.id}-${index}`} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-4">{transaksi.id}</td>
                                        <td className="py-2 px-4">{transaksi.product}</td>
                                        <td className="py-2 px-4">Rp {transaksi.price.toLocaleString()}</td>
                                        <td className="py-2 px-4">{transaksi.quantity}</td>
                                        <td className="py-2 px-4">Rp {transaksi.total.toLocaleString()}</td>
                                        <td className="py-2 px-4">{transaksi.status}</td>
                                        <td className="py-2 px-4">{new Date(transaksi.date).toLocaleDateString()}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => handleDetailClick(transaksi)}
                                                className="bg-[#45c517] text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors cursor-pointer"
                                            >
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-700">
                                Menampilkan {(currentPage - 1) * transaksiPerPage + 1} -{" "}
                                {Math.min(currentPage * transaksiPerPage, allTransaksi.length)} dari{" "}
                                {allTransaksi.length} transaksi
                            </div>
                            <div>
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-[#45c517] text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                                >
                                    <IoChevronBackOutline />
                                </button>
                                <span className="mx-2 text-sm text-gray-700">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-[#45c517] text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                                >
                                    <IoChevronForwardOutline />
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
            <PopupTransaksi isOpen={!!selectedTransaksi} onClose={closePopup} dataTransaksi={selectedTransaksi} />
        </div>
    );
};

export default DashboardMitra;
