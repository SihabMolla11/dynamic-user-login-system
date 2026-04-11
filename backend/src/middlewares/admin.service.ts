import LoginDevice from "../modules/loginDevices.model";
import Session from "../modules/sesson.model";


 const updateUserAccountService = async (req: any) => {
  const { deviceId, userId, type } = req.body;

  if (type === "DEVICE") {
    await Session.updateMany({ deviceId }, { isActive: false });

    await LoginDevice.updateOne({ _id: deviceId }, { isActive: false });

    return {
      message: "Device logged out successfully",
    };
  }

  if (type === "ALL") {
    await Session.updateMany({ userId }, { isActive: false });

    await LoginDevice.updateMany({ userId }, { isActive: false });

    return {
      message: "User logged out from all devices",
    };
  }

  throw new Error("Invalid type");
};


export { updateUserAccountService };