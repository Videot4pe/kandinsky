import bcryptjs from "bcryptjs";
import { randomBytes } from "crypto";

export const generatePasswordHash = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

export const generateEmailVerificationToken = () => {
  return randomBytes(32).toString("hex");
};
