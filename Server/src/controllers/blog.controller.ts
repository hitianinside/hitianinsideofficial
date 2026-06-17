import { Request, Response } from "express";
import Blogs from "../models/blogsModel";

export const addBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, status, social_media_link } = req.body;

    let { slug } = req.body;

    if (!slug) {
      slug = title;
    }

    const newBlog = await Blogs.create({
      title, slug, content, excerpt, status, social_media_link
    });

    if (!newBlog) {
      return res.status(400).json({
        message: "can't create new blog",
        success: false
      });
    }

    return res.status(201).json({
      message: "created new blog",
      success: true,
      id: newBlog._id
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong",
      success: false
    });
  }
}

export const getBlogForAdmin = async (req: Request, res: Response) => {
  try {
    const blogs = await Blogs.find().sort({ createdAt: -1 }).select("-createdAt -updatedAt -__v");

    if (!blogs) {
      return res.status(400).json({
        message: "No blog is present",
        success: false
      });
    }

    return res.status(200).json({
      message: "load all blogs",
      success: true,
      blogs
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false
    });
  }
}

export const getBlog = async (req: Request, res: Response) => {
  try {
    const blogs = await Blogs.find({ status: "published" }).sort({ createdAt: -1 }).select("-createdAt -updatedAt -__v -totalVisits");

    if (!blogs) {
      return res.status(400).json({
        message: "No blog is present",
        success: false
      });
    }

    return res.status(200).json({
      message: "load all blogs",
      success: true,
      blogs
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false
    });
  }
}

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id).select("-createdAt -updatedAt -__v");

    if (!blog) {
      return res.status(400).json({
        message: "No blog is present",
        success: false
      });
    }

    blog.totalVisits += 1;
    await blog.save({validateBeforeSave : true});

    return res.status(200).json({
      message: "load blog",
      success: true,
      blog
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "something went wrong",
      success: false
    });
  }
}

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, status, social_media_link } = req.body;

    const blog = await Blogs.findById(id);

    if (!blog) {
      return res.status(400).json({
        message: "No blog is present",
        success: false
      });
    }

    blog.title = title;
    blog.content = content;
    blog.excerpt = excerpt;
    blog.status = status;
    blog.social_media_link = social_media_link;

    await blog.save({ validateBeforeSave: true });

    return res.status(200).json({
      message: "load blog",
      success: true,
      blog
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false
    });
  }
}

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isblogDelete = await Blogs.findByIdAndDelete(id);

    if (!isblogDelete) {
      return res.status(400).json({
        message: "Blog not deleted",
        success: false
      });
    }

    return res.status(200).json({
      message: "deleted blog successfully",
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false
    });
  }
}