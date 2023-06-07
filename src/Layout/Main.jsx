import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { useState } from "react";
import './main.css';

const Main = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleMode = () => {
        setDarkMode(!darkMode);
    }
    return (
        <div className={`main ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <Navbar toggleMode={toggleMode} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;



//   const [darkMode, setDarkMode] = useState(false);

//   const toggleMode = () => {
//     setDarkMode(!darkMode);
//   return (
//     <div className={`home ${darkMode ? "dark" : "light"}`}>
//       <div className="toggle-container">
//         <button className="toggle-button" onClick={toggleMode}>
//           {darkMode ? "Light Mode" : "Dark Mode"}
//         </button>
//       </div>
//     </div>
//   );
// };
