import React, { useEffect, useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "motion/react";
import Loader from "../../components/Loader/Loader";
import AddEvent from '../../components/AddEvent/AddEvent';
import { handleChangeEvent } from '../../../actions/actions';
import { getAdminEvent, editEvent, deleteEvent } from "../../../api/adminapis";

const AdminEvent = () => {
  const [events, setEvents] = useState([]);
  const [originalEvents, setOriginalEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    try {
      const result = await getAdminEvent();
      setEvents(result.data.data);
      setOriginalEvents(JSON.parse(JSON.stringify(result.data.data))); // Deep copy
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load events");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (index) => {
    try {
      const id = events[index]._id;
      const result = await deleteEvent(id);
      toast.success(result.data.message);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  const handleChange = async (index) => {
    try {
      const id = events[index]._id;
      const data = events[index];
      
      // Simple check for changes
      if (JSON.stringify(originalEvents[index]) === JSON.stringify(data)) {
        toast.warning("No changes detected");
        return;
      }

      const result = await editEvent(id, data);
      toast.success(result.data.message);
      loadEvents(); // Refresh original state
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const inputStyle = "bg-white/10 border border-white/20 rounded px-2 py-1 focus:bg-white/20 outline-none transition-all w-full mt-1";

  return (
    <div className="min-h-screen py-10 px-4">
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header/Add Section */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl mb-12">
          <h1 className="text-white text-3xl font-bold mb-6 text-center">Manage Events</h1>
          <AddEvent />
        </div>

        <h2 className="text-white text-3xl font-bold mb-8 flex items-center gap-4">
          <span className="h-1 flex-1 bg-gradient-to-r from-transparent to-red-500"></span>
          Live Events
          <span className="h-1 flex-1 bg-gradient-to-l from-transparent to-red-500"></span>
        </h2>

        {loading ? (
          <Loader />
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          >
            <AnimatePresence>
              {events.length > 0 ? (
                events.map((event, index) => event.insta_url ? (
                  <motion.div 
                    key={event._id || index}
                    variants={cardVariants}
                    layout
                    whileHover={{ y: -10 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-xl w-full max-w-[350px]"
                  >
                    <div className="h-[400px] overflow-hidden">
                      <InstagramEmbed url={event.insta_url} width="100%" />
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="space-y-3">
                        <div className="text-white text-sm">
                          <label className="font-bold opacity-70">EVENT NAME</label>
                          <input 
                            className={inputStyle}
                            value={event.event_name}
                            onChange={(e) => handleChangeEvent(events, setEvents, index, e, "eventName")}
                          />
                        </div>
                        <div className="flex gap-2">
                          <div className="text-white text-sm flex-1">
                            <label className="font-bold opacity-70">DATE</label>
                            <input 
                              className={inputStyle}
                              value={event.date}
                              onChange={(e) => handleChangeEvent(events, setEvents, index, e, "date")}
                            />
                          </div>
                          <div className="text-white text-sm flex-1">
                            <label className="font-bold opacity-70">YEAR</label>
                            <input 
                              className={inputStyle}
                              value={event.year}
                              onChange={(e) => handleChangeEvent(events, setEvents, index, e, "year")}
                            />
                          </div>
                        </div>
                        <div className="text-white text-sm">
                          <label className="font-bold opacity-70">INSTA URL</label>
                          <input 
                            className={inputStyle}
                            value={event.insta_url}
                            onChange={(e) => handleChangeEvent(events, setEvents, index, e, "instaURL")}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-green-600 hover:bg-green-500 text-white text-sm py-2 rounded-lg font-bold shadow-md transition-colors"
                          onClick={() => handleChange(index)}
                        >
                          Update
                        </motion.button>
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-red-700 hover:bg-red-600 text-white text-sm py-2 rounded-lg font-bold shadow-md transition-colors"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : null)
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-white/50 text-xl italic"
                >
                  No active events found.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default AdminEvent;