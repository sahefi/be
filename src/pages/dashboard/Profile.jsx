import { motion } from "framer-motion";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import userData from "../../assets/user/userData.json";
import { useState } from "react";
import HistoryCard from "../../components/dashboard/profile/HistoryCard";
import NoData from "../../components/dashboard/profile/NoData";
import { Link } from "react-router-dom";

const Profile = () => {
    const [selectedNav, setSelectedNav] = useState("Riwayat Grab Meals");

    const handleNavClick = (nav) => {
        setSelectedNav(nav);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar showSearchBar={true} />

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                    
                        <h1 className="mt-10 mx-10 text-2xl font-bold text-[#45c517] animate-fadeIn">
                            Profile
                        </h1>
                    </motion.div>

                    {/* content */}
                    <motion.section 
                        className="mx-10 my-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="p-5 min-h-screen w-full bg-white shadow-md rounded-xl">
                            <motion.div 
                                className="flex flex-col items-center text-center justify-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <img
                                    className="w-36 h-36 object-cover rounded-full shadow-md transform transition-transform duration-300 hover:scale-110"
                                    src={userData.user.image_url}
                                    alt=""
                                />
                                <h1 className="mt-3 text-2xl font-semibold">
                                    {userData.user.name}
                                </h1>
                                <p className="text-[#45c517]">{userData.user.location}</p>
                                <Link to="/profil/edit-profil">
                                    <motion.button 
                                        className="bg-[#45c517] hover:bg-[#3db314] font-semibold mt-5 py-2 px-3 rounded-full text-white transition-all"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Edit Profile
                                    </motion.button>
                                </Link>
                            </motion.div>

                            {/* navigate */}
                            <motion.div 
                                className="mt-5 flex justify-between"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                {[
                                    "Riwayat Grab Meals",
                                    "Riwayat Sharing Meals",
                                    "Riwayat Activity",
                                    "Riwayat Charity",
                                    "Riwayat Article",
                                ].map((nav) => (
                                    <motion.p
                                        key={nav}
                                        onClick={() => handleNavClick(nav)}
                                        className={`hover:cursor-pointer pb-2 text-md font-semibold transition-colors duration-300 ${
                                            selectedNav === nav
                                                ? "border-b-2 border-[#45c517] text-[#45c517]"
                                                : "hover:text-[#45c517] hover:border-b-2 hover:border-[#45c517] text-gray-600"
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {nav}
                                    </motion.p>
                                ))}
                            </motion.div>

                            {/* history card */}
                            <motion.div 
                                className="mt-5 animate-slideUp"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                {selectedNav === "Riwayat Grab Meals" && (
                                    <motion.div 
                                        className="p-4 w-full pb-5 bg-white shadow-md rounded-xl transform transition-transform duration-300 hover:-translate-y-2"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <HistoryCard />
                                    </motion.div>
                                )}
                                {selectedNav !== "Riwayat Grab Meals" && <NoData />}
                            </motion.div>
                        </div>
                    </motion.section>
                </div>
            </section>
        </div>
    );
};

export default Profile;