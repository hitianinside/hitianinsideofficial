import mongoose, { Schema, Document } from "mongoose";

export interface IBasketballScore extends Document {
  match_type: string;
  team1_name: string;
  team2_name: string;
  team1_logo: string;
  team2_logo: string;
  team1_score?: number;
  team2_score?: number;
  completed: "yes" | "no";
  createdAt?: Date;
  updatedAt?: Date;
}

const basketballSchema = new Schema<IBasketballScore>(
  {
    match_type: {
      type: String,
      required: true,
      trim: true
    },
    team1_name: {
      type: String,
      required: true,
      trim: true
    },
    team2_name: {
      type: String,
      required: true,
      trim: true
    },
    team1_logo: {
      type: String,
      required: true
    },
    team2_logo: {
      type: String,
      required: true
    },
    team1_score: {
      type: Number,
      min: 0
    },
    team2_score: {
      type: Number,
      min: 0
    },
    completed: {
      type: String,
      enum: ["yes", "no"],
      default: "no"
    }
  },
  { timestamps: true }
);

const BasketballScore = mongoose.model<IBasketballScore>("BasketballScore", basketballSchema);

export default BasketballScore;