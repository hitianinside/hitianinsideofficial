// import "./header.css";
import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { FaUserCircle, FaHome, FaInfoCircle, FaBookOpen, FaCalendarAlt, FaUsers, FaShoppingBag } from "react-icons/fa";
import './header.css';
import { AnimatePresence, motion } from "motion/react";

function Header() {
  //navLinks
  const [navLinks] = useState([
    {
      path: "/",
      display: "Home",
      icon: <FaHome />
    },
    {
      path: "/almanac",
      display: "Almanac",
      icon: <FaBookOpen />
    },
    {
      path: "/events",
      display: "Events",
      icon: <FaCalendarAlt />
    },
    {
      path: "/merchandise",
      display: "Merchandise",
      icon: <FaShoppingBag />
    },
    {
      path: "/team",
      display: "Team",
      icon: <FaUsers />
    },

    {
      path: "/about",
      display: "About",
      icon: <FaInfoCircle />
    }
  ])


  const [navbarOpen, setNavbarOpen] = useState(false);
  const [profilePic, setprofilePic] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user-info');
    if (user) {
      setprofilePic(JSON.parse(user).image);
    }
  }, [])

  const changeStyle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const profile = {
    path: "/profile",
  }

  return (
    <>
      <div>
        <nav className="border-gray-200 relative bg-[#650808] dark:bg-[#650808] dark:border-[#650808]">
          <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap items-center justify-between mx-auto p-4">

            <NavLink to="/" className="flex items-center ps-2 md:ps-5">
              <img src={logo} alt="INSIDE LOGO" className="h-8 mr-3" />
              <span className="self-center text-xl md:text-2xl max-sm:hidden font-bold whitespace-nowrap text-white mb-1">
                HITian Inside
              </span>
            </NavLink>

            {/* HAMBERGER SECTION */}
            <div className="flex gap-3 items-center md:hidden">
              <NavLink to={profile.path} className="border rounded-full overflow-hidden" onClick={() => setNavbarOpen(false)}>
                {profilePic ?
                  <img src={profilePic} alt="profile_image" className="w-[28px]" />
                  :
                  <FaUserCircle size={23} color="white" />
                }
              </NavLink>
              <button
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-red-400 dark:hover:bg-red-700 dark:focus:ring-red-600"
                onClick={changeStyle}
              >
                <span className="sr-only">Toggle menu</span>
                {navbarOpen ? (
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path d="M1 1h15M1 7h15M1 13h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>

            {/* Navbar Links for window or tablet*/}
            <div className={`w-full md:w-auto hidden md:flex items-center gap-5`} id="navbar-solid-bg">
              <ul className="flex flex-col md:flex-row font-medium mt-4 md:mt-0 rounded-lg bg-[#650808] md:bg-transparent dark:bg-[#650808] md:dark:bg-transparent space-y-2 md:space-y-0 md:space-x-4">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#FFB5B5] text-[17px] font-[400] font-hammersmith"
                          : "text-white text-[17px] font-[100] hover:text-[#FFB5B5] font-hammersmith"
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <NavLink to={profile.path} className="border rounded-full hidden md:block overflow-hidden">
                {profilePic ?
                  <img src={profilePic} alt="profile_image" className="w-[25px]" />
                  :
                  <FaUserCircle size={23} color="white" />
                }
              </NavLink>
            </div>

            {/* Navbar for Mobile  */}
            <AnimatePresence>
              {navbarOpen && (
                <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute inset-0 top-[70px] z-50 w-full h-fit bg-[#660909]/60 rounded-b-xl backdrop-blur-lg flex flex-col gap-6 text-2xl font-bold py-5 px-10 text-white md:hidden"
                >
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => changeStyle()}
                        className={({ isActive }) =>
                          `block transition-all duration-300 ${isActive ? "text-[#FFB5B5]" : "hover:text-[#FFB5B5]"}`
                        }
                      >
                        {link.display}
                      </NavLink>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav >
      </div >
    </>
  );
}

export default Header;
