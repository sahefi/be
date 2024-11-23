import { useState } from "react";
import SidebarAdmin from "../../../../components/dashboard/admin/SidebarAdmin";
import NavbarAdmin from "../../../../components/dashboard/admin/NavbarAdmin";
import lembagaSosialData from "../../../../assets/lembagasosial/lembagaSosialData.json";
import { useNavigate } from "react-router-dom";

const CampaignVerif = () => {
  const [activeTab, setActiveTab] = useState("Draft");
  const navigate = useNavigate();

  const handleDetailClick = (campaign) => {
    navigate(`/campaign-detail-verif/${campaign.id}`, {
      state: {
        status: activeTab,
        showButtons: activeTab !== "Rejected"
      }
    });
  };


  const campaigns = {
    Draft: [lembagaSosialData[0]],
    Accepted: [lembagaSosialData[1]],
    Rejected: [lembagaSosialData[2]],
  };

  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />

      <section className="bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <NavbarAdmin />
          <h1 className="mt-5 mx-10 text-2xl text-[#45c517] font-bold">
            Verifikasi Charity
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="text-green-500 hover:cursor-pointer mx-10 bi bi-arrow-left-short"
            viewBox="0 0 16 16"
            onClick={() => window.history.back()}
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
            />
          </svg>
          <section className="min-h-screen mx-10 my-5 p-5 rounded-md bg-white shadow-md">
            {/* Tabs */}
            <div className="font-semibold flex gap-7">
              <p
                className={`cursor-pointer ${activeTab === "Draft"
                  ? "border-b-[2px] border-[#45c517] text-[#45c517]"
                  : "text-gray-500"
                  }`}
                onClick={() => setActiveTab("Draft")}
              >
                Draft
              </p>
              <p
                className={`cursor-pointer ${activeTab === "Accepted"
                  ? "border-b-[2px] border-[#45c517] text-[#45c517]"
                  : "text-gray-500"
                  }`}
                onClick={() => setActiveTab("Accepted")}
              >
                Accepted
              </p>
              <p
                className={`cursor-pointer ${activeTab === "Rejected"
                  ? "border-b-[2px] border-[#45c517] text-[#45c517]"
                  : "text-gray-500"
                  }`}
                onClick={() => setActiveTab("Rejected")}
              >
                Rejected
              </p>
            </div>
            {/* Table */}
            <div className="p-4">
              <table className="table-fixed w-full border-collapse">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2 font-semibold w-2/6">Username</th>
                    <th className="px-4 py-2 font-semibold w-1/12">ID</th>
                    <th className="px-4 py-2 font-semibold w-1/6">Kategori</th>
                    <th className="px-4 py-2 font-semibold w-1/4">Judul Charity</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns[activeTab].map((campaign, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 flex items-center gap-3">
                        <img
                          src={campaign.image_url}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="block truncate">{campaign.name}</span>
                      </td>
                      <td className="px-4 py-2">{campaign.id}</td>
                      <td className="px-4 py-2">{campaign.category}</td>
                      <td className="px-4 py-2">
                        <span className="block truncate">{campaign.campaign_title}</span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        {activeTab !== "Rejected" ? (
                          <button
                            onClick={() => handleDetailClick(campaign)}
                            className="bg-[#45c517] text-white w-32 py-2 rounded-full hover:opacity-90 text-sm font-medium"
                          >
                            Lihat Detail
                          </button>
                        ) : (
                          <span className="text-gray-500">Rejected</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default CampaignVerif;
