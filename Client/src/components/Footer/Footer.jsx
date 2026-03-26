import React, { useState, useRef } from "react";
import newLogo from "../../assets/images/insidewhitelogo.png";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { motion } from "motion/react";
import { BiLogoFacebook, BiLogoLinkedin, BiCopyright } from 'react-icons/bi';
import { BsInstagram, BsYoutube, BsSend } from 'react-icons/bs';
import { contactFormSubmit } from "../../api/userapis";

function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!formData.name || !formData.email || !formData.message) {
        toast.warning("Please fill all fields");
        setSubmitting(false);
        return;
      }

      const result = await contactFormSubmit(formData);
      toast.success(result.message || "Message sent!");
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      toast.error("Something went wrong!!");
    } finally {
      setSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <BiLogoFacebook />, url: "https://www.facebook.com/HITian.Inside" },
    { icon: <BiLogoLinkedin />, url: "https://www.linkedin.com/company/hitian-inside/" },
    { icon: <BsInstagram />, url: "https://www.instagram.com/hitianinside/" },
    { icon: <BsYoutube />, url: "https://www.youtube.com/@hitianinside" }
  ];

  return (
    <footer className="bg-[#280606] pt-10 max-sm:pt-3 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand & Social Section */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-6">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={newLogo}
              alt="Inside Logo"
              className="w-48 md:w-56"
            />
            <p className="text-[#f2b5b5]/60 text-center md:text-left text-sm leading-relaxed max-w-sm">
              The official media engine of Haldia Institute of Technology.
              Capturing moments, telling stories, and building the Maroon Squad legacy.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, backgroundColor: "#d03c19" }}
                  className="w-10 h-10 rounded-full bg-[#3f0909] text-[#f2b5b5] flex items-center justify-center text-xl transition-colors border border-white/5"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start max-sm:hidden">
            <h3 className="text-[#FFB5B5] font-hammersmith text-xl mb-6 uppercase tracking-wider">Navigation</h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-4 gap-x-8 text-center md:text-left">
              {['Home', 'Events', 'Almanac', 'Merchandise', 'Team', 'About'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-[#f2b5b5]/70 hover:text-[#d03c19] transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Form Section */}
          <div className="md:col-span-5 bg-[#3f0909]/50 p-6 rounded-[2rem] border border-white/5">
            <h3 className="text-[#FFB5B5] font-hammersmith text-xl mb-6 uppercase tracking-wider flex items-center gap-2">
              Send a Message <BsSend className="text-sm" />
            </h3>
            <form onSubmit={handleSubmit} ref={ref} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#280606]/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#d03c19] outline-none transition-all"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#280606]/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#d03c19] outline-none transition-all"
                />
              </div>
              <textarea
                placeholder="How can we help?"
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#280606]/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#d03c19] outline-none transition-all resize-none"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={submitting}
                className="w-full py-3 bg-[#FFB5B5] text-[#280606] font-bold rounded-xl hover:bg-white transition-colors flex justify-center items-center gap-2"
              >
                {submitting ? "SENDING..." : "SEND MESSAGE"}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Bar - Centered without extra links */}
      <div className="border-t border-white/5 py-2 bg-[#1a0404]">
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center text-[#f2b5b5]/40 text-xs tracking-widest uppercase text-center">
          <p className="flex items-center justify-center gap-2">
            <BiCopyright className="text-sm" /> {new Date().getFullYear()} HITian Inside. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;