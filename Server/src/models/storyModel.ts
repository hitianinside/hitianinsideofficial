import mongoose, { Schema, Document } from "mongoose";

export interface IStory extends Document {
  name: string;
  year: string;
  department: string;
  roll_no: string;
  contact_no: number;
  insta_id?: string;
  story_type: string;
  title: string;
  story: string;
  video: string;
  desc?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const storySchema = new Schema<IStory>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      trim: true
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true
    },
    roll_no: {
      type: String,
      required: [true, "Roll number is required"],
      trim: true
    },
    contact_no: {
      type: Number,
      required: [true, "Contact number is required"],
      min: [1000000000, "Invalid contact number"],
      max: [9999999999, "Invalid contact number"]
    },
    insta_id: {
      type: String,
      trim: true
    },
    story_type: {
      type: String,
      required: [true, "Story type is required"],
      enum: ["written", "video", "mixed"], 
      trim: true
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"]
    },
    story: {
      type: String,
      required: [true, "Story content is required"],
      trim: true,
      maxlength: [3000, "Story cannot exceed 3000 characters"]
    },
    video: {
      type: String,
      required: [true, "Video link is required"],
      trim: true,
      match: [/^https?:\/\/.+/, "Invalid video URL format"]
    },
    desc: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"]
    }
  },
  { timestamps: true }
);

const Storys = mongoose.model<IStory>("Story", storySchema);

export default Storys;