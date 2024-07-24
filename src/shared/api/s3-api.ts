"use server";

import { Client as MinioClient, ClientOptions } from "minio";

const minioConfig: ClientOptions = {
  endPoint: process.env.NEXT_PUBLIC_S3_URL ?? "",
  region: process.env.NEXT_PUBLIC_S3_UPLOAD_REGION ?? "",
  accessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY ?? "",
  secretKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET ?? "",
  useSSL: true,
};
const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET ?? "";

const minioClient = new MinioClient(minioConfig);

export const uploadBase64ToS3 = async (
  base64Image: string,
  imageName: string
) => {
  const buffer = Buffer.from(base64Image, "base64");

  try {
    await minioClient.putObject(
      BUCKET_NAME,
      `${process.env.NEXT_PUBLIC_S3_UPLOAD_FOLDER ?? ""}/${imageName}`,
      buffer
    );
    return `${process.env.NEXT_PUBLIC_S3_FULL_URL}/${
      process.env.NEXT_PUBLIC_S3_UPLOAD_FOLDER ?? ""
    }/${imageName}`;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
