import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { addAlmanac, getAdminAlmanac, deleteAlmanac } from '../../../api/adminapis';

const AdminAlmanac = () => {
  const [almanac, setAlmanac] = useState({
    file: null,
    username: '',
    department: ''
  });

  const [almanacData, setAlmanacData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);

  const getData = async () => {
    try {
      const response = await getAdminAlmanac();
      setAlmanacData(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching almanac");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAdd = async () => {
    if (!almanac.file || !almanac.department || !almanac.username) {
      toast.warning("Please fill all required fields");
      return;
    }

    setSubmit(true);
    try {
      const res = await addAlmanac(almanac);
      toast.success(res.data.message);
      setAlmanac({ file: null, username: '', department: '' });
      getData(); // Refresh list
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSubmit(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteAlmanac(id);
      setAlmanacData(prev => prev.filter(data => data._id !== id));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Animation Configs
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
  };

  const inputClass = "bg-white/10 backdrop-blur-md p-3 my-2 w-full md:w-[280px] border border-white/20 rounded-xl text-white outline-none focus:border-red-500 transition-all placeholder:text-red-200/40";

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className='min-h-screen p-4 md:p-10'
    >
      {/* Input Section */}
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className='bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto mb-16'
      >
        <h2 className='text-2xl font-bold text-red-200 mb-8 text-center'>Add To Almanac</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className='flex flex-col'>
            <label className='text-red-200 text-sm ml-2 mb-1'>Almanac Photo</label>
            <input
              type="file"
              onChange={(e) => setAlmanac({ ...almanac, file: e.target.files[0] })}
              accept='image/*'
              className={`${inputClass} file:bg-red-600 file:border-0 file:text-white file:rounded-md file:px-2 cursor-pointer`}
              required 
            />
          </div>
          
          <div className='flex flex-col'>
            <label className='text-red-200 text-sm ml-2 mb-1'>Student/Staff Name</label>
            <input
              type="text"
              value={almanac.username}
              onChange={(e) => setAlmanac({ ...almanac, username: e.target.value })}
              className={inputClass}
              placeholder='Full Name'
              required 
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-red-200 text-sm ml-2 mb-1'>Department</label>
            <input
              type="text"
              value={almanac.department}
              onChange={(e) => setAlmanac({ ...almanac, department: e.target.value })}
              className={inputClass}
              placeholder='e.g. Computer Science'
              required 
            />
          </div>
        </div>

        <div className='flex justify-center mt-10'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={submit}
            onClick={handleAdd}
            className={`px-12 py-3 rounded-full font-bold text-white shadow-lg transition-all ${
              submit ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-500'
            }`}
          >
            {submit ? "Uploading..." : "Publish to Almanac"}
          </motion.button>
        </div>
      </motion.div>

      {/* Display Section */}
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center gap-4 mb-10'>
          <h1 className='text-red-200 text-3xl md:text-4xl font-serif whitespace-nowrap'>Best of Almanac</h1>
          <div className='h-[1px] w-full bg-gradient-to-r from-red-500/50 to-transparent'></div>
        </div>

        {loading ? <Loader /> : (
          <motion.div 
            layout
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
          >
            <AnimatePresence mode='popLayout'>
              {almanacData.length > 0 ? (
                almanacData.map((data) => (
                  <motion.div
                    key={data._id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className='group rounded-2xl overflow-hidden border border-white/5 hover:border-red-500/40 transition-all shadow-xl'
                  >
                    <div className='h-64 w-full overflow-hidden'>
                      <img 
                        src={data.photo} 
                        alt={data.username}
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
                      />
                    </div>
                    
                    <div className='p-5 text-center'>
                      <h2 className='text-white text-xl font-bold truncate'>{data.username}</h2>
                      <p className='text-red-400 text-sm font-medium mb-4'>{data.department}</p>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDelete(data._id)}
                        className='w-full py-2 bg-red-900/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/30 rounded-lg text-sm transition-all'
                      >
                        Remove Entry
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='col-span-full py-20 text-center bg-white/5 rounded-3xl border border-dotted border-white/20'
                >
                  <p className='text-red-200/40 text-lg'>The Almanac is currently empty.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminAlmanac;