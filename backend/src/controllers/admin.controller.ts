import { Response } from "express";
import {
  generateCertificateTestService,
  updateUserAccountService,
} from "../middlewares/admin.service";

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

const generateCertificateTest = async (req: any, res: Response) => {
  try {
    const now = new Date();


    const response = await generateCertificateTestService({
      certificate_uuId: "certificate_id",
      issue_date: now.toLocaleDateString(),
      batch_number: "joi banglar batch 5",
      name: "Sihab Uddin Molla",
      course_radiation: "Course radiation",
      course_title: "joi bangla howar course",
      instructor_title: "Bangla instructor",
      instructor_name: "Sihab",
      course_type: "RECORDED",
    });

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Failed to update user account",
    });
  }
};

export { generateCertificateTest, updateUserAccountController };
