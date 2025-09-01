import { StaticImageData } from "next/image";
import { z } from "zod";

export type ErrorProps = {
  error: Error;
  reset: () => void;
};

export type FormError = {
  error: boolean;
  message?: string | undefined;
};

export const baseUserSchema = z.object({
  name: z.string().trim(),
});

export type Username = z.infer<typeof baseUserSchema>;

export const userSchema = baseUserSchema.extend({
  password: z.string(),
});

export const userDataSchema = baseUserSchema.extend({
  avatar: z.union([z.null(), z.string()]),
});

export const avatarSchema = z.object({
  avatar: z.union([
    z.null(),
    z
      .file()
      .refine(
        (file) =>
          [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
            "image/svg+xml",
          ].includes(file.type),
        {
          message: "Only JPEG, PNG, GIF, WebP, and SVG images are allowed",
        }
      ),
  ]),
});

export const passwordSchema = z.object({
  password: z.string(),
  passwordConfirm: z.string(),
});
