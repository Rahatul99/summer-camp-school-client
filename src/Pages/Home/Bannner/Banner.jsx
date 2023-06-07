import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Banner = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <Carousel autoPlay infiniteLoop>
            <div data-aos="zoom-in-down">
                <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599376871063-1b999e42afde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold" data-aos="zoom-in-down">Discover the Joy of Swimming</h1>
                            <p className="mb-5" data-aos="zoom-in-down">Welcome to Dive into Excellence, the premier swimming school dedicated to helping individuals of all ages and skill levels develop a love for the water and master the art of swimming.</p>
                            <button className="btn btn-wide btn-outline">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1622629797619-c100e3e67e2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80)' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Unleash Your Aquatic Potential</h1>
                            <p className="mb-5">Welcome to Dive into Excellence, the premier swimming school dedicated to helping individuals of all ages and skill levels develop a love for the water and master the art of swimming.</p>
                            <button className="btn btn-wide btn-outline">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1528803328070-461b667ac692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80)' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Where Champions are Made</h1>
                            <p className="mb-5">Welcome to Dive into Excellence, the premier swimming school dedicated to helping individuals of all ages and skill levels develop a love for the water and master the art of swimming.</p>
                            <button className="btn btn-wide btn-outline">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;
