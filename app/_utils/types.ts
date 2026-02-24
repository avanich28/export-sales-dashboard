// import { StaticImageData } from "next/image";
import { z } from "zod";
import { prisma } from "../_lib/prisma";

// FIXME
type PrismaModel = {
  [key: string]: {
    delete: (args: any) => Promise<any>;
  };
};

export const dynamicPrisma = prisma as unknown as PrismaModel;

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
        },
      ),
  ]),
});

export const passwordSchema = z.object({
  password: z.string(),
  passwordConfirm: z.string(),
});

// FIXME Add trim
export const customerSchema = z.object({
  customerCompany: z.string(),
  incoterm: z.string(),
  portOfUnload: z.string(),
  creditTerm: z.string(),
  currency: z.string(),
  address: z.string(),
  buyerName: z.string(),
  buyerEmail: z.email(),
});

export const productSchema = z.object({
  image: z.instanceof(File),
  code: z.string(),
  description: z.string(),
  currency: z.string(),
  directExchangeRate: z.string(),
  price: z.string(),
  customer: z.string(),
  HSCode: z.string(),
});

export const planSchema = z.object({
  customer: z.string(),
  transportationMode: z.string(),
  POReceive: z.number(),
  load: z.number(),
  transitTime: z.number(),
  due: z.number(),
});

export const documentSchema = z.object({
  customer: z.string(),
  courier: z.string(),
  email: z.string(),
  driver: z.string(),
});

export const contactSchema = z.object({
  transportationMode: z.string(),
  customer: z.string(),
  freight: z.string(),
  shipping: z.string(),
  bookingName: z.string(),
  bookingEmail: z.string(),
  bookingTel: z.string(),
  blOrAwbName: z.string(),
  blOrAwbEmail: z.string(),
  blOrAwbTel: z.string(),
  exportEntryName: z.string(),
  exportEntryEmail: z.string(),
  exportEntryTel: z.string(),
  formName: z.string(),
  formEmail: z.string(),
  formTel: z.string(),
});
