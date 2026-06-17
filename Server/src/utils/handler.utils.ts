
import { Response, Request } from "express";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: Record<string, Express.Multer.File[]>;
}


//get team logos from req.files
export const getTeamLogos = (req: Request) => {
  const files = (req as MulterRequest).files;
  const team1Logo = files?.team1Logo?.[0]?.path;
  const team2Logo = files?.team2Logo?.[0]?.path;
  const team1PublicId = files?.team1Logo?.[0]?.filename;
  const team2PublicId = files?.team2Logo?.[0]?.filename;
  return { team1Logo, team2Logo, team1PublicId, team2PublicId };
};

// convert to number safely
export const toNum = (val: any) => {
  const num = Number(val);
  return isNaN(num) ? 0 : num;
};

// send unified errors
export const sendError = (res: Response, msg: string, error?: any) => {
  console.error("Admin Post Error:", error?.message || error);
  return res
    .status(500)
    .json({ success: false, message: msg, error: error?.message || "Unknown error" });
};

// send unified success response
export const sendSuccess = (res: Response, message: string, data?: any) => {
  return res.status(201).json({ success: true, message, data });
};
