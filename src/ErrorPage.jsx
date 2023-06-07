import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const ErrorPage = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div
            className="hero h-[100%] bg-cover bg-center"
            style={{
                backgroundImage: `url("https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Page.gif")`,
            }}
        >
            <div
                className="flex flex-col items-center justify-center h-screen hero-overlay bg-opacity-60"
                data-aos="zoom-in-down"
            >
                <h1 className="text-5xl font-bold text-white mb-4">404 - Page Not Found</h1>
                <p className="text-2xl text-gray-200 mb-8">Oops! The page you are looking for does not exist.</p>
                <Link
                    to="/"
                    className="btn-wide bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 text-center"
                    data-aos="zoom-in-down"
                >
                    <div className="flex items-center justify-between">
                        <p className="mr-2">Back to Home</p>
                        <FaArrowRight data-aos="fade-right" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;














