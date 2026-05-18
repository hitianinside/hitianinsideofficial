import mongoose, { Schema, Document } from "mongoose";

export interface ICricketScore extends Document {
  match_type: string;
  completed: "yes" | "no";
  createdAt?: Date;
  updatedAt?: Date;
  team1_details: TeamType;
  team2_details: TeamType
};

interface TeamType {
  team_name: string;
  team_logo: string;
  team_run: number;
  team_over_played: number;
  team_wicket_loss: number;
  team_logo_id: string
};

const teamSchema = new Schema<TeamType>({
  team_name: { type: String, required: true },
  team_logo: { type: String, required: true },
  team_run: { type: Number, required: true },
  team_over_played: { type: Number, required: true },
  team_wicket_loss: { type: Number, required: true },
  team_logo_id: { type: String, required: true }
});

const cricketSchema = new Schema<ICricketScore>(
  {
    match_type: {
      type: String,
      required: true,
      trim: true
    },

    team1_details: {
      type: teamSchema,
      required: true,
    },

    team2_details: {
      type: teamSchema,
      required: true,
    },

    completed: {
      type: String,
      enum: ["yes", "no"],
      default: "no"
    }
  },

  { timestamps: true }
);

const CricketScore = mongoose.model<ICricketScore>("CricketScore", cricketSchema);
export default CricketScore;