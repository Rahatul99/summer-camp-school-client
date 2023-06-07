import Banner from "../Bannner/Banner";
import InstructorsPage from "../Instructors/Instructors";
import PopularClassesSection from "../PopularClasses/PopularClasses";
import WhyShould from "../WhyShould/WhyShould";

const Home = () => {
    return (
        <div>
            <Banner />
            <InstructorsPage />
            <PopularClassesSection />
            <WhyShould />
        </div>
    );
};

export default Home;
