
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import SidebarMitra from "../../../components/dashboard/mitra/SidebarMitra";
import NavbarMitra from "../../../components/dashboard/mitra/NavbarMitra";
import kotaData from "../../../assets/sharemeals/kotaData.json";
import productMitra from "../../../assets/user/productMitra.json";
import categoryList from '../../../../public/categoryList.json';  // Adjust path as needed


const UpdateProductMitra = () => {
    // 1. State Declarations
    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        stock: 0,
        price: "",
        images: Array(5).fill(null),
        category: "",
        kota: "",
        kecamatan: "",
        kelurahan: "",
        detail: "",
        date: "",
        time: ""
    });
    const [categoriesData, setCategoriesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(null);

    // 2. Hooks
    const navigate = useNavigate();
    const { id } = useParams();

    // 3. Derived State
    const kecamatanData = kotaData[formData.kota] ?? {};
    const kelurahanData = kecamatanData[formData.kecamatan] ?? [];

    // 4. Utility Functions
    const formatTimeForInput = (timeString) => {
        if (!timeString) return '';
        return timeString.replace('.', ':');
    };

    const formatTimeForDisplay = (timeString) => {
        if (!timeString) return '';
        return timeString.replace(':', '.');
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    // 5. Effects
    useEffect(() => {
        try {
            setIsLoading(true);
            setCategoriesData(categoryList);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const product = productMitra.find(item => item.id === +id);
                if (!product) throw new Error("Produk tidak ditemukan");

                const [kelurahan = "", kecamatan = "", kota = "", detail = ""] =
                    product.address?.split(", ") ?? [];

                setFormData({
                    ...formData,
                    productName: product.productName ?? "",
                    description: product.description ?? "",
                    stock: product.stok ?? 0,
                    price: product.price?.toString() ?? "",
                    images: [product.image_url, ...Array(4).fill(null)],
                    category: product.category ?? "",
                    kota,
                    kecamatan,
                    kelurahan,
                    detail,
                    date: product.date ?? "",
                    time: formatTimeForDisplay(product.timeOver) ?? "",
                });
            } catch (err) {
                setErrorMessage(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    // 6. Event Handlers
    const updateField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (index, file) => {
        if (!file || file.size > 5_000_000) {
            alert("Ukuran file terlalu besar. Maksimal 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const newImages = [...formData.images];
            newImages[index] = reader.result;
            updateField('images', newImages);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['productName', 'description', 'price', 'category'];
        const missingFields = requiredFields.some(field => !formData[field]);

        if (missingFields || !formData.detail || !formData.date || !formData.time) {
            alert("Mohon lengkapi semua data yang diperlukan.");
            return;
        }

        try {
            const fullAddress = [formData.kelurahan, formData.kecamatan, formData.kota, formData.detail]
                .filter(Boolean)
                .join(", ");
            const updatedProduct = {
                id: +id,
                ...formData,
                stok: +formData.stock,
                price: +formData.price,
                image_url: formData.images[0],
                address: fullAddress,
                date: formData.date,
                timeOver: formData.time,
                updated_at: new Date().toISOString()
            };

            console.log('Updating product:', updatedProduct);
            alert("Produk berhasil diperbarui!");
            navigate("/share-meals");
        } catch (err) {
            console.error('Error updating product:', err);
            alert("Gagal memperbarui produk. Silakan coba lagi.");
        }
    };

    // 7. Render Conditions
    if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (errorMessage) return <div className="flex justify-center items-center min-h-screen text-red-500">{errorMessage}</div>;
    return (
        <div className="flex min-h-screen">
            <SidebarMitra />
            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <NavbarMitra />
                    <div className="mt-5 mx-10">
                        <h1 className="text-[#45c517] text-2xl font-bold">Bagikan Produk</h1>

                        <section className="p-3 rounded-md bg-white shadow-md mt-5">
                            <h1 className="mb-5 text-xl font-semibold text-[#45c517]">Informasi Produk dan Pengambilan</h1>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Foto Produk */}
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Foto Produk</label>
                                    <div className="mt-2">
                                        {formData.images[0] ? (
                                            <div className="relative w-48 h-48 border-2 border-gray-200 rounded-md">
                                                <img
                                                    src={formData.images[0]}
                                                    alt="Foto Produk"
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newImages = [...formData.images];
                                                        newImages[0] = null;
                                                        updateField('images', newImages);
                                                    }}
                                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center w-48 h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span></p>
                                                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 800x400px)</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(0, e.target.files[0])}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* Nama Produk */}
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Nama Produk</label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                            type="text"
                                            value={formData.productName}
                                            onChange={(e) => {
                                                if (e.target.value.length <= 23) {
                                                    updateField('productName', e.target.value);
                                                }
                                            }}
                                            maxLength={23}
                                            placeholder="Masukkan nama produk"
                                            required
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                                            {formData.productName.length}/23
                                        </span>
                                    </div>
                                </div>

                                {/* Deskripsi Produk */}
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Deskripsi Produk</label>
                                    <textarea
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        rows="4"
                                        value={formData.description}
                                        onChange={(e) => updateField('description', e.target.value)}
                                        placeholder="Masukkan deskripsi produk"
                                        required
                                    ></textarea>
                                </div>

                                {/* Grid untuk Harga dan Stok */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Harga Produk</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => updateField('price', e.target.value)}
                                            placeholder="Masukkan harga"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Stok</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) => updateField('stock', e.target.value)}
                                            placeholder="Masukkan stok"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Kategori */}
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Kategori Produk</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        value={formData.category}
                                        onChange={(e) => updateField('category', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categoriesData.map((category) => (
                                            <option key={category.id} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Grid untuk Lokasi */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Kota</label>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                            value={formData.kota}
                                            onChange={(e) => {
                                                updateField('kota', e.target.value);
                                                updateField('kecamatan', '');
                                                updateField('kelurahan', '');
                                            }}
                                            required
                                        >
                                            <option value="">Pilih Kota</option>
                                            {Object.keys(kotaData).map((kota) => (
                                                <option key={kota} value={kota}>{kota}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Kecamatan</label>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                            value={formData.kecamatan}
                                            onChange={(e) => {
                                                updateField('kecamatan', e.target.value);
                                                updateField('kelurahan', '');
                                            }}
                                            disabled={!formData.kota}
                                            required
                                        >
                                            <option value="">Pilih Kecamatan</option>
                                            {Object.keys(kecamatanData).map((kecamatan) => (
                                                <option key={kecamatan} value={kecamatan}>{kecamatan}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Kelurahan</label>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                            value={formData.kelurahan}
                                            onChange={(e) => updateField('kelurahan', e.target.value)}
                                            disabled={!formData.kecamatan}
                                            required
                                        >
                                            <option value="">Pilih Kelurahan</option>
                                            {kelurahanData.map((kelurahan) => (
                                                <option key={kelurahan} value={kelurahan}>{kelurahan}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Lokasi Pengambilan */}
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Lokasi Pengambilan</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        type="text"
                                        value={formData.detail}
                                        onChange={(e) => updateField('detail', e.target.value)}
                                        placeholder="Masukkan lokasi pengambilan"
                                        required
                                    />
                                </div>

                                {/* Grid untuk Tanggal dan Waktu */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Tanggal Pengambilan</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => updateField('date', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Waktu Pengambilan</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                            type="time"
                                            value={formData.time}
                                            onChange={(e) => updateField('time', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Tombol Submit */}
                                <div className="flex justify-end">
                                    <button
                                        className="px-6 py-2 text-white bg-[#45c517] rounded-lg hover:bg-[#3ba513] focus:outline-none focus:ring-2 focus:ring-[#45c517] focus:ring-offset-2 transition-colors duration-200"
                                        type="submit"
                                    >
                                        Update Produk
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};


export default UpdateProductMitra
