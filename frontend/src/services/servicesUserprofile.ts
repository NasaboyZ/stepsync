import { dataFetch } from "@/utils/data-fetch";
import {
  UpdateUserProfileData,
  UserProfile,
} from "@/types/interfaces/userProfile";

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

export const updateUserProfile = async (
  userData: UpdateUserProfileData,
  accessToken: string
): Promise<UserProfile> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      height: userData.height ? Number(userData.height) : undefined,
      weight: userData.weight ? Number(userData.weight) : undefined,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Fehler beim Aktualisieren des Benutzerprofils: ${
        errorData.message || response.statusText
      }`
    );
  }

  return response.json();
};
