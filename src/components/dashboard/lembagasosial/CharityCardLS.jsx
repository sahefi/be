import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CharityCardLS = ({
    id,
    image,
    title,
    isActive,
    targetDonation,
    collectedAmount
}) => {
    // Menghitung persentase donasi terkumpul
    const percentage = (collectedAmount / targetDonation) * 100;
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/update-charity-ls/${id}`);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
        >
            {/* Gambar Kampanye */}
            <div className="relative h-48 w-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {/* Badge Status */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${isActive ? 'bg-[#45c517] text-white' : 'bg-gray-500 text-white'
                    }`}>
                    {isActive ? 'Aktif' : 'Tidak Aktif'}
                </div>
            </div>

            {/* Informasi Kampanye */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                    <div
                        className="h-full bg-[#45c517] rounded-full"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                </div>

                {/* Detail Donasi */}
                <div className="flex justify-between items-center text-sm">
                    <div>
                        <p className="text-gray-500">Terkumpul</p>
                        <p className="font-semibold text-[#45c517]">
                            Rp {collectedAmount.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500">Target</p>
                        <p className="font-semibold text-gray-700">
                            Rp {targetDonation.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Persentase */}
                <p className="text-sm text-gray-500 mt-2 text-center">
                    {percentage.toFixed(1)}% tercapai
                </p>


                {/* Buttons */}
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handleEdit}
                        className="bg-[#45c517] hover:bg-[#3ba313] text-white font-bold py-2 px-6 rounded-full transition duration-300 w-24"
                    >
                        Edit
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 w-24">
                        Hapus
                    </button>
                </div>

            </div>
        </motion.div>
    );
};

export default CharityCardLS;