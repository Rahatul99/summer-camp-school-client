import Banner from "../Bannner/Banner";
import PopularClassesSection from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import WhyShould from "../WhyShould/WhyShould";

const Home = () => {
    return (
        <div>
            <Banner />
            <PopularInstructors />
            <PopularClassesSection />
            <WhyShould />
        </div>
    );
};

export default Home;
