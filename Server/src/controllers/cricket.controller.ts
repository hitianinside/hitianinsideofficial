import { Request, Response } from "express";
import CricketScore from "../models/cricketScoreModel";
import { CricketScoreType } from "../types/datatypes";
import { sendSuccess, sendError, getTeamLogos, toNum, } from "../utils/handler.utils";

export const updateCricketScore = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const { team1Run, team2Run, team1OverPlayed, team2OverPlayed, team1WicketLoss, team2WicketLoss, completed: completedRaw}: CricketScoreType = req.body;

    const completed = completedRaw === "yes" || completedRaw === "no" ? completedRaw : "no";

    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid or missing ID" });
    }

    // Find old data
    const existingScore = await CricketScore.findById(id);

    if (!existingScore) {
      return res.status(404).json({
        success: false,
        message: "cricket score not found",
      });
    }

    existingScore.team1_details.team_over_played = toNum(team1OverPlayed!);
    existingScore.team1_details.team_run = toNum(team1Run!);
    existingScore.team1_details.team_wicket_loss = toNum(team1WicketLoss!);
    existingScore.team2_details.team_over_played = toNum(team2OverPlayed!);
    existingScore.team2_details.team_run = toNum(team2Run!);
    existingScore.team2_details.team_wicket_loss = toNum(team2WicketLoss!);
    existingScore.completed = completed;

    existingScore.save({validateBeforeSave : true});

    return res.status(200).json({
      success: true,
      message: "cricket score updated successfully",
      data: existingScore,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to load",
      success: false
    })
  }
}

export const getCricketScore = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await CricketScore.find().select('-team1_details.team_logo_id -team1_details.team_logo_id');

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No cricket scores found!",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "All cricket scores loaded successfully",
      data,
    });
  } catch (error) {
    console.error("Get Cricket Score Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error! Try again later.",
    });
  }
};

export const addCricketScore = async (req: Request, res: Response) => {
  try {
    const {
      matchType,
      team1Name,
      team2Name,
      team1Run,
      team2Run,
      team1OverPlayed,
      team2OverPlayed,
      team1WicketLoss,
      team2WicketLoss,
      completed,
    }: CricketScoreType = req.body;

    const { team1Logo, team2Logo, team1PublicId, team2PublicId } = getTeamLogos(req);

    if (!team1Logo || !team2Logo) {
      return res
        .status(400)
        .json({ success: false, message: "Both team logos are required." });
    }

    const cricket = await CricketScore.create({
      match_type: matchType,
      team1_details: {
        team_name: team1Name,
        team_logo: team1Logo,
        team_over_played: toNum(team1OverPlayed),
        team_run: toNum(team1Run),
        team_wicket_loss: toNum(team1WicketLoss),
        team_logo_id: team1PublicId
      },
      team2_details: {
        team_name: team2Name,
        team_logo: team2Logo,
        team_over_played: toNum(team2OverPlayed),
        team_run: toNum(team2Run),
        team_wicket_loss: toNum(team2WicketLoss),
        team_logo_id: team2PublicId
      },
      completed
    });

    sendSuccess(res, "Cricket score saved successfully.", { id: cricket._id });
  } catch (error) {
    sendError(res, "Failed to save cricket score", error);
  }
};

export const deleteCricketScore = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const isDeleted = await CricketScore.findByIdAndDelete(id);

    if (!isDeleted) {
      return res.status(401).json({
        success: false,
        message: "scorecard not deleted!"
      });
    }

    return res.status(200).json({
      success: true,
      message: "delete cricket score successfully!"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong!"
    });
  }
}