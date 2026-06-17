import { useEffect } from 'react'
import collage from "../../assets/images/Image-collage2.png";
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

const GalleryHome = () => {

  useEffect(() => {
    AOS.init({ duration: 1700 });
  }, []);


  return (
    <section className="gallery grid grid-cols-5">
      <div className="gallery-contents bg-[#660909] col-span-5 md:col-span-2 ">
        <p
          className="text-5xl/[2] text-[#FFB5B5] font-semibold flex flex-col md:mt-[12rem] mt-[2rem] "
          data-aos="slide-up"
        >
          Gallery
        </p>
        <p
          className="mt-10 ps-10 pe-10 text-[#FFB5B5] font-medium font-hammersmith"
          data-aos="fade-up"
        >
          Dive into our gallery for a visual treat! Explore captivating snapshots of all the dynamic events and the lively spirit of our community. Discover our world in vibrant shades!
        </p>
        <Link to="/almanac">
          <button className="mt-10 mb-10 text-[#650808] font-bold bg-[#FFB5B5] text-[1.3rem] w-[150px] h-[45px] rounded-[50px]	hover:scale-125 transition-all duration-700 font-hammersmith">
            See More
          </button>
        </Link>
      </div>
      <div className=" bordeertext md:col-span-3 col-span-5 bg-[#660909] ">
        <img
          src={collage}
          alt="insideGallery"
          className=" md:w-[100%] w-full h-fit md:h-[100%]"
          data-aos="slide-right"
        />
      </div>
    </section>
  )
}

export default GalleryHome;