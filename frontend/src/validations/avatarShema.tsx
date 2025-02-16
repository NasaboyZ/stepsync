import { z } from "zod";

export const avatarSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Die Datei darf nicht größer als 2MB sein",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        ),
      {
        message: "Nur JPEG, JPG und PNG Dateien sind erlaubt",
      }
    ),
});

export type AvatarSchemaType = z.infer<typeof avatarSchema>;
