import mongoose, { Schema, Document } from "mongoose";

export interface IVolleyballScore extends Document {
  match_type: string;
  team1_name: string;
  team2_name: string;
  team1_logo: string;
  team2_logo: string;
  team1_score?: number;
  team2_score?: number;
  completed?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const volleyballSchema = new Schema<IVolleyballScore>(
  {
    match_type: {
      type: String,
      required: [true, "Match type is required"],
      trim: true
    },
    team1_name: {
      type: String,
      required: [true, "Team 1 name is required"],
      trim: true
    },
    team2_name: {
      type: String,
      required: [true, "Team 2 name is required"],
      trim: true
    },
    team1_logo: {
      type: String,
      required: [true, "Team 1 logo is required"],
      trim: true
    },
    team2_logo: {
      type: String,
      required: [true, "Team 2 logo is required"],
      trim: true
    },
    team1_score: {
      type: Number,
      default: 0,
      min: [0, "Score cannot be negative"]
    },
    team2_score: {
      type: Number,
      default: 0,
      min: [0, "Score cannot be negative"]
    },
    completed: {
      type: String,
      enum: ["yes", "no", "ongoing"],
      default: "no"
    }
  },
  { timestamps: true }
);

const VolleyballScore = mongoose.model<IVolleyballScore>(
  "VolleyballScore",
  volleyballSchema
);

export default VolleyballScore;