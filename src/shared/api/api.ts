import { createInstance } from "@/shared/api/api-instance";
import { ModelVersion } from "@/features/model-settings/model/use-models";
import { Style } from "@/features/model-settings/model/use-styles";

type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P
) => any
  ? P
  : never;

export interface ModelDto {
  type: "GENERATE";
  numImages: number;
  width: number;
  height: number;
  style?: string;
  negativePromptUnclip?: string;
  generateParams: {
    query: string;
  };
}

export interface StatusDto {
  status: string;
  images: string[];
}

export const stylesControllerGetList = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<Style[]>(
    {
      url: "https://cdn.fusionbrain.ai/static/styles/api",
      method: "get",
    },
    options
  );
};

export const modelControllerGetModels = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<ModelVersion[]>(
    {
      url: "key/api/v1/models",
      method: "get",
    },
    options
  );
};

export const modelControllerGenerate = (
  data: FormData,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<{ uuid: string }>(
    {
      url: "key/api/v1/text2image/run",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "post",
      data,
    },
    options
  );
};

export const modelControllerCheckGeneration = async (
  uuid: string,
  options?: SecondParameter<typeof createInstance>
): Promise<{
  censored?: boolean;
  images?: string[];
  notFound?: boolean;
}> => {
  try {
    const data = await createInstance<{ images: string[] }>(
      {
        url: `key/api/v1/text2image/status/${uuid}`,
        method: "get",
      },
      options
    );
    if (!data.images) {
      throw new Error();
    }
    return new Promise((res) => res(data));
  } catch (e) {
    if ((e as { response?: { status?: number } }).response?.status === 404) {
      return new Promise((res) => res({ notFound: true }));
    }
    throw e;
  }
};
