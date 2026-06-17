import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { getAdminHomepageData, addHomepageData, deleteHomepageData } from '../../../api/adminapis';
import Loader from '../../components/Loader/Loader';
import { motion, AnimatePresence } from 'motion/react';

const AdminHome = () => {
  const [homepageData, setHomepageData] = useState({
    eventPoster: null,
    eventName: '',
    eventContent: '',
    eventFormLink: '',
  })

  const [homepageContainer, sethomepageContainer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);

  const getData = async () => {
    try {
      const { data } = await getAdminHomepageData();
      sethomepageContainer(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching data");
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const handleAdd = async () => {
    setSubmit(true);
    if (!homepageData.eventPoster || homepageData.eventName === '') {
      toast.warning("Please fill the required fields");
      setSubmit(false);
      return;
    }

    try {
      const res = await addHomepageData(homepageData);
      toast.success(res.data.message);
      setHomepageData({
        eventPoster: null,
        eventName: '',
        eventContent: '',
        eventFormLink: '',
      });
      getData(); // Refresh list
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSubmit(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await deleteHomepageData(id);
      toast.success(res.data.message);
      sethomepageContainer(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  };

  const inputClass = "bg-white/10 backdrop-blur-sm p-3 my-2 w-full md:w-[300px] border border-white/20 rounded-xl text-white outline-none focus:border-red-500 transition-all placeholder:text-red-200/50";

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className='min-h-screen p-4 md:p-8'
    >
      {/* Form Section */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl mb-12'
      >
        <h2 className='text-2xl font-bold text-red-200 mb-6 text-center md:text-left'>Create New Event Poster</h2>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <div className='flex flex-col flex-1 min-w-[250px]'>
            <label className='text-red-200 ml-2 text-sm font-medium'>Event Poster</label>
            <input
              type="file"
              onChange={(e) => setHomepageData({ ...homepageData, eventPoster: e.target.files[0] })}
              accept='image/*'
              className={`${inputClass} file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-red-500 file:text-white hover:file:bg-red-600`}
            />
          </div>

          {[
            { label: 'Event Name', key: 'eventName', placeholder: 'Annual Sports Meet', type: 'text' },
            { label: 'Form Link', key: 'eventFormLink', placeholder: 'https://forms.gle/...', type: 'text' }
          ].map((field) => (
            <div key={field.key} className='flex flex-col flex-1 min-w-[250px]'>
              <label className='text-red-200 ml-2 text-sm font-medium'>{field.label}</label>
              <input
                type={field.type}
                value={homepageData[field.key]}
                onChange={(e) => setHomepageData({ ...homepageData, [field.key]: e.target.value })}
                className={inputClass}
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <div className='flex flex-col w-full'>
            <label className='text-red-200 ml-2 text-sm font-medium'>Event Details</label>
            <textarea
              rows="2"
              value={homepageData.eventContent}
              onChange={(e) => setHomepageData({ ...homepageData, eventContent: e.target.value })}
              className={`${inputClass} w-full md:w-full`}
              placeholder='Brief description of the event...'
            />
          </div>
        </div>

        <div className='flex justify-center md:justify-end mt-6'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${
              submit ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-500 text-white'
            }`}
            onClick={handleAdd} 
            disabled={submit}
          >
            {submit ? "Processing..." : "Deploy Poster"}
          </motion.button>
        </div>
      </motion.div>

      {/* List Section */}
      {loading ? <Loader /> : (
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center gap-4 mb-8'>
            <div className='h-[1px] flex-1 bg-gradient-to-r from-transparent to-red-500/50'></div>
            <h1 className='text-red-200 text-2xl font-serif italic'>Live Homepage Posters</h1>
            <div className='h-[1px] flex-1 bg-gradient-to-l from-transparent to-red-500/50'></div>
          </div>

          <AnimatePresence mode='popLayout'>
            {homepageContainer.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              >
                {homepageContainer.map((item) => (
                  <motion.div
                    layout
                    variants={cardVariants}
                    exit="exit"
                    key={item._id}
                    className='group relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 hover:border-red-500/50 transition-colors shadow-xl'
                  >
                    <div className='relative h-48 overflow-hidden'>
                      <img 
                        src={item.event_poster} 
                        alt={item.event_name}
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent' />
                    </div>
                    
                    <div className='p-4'>
                      <h2 className='text-lg font-bold text-white mb-1 truncate'>{item.event_name}</h2>
                      <p className='text-red-300 text-xs mb-3 font-mono opacity-70'>
                        {item.event_form_link ? item.event_form_link.substring(0, 30) + '...' : 'No Link'}
                      </p>
                      <p className='text-gray-400 text-sm line-clamp-2 h-10 mb-4'>{item.event_content}</p>
                      
                      <motion.button
                        whileHover={{ backgroundColor: '#ff0000' }}
                        className='w-full py-2 bg-red-900/30 text-red-200 rounded-lg text-sm font-semibold border border-red-500/30 transition-colors'
                        onClick={() => handleDelete(item._id)}
                      >
                        Remove Poster
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className='text-center py-20 bg-white/5 rounded-3xl border border-dotted border-white/20'
              >
                <p className='text-red-200/50 text-lg'>The homepage is currently empty.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}

export default AdminHome;