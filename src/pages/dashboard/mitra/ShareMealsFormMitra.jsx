// ShareMealsForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SidebarMitra from "../../../components/dashboard/mitra/SidebarMitra";
import NavbarMitra from "../../../components/dashboard/mitra/NavbarMitra";
import kotaData from "../../../assets/sharemeals/kotaData.json";
import categoryList from "../../../../public/categoryList.json";

const ShareMealsFormMitra = () => {
  const navigate = useNavigate();

  // State untuk form
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedKota, setSelectedKota] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedKelurahan, setSelectedKelurahan] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Data kategori
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    setCategoriesData(categoryList);
  }, []);

  // Data kecamatan dan kelurahan berdasarkan kota
  const kecamatanData = selectedKota ? kotaData[selectedKota] : {};
  const kelurahanData = selectedKecamatan ? kecamatanData[selectedKecamatan] : [];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi form
    if (!productName || !productDescription || !price || !selectedCategory || !pickupLocation || !date || !time) {
      alert("Mohon lengkapi semua data yang diperlukan.");
      return;
    }


    // Reset form setelah berhasil
    setProductName("");
    setProductDescription("");
    setStock(0);
    setPrice("");
    setImage(null);
    setSelectedCategory("");
    setSelectedKota("");
    setSelectedKecamatan("");
    setSelectedKelurahan("");
    setPickupLocation("");
    setDate("");
    setTime("");

    navigate("/share-meals");
  };

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
                    {image ? (
                      <div className="relative w-48 h-48 border-2 border-gray-200 rounded-md">
                        <img
                          src={image}
                          alt="Foto Produk"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={handleDeleteImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition duration-300"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center cursor-pointer w-48 h-48 border-2 border-gray-200 border-dashed rounded-md hover:border-[#45c517] transition-colors duration-300">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-[#45c517] mb-2" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                        </svg>
                        <span className="text-sm text-[#45c517]">Upload Foto</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Nama Produk */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Nama Produk</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => {
                        if (e.target.value.length <= 23) {
                          setProductName(e.target.value);
                        }
                      }}
                      maxLength={23}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                      placeholder="Masukkan nama produk"
                      required
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                      {productName.length}/23
                    </span>
                  </div>
                </div>

                {/* Deskripsi Produk */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Deskripsi Produk</label>
                  <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                    placeholder="Masukkan deskripsi produk"
                    rows="5"
                    required
                  ></textarea>
                </div>

                {/* Harga dan Stok */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Harga Produk</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                      placeholder="Masukkan harga produk"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Stok</label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                      placeholder="Masukkan jumlah stok"
                      required
                    />
                  </div>
                </div>

                {/* Kategori */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Kategori Produk</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
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

                {/* Lokasi */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Kota</label>
                    <select
                      value={selectedKota}
                      onChange={(e) => setSelectedKota(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                      required
                    >
                      <option value="">Pilih Kota</option>
                      {Object.keys(kotaData).map((kota) => (
                        <option key={kota} value={kota}>
                          {kota}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Kecamatan</label>
                    <select
                      value={selectedKecamatan}
                      onChange={(e) => setSelectedKecamatan(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                      required
                      disabled={!selectedKota}
                    >
                      <option value="">Pilih Kecamatan</option>
                      {Object.keys(kecamatanData).map((kecamatan) => (
                        <option key={kecamatan} value={kecamatan}>
                          {kecamatan}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Kelurahan</label>
                  <select
                    value={selectedKelurahan}
                    onChange={(e) => setSelectedKelurahan(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                    required
                    disabled={!selectedKecamatan}
                  >
                    <option value="">Pilih Kelurahan</option>
                    {kelurahanData.map((kelurahan) => (
                      <option key={kelurahan} value={kelurahan}>
                        {kelurahan}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lokasi Pengambilan */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Lokasi Pengambilan</label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                    placeholder="Masukkan lokasi pengambilan"
                    required
                  />
                </div>

                {/* Tanggal dan Waktu */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Tanggal</label>
                    <input
                      type="date"
                      value={date}
                      onChange={handleDateChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Waktu</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#45c517] text-white rounded-md hover:bg-[#3ba513] focus:outline-none focus:ring-2 focus:ring-[#45c517] focus:ring-opacity-50 transition-colors duration-300"
                  >
                    Simpan
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

export default ShareMealsFormMitra;