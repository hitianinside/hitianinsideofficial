import React from "react";
import { motion } from "motion/react";
import teamimg from '../../assets/aboutimage/team_image01.jpg';

const About = () => {
  // Framer Motion Variants for smooth scrolling animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0306] text-white font-sans selection:bg-[#d03c19] selection:text-white pb-20">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex flex-col justify-center items-center overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${teamimg})` }}
        />
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0306]/80 via-[#660909]/60 to-[#1a0306]" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#FFB5B5] font-bold uppercase tracking-[0.4em] text-xs md:text-sm mb-6"
          >
            Haldia Institute of Technology
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black font-hammersmith leading-none drop-shadow-2xl"
          >
            The Maroon <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB5B5] to-[#d03c19]">
              Squad
            </span>
          </motion.h1>
        </div>
      </section>

      {/* 2. BENTO GRID CONTENT SECTION */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 -mt-20 md:-mt-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(200px,auto)] gap-4 md:gap-6"
        >
          
          {/* Bento Box 1: The Core Introduction (Large) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-8 bg-[#660909]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full group-hover:bg-red-500/20 transition-colors duration-500" />
            <h2 className="text-3xl md:text-5xl font-hammersmith text-[#FFB5B5] mb-6 relative z-10">
              The Official Media Team.
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium relative z-10">
              HITian Inside is a dynamic unit within the media club. Dedicated to keeping the campus community informed, we meticulously cover and present the ongoing details, stories, and the very heartbeat of campus life.
            </p>
          </motion.div>

          {/* Bento Box 2: The Vision (Small) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-4 bg-gradient-to-br from-[#d03c19] to-[#8a1c0b] rounded-3xl p-8 shadow-xl flex flex-col justify-center"
          >
            <svg className="w-10 h-10 text-white/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-2xl font-bold font-hammersmith text-white mb-3">The Voice of HIT</h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Connecting the campus community and beyond through the powerful lens of media and literary pursuits.
            </p>
          </motion.div>

          {/* Bento Box 3: Beyond Reporting (Medium) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-5 bg-[#280606] border border-white/5 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-xl text-[#FFB5B5] font-bold tracking-wider uppercase mb-4">Beyond Reporting</h3>
            <p className="text-white/70 leading-relaxed">
              Our commitment extends far beyond news. We organize diverse events that showcase the vibrant spirit of our college. From cultural festivals to academic symposiums, the Maroon Squad plays a pivotal role in encouraging a deep sense of community and pride among students.
            </p>
          </motion.div>

          {/* Bento Box 4: Digital Presence (Medium) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl relative overflow-hidden"
          >
            {/* Abstract decorative graphic */}
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 22h20L12 2zm0 3.83L18.17 19H5.83L12 5.83z"/>
              </svg>
            </div>
            
            <h3 className="text-xl text-[#FFB5B5] font-bold tracking-wider uppercase mb-4">Digital Presence</h3>
            <p className="text-white/80 leading-relaxed text-lg">
              Harnessing the immense power of social media, we leverage our extensive reach to promote college activities, achievements, and noteworthy happenings. Through engaging, high-quality content, the Maroon Squad creates a digital footprint that truly reflects the excellence and vibrancy of HIT.
            </p>
          </motion.div>

        </motion.div>
      </section>

    </div>
  );
};

export default About;