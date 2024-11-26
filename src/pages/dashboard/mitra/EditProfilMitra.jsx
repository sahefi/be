import NavbarMitra from "../../../components/dashboard/mitra/NavbarMitra";
import SidebarMitra from "../../../components/dashboard/mitra/SidebarMitra";
import mitraData from "../../../assets/user/mitraData.json";
import { useRef, useState } from 'react';

const EditProfil = () => {
    const [profileImage, setProfileImage] = useState(mitraData.phone_number);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsLoading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                setIsLoading(false);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleDeletePhoto = () => {
        setProfileImage(mitraData.profile_picture); // Reset to default
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar akan selalu fixed di sebelah kiri */}
            <SidebarMitra />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20"> {/* Tambahkan padding-top agar konten tidak tertutup */}
                <div className="flex-grow">
                    <NavbarMitra />

                    <section className="min-h-screen mx-10 my-5 ">

                        <h1 className="mt-5 text-2xl font-bold text-[#45c517]">
                            Edit Profil
                        </h1>
                        <section className="w-full bg-white rounded-xl p-6 mt-5 shadow-md">
                            <div>
                                <h1 className="text-xl font-semibold text-gray-800 mb-4">Foto Profil</h1>
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <img
                                            className="rounded-full w-24 h-24 object-cover border-2 border-[#45c517]"
                                            src={mitraData.profile_picture}
                                            alt="Profile"
                                        />
                                        {isLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <button
                                            onClick={handleUploadClick}
                                            className="rounded-full text-white px-4 py-2 bg-[#45c517] text-xs font-semibold hover:bg-green-600 transition duration-300"
                                        >
                                            Upload Foto
                                        </button>
                                        <button
                                            onClick={handleDeletePhoto}
                                            className="rounded-full text-[#45c517] px-4 py-2 bg-white border border-[#45c517] text-xs font-semibold hover:bg-red-50 transition duration-300"
                                        >
                                            Hapus Foto
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <form className="mt-5 " action="">
                                <div className="flex flex-col gap-3 py-3 border-t border-b border-gray-200">
                                    <label
                                        className="font-semibold text-sm text-gray-700"
                                        htmlFor="username"
                                    >
                                        Username
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={mitraData.username}
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="w-full px-4 py-1 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 py-3 border-t border-b border-gray-200">
                                    <label
                                        className="text-sm font-semibold text-gray-700"
                                        htmlFor="username"
                                    >
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={mitraData.email}
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="w-full px-4 py-1 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 py-3 border-t border-b border-gray-200">
                                    <label
                                        className="text-sm font-semibold text-gray-700"
                                        htmlFor="username"
                                    >
                                        Nomor Telepon
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={mitraData.phone_number}
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="w-full px-4 py-1 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 py-3 border-t border-b border-gray-200">
                                    <label
                                        className="text-sm font-semibold text-gray-700"
                                        htmlFor="username"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={mitraData.password}
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="w-full px-4 py-1 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 py-3 border-t border-b border-gray-200">
                                    <label
                                        className="text-sm font-semibold text-gray-700"
                                        htmlFor="username"
                                    >
                                        Alamat Lembaga/Mitra
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={mitraData.address}
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="w-full px-4 py-1 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 py-3 border-t border-b border-gray-200">
                                    <label
                                        className="text-sm font-semibold text-gray-700"
                                        htmlFor="username"
                                    >
                                        Nomor Rekening Lembaga/Mitra
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={mitraData.nomor_rekening}
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="w-full px-4 py-1 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <button className="mt-5 bg-[#45c517] px-3 py-1 rounded-full text-white">Simpan Perubahan</button>
                            </form>


                        </section>

                    </section>
                </div>
            </section>

        </div>
    )
}

export default EditProfil
