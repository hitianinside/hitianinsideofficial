import { Router, Request, Response } from "express";
import { updateCricketScore } from "../../controllers/cricket.controller";
import { updateFootballDetails } from "../../controllers/football.controller";
import { updateEvent } from "../../controllers/user.controller";
import { updateBlog } from "../../controllers/blog.controller";

const adminPatchRouter = Router();

// Update Event
adminPatchRouter.patch("/event", updateEvent);

// Update Almanac
adminPatchRouter.patch("/almanac", updateEvent);

// Update Cricket Score
adminPatchRouter.patch("/cricket-scores", updateCricketScore);

// Update Football Score
adminPatchRouter.patch("/football-scores", updateFootballDetails);

//Update Blog info
adminPatchRouter.patch("/update-blog/:id", updateBlog);

export default adminPatchRouter;