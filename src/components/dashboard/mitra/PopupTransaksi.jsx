import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

const InfoItem = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);


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
                            <InfoItem label="Nama" value={dataTransaksi.user.name} />
                            <InfoItem label="Nomor Telepon" value={dataTransaksi.user.phone_number} />
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

export default PopupTransaksi;
