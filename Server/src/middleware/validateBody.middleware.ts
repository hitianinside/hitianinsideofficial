import { Response, Request, NextFunction } from "express";

// Middleware: Validate body fields
export const validateBody = (fields: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const missing = fields.filter((f) => !req.body[f]);
  if (missing.length > 0) {
    return res
      .status(400)
      .json({ success: false, message: `Missing fields: ${missing.join(", ")}` });
  }
  next();
};
