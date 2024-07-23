"use server";

import { Client as MinioClient } from "minio";

const minioConfig = {
  endPoint: process.env.NEXT_PUBLIC_S3_URL,
  region: process.env.NEXT_PUBLIC_S3_UPLOAD_REGION,
  bucketName: process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET,
  accessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY,
  secretKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET,
  useSSL: true,
};
const bucketName = process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET;

const minioClient = new MinioClient(minioConfig);

export const uploadBase64ToS3 = async (
  base64Image: string,
  imageName: string
) => {
  const buffer = Buffer.from(base64Image, "base64");

  try {
    await minioClient.putObject(bucketName, imageName, buffer);
    return `${process.env.NEXT_PUBLIC_S3_FULL_URL}/${imageName}`;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
