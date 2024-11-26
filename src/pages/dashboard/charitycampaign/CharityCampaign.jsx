import { motion } from "framer-motion";
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import CharityCard from "../../../components/dashboard/charitycampaign/CharityCard";
import charityData from '../../../assets/charitycampaign/lembagaSosialData.json';
import { Link } from "react-router-dom";

const CharityCampaign = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar showSearchBar={true} />

      <section className="bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <Navbar showSearchBar={true} />
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-5 mx-10 text-2xl font-bold"
          >
            Charity Campaign
          </motion.h1>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="min-h-screen mx-10 rounded-md"
          >
            <Link to="/campaign-form">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-2 text-white rounded-full w-32 bg-[#47cb18] mt-4 mb-5"
                type="submit"
              >
                Buat Charity
              </motion.button>
            </Link>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-even gap-10"
            >
              {charityData.map((lembaga, index) => (
                <motion.div
                  key={lembaga.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CharityCard
                    id={lembaga.id}
                    name={lembaga.name}
                    location={lembaga.location}
                    image_url={lembaga.image_url}
                    campaign={{
                      title: lembaga.campaign_title,
                      collected: lembaga.collected,
                      target: lembaga.target,
                      campaign_image_url: lembaga.campaign_image_url,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </section>
    </div>
  );
};

export default CharityCampaign;