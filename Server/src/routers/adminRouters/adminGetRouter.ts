import { Router } from "express";
import { getCricketScore } from "../../controllers/cricket.controller";
import { getFootballScore } from "../../controllers/football.controller";
import { getBasketballScore } from "../../controllers/basketball.controller";
import { getAlmanac, getArtwork, getContactFormData, getEvents, getHomepageElement, getPhotography, getPoem } from "../../controllers/user.controller";
import { getVolleyballScore } from "../../controllers/volleyball.controller";
import { getBlogForAdmin } from "../../controllers/blog.controller";

const adminGetRouter = Router();

// EVENTS
adminGetRouter.get("/event", getEvents);

// ALMANAC
adminGetRouter.get("/almanac", getAlmanac);

// HOMEPAGE ELEMENTS
adminGetRouter.get("/homepage-element", getHomepageElement);

// CRICKET SCORES
adminGetRouter.get("/cricket-scores", getCricketScore);

// FOOTBALL SCORES
adminGetRouter.get("/football-scores", getFootballScore);

// VOLLEYBALL SCORES
adminGetRouter.get("/volleyball-scores", getVolleyballScore);

// BASKETBALL SCORES
adminGetRouter.get("/basketball-scores", getBasketballScore);

// CONTACT MESSAGES
adminGetRouter.get("/contact-form", getContactFormData);

// PHOTOS
adminGetRouter.get("/photography", getPhotography);

// POEMS
adminGetRouter.get("/poem", getPoem);

// ARTWORKS
adminGetRouter.get("/artwork", getArtwork);

//BLOGS
adminGetRouter.get("/blogs", getBlogForAdmin);

export default adminGetRouter;