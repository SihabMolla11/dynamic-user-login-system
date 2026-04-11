import { Response } from "express";
import { updateUserAccountService } from "../middlewares/admin.service";

const updateUserAccountController = async (req: any, res: Response) => {
  try {
    const response = await updateUserAccountService(req);

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Failed to update user account",
    });
  }
};

export { updateUserAccountController };
