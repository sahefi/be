// ShareMealsForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import kotaData from "../../../assets/sharemeals/kotaData.json";
import categoryList from "../../../../public/categoryList.json";

const ShareMealsForm = () => {
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
    setImages(Array(5).fill(null));
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
      <Sidebar />
      <section className="bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <Navbar />
          <div className="mt-10 mx-10">


            <section className="p-3 rounded-xl bg-white shadow-md mt-5">
              <h1 className="mb-5 text-xl font-semibold text-[#45c517]">Informasi Produk dan Pengambilan</h1>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Foto Produk */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-2">Foto Produk</label>
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 border-2 border-green-300 rounded-lg flex items-center justify-center overflow-hidden">
                      {image ? (
                        <>
                          <img
                            src={image}
                            alt="Foto Produk"
                            className="w-full h-full object-cover"
                          />
                          <button
                            className="absolute top-1 right-1 bg-[#45c517] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-green-600"
                            onClick={handleDeleteImage}
                            type="button"
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <label className="flex flex-col items-center justify-center cursor-pointer text-gray-500 bg-gray-50 w-full h-full hover:bg-gray-100">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <span className="text-xs text-center">Tambah Foto</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Nama Produk */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-2">Nama Produk</label>
                  <div className="relative">
                    <input
                      className="w-full rounded-lg border-2 border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      type="text"
                      value={productName}
                      onChange={(e) => {
                        if (e.target.value.length <= 23) {
                          setProductName(e.target.value);
                        }
                      }}
                      maxLength={23}
                      placeholder="Nama Produk"
                      required
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                      {productName.length}/23
                    </span>
                  </div>
                </div>

                {/* Deskripsi Produk */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-2">Deskripsi Produk</label>
                  <textarea
                    placeholder="Deskripsi produk"
                    className="w-full rounded-lg border-2 border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                    rows="5"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Harga dan Stok */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Harga Produk</label>
                    <input
                      className="w-full rounded-lg border-2 border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Masukkan harga produk"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Stok</label>
                    <input
                      className="w-full rounded-lg border-2 border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Jumlah stok"
                      required
                    />
                  </div>
                </div>

                {/* Kategori Produk */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-2">Kategori Produk</label>
                  <select
                    className="w-full rounded-lg border-2 border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Kota</label>
                    <select
                      className="w-full rounded-lg border-2 border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      value={selectedKota}
                      onChange={(e) => setSelectedKota(e.target.value)}
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
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Kecamatan</label>
                    <select
                      className="w-full rounded-lg border-2 border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      value={selectedKecamatan}
                      onChange={(e) => setSelectedKecamatan(e.target.value)}
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Kelurahan</label>
                    <select
                      className="w-full rounded-lg border-2 border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      value={selectedKelurahan}
                      onChange={(e) => setSelectedKelurahan(e.target.value)}
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
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Detail Lokasi</label>
                    <input
                      className="w-full rounded-lg border-2 border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Detail lokasi pengambilan"
                      required
                    />
                  </div>
                </div>

                {/* Waktu Pengambilan */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Tanggal Pengambilan</label>
                    <input
                      className="w-full rounded-lg border-2 border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      type="date"
                      value={date}
                      onChange={handleDateChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Waktu Pengambilan</label>
                    <input
                      className="w-full rounded-lg border-2 border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-[#45c517] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
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

export default ShareMealsForm;