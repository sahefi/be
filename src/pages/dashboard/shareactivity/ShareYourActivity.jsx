// ShareYourActivity.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import ShareActivityCard from "../../../components/dashboard/shareactivity/ShareActivityCard";
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import activityData from "../../../assets/shareyouractivity/activityData.json";

const ShareYourActivity = () => {
    const [isCreatingPost, setIsCreatingPost] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow relative">
                    <Navbar showSearchBar={false} />

                    {/* Header Section */}
                    <div className="mx-10 h-16 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-[#45c517]">Feeds</h1>
                        <div className="flex gap-5">
                            <p className="hover:cursor-pointer font-semibold text-lg text-black">
                                Terbaru
                            </p>
                            <p className="hover:cursor-pointer text-gray-500 text-lg">Popular</p>
                        </div>
                    </div>

                    <div className="flex gap-5 mx-10 mt-5">
                        {/* Create Post Button/Form */}
                        <div className="w-2/5">
                            <motion.div
                                className="rounded-xl overflow-hidden"
                                animate={{ height: isCreatingPost ? 'auto' : '40px' }}
                                transition={{ duration: 0.3 }}
                            >
                                {!isCreatingPost ? (
                                    // Simple Plus Button
                                    <div
                                        className="flex  cursor-pointer"
                                        onClick={() => setIsCreatingPost(true)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="h-10 w-10"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </div>
                                ) : (
                                    // Create Post Form
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-4 bg-white shadow-md rounded-xl"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-semibold text-lg">Create Post</h3>
                                            <button
                                                onClick={() => setIsCreatingPost(false)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <textarea
                                            className="w-full border rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#45c517]"
                                            placeholder="What's on your mind?"
                                        />
                                        <div className="flex justify-between items-center mt-4">
                                            <button className="flex items-center gap-2 text-gray-500 hover:text-[#45c517]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Add Photo
                                            </button>
                                            <button className="bg-[#45c517] text-white px-4 py-2 rounded-lg hover:bg-green-600">
                                                Post
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        {/* Activity Feed */}
                        <section className="min-h-screen rounded-md flex-1">
                            {activityData.map((activity) => (
                                <ShareActivityCard key={activity.id} activity={activity} />
                            ))}
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShareYourActivity;