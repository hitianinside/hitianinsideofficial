import { Router } from "express";
import { validateBody } from "../../middleware/validateBody.middleware";
import upload from "../../utils/multerCloudinaryConfig";
import { addCricketScore } from "../../controllers/cricket.controller";
import { addFootballScore } from "../../controllers/football.controller";
import { addBasketballScore } from "../../controllers/basketball.controller";
import { addAlmanac, addEvent, addHomepageBanner } from "../../controllers/user.controller";
import { addVolleyballScore } from "../../controllers/volleyball.controller";
import { addBlog } from "../../controllers/blog.controller";

const adminPostRouter = Router();

//ADD EVENTS
adminPostRouter.post("/event", validateBody(["instaURL", "eventName", "year", "date"]), addEvent);

//ADD ALMANAC ENTRY
adminPostRouter.post("/almanac", upload.single("file"), addAlmanac);

//ADD HOMEPAGE ELEMENT
adminPostRouter.post("/homepage-element", upload.single("eventPoster"), addHomepageBanner);

// ADD CRICKET SCORE
adminPostRouter.post("/cricket-scores", upload.fields([{ name: "team1Logo", maxCount: 1 }, { name: "team2Logo", maxCount: 1 }]), addCricketScore);

// ADD FOOTBALL SCORE
adminPostRouter.post("/football-scores", upload.fields([{ name: "team1Logo", maxCount: 1 }, { name: "team2Logo", maxCount: 1 },]), addFootballScore);

//ADD VOLLEYBALL SCORE
adminPostRouter.post("/volleyball-scores", upload.fields([{ name: "team1Logo", maxCount: 1 }, { name: "team2Logo", maxCount: 1 }]), addVolleyballScore);

//ADD BASKETBALL SCORE
adminPostRouter.post("/basketball-scores", upload.fields([{ name: "team1Logo", maxCount: 1 }, { name: "team2Logo", maxCount: 1 }]), addBasketballScore);

adminPostRouter.post("/add-blog", addBlog);

export default adminPostRouter;