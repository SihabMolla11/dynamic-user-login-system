import { Router } from "express";
import { loginController, registrationController } from "../controllers/auth.controller";
import { getLoginDevices } from "../controllers/dashboard.controller";
import { authGuard } from "../middlewares/auth.middleware";
import { generateCertificateTest, updateUserAccountController } from "../controllers/admin.controller";

const appRoutes = Router();

appRoutes.get("/", (req, res) => {
  res.send("JOI BANGLAR HAT!");
});

appRoutes.post("/register", registrationController);
appRoutes.post("/login", loginController);
appRoutes.get("/getLoginDivices", authGuard, getLoginDevices);

appRoutes.patch("/updateLoginDivice", updateUserAccountController);


appRoutes.get("/generate-certificate", generateCertificateTest);

export default appRoutes;
