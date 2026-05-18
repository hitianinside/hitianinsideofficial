import React from 'react';
import { motion } from "motion/react";
import { FiArrowRight, FiExternalLink} from "react-icons/fi";
import { Link } from "react-router-dom";
import { InstagramEmbed } from "react-social-media-embed";

const BlogCard = ({blog, index}) => {
  return (
    <motion.article
      key={blog._id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -10,
      }}
      className="group relative overflow-hidden rounded-[34px] bg-red-600/10  backdrop-blur-md border border-white/30 mt-3"
    >
      {/* CARD GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

      {/* SOCIAL MEDIA FRAME */}
      <div className="relative h-[280px] overflow-hidden">
        {blog.social_media_link ? (
          <InstagramEmbed
            url={blog.social_media_link}
            className="w-[100%] h-full" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-600 via-red-500 to-orange-500 flex items-center justify-center">
            <h2 className="text-5xl font-black text-white/10 uppercase tracking-widest text-center px-6">
              {blog.title}
            </h2>
          </div>
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent" />

        {/* TITLE ON IMAGE */}
        <div className="absolute bottom-0 left-0 p-7">
          <motion.h2
            whileHover={{ x: 3 }}
            className="text-3xl font-black leading-tight text-white max-w-[90%]"
          >
            {blog.title}
          </motion.h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative p-7">
        {/* EXCERPT */}
        <p className="text-gray-400 leading-relaxed text-[15px] line-clamp-3">
          {blog.excerpt}
        </p>
        {/* ACTIONS */}
        <div className="flex items-center gap-4 mt-8">
          {/* READ BLOG */}
          <Link
            to={`/stories/${blog.slug}?id=${blog._id}`}
            className="flex-1"
          >
            <button className="w-full h-[58px] rounded-2xl bg-red-600 hover:bg-red-500 transition-all duration-300 flex items-center justify-center gap-3 font-semibold group/button">
              Read Full Story
              <FiArrowRight className="group-hover/button:translate-x-1 transition-all duration-300" />
            </button>
          </Link>

          {/* EXTERNAL LINK */}
          {blog.social_media_link && (
            <a
              href={blog.social_media_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[58px] h-[58px] rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white/[0.04] hover:border-red-500/30 transition-all duration-300"
            >
              <FiExternalLink className="text-xl text-gray-300" />
            </a>
          )}
        </div>
      </div>

      {/* HOVER BORDER */}
      <div className="absolute inset-0 rounded-[34px] border border-red-500/0 group-hover:border-red-500/20 transition-all duration-500 pointer-events-none" />
    </motion.article>
  );
}

export default BlogCard;