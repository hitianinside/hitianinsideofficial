import React, { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";
import { InstagramEmbed } from "react-social-media-embed";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const StoriesForHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);


  // FETCH STORIES
  const fetchStories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/api/user/blogs`
      );
      if (res.data.success) {
        // ONLY TWO LATEST BLOGS
        setBlogs(res.data.blogs.slice(0, 2));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  // LOADING
  if (loading) {
    return (
      <section className="relative py-28 px-4 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full border-4 border-red-500/20 border-t-red-500 animate-spin" />
            <div className="text-center">
              <h2 className="text-white text-2xl font-bold">
                Loading Stories
              </h2>
              <p className="text-gray-400 mt-2">
                Fetching latest media club updates...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if(blogs.length === 0){
    return null;
  }

  return (
    <section className="relative my-8 px-4 md:px-10 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-red-200 font-semibold uppercase tracking-[0.2em] text-sm">
              Media Club Stories
            </p>
            <h2 className="text-lg font-black text-white">
              Latest Campus Stories
            </h2>
          </div>
          <Link to="/stories">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-500 transition-all duration-300 font-semibold text-white group">
              See All
              <FiArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
            </button>
          </Link>
        </div>

        {/* STORIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <Link
                to={`/stories/${blog.slug}?id=${blog._id}`}
              >
                <div className="group relative overflow-hidden rounded-[30px] bg-red-800/60 border border-white/10 hover:border-red-500/20 transition-all duration-500">
                  {/* MEDIA */}
                  <div className="relative h-[240px] overflow-hidden">
                    {blog.social_media_link ? (
                      <InstagramEmbed url={blog.social_media_link} className="w-[100%] h-full" />
                    ) : (

                      <div className="w-full h-full bg-gradient-to-br from-red-600 via-red-500 to-orange-500 flex items-center justify-center">
                        <h2 className="text-4xl font-black text-white/10 uppercase text-center px-8">
                          {blog.title}
                        </h2>
                      </div>
                    )}

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-black/20 to-transparent" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <h3 className="text-2xl font-black text-white group-hover:text-red-400 transition-all duration-300 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mt-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-red-200 font-semibold">
                        Read Story
                      </span>
                      <FiArrowRight className="text-red-200 text-xl group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <div className="flex justify-center mt-10 md:hidden">
          <Link to="/stories">
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 transition-all duration-300 font-semibold text-white">
              See All Stories
              <FiArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StoriesForHome;