import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const apiInstance = axios.create({
  baseURL: "https://api-key.fusionbrain.ai/",
  headers: {
    'X-Key': `Key ${process.env.NEXT_PUBLIC_API_KEY}`,
    'X-Secret': `Secret ${process.env.NEXT_PUBLIC_SECRET_KEY}`,
  },
});

export const createInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return apiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
};

export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;
