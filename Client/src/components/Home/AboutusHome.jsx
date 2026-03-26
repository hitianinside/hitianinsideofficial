import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

// all image
import img1 from "../../assets/images/best_of_almanac/Ankit_Maji.jpg";
import img2 from "../../assets/images/best_of_almanac/Rounak_Saha.png";
import img3 from "../../assets/images/best_of_almanac/Pratik_Chattopadhyay.jpg";
import img4 from "../../assets/images/best_of_almanac/Soumi_Pradhan.jpg";
import img5 from "../../assets/images/best_of_almanac/Subham_Kundu.png";


const AboutusHome = () => {

  useEffect(() => {
    AOS.init({ duration: 1700 });
  }, []);


  return (
    <section className="aboutus bg-gradient-to-b from-[#FFB5B5] to-[#A95454] ">
      {/* <img src={grad1} alt="gradient" className="gradient1" /> */}
      <h1
        className="text-3xl/[3rem] md:text-5xl/[3rem] aboutus-title font-medium text-[#650808] pt-10 font-hammersmith"
        data-aos="fade-up"
      >
        About us
      </h1>
      <div className="aboutus-content inline">
        <p
          className="text-lg mt-7 md:mt-10 md:px-[20%] px-[3%] text-[#650808] font-bold font-hammersmith"
          data-aos="fade-up"
        >
          The Maroon Squad, as the official media team of HIT, is a dynamic
          unit within the media club. Dedicated to keeping the campus
          community informed, it meticulously covers and presents ongoing
          details about campus life.
        </p>
      </div>
      <div className="button mt-10">
        <Link to="/about">
          <button className="text-[#FFB5B5] font-semibold bg-[#650808] text-[1.3rem] w-[169px] h-[48px] rounded-[50px] hover:scale-125 transition-all duration-700 font-hammersmith">
            Know More
          </button>
        </Link>
      </div>

      {/* // recruitment */}

      {/* <div className="banner mt-5 p-5" id="recruitmentsection">
                <marquee behavior="alternate" direction="left">
                  <div className="px-20">
                    <Link to="team">
                      <h3 className="text-[3rem] text-[#650808] font-bold mt-3 md:mt-3 hover:scale-105 transition-all duration-700 font-hammersmith ">
                        WE ARE RECRUITING
                      </h3>
                    </Link>
                  </div>
                </marquee>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd4RxyUj_laFiecBYONwinvLuXDnO2D54ZGYpB_LbggEqFGvA/viewform"
                  target="_blank"
                  className=""
                >
                  {" "}
      
                  <img
                    src={recruitmentposter}
                    alt="recruitment poster"
                    className="mt-5 border-red-600"
                    data-aos="zoom-in"
                  />
                </a>
              </div> */}

      <div className="cards mt-20 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 justify-between h-full max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
        <div className="card one rounded-r-md m-3 md:m-0 max-sm:w-[85%]">
          <img data-aos="flip-down" src={img1} alt="demo_image" />
        </div>
        <div className="card two rounded-md m-3 md:m-0 max-sm:w-[85%]">
          <img data-aos="flip-down" src={img2} alt="demo_image" />
        </div>
        <div className="card three rounded-md m-3 md:m-0 max-sm:w-[85%]">
          <img data-aos="flip-down" src={img3} alt="demo_image" />
        </div>
        <div className="card four rounded-md m-3 md:m-0 max-sm:w-[85%]">
          <img data-aos="flip-down" src={img4} alt="demo_image" />
        </div>
        <div className="card five rounded-l-md m-3 md:m-0 max-sm:w-[85%]">
          <img data-aos="flip-down" src={img5} alt="demo_image" />
        </div>
      </div>
    </section>
  )
}

export default AboutusHome
