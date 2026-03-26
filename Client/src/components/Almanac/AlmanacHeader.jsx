import almanac_img from "../../assets/images/almanac-vector.png";
// import almanac_background from "../../assets/images/almanac-img.png";
import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AlmanacHeader = () => {
  useEffect(() => {
    AOS.init({ duration: 1700 })
  }, [])

  return (
    <>
      <section
        className="ps-[8%] pt-4 md:pt-8">
        <div className="max-w-[90%] md:max-w-[50%] relative z-10" data-aos="fade-up">
          <h1 className="text-3xl sm:text-5xl text-[#f5bcbc] font-bold font-hammersmith leading-tight uppercase">
            Almanac
          </h1>
          <p className="text-[#f2b5b5] font-medium text-sm sm:text-[1.2rem] leading-relaxed mt-3 font-hammersmith">
            Bringing to you the platform to unveil your astounding creativity through the official e-media of HIT. A platform to showcase your creativity in the form of your rhythmic poems, thrilling experiences, captured moments, beautiful arts, and animations, and glorify your ingenious talents by getting exposure through our Instagram handle.
          </p>
          <NavLink to="/almanac/almanac-form">
            <button className="mt-4 bg-[#e22b2b] border-2 py-2 px-6 rounded-2xl font-semibold transition-all duration-300 text-white text-lg hover:scale-110 hover:bg-[#ff0000]">Submit</button>
          </NavLink>
        </div>

        {/* Image Section */}
        <div className="flex justify-end relative bottom-10 md:bottom-20" data-aos="fade-up">
          <img
            src={almanac_img}
            alt="Almanac Visual"
            className="w-[80%] md:w-[65%] aos-init aos-animate"
          />
        </div>
      </section>
    </>
  )
}

export default AlmanacHeader;