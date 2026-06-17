import mongoose, { Schema, Document } from "mongoose";

export interface IPoem extends Document {
  email: string;
  name: string;
  year: string;
  department: string;
  roll_no: string;
  contact_no: number;
  insta_id?: string;
  title: string;
  poem: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const poemSchema = new Schema<IPoem>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"]
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
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"]
    },
    poem: {
      type: String,
      required: [true, "Poem content is required"],
      trim: true,
      maxlength: [2000, "Poem cannot exceed 2000 characters"]
    }
  },
  { timestamps: true }
);

const Poems = mongoose.model<IPoem>("Poem", poemSchema);

export default Poems;