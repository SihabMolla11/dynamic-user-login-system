import { Response } from "express";
import LoginDevice from "../modules/loginDevices.model";

const getLoginDevices = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;


    const devices = await LoginDevice.find({
      userId,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json(devices);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Failed to fetch devices",
    });
  }
};


export { getLoginDevices };
