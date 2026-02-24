"use server";

import { allInformationPages } from "@/app/_features/information/constants";
import {
  AUTH_ERROR_MESSAGE,
  SUCCESS_CREATED_DATA_MESSAGE,
  SUCCESS_DELETED_DATA_MESSAGE,
} from "@/app/_utils/constants";
import { convertToCapitalize, getRawData } from "@/app/_utils/helpers";
import {
  avatarSchema,
  baseUserSchema,
  contactSchema,
  customerSchema,
  documentSchema,
  type FormError,
  passwordSchema,
  planSchema,
  productSchema,
  userSchema,
} from "@/app/_utils/types";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { prisma } from "./prisma";
import { supabase } from "./supabase";

function getCustomerId(customer: string): number {
  return Number(customer.split("-")[0]);
}

async function isUsernameExist(name: string): Promise<boolean> {
  try {
    const exist = await prisma.user.findFirst({ where: { name } });
    return !!exist;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Cannot check this username whether it is already used or not! Please try again later!",
    );
  }
}

async function uploadImage(bucketName, fileName, image) {
  const { error: storageError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, image, {
      cacheControl: "3600",
      upsert: true, // This replaces existing files with same name
    });

  return storageError;
}

export async function signUpAction(
  prevState: FormError,
  formData: FormData,
): Promise<FormError> {
  const rawData = getRawData(formData);

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
  formData: FormData,
): Promise<FormError> {
  const rawData = getRawData(formData);

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
  if (!session) throw new Error(AUTH_ERROR_MESSAGE);

  // 2) Authorization
  const userId = Number(session.user?.id);

  // NOTE curAvatar = filePath
  if (curAvatar === null) return { error: false };

  try {
    // 3) Update user avatar
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
  formData: FormData,
): Promise<FormError> {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error(AUTH_ERROR_MESSAGE);

  // 2) Authorization
  // NOTE avatar = image file (not string)
  const rawData = getRawData(formData);

  const validateData = avatarSchema.safeParse(rawData);

  if (!validateData.success)
    return { error: true, message: "Validation failed!" };

  const { avatar } = validateData.data;

  const userId = Number(session.user?.id);

  // 3) Upload and replace the avatar in supabase
  const fileName = `avatar-${userId}`;

  const storageError = await uploadImage("avatars", fileName, avatar);

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
  formData: FormData,
): Promise<FormError> {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error(AUTH_ERROR_MESSAGE);

  // 2) Authorization
  const rawData = getRawData(formData);

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
  formData: FormData,
): Promise<FormError> {
  const session = await auth();
  if (!session) throw new Error(AUTH_ERROR_MESSAGE);

  const rawData = getRawData(formData);

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

export async function addAndUpdateCustomer(
  prevState: FormError,
  formData: FormData,
): Promise<FormError> {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error(AUTH_ERROR_MESSAGE);

  // 2) Validate data
  const rawData = getRawData(formData);

  const validateData = customerSchema.safeParse(rawData);

  if (!validateData.success)
    return { error: true, message: "Validation failed!" };

  const {
    customerCompany,
    incoterm,
    portOfUnload,
    creditTerm,
    currency,
    address,
    buyerName,
    buyerEmail,
  } = validateData.data;

  // 3) Check item id for edit
  const customerId = Number(formData.get("customerId")) || undefined;

  const data = {
    customerCompany,
    incoterm,
    portOfUnload,
    creditTerm,
    currency,
    address,
    buyerName,
    buyerEmail,
  };

  try {
    // 4) Create or update data
    if (customerId)
      await prisma.customer.update({
        where: {
          id: customerId,
        },
        data,
      });
    else await prisma.customer.create({ data });
  } catch (error) {
    console.error(error);
    // console.error(error.stack);
    // 5) Error Handling
    return {
      error: true,
      message: `Customer could not be ${customerId ? "updated" : "created"}!`,
    };
  }

  // 6) Reload
  revalidatePath(`/main/information/0-${allInformationPages[0]}`);
  return { error: false, message: SUCCESS_CREATED_DATA_MESSAGE };
}

export async function addAndUpdateProduct(
  prevState: FormError,
  formData: FormData,
): Promise<FormError> {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error(AUTH_ERROR_MESSAGE);

  // 2) Validate data
  const rawData = getRawData(formData);

  const validateData = productSchema.safeParse(rawData);

  if (!validateData.success)
    return { error: true, message: "Validation failed!" };

  const {
    image,
    code,
    description,
    currency,
    directExchangeRate,
    price,
    customer,
    HSCode,
  } = validateData.data;

  const fileName = `product-${code}`;
  const customerId = getCustomerId(customer);

  // 3) Convert image file to url
  let storageError = undefined;

  if (image.size !== 0)
    storageError = await uploadImage("products", fileName, image);

  if (storageError) return { error: true, message: storageError.message };

  // 4) Check item id for edit
  const productId = Number(formData.get("productId")) || undefined;

  const data = {
    image: `${process.env.SUPABASE_URL}/storage/v1/object/public/products/${fileName}`,
    code,
    description,
    currency,
    directExchangeRate,
    price,
    customerId,
    HSCode,
  };

  try {
    // 5) Create or update data
    if (productId)
      await prisma.product.update({
        where: { id: productId },
        data,
      });
    else await prisma.product.create({ data });
  } catch (error) {
    console.error(error);
    // console.error("stack", error.stack);
    // 6) Error Handling
    return {
      error: true,
      message: `Product could not be ${productId ? "updated" : "created"}!`,
    };
  }

  // 7) Reload
  revalidatePath(`/main/1-${allInformationPages[1]}`);
  return { error: false, message: SUCCESS_CREATED_DATA_MESSAGE };
}

export async function addAndUpdatePlan(
  prevState: FormError,
  formData: FormData,
): Promise<FormError> {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error(AUTH_ERROR_MESSAGE);

  // 2) Validate Data
  const rawData = getRawData(formData);

  const validateData = planSchema.safeParse({
    ...rawData,
    POReceive: Number(formData.get("POReceive")),
    load: Number(formData.get("load")),
    transitTime: Number(formData.get("transitTime")),
    due: Number(formData.get("due")),
  });

  if (!validateData.success)
    return { error: true, message: "Validation failed!" };

  const { customer, transportationMode, POReceive, load, transitTime, due } =
    validateData.data;

  const customerId = getCustomerId(customer);

  // 3) Check item id for edit
  const planId = Number(formData.get("planId")) || undefined;

  const data = {
    customerId,
    transportationMode,
    POReceive,
    load,
    transitTime,
    due,
  };

  try {
    // 4) Create or update data
    if (planId)
      await prisma.plan.update({
        where: { id: planId },
        data,
      });
    else
      await prisma.plan.create({
        data,
      });
  } catch (error) {
    console.error(error);
    // console.error(error.stack);
    // 4) Error Handling
    return {
      error: true,
      message: `Plan could not be ${planId ? "updated" : "created"}!`,
    };
  }

  // 5) Reload
  revalidatePath(`/main/2-${allInformationPages[2]}`);
  return { error: false, message: SUCCESS_CREATED_DATA_MESSAGE };
}

function convertStringToArray(data, symbol = ", ") {
  return data.split(symbol).map((str) => str.trim());
}

export async function addAndUpdateDocument(
  prevState: FormError,
  formData: FormData,
): Promise<FormError> {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error(AUTH_ERROR_MESSAGE);

  // 2) Validate Data
  const rawData = getRawData(formData);

  const validateData = documentSchema.safeParse(rawData);

  if (!validateData.success)
    return { error: true, message: "Validation failed!" };

  const { customer, courier, email, driver } = validateData.data;

  const customerId = getCustomerId(customer);

  // 3) Check item id for edit
  const documentId = Number(formData.get("documentId")) || undefined;

  const data = {
    customerId,
    courier: convertStringToArray(courier),
    email: convertStringToArray(email),
    driver: convertStringToArray(driver),
  };

  try {
    // 4) Create or update data
    if (typeof documentId === "number")
      await prisma.document.update({
        where: { id: documentId },
        data,
      });
    else await prisma.document.create({ data });
  } catch (error) {
    console.error(error);
    // console.error(error.stack);
    // 5) Error Handling
    return {
      error: true,
      message: `Document could not be ${documentId ? "updated" : "created"}!`,
    };
  }

  // 6) Reload
  revalidatePath(`/main/3-${allInformationPages[3]}`);
  return { error: false, message: SUCCESS_CREATED_DATA_MESSAGE };
}

export async function addAndUpdateShipmentContact(
  prevState: FormError,
  formData: FormData,
): Promise<FormError> {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error(AUTH_ERROR_MESSAGE);

  // 2) Validate Data
  const rawData = getRawData(formData);

  const validateData = contactSchema.safeParse(rawData);

  if (!validateData.success)
    return { error: true, message: "Validation failed!" };

  const {
    transportationMode,
    customer,
    freight,
    shipping,
    bookingName,
    bookingEmail,
    bookingTel,
    blOrAwbName,
    blOrAwbEmail,
    blOrAwbTel,
    exportEntryName,
    exportEntryEmail,
    exportEntryTel,
    formName,
    formEmail,
    formTel,
  } = validateData.data;

  const customerId = getCustomerId(customer);

  // 3) Check item id for edit
  const contactId = Number(formData.get("contactId")) || undefined;

  const data = {
    customerId,
    transportationMode,
    freight,
    shipping,
    booking: {
      name: bookingName,
      email: bookingEmail,
      tel: bookingTel,
    },
    blOrAwb: {
      name: blOrAwbName,
      email: blOrAwbEmail,
      tel: blOrAwbTel,
    },
    exportEntry: {
      name: exportEntryName,
      email: exportEntryEmail,
      tel: exportEntryTel,
    },
    form: {
      name: formName,
      email: formEmail,
      tel: formTel,
    },
  };

  try {
    // 4) Create or update data
    if (contactId)
      await prisma.contact.update({
        where: {
          id: contactId,
        },
        data,
      });
    else
      await prisma.contact.create({
        data,
      });
  } catch (error) {
    console.error(error);
    // console.error(error.stack);
    // 5) Error Handling
    return {
      error: true,
      message: `Contact could not be ${contactId ? "updated" : "created"}!`,
    };
  }

  // 6) Reload
  revalidatePath(`/main/4-${allInformationPages[4]}`);
  return { error: false, message: SUCCESS_CREATED_DATA_MESSAGE };
}

export async function deleteItem(
  modelName: string,
  id: number,
  informationId: string,
) {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error(AUTH_ERROR_MESSAGE);
  // FIXME
  // Check model with typescript
  try {
    await prisma[modelName].delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    // console.error(error.stack);
    // 4) Error Handling
    return {
      error: true,
      message: `${convertToCapitalize(modelName)} detail could not be deleted!`,
    };
  }

  // 5) Reload
  revalidatePath(`/main/information/${informationId}`);
  // NOTE Send to handleDeleteClick
  return { error: false, message: SUCCESS_DELETED_DATA_MESSAGE };
}
