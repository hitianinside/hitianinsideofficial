import { Router, Request, Response } from "express";
import upload from "../../utils/multerCloudinaryConfig";
import Artwork from "../../models/artworkModel";
import Contact from "../../models/contactModel";
import Photos from "../../models/photoModel";
import Videos from "../../models/videoModel";
import Poems from "../../models/poemModel";
import Storys from "../../models/storyModel";

const userPostRouter = Router();

interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: Record<string, Express.Multer.File[]>;
}

// Utility for clean error logging
const handleError = (res: Response, error: any, msg = "Internal Server Error!!") => {
  console.error("Error:", error?.message || error);
  res.status(500).json({
    message: msg, error: error?.message || "Unknown error"
  });
};

//Contact Form
userPostRouter.post("/form", async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const contact = await Contact.create({ name, email, message });
    res.status(201).json({
      message: "Form submitted successfully",
      id: contact._id,
      success : true
    });
  } catch (error) {
    handleError(res, error);
  }
});

//Artwork Submission
userPostRouter.post("/artwork", upload.single("file"), async (req: Request, res: Response) => {
  try {
    const { email, name, year, department, rollNo, contactNo, instaID, desc } = req.body;
    const fileUrl = (req as MulterRequest).file?.path;
    const fileId = (req as MulterRequest).file?.filename;

    if (!fileUrl) {
      return res.status(400).json({
        message: "Artwork file upload is required"
      });
    }

    const artwork = await Artwork.create({
      email,
      name,
      year,
      department,
      roll_no: rollNo,
      contact_no: contactNo,
      insta_id: instaID,
      file_url: fileUrl,
      file_id: fileId,
      desc,
    });

    res.status(201).json({
      message: "Artwork uploaded successfully",
      id: artwork._id,
      success : true
    });
  } catch (error) {
    handleError(res, error);
  }
});

//Photography Submission
userPostRouter.post("/photography", upload.single("file"), async (req: Request, res: Response) => {
  try {
    const { email, name, year, department, rollNo, contactNo, instaID, desc } = req.body;
    const fileUrl = (req as MulterRequest).file?.path;
    const fileId = (req as MulterRequest).file?.filename;

    if (!fileUrl) {
      return res.status(400).json({
        message: "Photo file upload is required"
      });
    }

    const photo = await Photos.create({
      email,
      name,
      year,
      department,
      roll_no: rollNo,
      contact_no: contactNo,
      insta_id: instaID,
      file_url: fileUrl,
      file_id: fileId,
      desc,
    });

    res.status(201).json({
      message: "Photography uploaded successfully",
      id: photo._id,
      success : true
    });
  } catch (error) {
    handleError(res, error);
  }
});

//Poem Submission
userPostRouter.post("/poem", async (req: Request, res: Response) => {
  try {
    const { email, name, year, department, rollNo, contactNo, instaID, title, poem } = req.body;

    if (!title || !poem) {
      return res.status(400).json({
        message: "Title and Poem are required"
      });
    }
    const poemDoc = await Poems.create({
      email,
      name,
      year,
      department,
      roll_no: rollNo,
      contact_no: contactNo,
      insta_id: instaID,
      title,
      poem,
    });

    res.status(201).json({
      message: "Poem submitted successfully",
      id: poemDoc._id,
      success : true
    });
  } catch (error) {
    handleError(res, error);
  }
});

//Video Submission
userPostRouter.post("/video", upload.single("file"), async (req: Request, res: Response) => {
  try {
    const { name, year, department, rollNo, contactNo, instaID, desc } = req.body;
    const videoUrl = (req as MulterRequest).file?.path;
    const videoId = (req as MulterRequest).file?.filename;

    if (!videoUrl) {
      return res.status(400).json({
        message: "Video upload is required"
      });
    }
    const video = await Videos.create({
      name,
      year,
      department,
      roll_no: rollNo,
      contact_no: contactNo,
      insta_id: instaID,
      video: videoUrl,
      desc,
    });

    res.status(201).json({
      message: "Video uploaded successfully",
      id: video._id,
      success : true
    });
  } catch (error) {
    handleError(res, error);
  }
});

//Story Submission
userPostRouter.post("/story", async (req: Request, res: Response) => {
  try {
    const { name, year, department, rollNo, contactNo, instaID, storyType, title, story, video, desc } = req.body;

    if (!title || !story) {
      return res.status(400).json({
        message: "Title and Story content are required"
      });
    }

    const storyDoc = await Storys.create({
      name,
      year,
      department,
      roll_no: rollNo,
      contact_no: contactNo,
      insta_id: instaID,
      story_type: storyType,
      title,
      story,
      video,
      desc,
    });

    res.status(201).json({
      message: "Story submitted successfully",
      id: storyDoc._id,
      success : true
    });
  } catch (error) {
    handleError(res, error);
  }
});

export default userPostRouter;