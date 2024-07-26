import {
  useUpdateMessageMutation,
  useUpdateMessageQuery,
} from "@/entities/message-area/queries";
import { IMessage } from "@/entities/message-area/types";

const handleQuerySuccess = async (
  message: IMessage,
  data: any,
  update: Function
) => {
  const { images, censored, notFound } = data;

  if (images && !message.image) {
    message.hasError = false;
    message.censored = censored;
    await update(message, images[0]);
  }

  if (notFound && !message.image) {
    message.notFound = true;
    await update(message);
  }
};

const handleQueryError = async (
  message: IMessage,
  error: any,
  update: Function
) => {
  if (error?.response?.status === 404) {
    message.notFound = true;
    await update(message);
  }
};

export const useMessageStatus = (message: IMessage) => {
  const { data, error, isLoading, refetch } = useUpdateMessageQuery(
    message.uuid,
    !message.image && !message.notFound
  );
  const updateMessage = useUpdateMessageMutation(message.uuid);

  const update = async (message: IMessage, image?: string) => {
    if (image && !message.image && !updateMessage.isPending) {
      message.image = `data:image/png;base64,${image}`;
    }
    await updateMessage.mutateAsync(message);
  };

  if (data) {
    handleQuerySuccess(message, data, update);
  }

  if (error) {
    handleQueryError(message, error, update);
  }

  return { isLoading, refetch };
};

// Запрос на создание -> OK

// Записываем в БД message { uuid } +

// Запрос статуса (до тех пор пока != 'Done') -> 1. Закрыли вкладку 2. Перешли на соседнюю вкладку

// Сохранение картинки в s3 => обновление сообщения
