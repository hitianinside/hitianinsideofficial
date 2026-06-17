import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getUserInfo } from '../../api/userapis';

function RecruitmentForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allUserData, setAllUserData] = useState(null);

  // Local state for the specific form fields
  const [formData, setFormData] = useState({
    email: allUserData?.email,
    name: allUserData?.name,
    department: allUserData?.department,
    year: allUserData?.year,
    rollNo: '',
    contactNo: '',
    whatsAppNo: '',
    category: 'Content Writer',
    reason: ''
  });


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { userData } = await getUserInfo();
        setAllUserData(userData);
      } catch (err) {
        console.error("Error fetching user", err);
      }
    };
    fetchUserInfo();
  }, []);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-4xl font-bold text-[#FFB5B5] font-hammersmith">Application Received!</h2>

        <p className="text-white/60 mt-4 max-w-md">Thank you for applying to HITian Inside. Our team will review your profile and get back to you soon.</p>

        <button className="mt-8 text-[#d03c19] font-bold underline">Back to Home</button>
      </motion.div>
    );
  }

  return (
    <div className="min-h-[89.5vh] py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">

        {/* Progress Header */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <h1 className="text-3xl font-bold text-[#FFB5B5] font-hammersmith">Join the Crew</h1>
            <span className="text-[#d03c19] font-mono font-bold text-sm">STEP {step} OF 2</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: step === 1 ? "50%" : "100%" }}
              className="h-full bg-[#d03c19]"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[#FFB5B5]/60 text-[10px] font-bold uppercase tracking-widest ml-1">Email</label>
                  <input
                    disabled
                    type="text"
                    value={allUserData?.email || ''}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white/50 cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#FFB5B5]/60 text-[10px] font-bold uppercase tracking-widest ml-1">Name</label>
                  <input
                    type="text"
                    value={formData?.name || ''}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white/50"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">Department</label>
                  <input
                    type="text"
                    placeholder="Ex - CSE"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="bg-white/5 border border-white/20 rounded-2xl p-4 text-white focus:border-[#d03c19] outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">Roll Number</label>
                  <input
                    type="text"
                    placeholder="Ex - 24/CSE/001"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="bg-white/5 border border-white/20 rounded-2xl p-4 text-white focus:border-[#d03c19] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">Contact No.</label>
                  <input
                    type="tel"
                    value={formData.contactNo}
                    onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                    className="bg-white/5 border border-white/20 rounded-2xl p-4 text-white focus:border-[#d03c19] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">WhatsApp No.</label>
                  <input
                    type="tel"
                    value={formData.whatsAppNo}
                    onChange={(e) => setFormData({ ...formData, whatsAppNo: e.target.value })}
                    className="bg-white/5 border border-white/20 rounded-2xl p-4 text-white focus:border-[#d03c19] outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">What is the primary position that you want to apply for?</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-[#651313] border border-white/20 rounded-2xl p-4 text-white outline-none appearance-none cursor-pointer"
                >
                  <option value="Content Writer">Content Writer</option>
                  <option value="Graphic Designer">Graphic Designer</option>
                  <option value="Photography">Photography</option>
                  <option value="Public Relations">Public Relations</option>
                  <option value="Video Editor">Video Editor</option>
                  <option value="Web/App Developer">Web/App Developer</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">Why do you want to join HITian Inside?</label>
                <textarea
                  rows="5"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Tell us about your skills and passion..."
                  className="bg-white/5 border border-white/20 rounded-2xl p-4 text-white outline-none focus:border-[#d03c19] resize-none"
                />
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 bg-[#FFB5B5] text-[#660909] font-bold rounded-2xl hover:scale-[1.02] transition-transform active:scale-95"
              >
                NEXT SECTION
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-6">

                {/* COMMON FOR ALL */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">
                    Share your work (Drive / Portfolio / GitHub)
                  </label>
                  <input
                    type="text"
                    placeholder="https://drive.google.com/..."
                    className="bg-white/5 border border-white/20 rounded-2xl p-4 text-white outline-none focus:border-[#d03c19]"
                  />
                  <p className="text-xs text-white/40">
                    Make sure link is public
                  </p>
                </div>

                {/* CONTENT WRITER */}
                {formData.category === "Content Writer" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">
                        Write a short article (100–150 words)
                      </label>
                      <textarea
                        rows="5"
                        placeholder="Topic: Impact of social media on students"
                        className="bg-white/5 border border-white/20 rounded-2xl p-4 text-white outline-none focus:border-[#d03c19]"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">
                        Do you have prior writing experience?
                      </label>
                      <textarea
                        rows="3"
                        className="bg-white/5 border border-white/20 rounded-2xl p-4 text-white outline-none"
                      />
                    </div>
                  </>
                )}

                {/* WEB DEVELOPER */}
                {formData.category === "Web/App Developer" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">
                        Deployed Project Link
                      </label>
                      <input
                        type="text"
                        placeholder="https://yourapp.vercel.app"
                        className="bg-white/5 border border-white/20 rounded-2xl p-4 text-white outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">
                        Rate your development skills (1-10)
                      </label>
                      <input type="range" min="1" max="10" className="w-full" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">
                        Describe your best project
                      </label>
                      <textarea
                        rows="4"
                        className="bg-white/5 border border-white/20 rounded-2xl p-4 text-white outline-none"
                      />
                    </div>
                  </>
                )}

                {/* GRAPHIC DESIGNER */}
                {formData.category === "Graphic Designer" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">
                        Tools you use
                      </label>
                      <input className="bg-white/5 border border-white/20 rounded-2xl p-4 text-white" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">
                        Rate your design skills (1-10)
                      </label>
                      <input type="range" min="1" max="10" className="w-full" />
                    </div>
                  </>
                )}

                {/* PR */}
                {formData.category === "Public Relations" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">
                        How would you promote an event?
                      </label>
                      <textarea rows="4" className="bg-white/5 border border-white/20 rounded-2xl p-4 text-white" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[#FFB5B5] text-[10px] font-bold uppercase tracking-widest ml-1">
                        Rate your communication skills (1-10)
                      </label>
                      <input type="range" min="1" max="10" className="w-full" />
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-4 border border-[#FFB5B5]/30 text-[#FFB5B5] font-bold rounded-2xl hover:bg-white/5 transition-all"
                >
                  GO BACK
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-[2] py-4 bg-[#d03c19] text-white font-bold rounded-2xl hover:bg-orange-600 transition-all flex justify-center items-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : "SUBMIT APPLICATION"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default RecruitmentForm;