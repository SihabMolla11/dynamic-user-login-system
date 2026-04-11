import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import Session from "../modules/sesson.model";

export const authGuard = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const session = await Session.findOne({
      token,
      isActive: true,
    });

    if (!session) {

        res.clearCookie("accessToken", {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        });


      return res.status(401).json({
        message: "Session expired or logged out",
        logout:true,
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
