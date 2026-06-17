import React from "react";
import { motion } from "framer-motion";
import { BiDownArrowCircle } from "react-icons/bi";
import hoodie from "../../assets/images/merchandise/hoodies2023.jpg";
import tshirt from "../../assets/images/merchandise/summer_2024.png";

export default function Merchandise() {
  const productCard = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-[#650808] min-h-screen pt-5 pb-10 text-white font-hammersmith">
      <div className="w-[80%] mx-auto text-center">
        <p className="text-[9vw] md:text-[5vw] font-[700]">Merchandise</p>
        <p className="flex justify-center mt-3">
          <a href="#merchandise">
            <BiDownArrowCircle className="text-[8vw] md:text-[3vw] animate-bounce" />
          </a>
        </p>
      </div>

      <motion.div
        id="merchandise"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-[#d28888] mt-10 flex justify-center flex-col md:flex-row gap-10 py-20 px-4"
      >
        {/* Product Card */}
        {[{
          img: hoodie,
          title: "The Winter Avatar 2022",
        },{
          img: tshirt,
          title: "The Summer Avatar 2024",
        }].map((item, i) => (
          <motion.div
            variants={productCard}
            key={i}
            className="bg-white text-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 w-full md:w-[24vw]"
          >
            <div className="flex justify-center items-center px-5 pt-5 pb-1">
              <img src={item.img} alt="merch" className="w-full rounded-xl" />
            </div>

            <div className="px-5 pb-5 flex flex-col gap-2">
              <p className="font-bold text-[18px]">{item.title}</p>
              <p className="text-[14px] text-gray-700">Available Sizes</p>
              <div className="flex flex-row gap-3 ms-3">
                {["S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    className="bg-red-200 hover:bg-red-600 hover:text-white rounded-full font-bold w-8 h-8 flex items-center justify-center"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button className="mt-4 w-full rounded-xl p-2 bg-red-800 hover:bg-red-900 text-white font-bold text-[15px] transition-all">
                BUY NOW
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}