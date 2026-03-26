import { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { isAuthenticatedContext } from '../../context/context';
import { motion, AnimatePresence } from 'motion/react';
import { FiLogOut, FiBarChart2, FiUser, FiEdit2 } from 'react-icons/fi';
import { getUserInfo } from '../../api/userapis';
import UpdateUserInfo from '../../components/UpdateUserInfo/UpdateUserInfo';

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allUserData, setAllUserData] = useState(null);
  const { setIsAuthenticated, isAuthenticated } = useContext(isAuthenticatedContext);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    if (data) {
      const userData = JSON.parse(data);
      setUserInfo(userData);
    }
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isAuthenticated) {
        const { userData } = await getUserInfo();
        setAllUserData(userData);
      }else{
        return null;
      }
    }

    fetchUserInfo();
  }, [isUpdated, isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    setIsAuthenticated(false);
    navigate('/');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const buttonStyle = "w-auto flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl font-semibold transition-all duration-300 shadow-md transform active:scale-95";

  return (
    <div className='min-h-[40vh] overflow-x-hidden py-12 px-4 flex flex-col items-center text-gray-100 font-sans'>

      <AnimatePresence mode="wait">
        {isAuthenticated ? (
          <motion.div
            key="authenticated"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-2xl flex flex-col gap-8 items-center"
          >
            {/* Profile Card */}
            <motion.div
              variants={itemVariants}
              className="w-full relative bg-[#8c0909]/20 backdrop-blur-xl border border-red-500/30 p-8 sm:p-10 rounded-3xl shadow-[0_0_40px_-10px_rgba(255,0,0,0.3)] flex flex-col sm:flex-row items-center sm:items-start gap-6 group hover:border-orange-500/50 transition-colors duration-500"
            >
              {/* Decorative background glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-600/20 rounded-full blur-[60px] pointer-events-none" />

              {/* Avatar */}
              <div className="relative z-10 shrink-0">
                {userInfo?.image ? (
                  <img
                    src={userInfo.image}
                    alt={userInfo.name}
                    className="w-28 h-28 object-cover rounded-full shadow-xl border-2 border-red-500/40 group-hover:border-orange-400 transition-colors"
                  />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center bg-red-900/50 rounded-2xl shadow-xl border-2 border-red-500/40">
                    <FiUser className="w-12 h-12 text-red-300" />
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left z-10 w-full space-y-2">
                <p className="text-red-400 text-sm font-bold tracking-widest uppercase">Student Profile</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {allUserData?.name || 'User Name'}
                </h2>
                <div className="w-full pt-2 mt-2 border-t border-red-500/20">
                  <p className="text-gray-300 text-sm sm:text-base font-medium truncate w-full">
                    Email id : {allUserData?.email || 'user@example.com'}
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base font-medium truncate w-full uppercase">
                    Department : {allUserData?.department || 'CSE'}
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base font-medium truncate w-full uppercase">
                    Year : {allUserData?.year + " year" || '1st year'}
                  </p>
                </div>
                <button
                  onClick={() => setIsUpdated(true)}
                  className={`${buttonStyle} bg-yellow-600 hover:bg-yellow-500 text-white shadow-yellow-900/50`}>
                  {FiEdit2} Edit
                </button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center w-full gap-4">
              <NavLink to="/scorecards">
                <button className={`${buttonStyle} bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] w-fit`}>
                  <FiBarChart2 className="w-5 h-5" /> Match Scores
                </button>
              </NavLink>

              <button
                onClick={handleLogout}
                className={`${buttonStyle} bg-red-700 hover:bg-red-600 text-white w-fit shadow-red-900/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]`}
              >
                <FiLogOut className="w-5 h-5" /> Logout
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="unauthenticated"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md bg-black/40 backdrop-blur-md border border-red-900/50 p-10 rounded-3xl flex flex-col items-center gap-6 shadow-2xl"
          >
            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-2 border border-red-500/20">
              <FiUser className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-center">Authentication Required</h2>
            <p className="text-gray-400 text-center text-sm mb-4">Please sign in to view your profile details and personal settings.</p>

            <div className="flex flex-wrap justify-around w-full gap-4">
              <NavLink to="/sign-up">
                <button className={`${buttonStyle} bg-red-600 hover:bg-red-500 shadow-red-900/50`}>
                  Sign In
                </button>
              </NavLink>
              <NavLink to="/scorecards">
                <button className={`${buttonStyle} bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500`}>
                  Match Scores
                </button>
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {
        isUpdated && <UpdateUserInfo email={allUserData.email} name={allUserData.name} department={allUserData.department} year={allUserData.year} setIsUpdated={setIsUpdated} />
      }
    </div>
  );
};

export default Profile;