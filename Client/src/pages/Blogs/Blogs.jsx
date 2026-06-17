import React, { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { FiLoader, FiRefreshCcw, FiAlertCircle, FiTrendingUp } from "react-icons/fi";
import axios from "axios";
import BlogCard from "../../components/Blogs/BlogCard";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Blogs = () => {
  // STATES
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH BLOGS
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `${API_URL}/api/user/blogs`
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      setBlogs(res.data.blogs || []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
          "Failed to load blogs"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

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
              Loading Stories
            </h2>
            <p className="text-gray-400 mt-2">
              Fetching latest media club updates...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ERROR UI
  if (error) {
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
            {error}
          </p>
          <button
            onClick={fetchBlogs}
            className="mt-8 inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 transition-all duration-300 px-6 py-3 rounded-2xl font-semibold text-white"
          >
            <FiRefreshCcw />
            Retry Again
          </button>
        </div>
      </div>
    );
  }

  // MAIN UI
  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-500/10 blur-[140px]" />
      </div>
      {/* HERO */}
      <section className="relative px-4 md:px-10 py-5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-500/20 bg-red-500/50 text-red-200 text-sm font-semibold mb-8">
              <FiTrendingUp />
              College Media Club
            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight max-w-6xl mx-auto">
              Stories That
              <span className="text-red-500"> Define Campus Life</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mt-8">
              Discover official coverage of campus events,
              cultural programs, competitions, celebrations,
              achievements and unforgettable student moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="relative px-4 md:px-10 pb-14">
        <div className="max-w-7xl mx-auto">
          {/* EMPTY STATE */}
          {blogs.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8">
                <FiLoader className="text-red-500 text-5xl" />
              </div>
              <h2 className="text-4xl font-bold">
                No Blogs Published
              </h2>
              <p className="text-gray-400 mt-5 text-lg">
                Media club stories will appear here soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <BlogCard blog={blog} index={index}/>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;