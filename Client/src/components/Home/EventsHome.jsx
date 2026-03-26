import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { InstagramEmbed } from "react-social-media-embed";
import AOS from "aos";
import "aos/dist/aos.css";

const EventsHome = () => {

  useEffect(() => {
    AOS.init({ duration: 1700 });
  }, []);


  return (

    <section className="grid grid-cols-5">
      <div className="bordeertext md:col-span-3 col-span-5 bg-[#660909] flex flex-col md:flex-row justify-center items-center pt-[3rem] md:pb-[5rem] pb-[1rem]">
        <div className="md:h-[70%%] md:w-[30%] " data-aos="fade-up">
          <InstagramEmbed
            url="https://www.instagram.com/p/DO3uLXOjc4P/?utm_source=ig_embed&ig_rid=ab08a5dd-6bc0-4786-a6ec-8baf4adc0dd5"
            className="w-[100%] h-full"
          />
        </div>
        <div className="md:h-[50%%] md:w-[40%]" data-aos="fade-down">
          <InstagramEmbed
            url="https://www.instagram.com/p/DVYyhVggbzV/?img_index=1"
            className="w-[100%] h-full"
          />
        </div>
      </div>

      <div className="bg-[#660909] col-span-5 md:col-span-2 md:pt-[6rem] pt-[1rem] md:pb-[10rem] pb-[5rem] max-sm:hidden">
        <p
          className="text-5xl/[2] text-[#FFB5B5] font-semibold flex flex-col "
          data-aos="fade-right"
        >
          Events
        </p>
        <div className="text-left w-[90%] ps-3 pt-10 font-inter" data-aos="fade-right">
          <ul className=" list-disc leading-6 ">
            <li className="text-2xl text-red-200 font-bold mt-3">
              Navroopam
            </li>
            <hr className="my-2" />
            <p className=" text-red-300">
              'NAVROOPAM' is an annual event organised by HITian Inside,
              offering a vibrant display of the cultural richness surrounding
              Durga Puja. The event beautifully showcases artistic pandals,
              cultural performances, and traditional rituals, idols of maa
              durga through creative displays(like Photography,Vlogs,Artwork).
            </p>
            <li className="text-2xl text-red-200 font-bold mt-3">
              Deepdarpan
            </li>
            <hr className="my-2" />
            <p className=" text-red-300">
              ‘DEEPDARPAN’ an exclusive event by HITian Inside for HITians,
              illuminates the spirit of Diwali through captivating displays
              including Photography, Videography, Artwork, and Creative
              Writing, showcasing the radiant beauty of lights and diyas.
            </p>
            <li className="text-2xl text-red-200 font-bold mt-3">
              Extravaganza
            </li>
            <hr className="my-2" />
            <p className=" text-red-300">
              ‘EXTRAVANZA’, the precursor to Prayukti (The Technical Fest) and
              Riviera (The Cultural Fest), organised by Team HITian Inside.
              Taking place both offline and online, it offers students an
              opportunity to familiarize themselves with the essence of the
              fest.
            </p>
          </ul>
        </div>
        <Link to="/events">
          <button className="mt-10 mb-10 text-[#650808] font-bold bg-[#FFB5B5] text-[1.3rem] w-[150px] h-[45px] rounded-[50px] hover:scale-125 transition-all duration-700">
            See More
          </button>
        </Link>
      </div>
    </section>
  );
}

export default EventsHome;
