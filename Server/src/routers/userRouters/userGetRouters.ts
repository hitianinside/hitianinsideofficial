import { Router, Response, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/authModel";
import EventsList from "../../models/eventsListModel";
import HomepageElementList from "../../models/homepageElementListModel";
import AlmanacList from "../../models/almanacListModel";
import VolleyballScore from "../../models/volleyballScoreModel";
import BasketballScore from "../../models/basketballScoreModel";
import { getCricketScore } from "../../controllers/cricket.controller";
import { getFootballScore } from "../../controllers/football.controller";
import { getBlog, getBlogById } from "../../controllers/blog.controller";

const userGetRouter = Router();

userGetRouter.get("/health", (req: Request, res: Response) => {
  res.send("Hello, Server is working!!");
})

//CHECK THAT THE USER IS ADMIN OR NOT
userGetRouter.get("/isAdmin", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ isAdmin: user.admin });
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
});

//Get user information
userGetRouter.get("/me", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
    const userInfo = await User.findOne({ email: decoded.email }, "-admin");

    if (!userInfo) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      userData: userInfo,
      success: true,
      message: "Load all resources!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Invalid or expired token",
      success: false
    });
  }
});

//Get all events
userGetRouter.get("/events", async (req: Request, res: Response) => {
  try {
    const data = await EventsList.find().sort({ year: -1 });
    res.status(200).json({
      success: true,
      message: "Load all resources!",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server down! Try again later"
    });
  }
});

//Get all almanac
userGetRouter.get("/almanacs", async (req: Request, res: Response) => {
  try {
    const data = await AlmanacList.find();
    res.status(200).json({
      success: true,
      message: "Load all resources!",
      data
    });
  } catch (error) {
    res.status(500).json({
      message: "server down! try again later",
      success: false
    })
  }
})

//get all homepage elements
userGetRouter.get("/homepage-elements", async (req: Request, res: Response) => {
  try {
    const data = await HomepageElementList.find();
    res.status(200).json({
      success: true,
      message: "Load all resources!",
      data
    });
  } catch (error) {
    res.status(500).json({
      message: "server down! try again later",
      success: false
    })
  }
})

//get all cricket scores
userGetRouter.get("/cricket-scores", getCricketScore);

//get all football scores
userGetRouter.get("/football-scores", getFootballScore);

//get all vollyball scores
userGetRouter.get("/volleyball-scores", async (req: Request, res: Response) => {
  try {
    const data = await VolleyballScore.find();
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
})

//get all basketball scores
userGetRouter.get("/basketball-scores", async (req: Request, res: Response) => {
  try {
    const data = await BasketballScore.find();
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
})

//get all blogs
userGetRouter.get("/blogs", getBlog);

//get blog by `${id}`
userGetRouter.get("/blogs/:id", getBlogById);

export default userGetRouter;