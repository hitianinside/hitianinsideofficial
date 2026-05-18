import React from "react";
import AddBlog from "../../components/Blog/AddBlog";
import UpdateBlog from "../../components/Blog/UpdateBlog";

const AdminBlogs = () => {
  return (
    <div className="min-h-screen text-white px-4 py-10">
      {/* CREATE BLOG SECTION */}
      <AddBlog />

      {/* BLOG LIST */}
      <UpdateBlog />
    </div>
  );
};

export default AdminBlogs;