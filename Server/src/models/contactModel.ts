import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"]
    }
  },
  { timestamps: true }
);

const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;