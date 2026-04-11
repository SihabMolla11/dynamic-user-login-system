import bcrypt from "bcryptjs";

import { generateToken } from "../utils/jwt";
import { Request } from "express";
import { UAParser } from "ua-parser-js";
import User from "../modules/user.mode";
import LoginDevice from "../modules/loginDevices.model";
import Session from "../modules/sesson.model";

 const registrationService = async (req: Request) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phoneNumber,
  });

  const parser = new UAParser(req.headers["user-agent"]);
  const ua = parser.getResult();

  const device = await LoginDevice.create({
    userId: user._id,
    deviceName: ua.device.model || "Unknown Device",
    browser: ua.browser.name || "Unknown",
    os: ua.os.name || "Unknown",
    ip: req.ip,
  });

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  await Session.create({
    userId: user._id,
    token,
    deviceId: device._id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    message: "User registered successfully",
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };
};


const loginService = async (req: Request) => {
  const { email, password } = req.body;

  // 1️⃣ user check
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.isActive) {
    throw new Error("User is disabled");
  }

  // 2️⃣ password verify
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 3️⃣ device detect
  const parser = new UAParser(req.headers["user-agent"]);
  const ua = parser.getResult();

  const device = await LoginDevice.create({
    userId: user._id,
    deviceName: ua.device.model || "Unknown Device",
    browser: ua.browser.name || "Unknown",
    os: ua.os.name || "Unknown",
    ip: req.ip,
  });

  // 4️⃣ JWT generate
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  // 5️⃣ session create
  await Session.create({
    userId: user._id,
    token,
    deviceId: device._id,
    isActive: true,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };
};




export { registrationService, loginService };