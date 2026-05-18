import { Response, Request, Router } from "express";
import User from "../../models/authModel";

const userPatchRouter = Router();

userPatchRouter.patch("/update", async (req : Request, res : Response) => {
  try {
    const {name, department, year, email} = req.body;
    
    if(!email){
      return res.status(400).json({
        message : "user not found!",
        success : false
      })
    }
    
    await User.findOneAndUpdate({email}, {
      department,
      year,
      name
    });

    return res.status(200).json({
      message : "updated successfully!",
      success : true
    });
  } catch (error) {
    return res.status(500).json({
      message : "Something went wrong!",
      success : false
    })
  }
});

export default userPatchRouter;