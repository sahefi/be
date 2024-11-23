// HomeDashboard.jsx
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import ShareActivityCard from "../../../components/dashboard/shareactivity/ShareActivityCard";

import activityData from "../../../assets/shareyouractivity/activityData.json";


const ShareYourActicty = () => {


    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                {/* Tambahkan padding-top agar konten tidak tertutup */}
                <div className="flex-grow relative">
                    <Navbar showSearchBar={false} />

                    {/* Header Section */}
                    <div className=" mx-10 h-16 flex items-center justify-between  left-60 ">
                        {/* Elemen Kiri: H1 */}
                        <h1 className="text-2xl font-bold text-[#45c517]">Feeds</h1>

                        {/* Elemen Kanan: Links */}
                        <div className="flex gap-5">
                            <p className="hover:cursor-pointer font-semibold text-lg text-black">
                                Terbaru
                            </p>
                            <p className="hover:cursor-pointer text-gray-500 text-lg">Popular</p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <section className="min-h-screen mx-10 mt-5 rounded-md">
                        {activityData.map((activity) => (
                            <ShareActivityCard key={activity.id} activity={activity} />
                        ))}
                    </section>
                </div>
            </section>
        </div>
    );
};

export default ShareYourActicty;
