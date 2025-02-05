import { useSnackbarStore } from "@/store/snackbarStore";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const uploadAvatar = async (
  file: File,
  token: string,
  router: AppRouterInstance
): Promise<void> => {
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
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Upload fehlgeschlagen: ${response.status}`
      );
    }

    useSnackbarStore
      .getState()
      .openSnackbar("Avatar wurde erfolgreich hochgeladen", "success");
    router.refresh();
  } catch (error) {
    useSnackbarStore
      .getState()
      .openSnackbar("Fehler beim Hochladen des Avatars", "error");
    throw error;
  }
};

export const deleteAvatar = async (
  id: number,
  token: string,
  router: AppRouterInstance
): Promise<void> => {
  try {
    const response = await fetch(`/api/delete-upload/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Löschen fehlgeschlagen: ${response.status}`);
    }

    useSnackbarStore
      .getState()
      .openSnackbar("Avatar wurde erfolgreich gelöscht", "success");
    router.refresh();
  } catch (error) {
    useSnackbarStore
      .getState()
      .openSnackbar("Fehler beim Löschen des Avatars", "error");
    throw error;
  }
};
