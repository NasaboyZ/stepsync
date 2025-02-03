import { UploadResponse } from "@/utils/api";

export const uploadAvatar = async (
  file: File,
  token: string
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload fehlgeschlagen: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Avatar-Upload:", error);
    throw error;
  }
};

export const deleteAvatar = async (
  imageId: number,
  token: string
): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${imageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Löschen fehlgeschlagen: ${response.status}`);
    }
  } catch (error) {
    console.error("Fehler beim Löschen des Avatars:", error);
    throw error;
  }
};
