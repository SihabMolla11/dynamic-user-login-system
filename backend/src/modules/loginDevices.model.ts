import mongoose, { Document } from "mongoose";

export interface ILoginDevice extends Document {
  userId: mongoose.Types.ObjectId;
  deviceName: string;
  browser: string;
  os: string;
  ip: string;
  isActive: boolean;
  lastUsedAt: Date;
}

const loginDeviceSchema = new mongoose.Schema<ILoginDevice>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deviceName: String,
    browser: String,
    os: String,
    ip: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    lastUsedAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true },
);

const LoginDevice = mongoose.model<ILoginDevice>("LoginDevice", loginDeviceSchema);

export default LoginDevice;