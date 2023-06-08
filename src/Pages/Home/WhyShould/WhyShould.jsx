import SectionTitle from '../../../Components/SectionTitle';
import { motion } from 'framer-motion';
import { Fade, Slide } from "react-awesome-reveal";


const cardData = [
  {
    title: 'Experienced Staff',
    description: 'We all have one thing in common: a passion for sport and a unique approach.',
  },
  {
    title: 'Personal Development',
    description: 'We participate in various courses and learn about new trends in swimming teaching.',
  },
  {
    title: 'Modern Methods',
    description: 'We work with pure passion for sport and the desire to promote an active lifestyle.',
  },
  {
    title: 'Unique School',
    description: 'We want to change the approach of children and their parents to learning to swim.',
  },
  {
    title: 'Creative Minds',
    description: 'Let us celebrate the creative minds, for they are the trailblazers, the dreamers.',
  },
  {
    title: 'Functionality',
    description: 'At functionality, we celebrate the joy of movement and the power of a positive mindset.',
  },
];

const WhyShould = () => {
  return (
    <>
      <SectionTitle title="Check Why You Should Choose Us"/>
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
    </>
  );
};

export default WhyShould;
