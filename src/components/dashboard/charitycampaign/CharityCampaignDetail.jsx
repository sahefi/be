import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../../dashboard/Navbar';
import charityData from '../../../assets/charitycampaign/lembagaSosialData.json';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => `Rp ${Number(price).toLocaleString('id-ID')}`;

const CharityCampaignDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const campaign = charityData.find((item) => item.id === parseInt(id));

  if (!campaign) {
    return <p>Data tidak ditemukan</p>;
  }

  console.log("Campaign Data:", campaign); // Debugging untuk memastikan data terbaca

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <section className="bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <Navbar />
          <div className="mt-10 mx-10">
            <div className="bg-white shadow-md rounded-xl p-5 mb-5 flex flex-col md:flex-row gap-6">
              <img
                src={campaign.campaign_image_url}
                alt="Campaign"
                className="w-full md:w-1/2 h-64 object-cover rounded-md"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <img className="w-10 h-10 object-cover rounded-full" src={campaign.image_url} alt={campaign.name} />
                  <div>
                    <p className="font-semibold">{campaign.name}</p>
                    <p className="text-sm text-gray-600">{campaign.location}</p>
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-4">{campaign.campaign_title}</h1>
                <div>
                  <h3 className="text-lg font-bold">Terkumpul</h3>
                  <p className="text-sm mb-2">
                    Rp{campaign.collected.toLocaleString('id-ID')} dari Rp{campaign.target.toLocaleString('id-ID')}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-[#45c517] h-2.5 rounded-full"
                      style={{ width: `${(campaign.collected / campaign.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  className="bg-[#45c517] text-white w-full p-2 hover:bg-green-600 rounded-full transition duration-300"
                  onClick={() => navigate(`/charity-transaction/${campaign.id}`)}
                >
                  Donasi Sekarang
                </button>
              </div>
            </div>

            <section className="bg-white shadow-md rounded-xl p-5">
              <h1 className="text-xl font-semibold text-[#45c517] border-b pb-2 border-[#45c517] mb-4">Informasi Campaign</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="font-semibold">Deskripsi Campaign</h2>
                  <p className="text-sm">{campaign.description}</p>
                </div>
                <div>
                  <h2 className="font-semibold">Kategori Campaign</h2>
                  <p className="text-sm">{campaign.category}</p>
                </div>
                <div>
                  <h2 className="font-semibold">Target Campaign</h2>
                  <p className="text-sm">{formatPrice(campaign.target)}</p>
                </div>
                <div>
                  <h2 className="font-semibold">Durasi Campaign</h2>
                  <p className="text-sm">Mulai: {campaign.start_date}</p>
                  <p className="text-sm">Selesai: {campaign.end_date}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CharityCampaignDetail;
