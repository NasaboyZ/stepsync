import { dataFetch } from "@/utils/data-fetch";

export const uploadAvatar = async (
  file: File,
  accessToken: string
): Promise<{ url: string; id: number }> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Fehler beim Hochladen des Avatars");
  }

  return response.json();
};

export const deleteAvatar = async (
  userId: string,
  accessToken: string
): Promise<void> => {
  const response = await dataFetch(
    `/api/delete-avatar/${userId}`,
    accessToken,
    "DELETE"
  );

  if (!response.ok) {
    throw new Error("Fehler beim Löschen des Avatars");
  }
};
