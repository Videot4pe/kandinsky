export type IMessage = {
  uuid: string;
  text: string;
  userId?: string | null;
  isPending?: boolean;
  censored?: boolean;
  hasError?: boolean;
  notFound?: boolean;
  createdAt?: string | Date;
  image?: string;

  width?: number;
  height?: number;
  style?: string;
  negativePrompt?: string;
};

export type MessageInputRequest = {
  type: string;
  numImages: number;
  width: number;
  height: number;
  style: string;
  negativePromptUnclip: string;
  generateParams: {
    query: string;
  };
};
