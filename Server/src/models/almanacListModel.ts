import mongoose, { Schema, Document } from "mongoose";

export interface IAlmanac extends Document {
  photo: string;
  username: string;
  department: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const almanacSchema = new Schema<IAlmanac>(
  {
    photo: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const AlmanacList = mongoose.model<IAlmanac>("AlmanacList", almanacSchema);

export default AlmanacList;
