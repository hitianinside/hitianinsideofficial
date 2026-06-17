import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';

const UpdateUserInfo = ({ email, department, year, name, setIsUpdated }) => {
  const [userInfo, setUserInfo] = useState({
    name: name,
    year: year,
    email: email,
    department: department
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeUserInfo = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/user/update`, userInfo);
      toast.success(res.data.message || "Profile Updated!");
      setIsUpdated(false); // Close modal on success
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md'>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsUpdated(false)}
        className="absolute inset-0"
      />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className='relative w-full max-w-md bg-[#660909] border border-white/10 p-8 rounded-[2rem] shadow-2xl z-10'
      >
        <button 
          className='absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500 text-white transition-colors cursor-pointer' 
          onClick={() => setIsUpdated(false)}
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-[#FFB5B5] mb-6 font-hammersmith">Update Profile</h2>

        <div className='space-y-4'>
          <div className='flex flex-col gap-1'>
            <label className="text-[#FFB5B5]/60 text-xs font-bold uppercase tracking-widest ml-2">Full Name</label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className='w-full bg-white/5 border border-white/10 rounded-2xl p-3 px-5 text-white focus:outline-none focus:border-[#d03c19] transition-colors'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className="text-[#FFB5B5]/60 text-xs font-bold uppercase tracking-widest ml-2">Department</label>
            <input
              type="text"
              value={userInfo.department}
              onChange={(e) => setUserInfo({ ...userInfo, department: e.target.value })}
              placeholder='Ex - CSE'
              className='w-full bg-white/5 border border-white/10 rounded-2xl p-3 px-5 text-white focus:outline-none focus:border-[#d03c19] transition-colors'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className="text-[#FFB5B5]/60 text-xs font-bold uppercase tracking-widest ml-2">Academic Year</label>
            <input
              type="number"
              value={userInfo.year}
              onChange={(e) => setUserInfo({ ...userInfo, year: e.target.value })}
              className='w-full bg-white/5 border border-white/10 rounded-2xl p-3 px-5 text-white focus:outline-none focus:border-[#d03c19] transition-colors'
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            onClick={changeUserInfo}
            className={`w-full py-4 rounded-2xl font-bold text-lg mt-4 transition-all duration-300 shadow-lg 
              ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#d03c19] text-white hover:bg-orange-600 shadow-[#d03c19]/20'}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                SAVING...
              </span>
            ) : "UPDATE PROFILE"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateUserInfo;