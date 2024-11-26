import { motion } from "framer-motion";

const PopupTransaksi = ({ isOpen, onClose, dataTransaksi }) => {
    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg w-96 p-6 relative"
            >
                <h2 className="text-xl font-semibold text-[#45c517] mb-4">Detail Transaksi</h2>
                <div className="space-y-3">
                    <p className="text-gray-600">
                        <span className="font-semibold">ID Transaksi:</span> {dataTransaksi.id}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Produk:</span> {dataTransaksi.product}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Harga Satuan:</span> Rp {dataTransaksi.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Jumlah:</span> {dataTransaksi.quantity}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Total:</span> Rp {dataTransaksi.total.toLocaleString()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Tanggal:</span> {new Date(dataTransaksi.date).toLocaleDateString()}
                    </p>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#45c517] text-white rounded-full hover:bg-green-600 transition-colors"
                    >
                        Tutup
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PopupTransaksi;
