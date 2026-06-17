import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  admin: boolean;
  department : string;
  year : string;
  createdAt?: Date;
  updatedAt?: Date;
}

const authSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    image: {
      type: String,
    },

    admin: {
      type: Boolean,
      default: false
    },

    department : {
      type : String,
      default : "",
      lowercase: true,
      trim: true
    },

    year : {
      type : String,
      default : "",
      lowercase: true,
      trim: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", authSchema);

export default User;
