import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  insta_url: string;
  event_name: string;
  year: number;
  date: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const eventsSchema = new Schema<IEvent>(
  {
    insta_url: {
      type: String,
      required: [true, "Instagram URL is required"],
      trim: true,
      match: [/^https?:\/\/(www\.)?instagram\.com\/.+$/, "Invalid Instagram URL"]
    },
    event_name: {
      type: String,
      required: [true, "Event name is required"],
      trim: true
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [2000, "Year must be after 2000"],
      max: [2100, "Year must be before 2100"]
    },
    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true
    }
  },
  { timestamps: true }
);

const EventsList = mongoose.model<IEvent>("EventsList", eventsSchema);

export default EventsList;