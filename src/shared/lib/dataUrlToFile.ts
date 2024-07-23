"use client";

export const base64ToFile = async (base64String, fileName) => {
  try {
    // Разделяем строку base64 на метаданные и реальные данные
    const parts = base64String.split(",");
    const mime = parts[0].match(/:(.*?);/)[1];
    const data = parts[1];

    // Декодируем base64 строку
    const byteString = atob(data);
    const byteNumbers = new Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }

    // Преобразуем массив байтов в объект Blob
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mime });

    // Создаем объект File
    return new File([blob], fileName, { type: mime });
  } catch (error) {
    console.error("Error converting base64 to file:", error);
    return null;
  }
};
