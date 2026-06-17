import mongoose, { Schema, Document } from "mongoose";

export interface IPhoto extends Document {
  email: string;
  name: string;
  year: string;
  department: string;
  roll_no: string;
  contact_no: number;
  insta_id?: string;
  file_url: string;
  file_id: string;
  desc?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const photosSchema = new Schema<IPhoto>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
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
    file_url: {
      type: String,
      required: [true, "File URL is required"]
    },
    file_id: {
      type: String,
      required: [true, "File ID is required"]
    },
    desc: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"]
    }
  },
  { timestamps: true }
);

const Photos = mongoose.model<IPhoto>("Photos", photosSchema);

export default Photos;