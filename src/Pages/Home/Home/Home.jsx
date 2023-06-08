import { Helmet } from "react-helmet-async";
import Banner from "../Bannner/Banner";
import PopularClassesSection from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import WhyShould from "../WhyShould/WhyShould";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Dive-In Delight | Home</title>
            </Helmet>
            <Banner />
            <PopularInstructors />
            <PopularClassesSection />
            <WhyShould />
        </div>
    );
};

export default Home;
