import jwt from "jsonwebtoken";

interface IJwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
