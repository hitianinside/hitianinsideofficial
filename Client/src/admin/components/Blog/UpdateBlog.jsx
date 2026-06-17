import React, { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { FiSave, FiTrash2, } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const UpdateBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [fetchingBlogs, setFetchingBlogs] = useState(false);
  const [updatingBlogId, setUpdatingBlogId] = useState(null);
  const [deletingBlogId, setDeletingBlogId] = useState(null);

  const inputStyle = "w-full border border-gray-700 focus:border-red-500 outline-none rounded-xl px-4 py-3 text-black placeholder:text-gray-400 transition-all duration-300";

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

  // FETCH BLOGS
  const fetchBlogs = useCallback(async () => {
    try {
      setFetchingBlogs(true);

      const res = await axios.get(`${API_URL}/api/admin/blogs`);

      setBlogs(res.data.blogs || []);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to fetch blogs"
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setFetchingBlogs(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // HANDLE BLOG CARD CHANGE
  const handleBlogChange = (index, field, value) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog, i) =>
        i === index
          ? {
            ...blog,
            [field]: value,
          }
          : blog
      )
    );
  };

  // UPDATE BLOG
  const handleUpdateBlog = async (blog) => {
    try {
      if (!validateBlog(blog)) return;

      setUpdatingBlogId(blog._id);

      const payload = {
        title: blog.title.trim(),
        slug: blog.slug.trim(),
        excerpt: blog.excerpt.trim(),
        content: blog.content.trim(),
        status: blog.status,
        social_media_link: blog.social_media_link.trim(),
      };

      const res = await axios.patch(
        `${API_URL}/api/admin/update-blog/${blog._id}`,
        payload
      );

      const updatedBlog = res.data.blog;

      setBlogs((prevBlogs) =>
        prevBlogs.map((item) =>
          item._id === updatedBlog._id ? updatedBlog : item
        )
      );

      toast.success(res.data.message || "Blog updated");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to update blog"
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setUpdatingBlogId(null);
    }
  };

  // DELETE BLOG
  const handleDeleteBlog = async (blogId) => {
    const confirmDelete =  window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingBlogId(blogId);

      const res = await axios.delete(
        `${API_URL}/api/admin/delete-blog/${blogId}`
      );

      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== blogId)
      );

      toast.success(res.data.message || "Blog deleted");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to delete blog"
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setDeletingBlogId(null);
    }
  };

  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {fetchingBlogs ? (
        <div className="text-gray-400 text-lg">
          Loading blogs...
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-gray-400 text-lg">
          No blogs found
        </div>
      ) : (
        blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-[0_0_40px_rgba(255,0,0,0.06)]"
          >
            {/* HEADER */}

            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Edit Blog
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Modify your blog information
                </p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-xs font-bold uppercase border
                     ${blog.status === "published"
                    ? "bg-green-500/10 text-green-300 border-green-500/30"
                    : "bg-yellow-500/10 text-yellow-300 border-yellow-500/30"
                  }`}
              >
                {blog.status}
              </span>
            </div>

            {/* FORM */}

            <div className="space-y-5">
              {/* TITLE */}

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Blog Title
                </label>

                <input
                  type="text"
                  value={blog.title}
                  onChange={(e) =>
                    handleBlogChange(
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  className={inputStyle}
                />
              </div>

              {/* SLUG */}

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Slug
                </label>

                <input
                  type="text"
                  value={blog.slug}
                  onChange={(e) =>
                    handleBlogChange(
                      index,
                      "slug",
                      e.target.value
                    )
                  }
                  className={inputStyle}
                />
              </div>

              {/* EXCERPT */}

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Excerpt
                </label>

                <textarea
                  rows={3}
                  value={blog.excerpt}
                  onChange={(e) =>
                    handleBlogChange(
                      index,
                      "excerpt",
                      e.target.value
                    )
                  }
                  className={`${inputStyle} resize-none`}
                />
              </div>

              {/* CONTENT */}

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Content
                </label>

                <textarea
                  rows={6}
                  value={blog.content}
                  onChange={(e) =>
                    handleBlogChange(
                      index,
                      "content",
                      e.target.value
                    )
                  }
                  className={`${inputStyle} resize-none`}
                />
              </div>

              {/* SOCIAL LINK */}

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Social Link
                </label>

                <input
                  type="text"
                  value={blog.social_media_link}
                  onChange={(e) =>
                    handleBlogChange(
                      index,
                      "social_media_link",
                      e.target.value
                    )
                  }
                  className={inputStyle}
                />
              </div>

              {/* STATUS */}

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Status
                </label>

                <select
                  value={blog.status}
                  onChange={(e) =>
                    handleBlogChange(
                      index,
                      "status",
                      e.target.value
                    )
                  }
                  className={inputStyle}
                >
                  <option value="draft" className="bg-black text-white">
                    Draft
                  </option>

                  <option
                    value="published"
                    className="bg-black text-white"
                  >
                    Published
                  </option>
                </select>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="flex items-center gap-4 mt-8">
              {/* UPDATE */}

              <button
                type="button"
                disabled={updatingBlogId === blog._id}
                onClick={() => handleUpdateBlog(blog)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-yellow-600 to-yellow-500 hover:scale-[1.02] active:scale-95 transition-all duration-300 font-semibold text-white disabled:opacity-60"
              >
                <FiSave />

                {updatingBlogId === blog._id
                  ? "Saving..."
                  : "Save Changes"}
              </button>

              {/* DELETE */}

              <button
                type="button"
                disabled={deletingBlogId === blog._id}
                onClick={() => handleDeleteBlog(blog._id)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-red-700 to-red-600 hover:scale-[1.02] active:scale-95 transition-all duration-300 font-semibold text-white disabled:opacity-60"
              >
                <FiTrash2 />

                {deletingBlogId === blog._id
                  ? "Deleting..."
                  : "Delete Blog"}
              </button>
            </div>
          </motion.div>
        ))
      )}
    </div>
  )
}

export default UpdateBlog
