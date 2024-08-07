"use server";

import axios from "axios";
import { IEmailMessage } from "@/shared/model/email-message";

export const sendEmail = async (message: IEmailMessage) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-mail`, {
    message,
    apiKey: process.env.NEXT_PUBLIC_MAIL_API_KEY,
  });
};
