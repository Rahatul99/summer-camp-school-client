import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext } from 'react';
import { FaAddressCard, FaBookDead, FaHome, FaShoppingBag, FaWallet } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="drawer lg:drawer-open">

            <Helmet>
                <title>Dive-In Delight | Dashboard</title>
            </Helmet>

            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <div className='mx-auto'>
                        <img src={user?.photoURL} alt="User Profile" className="rounded-full w-16 h-16" />
                    </div>
                    <div className='text-center'>
                        <h3 className="text-xl font-semibold mt-2">{user?.displayName}</h3>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>

                    <li><NavLink to='/dashboard/myCart'><FaShoppingBag />My Selected Classes</NavLink></li>
                    <li><NavLink to='/dashboard/enrolled'><FaBookDead />My Enrolled Classes</NavLink></li>
                    <li><NavLink to='/dashboard/paymentHistory'><FaWallet /> Payment History</NavLink></li>

                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome />Home</NavLink></li>
                    <li><NavLink to="/classes"><FaAddressCard /> Classes</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;













//         <div className="drawer lg:drawer-open">
//             <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//             <div className="drawer-content flex flex-col items-center justify-center">
//                 <Outlet />
//                 <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

//             </div>
//             <div className="drawer-side">
//                 <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
//                 <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
//                     {/* Sidebar content here */}
//                     <li><a>Sidebar Item 1</a></li>
//                     <li><a>Sidebar Item 2</a></li>
//                 </ul>

//             </div>
//         </div>