import React from "react";
import { motion } from "motion/react";
import { FaUser } from "react-icons/fa"

function Teamtable({ data }) {
  const year_2019 = [
    { name: "Sarwesh", department: "ICE", position: "Team Head" },
    { name: "Kaumi Yashi", department: "CSE", position: "Team Head" },
    { name: "Sarwesh", department: "ICE", position: "Treasurer" },
    { name: "Bhaswati Cahakraborty", department: "BT", position: "Editor-in-chief" },
    { name: "Zaheen Khan", department: "ICE", position: "Editor-in-chief" },
    { name: "Ayan Biswas", department: "CHE", position: "Photography Head" },
  ];

  const year_2020 = [
    { name: "Roshan Kr. Lohani", department: "CHE", position: "Team Head" },
    { name: "Debraj Maji", department: "BT", position: "Team Head" },
    { name: "Nikhil Kumar", department: "EE", position: "Treasurer" },
    { name: "Rittika Kumari", department: "ICE", position: "Editor-in-chief" },
    { name: "Anubhav Biswas", department: "EE", position: "Design Head" },
    { name: "Shiladitya Khatua", department: "BT", position: "Photography Head" },
  ];

  const year_2021 = [
    { name: "Shubham Anand", department: "ECE", position: "Team Head" },
    { name: "Ashish Raj", department: "ICE", position: "Team Head" },
    { name: "Anubhav Kumar", department: "ICE", position: "Treasurer" },
    { name: "Ishani Joardar", department: "BT", position: "Editor-in-chief" },
    { name: "Anjani Sharma", department: "EE", position: "Design Head" },
    { name: "Sourjadeep Mondal", department: "BT", position: "Photography Head" },
    { name: "Rishi Das", department: "CSE", position: "Public Relations and Outreach" },
    { name: "Debopam Ghosh", department: "CSE", position: "Video editing Head" },
  ];

  const year_2022 = [
    { name: "Kaustav", department: "ECE", position: "Team Head" },
    { name: "Soumyadeep", department: "CHE", position: "Team Head" },
    { name: "Yuvika", department: "AEIE", position: "Treasurer" },
    { name: "Eshna Dutta", department: "BT", position: "Editor-in-chief" },
    { name: "Akriti", department: "IT", position: "Editor-in-chief" },
    { name: "Sandipan", department: "CSE", position: "Media Manager" },
    { name: "Sumana", department: "ECE", position: "Graphic Head" },
    { name: "Rushalee", department: "CSE", position: "Graphic Head" },
    { name: "Deepanjan", department: "ECE", position: "Photography Head" },
    { name: "Pradumn", department: "IT", position: "Event Head" },
    { name: "Rajarshi", department: "CHE", position: "Event Head" },
  ];

  const year_2023 = [
    { name: "Hamid Akbar", department: "IT", position: "Team Head" },
    { name: "Swagata Jana", department: "CSE", position: "Team Head" },
    { name: "Divyanshu Kashyap", department: "CSE", position: "Treasurer" },
    { name: "Shubham Kumar", department: "CSE-CS", position: "Editor-in-chief" },
    { name: "Pratiti Bandyopadhyay", department: "IT", position: "Editor-in-chief" },
    { name: "Shubham Roy", department: "ECE", position: "Technical Head" },
    { name: "Tanya Rai", department: "IT", position: "Media Head" },
    { name: "Som Roy", department: "CHE", position: "Video Editor Head" },
    { name: "Debangshu Batabyal", department: "CSE", position: "Graphic Head" },
    { name: "Shah Al Faisal", department: "CSE-DS", position: "Photography Head" },
    { name: "Diti Saha", department: "CSE", position: "Event Head" },
  ];

  const year_2024 = [
    { name: "Satish Bharati", department: "CSE", position: "Team Incharge" },
    { name: "Sneha Sharma", department: "CSE-CS", position: "Team Incharge" },
    { name: "Raushan Raj", department: "CSE", position: "Treasurer & Technical Head" },
    { name: "Arpan Chakroborthy", department: "ME", position: "Graphics Head" },
    { name: "Mrinmoyee Sil", department: "CSE", position: "Photography Head" },
    { name: "Dipanwita Maity", department: "CHE", position: "Editor-In-Chief" },
    { name: "Ishika Ghosh", department: "CHE", position: "Event Head" },
  ];

  let info = {
    y1: year_2019,
    y2: year_2020,
    y3: year_2021,
    y4: year_2022,
    y5: year_2023,
    y6: year_2024,
  }[data];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {info.map((member, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          className="bg-white text-black p-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex flex-col justify-center items-center"
        >
          <div className="m-2 p-2 border rounded-2xl invert bg-white"><FaUser size={100}/></div>
          <div className="font-bold text-lg">{member.name}</div>
          <div className="text-sm opacity-80">{member.position}</div>
          <div className="text-sm opacity-70">{member.department}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Teamtable;