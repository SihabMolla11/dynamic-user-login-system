import mongoose, { Document } from "mongoose";

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  isActive: boolean;
  deviceId: mongoose.Types.ObjectId;
  expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<ISession>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoginDevice",
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true },
);
const Session = mongoose.model<ISession>("Session", sessionSchema);

export default Session;
