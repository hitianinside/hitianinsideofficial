import mongoose, { Schema, Document } from "mongoose";

export interface IHomepageElement extends Document {
  event_name: string;
  event_poster: string;
  event_content: string;
  event_form_link?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const homepageElementListSchema = new Schema<IHomepageElement>(
  {
    event_name: { 
      type: String,
      required: [true, "Event name is required"],
      trim: true
    },
    event_poster: { 
      type: String,
      required: [true, "Event poster is required"]
    },
    event_content: { 
      type: String,
      trim: true
    },
    event_form_link: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Invalid link format"]
    }
  },
  { timestamps: true }
);

const HomepageElementList = mongoose.model<IHomepageElement>(
  "HomepageElementList",
  homepageElementListSchema
);

export default HomepageElementList;