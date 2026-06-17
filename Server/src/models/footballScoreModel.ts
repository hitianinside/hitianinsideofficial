import mongoose, { Schema, Document } from "mongoose";

interface TeamDetailsType {
  team_name: string;
  team_logo: string;
  team_goals: number;
  team_logo_id : string
}

export interface IFootballScore extends Document {
  match_type: string;
  completed: "yes" | "no";
  team1_details : TeamDetailsType,
  team2_details : TeamDetailsType, 
  createdAt?: Date;
  updatedAt?: Date;
}

const teamDetailSchema = new Schema<TeamDetailsType>(
  {
    team_name : {type : String, required : true, trim : true},
    team_logo : {type : String, required : true},
    team_goals : {type : Number, required : true},
    team_logo_id : {type : String}
  }
)

const footballSchema = new Schema<IFootballScore>(
  {
    match_type: {
      type: String,
      required: [true, "Match type is required"],
      trim: true
    },
   
    team1_details : teamDetailSchema,
    
    team2_details : teamDetailSchema,

    completed: {
      type: String,
      enum: ["yes", "no"],
      default: "no"
    }
  },
  { timestamps: true }
);

const FootballScore = mongoose.model<IFootballScore>("FootballScore", footballSchema);

export default FootballScore;