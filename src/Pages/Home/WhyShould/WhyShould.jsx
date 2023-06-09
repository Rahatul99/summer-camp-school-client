import SectionTitle from '../../../Components/SectionTitle';
import { motion } from 'framer-motion';
import { Fade, Slide } from "react-awesome-reveal";
import useWhyshould from '../../../Components/Hooks/useWhyshould';
import { SyncLoader } from 'react-spinners';

const WhyShould = () => {
  const [cardData, loading] = useWhyshould();
  return (
    <>
      <SectionTitle title="Check Why You Should Choose Us" />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader color="#36d7b7" />
        </div>
      ) :
        (
          <Slide>
            <Fade cascade damping={1e-1}>
              <div className="grid md:grid-cols-3 gap-6 p-5">
                {cardData.map((card, index) => (
                  <motion.div
                    key={index}
                    className="card flex flex-col justify-between items-center p-5 rounded-lg shadow-md toggle-container"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h2 className="card-title text-2xl font-bold mb-4">{card.title}</h2>
                    <p className="text-center">{card.description}</p>
                  </motion.div>
                ))}
              </div>
            </Fade>
          </Slide>
        )}
    </>
  );
};

export default WhyShould;
