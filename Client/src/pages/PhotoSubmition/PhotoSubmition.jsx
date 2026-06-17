import React, { useState, useEffect, useContext } from 'react';
import { photoFormSubmit } from '../../api/userapis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { isAuthenticatedContext } from '../../context/context';
import { motion } from 'motion/react';

const PhotoSubmition = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(isAuthenticatedContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-up");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    year: '1st Year',
    department: 'Applied Electronics and Instrumentation Engineering',
    rollNo: '',
    contactNo: '',
    instaID: '',
    file: null,
    desc: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const depts = [
    "Applied Electronics and Instrumentation Engineering", "Agricultural Engineering", 
    "BioTechnology", "Civil Engineering", "Chemical Engineering", 
    "Computer Science and Engineering", "Computer Science and Engineering (AIML)", 
    "Computer Science and Engineering (CS)", "Computer Science and Engineering (DS)", 
    "Electronics and Communication Engineering", "Electrical Engineering", 
    "Food Technology", "Information Technology", "Mechanical Engineering"
  ];

  useEffect(() => {
    // Safely parse localStorage to prevent crashes
    const storedUser = localStorage.getItem('user-info');
    if (storedUser) {
      const userInfo = JSON.parse(storedUser);
      if (userInfo?.email) {
        setFormData((prev) => ({ ...prev, email: userInfo.email }));
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.name || !formData.contactNo || !formData.file || !formData.rollNo) {
        toast.warning("Please fill in all required fields!");
        return;
      }

      if (formData.contactNo.length !== 10) {
        toast.warning("Please enter a valid 10-digit contact number!");
        return;
      }

      setSubmitting(true);

      const result = await photoFormSubmit(formData);
      toast.success(result.data?.message || "Photograph submitted successfully!");

      setFormData({
        email: formData.email, // preserve email
        name: '',
        year: '1st Year',
        department: 'Applied Electronics and Instrumentation Engineering',
        rollNo: '',
        contactNo: '',
        instaID: '',
        file: null,
        desc: ''
      });
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Modern Tailwind Classes
  const labelStyle = "block text-sm font-medium text-red-100 mb-2";
  const inpStyle = "w-full bg-black/40 border border-red-500/30 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder-gray-500";
  const helperTextStyle = "text-xs text-red-300/70 ml-2 font-normal";

  return (
    <div className="min-h-screen py-5 sm:py-8 px-4 sm:px-6 flex flex-col items-center">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600 pb-4 tracking-tight uppercase">
          Submit Your Photography
        </h1>
        <p className="text-red-200/80 text-lg max-w-xl mx-auto">
          Capture the moment. Share your best shots and be featured in our official Almanac.
        </p>
      </motion.div>

      {/* Form Container */}
      <motion.form 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl bg-red-950/20 backdrop-blur-xl border border-red-500/20 p-8 rounded-3xl shadow-2xl shadow-red-900/20"
      >
        <div className="space-y-6">
          
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className={labelStyle}>Full Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              placeholder="e.g., Sourav Bera"
              className={inpStyle}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label htmlFor="year" className={labelStyle}>Year *</label>
              <select
                id="year"
                value={formData.year}
                className={`${inpStyle} appearance-none`}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="department" className={labelStyle}>Department *</label>
              <select
                id="department"
                value={formData.department}
                className={`${inpStyle} appearance-none`}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              >
                {depts.map((dept, index) => (
                  <option value={dept} key={index} className="bg-neutral-900">{dept}</option>
                ))}
              </select>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label htmlFor="rollNum" className={labelStyle}>
                Roll Number <span className={helperTextStyle}>(e.g., 24/CSE/189)</span>
              </label>
              <input
                id="rollNum"
                type="text"
                value={formData.rollNo}
                placeholder="24/CSE/189"
                className={inpStyle}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="contactNo" className={labelStyle}>
                WhatsApp Number *
              </label>
              <input
                id="contactNo"
                type="tel"
                value={formData.contactNo}
                placeholder="10-digit number"
                className={inpStyle}
                onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                required
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <label htmlFor="insta" className={labelStyle}>
              Instagram Handle <span className={helperTextStyle}>(Optional)</span>
            </label>
            <input
              id="insta"
              type="text"
              placeholder="@yourhandle"
              className={inpStyle}
              value={formData.instaID}
              onChange={(e) => setFormData({ ...formData, instaID: e.target.value })}
            />
          </motion.div>

          {/* File Upload Area */}
          <motion.div variants={itemVariants}>
            <label htmlFor="file" className={labelStyle}>High-Resolution Photograph *</label>
            <div className="relative group flex justify-center w-full h-32 px-4 transition bg-black/40 border-2 border-red-500/30 border-dashed rounded-xl appearance-none cursor-pointer hover:border-red-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                <span className="font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                  {formData.file ? formData.file.name : "Click to select your photograph"}
                </span>
              </span>
              <input
                id="file"
                type="file"
                name="file"
                accept="image/*"
                className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="caption" className={labelStyle}>
              Description or Caption <span className={helperTextStyle}>(Optional)</span>
            </label>
            {/* Changed from input to textarea for better UX */}
            <textarea
              id="caption"
              value={formData.desc}
              placeholder="Tell us about this photo..."
              className={`${inpStyle} h-28 resize-none`}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all shadow-lg ${
                submitting 
                ? "bg-red-600/50 cursor-not-allowed" 
                : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 hover:shadow-red-500/25"
              }`}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : "Submit Photograph"}
            </motion.button>
          </motion.div>

        </div>
      </motion.form>
    </div>
  );
};

export default PhotoSubmition;