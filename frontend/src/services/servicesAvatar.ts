import { useSnackbarStore } from "@/store/snackbarStore";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AvatarResponse {
  message: string;
  path: string;
}

export const uploadAvatar = async (
  file: File,
  token: string,
  router: AppRouterInstance
): Promise<AvatarResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/create-upload/avatar", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Upload fehlgeschlagen: ${response.status}`
      );
    }

    const data = await response.json();
    useSnackbarStore
      .getState()
      .showSnackbar("Avatar wurde erfolgreich hochgeladen", "success");
    router.refresh();
    return data;
  } catch (error) {
    useSnackbarStore
      .getState()
      .showSnackbar("Fehler beim Hochladen des Avatars", "error");
    throw error;
  }
};

export const deleteAvatar = async (
  token: string,
  router: AppRouterInstance
): Promise<void> => {
  try {
    const response = await fetch("/api/delete-upload/avatar", {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Löschen fehlgeschlagen: ${response.status}`);
    }

    useSnackbarStore
      .getState()
      .showSnackbar("Avatar wurde erfolgreich gelöscht", "success");
    router.refresh();
  } catch (error) {
    useSnackbarStore
      .getState()
      .showSnackbar("Fehler beim Löschen des Avatars", "error");
    throw error;
  }
};
