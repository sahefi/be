import React from 'react';
import SidebarLS from '../../../components/dashboard/lembagasosial/SidebarLS';
import NavbarLS from '../../../components/dashboard/lembagasosial/NavbarLS';
import CharityCardLS from '../../../components/dashboard/lembagasosial/CharityCardLS';
import charityCampaignData from '../../../assets/user/charityCampaignData.json';
import { Link } from 'react-router-dom';


const CharityCampaignLS = () => {
  return (
    <div className="relative flex min-h-screen">
      <SidebarLS />
      <section className="pb-16 bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <NavbarLS />

          <section className='min-h-screen mx-10'>
            <h1 className="text-2xl font-bold text-[#45c517] my-5">Kampanye Amal</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {charityCampaignData.map((campaign) => (
                <CharityCardLS
                  key={campaign.id}
                  id={campaign.id}
                  image={campaign.campaign_image_url}
                  title={campaign.campaign_title}
                  isActive={campaign.status === "aktif"}
                  targetDonation={campaign.target}
                  collectedAmount={campaign.collected}
                />
              ))}
            </div>

            {/* Floating Action Button */}
            <Link to="/create-charity-ls" className="fixed bottom-8 right-8">
              <button className="bg-[#45c517] hover:bg-[#3ba513] text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="absolute right-full mr-2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Buat Campaign
                </span>
              </button>
            </Link>

          </section>
        </div>
      </section>
    </div>
  );
};

export default CharityCampaignLS;