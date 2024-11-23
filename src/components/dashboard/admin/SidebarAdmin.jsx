import { NavLink, useLocation } from 'react-router-dom';

const SidebarAdmin = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const menuItems = [
        {
            paths: ["/admin"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>,
            text: "Home"
        },
        {
            paths: ["/share-meals-verif"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
            </svg>,
            text: "Data Akun"
        },
        {
            paths: ["/campaign-verif", "/campaign-detail-verif"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>,
            text: "Verifikasi Charity"
        },
        {
            paths: ["/article-verif", "/article-detail-verif"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-newspaper" viewBox="0 0 16 16">
                <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z" />
                <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z" />
            </svg>,
            text: "Verifikasi Blog & Article"
        },
        {
            paths: ["/share-activity"],
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-postcard-heart" viewBox="0 0 16 16">
                <path d="M8 4.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0zm3.5.878c1.482-1.42 4.795 1.392 0 4.622-4.795-3.23-1.482-6.043 0-4.622M2.5 5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z" />
            </svg>,
            text: "Share Your Activity"
        }
    ];

    return (
        <section className="shadow-lg fixed h-screen bg-white">
            <nav className="w-60 flex flex-col my-3 p-5 min-h-screen">
                <NavLink className='hover:scale-110 duration-300' to="/">
                    <h1 className="text-3xl text-[#47cb18] font-bold mb-5">
                        Care<span className="text-black">Bites</span>
                    </h1>
                </NavLink>

                <ul className="text-md flex flex-col gap-8 justify-between">
                    <div className='text-md flex flex-col gap-5'>
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.paths[0]}
                                to={item.paths[0]}
                                className={({ isActive }) => {
                                    const isPathActive = item.paths.some(path => 
                                        currentPath.startsWith(path)
                                    );
                                    return `text-sm flex items-center gap-2 px-2 py-3 rounded-md transition-colors ${
                                        isActive || isPathActive 
                                            ? "bg-[#47cb18] text-white" 
                                            : "bg-white hover:bg-[#47cb18] hover:text-white"
                                    }`;
                                }}
                            >
                                {item.icon}
                                <h1>{item.text}</h1>
                            </NavLink>
                        ))}
                        <span className='border-[1px]'></span>
                    </div>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `text-sm flex items-center gap-2 px-2 py-3 rounded-md transition-colors ${
                                isActive ? "bg-[#47cb18] text-white" : "bg-white hover:bg-[#47cb18] hover:text-white"
                            }`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                        <h1>My Profile</h1>
                    </NavLink>
                </ul>
            </nav>
        </section>
    );
};

export default SidebarAdmin;