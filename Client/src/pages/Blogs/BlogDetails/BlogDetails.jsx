import React, { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { FiArrowLeft, FiExternalLink, FiAlertCircle, FiRefreshCcw, FiEye } from "react-icons/fi";
import axios from "axios";
import { InstagramEmbed } from "react-social-media-embed";
import { Link, useSearchParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const BlogDetails = () => {

  // ROUTER
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // STATES
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH BLOG
  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `${API_URL}/api/user/blogs/${id}`
      );
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      setBlog(res.data.blog);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
          "Failed to load blog"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [fetchBlog, id]);

  // LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="w-20 h-20 rounded-full border-4 border-red-500/20 border-t-red-500 animate-spin" />
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold">
              Loading Story
            </h2>
            <p className="text-gray-400 mt-2">
              Fetching media club article...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ERROR UI
  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full border border-red-500/20 rounded-3xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <FiAlertCircle className="text-red-500 text-4xl" />
          </div>
          <h2 className="text-white text-3xl font-bold">
            Failed to Load
          </h2>
          <p className="text-gray-400 mt-4 leading-relaxed">
            {error || "Blog not found"}
          </p>
          <button
            onClick={fetchBlog}
            className="mt-8 inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 transition-all duration-300 px-6 py-3 rounded-2xl font-semibold text-white"
          >
            <FiRefreshCcw />
            Retry Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-500/10 blur-[140px]" />
      </div>

      {/* HERO */}
      <section className="relative px-4 md:px-10 pt-6 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* BACK BUTTON */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 mb-6"
            >
              <FiArrowLeft />
              Back to Stories
            </Link>
          </motion.div>

          {/* HERO CARD */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
          >
            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.08] to-transparent" />
            {/* MEDIA */}
            <div className="relative h-[420px] overflow-hidden">
              {blog.social_media_link ? (
                <InstagramEmbed url={blog.social_media_link} className="w-[100%] h-full" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-600 via-red-500 to-orange-500 flex items-center justify-center">
                  <h1 className="text-6xl md:text-8xl font-black text-white/10 uppercase tracking-widest text-center px-10">
                    {blog.title}
                  </h1>
                </div>
              )}

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="relative p-8 md:p-12">
              {/* TITLE */}
              <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-5xl">
                {blog.title}
              </h1>

              {/* STATS */}
              <div className="flex flex-wrap items-center gap-6 mt-10">
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10">
                  <FiEye className="text-red-400 text-xl" />
                  <div className="flex gap-2 justify-center items-center">
                    <p className="text-sm text-gray-400">
                      Total Visits
                    </p>
                    <h3 className="font-bold text-lg">
                      {blog.totalVisits || 0}
                    </h3>
                  </div>
                </div>

                {blog.social_media_link && (
                  <a
                    href={blog.social_media_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-600 hover:bg-red-500 transition-all duration-300 font-semibold"
                  >Visit Media
                    <FiExternalLink />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <section className="relative px-4 md:px-10 pb-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 md:p-14"
          >
            {/* TOP BAR */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-red-400 uppercase tracking-[0.25em] text-sm font-bold">
                  Article Content
                </p>
                <h2 className="text-3xl md:text-4xl font-black mt-3">
                  Full Story
                </h2>
              </div>
            </div>
            {/* CONTENT */}
            <p className="text-gray-200 text-[16px] whitespace-pre-wrap">
              {blog.content}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;