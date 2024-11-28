
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from '../../../components/dashboard/Navbar'; // Sesuaikan dengan path yang benar
import ArticleCard from "../../../components/dashboard/article/ArticleCard";
import { useEffect, useState } from 'react';

const BlogArtikel = () => {
    const [articleData, setArticleData] = useState([]); // State untuk menyimpan data artikel
    const [loading, setLoading] = useState(true); // State untuk menangani status loading
    const [error, setError] = useState(null); // State untuk menangani error

    // Fetch data menggunakan useEffect
    useEffect(() => {
        axios.get('http://localhost:8085/postingan')
            .then((response) => {
                setArticleData(response.data); // Set data artikel ke state
                setLoading(false); // Set loading ke false setelah data diambil
            })
            .catch((error) => {
                console.error("There was an error fetching the articles:", error);
                setError("Failed to load articles");
                setLoading(false);
            });
    }, []); // [] artinya hanya dijalankan sekali saat komponen dimuat

    // Menangani kondisi loading dan error
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar showSearchBar={true} />
                    <div className="mt-5 mx-10 flex justify-between items-center">
                        <h1 className=" text-[#45c517] text-2xl font-bold">Blog & Artikel</h1>
                        <div className="flex flex-col items-end gap-3">
                            <p>Buat Artikelmu sendiri!</p>
                            <Link to="/article-form">
                                <div className="hover:cursor-pointer hover:bg-[#3ca315] bg-[#45c517] text-white py-1 rounded-xl px-4 flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                    <p className="text-md">Buat Artikel</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <section className="min-h-screen mx-10 my-5 rounded-md">
                        <div className="flex gap-5 flex-wrap">
                            {articleData.map((article) => (
                                <Link to={`/article/${article.id}`} key={article.id}>
                                    <ArticleCard article={article} />
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default BlogArtikel;
