import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from "motion/react";
import aditi from "../../assets/images/best_of_almanac/Aditi_bera_IT.jpg";
import aditya from "../../assets/images/best_of_almanac/Aditya_Raj_IT.jpg";
import poemImg from "../../assets/images/poemImg.png";

const AlmanacForm = () => {

  const [formContents] = useState([
    {
      img_url: aditi,
      Almanacname: "Digital/Traditional Artwork",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
      formSubmitionLink: "/almanac/almanac-form/artwork-form-submit",
      aosSegment: "fade-up",
    },
    {
      img_url: aditya,
      Almanacname: "Photography",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
      formSubmitionLink: "/almanac/almanac-form/photo-form-submit",
      aosSegment: "fade-up",
    },
    {
      img_url: poemImg,
      Almanacname: "Poems",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
      formSubmitionLink: "/almanac/almanac-form/poem-form-submit",
      aosSegment: "fade-up",
    },
    // {
    //   img_url: aditi,
    //   Almanacname: "Reels/Videos",
    //   content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
    //   formSubmitionLink: "/almanac/almanac-form/video-form-submit",
    //   aosSegment: "fade-up",
    // },
    // {
    //   img_url: aditi,
    //   Almanacname: "Story and Experiences",
    //   content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
    //   formSubmitionLink: "/almanac/almanac-form/story-form-submit",
    //   aosSegment: "fade-up",
    // },
  ])

  return (
    <div>
      {/* ========== Submission Sections ========== */}
      <section className="my-10 px-4 md:px-20 min-h-screen">
        <div className="grid gap-10">
          {formContents.map((formContent, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl p-[2px] bg-gradient-to-r from-red-500 via-pink-500 to-red-600"
            >

              <div className="bg-[#5f1818]/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col md:flex-row gap-8 items-center shadow-xl transition-all duration-500 group-hover:shadow-red-500/30 group-hover:-translate-y-2">

                {/* Image Section */}
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={formContent.img_url}
                    alt={formContent.Almanacname}
                    className="w-[170px] h-[170px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content Section */}
                <div className="flex-1 text-[#ffe4e4]">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
                    {formContent.Almanacname}
                  </h2>

                  <p className="mt-3 text-sm md:text-base text-[#ffc8c8]/90 leading-relaxed">
                    {formContent.content}
                  </p>

                  <NavLink to={formContent.formSubmitionLink}>
                    <button className="mt-6 relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-semibold text-white rounded-full bg-gradient-to-r from-red-500 to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/40">
                      Submit
                    </button>
                  </NavLink>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AlmanacForm
