import { useParams } from "react-router-dom";
import articles from "../../../assets/blogarticle/articleData.json";
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import MiniCardArticle from "../../../components/dashboard/article/MiniCardArticle";

const ArticleDetail = () => {
    const { id } = useParams();
    const article = articles.find(article => article.id === parseInt(id, 10));

    if (!article) {
        return <div>Artikel tidak ditemukan</div>;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar />
                

                    <section className="min-h-screen mx-10 mt-10">
                        <div className="flex gap-5 relative">
                            {/* Main Article Content - Scrollable */}
                            <div className="p-8 rounded-md bg-white shadow-md w-[70%]">
                                <p className="text-2xl font-bold">{article.title}</p>
                                <div className="flex gap-3 items-center my-3">
                                    <img
                                        className="rounded-full border-2 border-[#45c517] w-8 h-8 object-cover"
                                        src={article.author_profile}
                                        alt={article.author_name}
                                    />
                                    <div>
                                        <p className="font-semibold">{article.author_name}</p>
                                        <span className="text-xs">{article.read_min} | {article.created_at}</span>
                                    </div>
                                </div>
                                <div>
                                    <img
                                        className="w-full h-80 object-cover block"
                                        src={article.img_content}
                                        alt={article.title}
                                    />
                                    <p className="mt-5 text-md whitespace-pre-wrap">
                                        {article.content}
                                    </p>
                                </div>
                            </div>

                            {/* Sticky Sidebar */}
                            <div className="w-[30%]">
                                <div className="sticky top-24 bg-white rounded-md">
                                    <MiniCardArticle />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default ArticleDetail;
