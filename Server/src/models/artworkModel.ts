import mongoose, { Schema, Document } from "mongoose";

export interface IArtwork extends Document {
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

const artworkSchema = new Schema<IArtwork>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    roll_no: {
      type: String,
      required: true
    },
    contact_no: {
      type: Number,
      required: true,
      min: 1000000000,
      max: 9999999999
    },
    insta_id: {
      type: String,
      trim: true
    },
    file_url: {
      type: String,
      required: true
    },
    file_id: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const Artwork = mongoose.model<IArtwork>("Artwork", artworkSchema);

export default Artwork;