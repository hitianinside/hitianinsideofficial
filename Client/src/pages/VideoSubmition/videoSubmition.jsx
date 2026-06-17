import React, { useState } from 'react'
import { videoFormSubmit } from '../../api/userapis';
import { toast } from 'react-toastify';

const VideoSubmition = () => {

  const [formData, setFormData] = useState({
    name: '',
    year: '1st Year',
    department: 'Applied Electronics and Instrumentation Engineering',
    rollNo: '',
    contactNo: '',
    instaID: '',
    video: '',
    desc: ''
  })

  const [submitting, setSubmitting] = useState(false);

  const depts = ["Applied Electronics and Instrumentation Engineering", "Agricultural Engineering", "BioTechnology", "Civil Engineering", "Chemical Engineering", "Computer Science and Engineering", "Computer Science and Engineering (AIML)", "Computer Science and Engineering (CS)", "Computer Science and Engineering (DS)", "Electronics and Communication Engineering", "Electrical Engineering", "Food Technology", "Information Technology", "Mechanical Engineering"];

  //CSS Styles
  const inpDivStyle = "p-5 bg-[#c37173] rounded-xl shadow-lg mb-[22px] w-[600px] max-sm:w-[400px] max-[440px]:w-[300px] max-[320px]:w-auto";
  const labelStyle = "text-xl p-1 font-semibold flex mb-1"
  const inpStyle = "bg-[#d83939] rounded-lg border-0 w-full"

  //video Form Submition
  const handleSubmit = async () => {
    try {
       if (formData.name === '' || formData.contactNo === '' || formData.file === null || formData.rollNo === '' || formData.video === '' || formData.desc === '') {
        toast.warning("Fill the form first!!");
        return;
      }

      //contact number validation
      if (formData.contactNo.length !== 10) {
        toast.warning("Invalid number!!");
        return;
      }
      setSubmitting(true);

      // response from backend
      const result = await videoFormSubmit(formData);
      toast.success(result.data.message);

    } catch (error) {
      // response error
      toast.error("Failed to submit. Try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <>
      <h1 className="text-white min-h-screen text-3xl font-semibold text-center mt-6 mb-8">
        Submit Your Reels/Videos and Be Part of Our Almanac
      </h1>

      <div className="flex flex-col justify-center items-center w-full px-4 bg-[#650808] text-white py-6 rounded-lg shadow-lg">

        {/* Name */}
        <div className={inpDivStyle}>
          <label htmlFor="name" className={labelStyle}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Enter your full name"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Year */}
        <div className={inpDivStyle}>
          <label htmlFor="year" className={labelStyle}>Year</label>
          <select
            id="year"
            name="year"
            value={formData.year}
            className="bg-[#d83939] rounded-lg w-full h-10 p-2"
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required
          >
            <option value="" disabled>Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        {/* Department */}
        <div className={inpDivStyle}>
          <label htmlFor="department" className={labelStyle}>Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            className="bg-[#d83939] rounded-lg w-full h-10 p-2"
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          >
            <option value="" disabled>Select Department</option>
            {depts.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Roll Number */}
        <div className={inpDivStyle}>
          <label htmlFor="rollNum" className={labelStyle}>
            Roll Number <span className="text-sm text-gray-300">(e.g., 24/CSE/189)</span>
          </label>
          <input
            type="text"
            id="rollNum"
            name="rollNo"
            value={formData.rollNo}
            placeholder="Enter roll number"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
            required
          />
        </div>

        {/* Contact Number */}
        <div className={inpDivStyle}>
          <label htmlFor="contactNo" className={labelStyle}>
            Contact Number <span className="text-sm text-gray-300">(Preferably WhatsApp)</span>
          </label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            value={formData.contactNo}
            placeholder="Enter contact number"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
            required
          />
        </div>

        {/* Instagram / Profile / Video Link */}
        <div className={inpDivStyle}>
          <label htmlFor="instaID" className={labelStyle}>
            Instagram Handle or Profile/Video Link (optional)
          </label>
          <input
            type="text"
            id="instaID"
            name="instaID"
            value={formData.instaID}
            placeholder="e.g., @yourhandle or YouTube/Instagram link"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, instaID: e.target.value })}
          />
        </div>

        {/* Google Drive Video Link */}
        <div className={inpDivStyle}>
          <label htmlFor="video" className={labelStyle}>Google Drive Link of Your Video</label>
          <p className="mb-2 text-sm text-gray-200">Make sure the link is accessible to everyone.</p>
          <input
            type="text"
            id="video"
            name="video"
            value={formData.video}
            placeholder="Paste Google Drive link"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, video: e.target.value })}
            required
          />
        </div>

        {/* Description */}
        <div className={inpDivStyle}>
          <label htmlFor="desc" className={labelStyle}>Description About Your Video</label>
          <input
            type="text"
            id="desc"
            name="desc"
            value={formData.desc}
            placeholder="Describe your reel/video"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center mt-6">
          <button
            className="py-3 px-6 bg-[#e04444] hover:bg-[#ff0000] text-white font-bold rounded-lg transition-all duration-300"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  )
}

export default VideoSubmition;