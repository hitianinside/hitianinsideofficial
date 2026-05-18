import { Request, Response } from "express";
import VolleyballScore from "../models/volleyballScoreModel";
import { toNum, getTeamLogos } from "../utils/handler.utils";
import { VolleyballScoreType } from "../types/datatypes";

export const getVolleyballScore = async (req: Request, res: Response) => {
  try {
    const data = await VolleyballScore.find();

    if (!data) {
      return res.status(400).json({
        message: "not fetch",
        success: false
      })
    }

    return res.status(201).json({
      message: "fetch successfully",
      success: true,
      data
    })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false
    })
  }
}

export const addVolleyballScore = async (req: Request, res: Response) => {
  try {
    const { matchType, team1Name, team2Name, team1Score, team2Score, completed }: VolleyballScoreType =
      req.body;

    const { team1Logo, team2Logo } = getTeamLogos(req);

    if (!team1Logo || !team2Logo) {
      return res.status(400).json({ success: false, message: "Both team logos are required." });
    }

    const volleyball = await VolleyballScore.create({
      match_type: matchType,
      team1_name: team1Name,
      team2_name: team2Name,
      team1_logo: team1Logo,
      team2_logo: team2Logo,
      team1_score: toNum(team1Score),
      team2_score: toNum(team2Score),
      completed,
    });

    return res.status(201).json({
      message: "add successfully",
      success: true,
      id: volleyball._id
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save volleyball score",
      success: false
    });
  }
}
