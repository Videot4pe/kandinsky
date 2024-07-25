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
