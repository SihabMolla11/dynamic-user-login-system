import { Request, Response } from "express";
import { loginService, registrationService } from "../services/auth.service";

const registrationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const {token, user} = await registrationService(req);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });


    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    console.log("registration error ===>", error.message);

    res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};




const loginController = async (req: Request, res: Response) => {
  try {
    const response = await loginService(req);

    const { token, user } = response;

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error: any) {
    console.log("login error ===>", error.message);

    res.status(400).json({
      error: error.message || "Login failed",
    });
  }
};




export { registrationController, loginController };
