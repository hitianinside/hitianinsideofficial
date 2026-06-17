import { FootballScoreType } from "../types/datatypes";
import FootballScore from "../models/footballScoreModel";
import { Request, Response } from "express";
import { sendSuccess, sendError, getTeamLogos, toNum, } from "../utils/handler.utils";

export const addFootballScore = async (req: Request, res: Response) => {
  try {
    const {
      matchType,
      team1Name,
      team2Name,
      team1Goals,
      team2Goals,
      completed,
    }: FootballScoreType = req.body;

    const { team1Logo, team2Logo, team1PublicId, team2PublicId } = getTeamLogos(req);
    if (!team1Logo || !team2Logo)
      return res
        .status(400)
        .json({ success: false, message: "Both team logos are required." });

    const football = await FootballScore.create({
      match_type: matchType,
      team1_details: {
        team_name: team1Name,
        team_goals: toNum(team1Goals),
        team_logo: team1Logo,
        team_logo_id: team1PublicId
      },
      team2_details: {
        team_name: team2Name,
        team_goals: toNum(team2Goals),
        team_logo: team2Logo,
        team_logo_id: team2PublicId
      },
      completed,
    });

    sendSuccess(res, "Football score saved successfully.", { id: football._id });
  } catch (error) {
    sendError(res, "Failed to save football score", error);
  }
}

export const getFootballScore = async (req: Request, res: Response) => {
  try {
    const data = await FootballScore.find().select('-team1_details.team_logo_id -team2_details.team_logo_id');
    res.status(200).json({
      data,
      success: true,
      message: "Load all resources!",
    });
  } catch (error) {
    res.status(500).json({
      message: "server down! try again later",
      success: false
    })
  }
}

export const updateFootballDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const { matchType, team1Goals, team2Goals, completed } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid or missing ID" });
    }

    // Find old data
    const existingScore = await FootballScore.findById(id);

    if (!existingScore) {
      return res.status(404).json({
        success: false,
        message: "cricket score not found",
      });
    }

    existingScore.team1_details.team_goals = toNum(team1Goals);
    existingScore.team2_details.team_goals = toNum(team2Goals);
    existingScore.completed = completed;
    existingScore.match_type = matchType;

    const updatedItem = await existingScore.save({ validateBeforeSave: true });

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "cricket score is not found" });
    }

    return res.status(200).json({
      success: true,
      message: "football score updated successfully",
      data: updatedItem,
    });

  } catch (error) {
    return res.status(500).json({
      message: "something went wrong!",
      success: false
    })
  }
}

export const deleteFootballScore = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const isDeleted = await FootballScore.findByIdAndDelete(id);

    if (!isDeleted) {
      return res.status(401).json({
        message: "try again later",
        success: false
      })
    }

    return res.status(200).json({
      message: "deleted successfully",
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong!",
      success: false
    })
  }
}