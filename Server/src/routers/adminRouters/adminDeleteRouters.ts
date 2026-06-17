import { Router, Response, Request } from "express";
import mongoose from "mongoose";
import EventsList from "../../models/eventsListModel";
import AlmanacList from "../../models/almanacListModel";
import VolleyballScore from "../../models/volleyballScoreModel";
import BasketballScore from "../../models/basketballScoreModel";
import HomepageElementList from "../../models/homepageElementListModel";
import { deleteCricketScore } from "../../controllers/cricket.controller";
import { deleteFootballScore } from "../../controllers/football.controller";
import { deleteBasketballScore } from "../../controllers/basketball.controller";
import { deleteBlog } from "../../controllers/blog.controller";

const adminDeleteRouter = Router();

// Utility function to safely delete by ID
const deleteById = async (Model: mongoose.Model<any>, id: string, itemName: string, res: Response) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid or missing ID" });
    }

    const deletedItem = await Model.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ 
        message: `${itemName} not found` 
      });
    }

    return res.status(200).json({ 
      message: `${itemName} deleted successfully` 
    });
  } catch (error : any) {
    // console.error(`Error deleting ${itemName}:`, error);
    return res.status(500).json({ 
      message: `Failed to delete ${itemName}`, error: error.message 
    });
  }
};

// Delete Event
adminDeleteRouter.delete("/event", async (req: Request, res: Response) => {
  const { id } = req.query;
  await deleteById(EventsList, id as string, "Event", res);
});

// Delete Almanac
adminDeleteRouter.delete("/almanac", async (req: Request, res: Response) => {
  const { id } = req.query;
  await deleteById(AlmanacList, id as string, "Almanac", res);
});

// Delete Homepage Element
adminDeleteRouter.delete("/homepage-element", async (req: Request, res: Response) => {
  const { id } = req.query;
  await deleteById(HomepageElementList, id as string, "Homepage element", res);
});

// Delete Cricket Score
adminDeleteRouter.delete("/cricket-scores", deleteCricketScore);

// Delete Football Score
adminDeleteRouter.delete("/football-scores", deleteFootballScore);

// Delete Volleyball Score
adminDeleteRouter.delete("/volleyball-scores", async (req: Request, res: Response) => {
  const { id } = req.query;
  await deleteById(VolleyballScore, id as string, "Volleyball score", res);
});

// Delete Basketball Score
adminDeleteRouter.delete("/basketball-scores", deleteBasketballScore);

// Delete Blog 
adminDeleteRouter.delete("/delete-blog/:id", deleteBlog);

export default adminDeleteRouter;