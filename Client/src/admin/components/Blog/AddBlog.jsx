import React, {useState} from "react";
import { motion } from "motion/react";
import { FiFileText, FiType, FiAlignLeft, FiLink, FiEdit3, FiSave } from "react-icons/fi";

import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const initialFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  status: "draft",
  social_media_link: "",
};

const AddBlog = () => {

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  

  // INPUT STYLE
  const inputStyle ="w-full border border-gray-700 focus:border-red-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-gray-400 transition-all duration-300";

  const labelStyle = "flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2";

   // VALIDATION
  const validateBlog = (data) => {
    if (!data.title.trim()) {
      toast.error("Title is required");
      return false;
    }

    if (!data.slug.trim()) {
      toast.error("Slug is required");
      return false;
    }

    if (!data.excerpt.trim()) {
      toast.error("Excerpt is required");
      return false;
    }

    if (!data.content.trim()) {
      toast.error("Content is required");
      return false;
    }

    return true;
  };

  // HANDLE CREATE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // CREATE BLOG
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateBlog(formData)) return;

    try {
      setLoading(true);

      const payload = {
        ...formData,
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        social_media_link: formData.social_media_link.trim(),
      };

      const res = await axios.post(
        `${API_URL}/api/admin/add-blog`,
        payload
      );

      toast.success(res.data.message || "Blog created");
      setFormData(initialFormData);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to create blog"
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto border border-red-500/20 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(255,0,0,0.08)] backdrop-blur-xl"
    >
      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Blog Management
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          Create, update and manage blogs from dashboard.
        </p>
      </div>

      {/* FORM */}

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* TITLE */}

        <div>
          <label className={labelStyle}>
            <FiType />
            Blog Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className={inputStyle}
            autoComplete="off"
          />
        </div>

        {/* SLUG */}

        <div>
          <label className={labelStyle}>
            <FiFileText />
            Slug
          </label>

          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="example-blog-slug"
            className={inputStyle}
            autoComplete="off"
          />
        </div>

        {/* EXCERPT */}

        <div>
          <label className={labelStyle}>
            <FiAlignLeft />
            Excerpt
          </label>

          <textarea
            rows={3}
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Short summary..."
            className={`${inputStyle} resize-none`}
          />
        </div>

        {/* CONTENT */}

        <div>
          <label className={labelStyle}>
            <FiEdit3 />
            Blog Content
          </label>

          <textarea
            rows={10}
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write blog content..."
            className={`${inputStyle} resize-none`}
          />
        </div>

        {/* STATUS */}

        <div>
          <label className={labelStyle}>
            <FiFileText />
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="draft" className="bg-black">
              Draft
            </option>

            <option value="published" className="bg-black">
              Published
            </option>
          </select>
        </div>

        {/* SOCIAL LINK */}

        <div>
          <label className={labelStyle}>
            <FiLink />
            Social Media Link
          </label>

          <input
            type="text"
            name="social_media_link"
            value={formData.social_media_link}
            onChange={handleChange}
            placeholder="https://instagram.com/..."
            className={inputStyle}
            autoComplete="off"
          />
        </div>

        {/* SUBMIT */}

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 px-8 py-3 rounded-xl font-semibold active:scale-95"
          >
            <FiSave />

            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default AddBlog;
