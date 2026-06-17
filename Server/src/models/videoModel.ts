import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  name: string;
  year: string;
  department: string;
  roll_no: string;
  contact_no: number;
  insta_id?: string;
  video: string;
  desc: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const videosSchema = new Schema<IVideo>(
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
    video: {
      type: String,
      required: [true, "Video link is required"],
      trim: true,
      match: [/^https?:\/\/.+/, "Invalid video URL format"]
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"]
    }
  },
  { timestamps: true }
);

const Videos = mongoose.model<IVideo>("Video", videosSchema);

export default Videos;
