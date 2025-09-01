"use server";

import {
  avatarSchema,
  baseUserSchema,
  type FormError,
  passwordSchema,
  userSchema,
} from "@/app/_utils/types";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { prisma } from "./prisma";
import { supabase } from "./supabase";

async function isUsernameExist(name: string): Promise<boolean> {
  try {
    const exist = await prisma.user.findFirst({ where: { name } });
    return !!exist;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Cannot check this username whether it is already used or not! Please try again later!"
    );
  }
}

export async function signUpAction(
  prevState: FormError,
  formData: FormData
): Promise<FormError> {
  const rawData = Object.fromEntries(formData.entries());

  const validateData = userSchema.safeParse(rawData);

  if (!validateData.success)
    return { error: true, message: "Validation failed!" };

  const { name, password } = validateData.data;

  if (await isUsernameExist(name))
    return {
      error: true,
      message: "This name is already used! Please try other names",
    };

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await prisma.user.create({
      data: { name, password: hashedPassword, avatar: null },
    });

    await signIn("credentials", {
      redirect: false,
      name,
      password,
    });
  } catch (error) {
    console.error(error);
    // console.error(error.stack);
    return { error: true, message: "Failed to sign up, please try again!" };
  }

  redirect("/main");
}

export async function logInAction(
  prevState: FormError,
  formData: FormData
): Promise<FormError> {
  const rawData = Object.fromEntries(formData.entries());

  const validateData = userSchema.safeParse(rawData);

  if (!validateData.success)
    return { error: true, message: "Validation failed!" };

  const { name, password } = validateData.data;

  try {
    await signIn("credentials", {
      redirect: false,
      name,
      password,
    });
  } catch (error) {
    console.error(error);
    // console.error(error.stack);
    return { error: true, message: "Invalid email or password" };
  }

  redirect("/main");
}

export async function logOutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function resetAvatar(curAvatar) {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  // 2) Authorization
  const userId = Number(session.user?.id);

  // NOTE curAvatar = filePath
  if (curAvatar === null) return { error: false };

  try {
    // 4) Update user avatar
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: null,
      },
    });
  } catch (error) {
    console.error(error);
    // console.error(error.stack);
    // 4) Error Handling
    return { error: true, message: "Avatar could not be reset!" };
  }

  revalidatePath("/main/user");
  return { error: false };
}

export async function updateAvatar(
  prevState: FormError,
  formData: FormData
): Promise<FormError> {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  // 2) Authorization
  // NOTE avatar = image file (not string)
  const rawData = Object.fromEntries(formData.entries());

  const validateData = avatarSchema.safeParse(rawData);

  if (!validateData.success)
    return { error: true, message: "Validation failed!" };

  const { avatar } = validateData.data;

  const userId = Number(session.user?.id);

  // 3) Upload and replace the avatar in supabase
  const fileName = `avatar-${userId}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar, {
      cacheControl: "3600",
      upsert: true, // This replaces existing files with same name
    }); // FIXME

  if (storageError) return { error: true, message: storageError.message };

  // 4) Update user avatar
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: `${process.env.SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  } catch (error) {
    console.error(error);
    // console.error(error.stack);
    // 4) Error Handling
    return { error: true, message: "Avatar could not be updated!" };
  }

  revalidatePath("/main/user");
  return { error: false };
}

export async function updateUsername(
  prevState: FormError,
  formData: FormData
): Promise<FormError> {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  // 2) Authorization
  const rawData = Object.fromEntries(formData.entries());

  const validateData = baseUserSchema.safeParse(rawData);

  if (!validateData.success)
    return { error: true, message: "Validation failed!" };

  const { name } = validateData.data;

  if (await isUsernameExist(name))
    return {
      error: true,
      message: "This name is already used! Please try other names",
    };

  const userId = Number(session.user?.id);

  // 3) Update Data
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    console.error(error);
    // console.error(error.stack);
    // 4) Error Handling
    return { error: true, message: "Username could not be updated!" };
  }

  revalidatePath("/main/user");
  return { error: false };
}

export async function updatePassword(
  prevState: FormError,
  formData: FormData
): Promise<FormError> {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const rawData = Object.fromEntries(formData.entries());

  const validateData = passwordSchema.safeParse(rawData);

  if (!validateData.success)
    return { error: true, message: "Validation failed!" };

  const { password, passwordConfirm } = validateData.data;

  if (password !== passwordConfirm)
    return {
      error: true,
      message: "Password confirm needs to match to the password field!",
    };

  const userId = Number(session.user?.id);
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { error: false };
  } catch (error) {
    console.error(error);
    // console.error(error.stack);
    return {
      error: true,
      message: "Password could not be updated! Please try again",
    };
  }
}
