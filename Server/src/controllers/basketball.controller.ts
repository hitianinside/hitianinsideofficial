import { Request, Response } from "express";
import BasketballScore from "../models/basketballScoreModel";
import { BasketballScoreType } from "../types/datatypes";
import { toNum, getTeamLogos } from "../utils/handler.utils";

export const getBasketballScore = async (req: Request, res: Response) => {
  try {
    const basketballData = await BasketballScore.find();

    if (!basketballData) {
      return res.status(400).json({
        message: "can't fetch",
        success: true
      });
    }

    return res.status(200).json({
      message: "fetch successfully",
      success: true,
      data: basketballData
    })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong!",
      success: false
    });
  }
}

export const addBasketballScore = async (req: Request, res: Response) => {
  try {
    const { matchType, team1Name, team2Name, team1Score, team2Score, completed }: BasketballScoreType = req.body;

    const { team1Logo, team2Logo } = getTeamLogos(req);

    if (!team1Logo || !team2Logo) {
      return res.status(400).json({
        success: false,
        message: "Both team logos are required."
      });
    }

    const basketball = await BasketballScore.create({
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
      message : "Basketball score saved successfully.",
      success : true,
      id : basketball._id
    })
  } catch (error) {
    return res.status(500).send({
      message: "something went wrong",
      success: false
    })
  }
}

export const deleteBasketballScore = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: "can't delete",
        success: false
      })
    }

    const isDelete = await BasketballScore.findByIdAndDelete(id);

    if (!isDelete) {
      return res.status(400).json({
        message: "not delete",
        success: false
      })
    }

    return res.status(200).json({
      message: "delete successfully",
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong!",
      success: false
    });
  }
}