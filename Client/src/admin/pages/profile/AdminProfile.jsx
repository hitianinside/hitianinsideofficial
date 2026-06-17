import { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { isAuthenticatedContext } from '../../../context/context';
import { motion } from 'motion/react';
import Loader from '../../components/Loader/Loader';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const { setIsAuthenticated, isAuthenticated } = useContext(isAuthenticatedContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    if (data) {
      setUserInfo(JSON.parse(data));
    }

    setIsLoading(false);
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    setIsAuthenticated(false);
    navigate('/');
  };

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  const btnClass = "bg-red-700 hover:bg-red-600 transition-colors duration-300 p-3 rounded-xl font-semibold w-full shadow-md text-sm md:text-base";

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVars}
      className='min-h-screen p-4 md:p-10 text-white flex flex-col items-center'
    >
      {/* Profile Header Card */}
      <motion.div
        variants={itemVars}
        className='flex flex-col sm:flex-row justify-around items-center gap-6 bg-gradient-to-br from-[#8c0909] to-[#5a0404] w-full max-w-2xl p-8 rounded-2xl shadow-2xl border border-white/10 hover:border-orange-500/50 transition-all'
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={userInfo?.image || 'https://via.placeholder.com/150'}
          alt={userInfo?.name}
          className='w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/20 shadow-lg'
        />
        <div className='text-center sm:text-left space-y-2'>
          <h2 className='text-2xl md:text-3xl font-bold tracking-tight'>
            {userInfo?.name}
          </h2>
          <p className='text-red-200 opacity-80 font-medium'>{userInfo?.email}</p>
          <div className='inline-block px-3 py-1 bg-black/30 rounded-full text-xs uppercase tracking-widest'>
            Administrator
          </div>
        </div>
      </motion.div>

      {/* Welcome Section */}
      <motion.div variants={itemVars} className='w-full max-w-4xl mt-12 mb-8 text-center sm:text-left'>
        <h2 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400'>
          Welcome Back, {userInfo?.name?.split(' ')[0]}
        </h2>
        <p className='text-gray-400 mt-2'>What would you like to manage today?</p>
      </motion.div>

      {/* Action Grid */}
      <motion.div
        variants={containerVars}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl'
      >
        {[
          { to: '/admin/events', label: 'Add Event' },
          { to: '/admin/add-poster', label: 'Add Homepage Poster' },
          { to: '/admin/almanac', label: 'Add Almanac' },
          { to: '/admin/matches-scorecard', label: 'Update Scores' },
          { to: '/admin/users-sent-data', label: 'User Submissions' },
          { to: '/admin/add-blog', label: 'Add Blog' },
          { to: '/scorecards', label: 'Preview Scores', color: 'bg-blue-600 hover:bg-blue-500' },
        ].map((link, idx) => (
          <motion.div key={idx} variants={itemVars} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
            <NavLink to={link.to}>
              <button className={link.color ? `${link.color} p-3 rounded-xl font-semibold w-full shadow-md` : btnClass}>
                {link.label}
              </button>
            </NavLink>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Actions */}
      <motion.div variants={itemVars} className='mt-12'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className='bg-white/10 hover:bg-white/20 border border-white/20 px-10 py-3 rounded-full font-bold transition-all'
        >
          Sign Out
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AdminProfile;