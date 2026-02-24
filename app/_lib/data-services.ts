"use server";

import {
  contactSchema,
  customerSchema,
  documentSchema,
  planSchema,
  userDataSchema,
} from "@/app/_utils/types";
import z from "zod";
import { allInformationPages } from "../_features/information/constants";
import { convertToCapitalize, getParamsWithoutId } from "../_utils/helpers";
import { auth } from "./auth";
import { prisma } from "./prisma";

const informationSchema = {
  plan: planSchema,
  document: documentSchema.extend({
    customer: z.object({ customerCompany: z.string() }),
    courier: z.array(z.string()),
    email: z.array(z.string()),
    driver: z.array(z.string()),
  }),
  contact: contactSchema.extend({
    customer: z.object({ customerCompany: z.string() }),
    booking: z.object({ tel: z.string(), name: z.string(), email: z.string() }),
    blOrAwb: z.object({ tel: z.string(), name: z.string(), email: z.string() }),
    exportEntry: z.object({
      tel: z.string(),
      name: z.string(),
      email: z.string(),
    }),
    form: z.object({ tel: z.string(), name: z.string(), email: z.string() }),
  }),
};

export async function getUserData() {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const userId = Number(session.user?.id);

  try {
    const data = await prisma.user.findFirst({
      where: { id: userId },
      select: { name: true, avatar: true },
    });

    // NOTE parse return data | safeParse return { success: true, data }
    return userDataSchema.parse(data);
  } catch (error) {
    // console.error(error);
    throw new Error("User data could not be loaded!");
  }
}

// FIXME Check handling empty obj

export async function getAllCustomers(isSelect = false) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  try {
    const data = await prisma.customer.findMany();

    const validateData = z
      .array(customerSchema.extend({ id: z.number() }))
      .safeParse(data);

    if (!validateData.success)
      throw new Error("Customer data validation failed!");

    const customers = validateData.data;

    return isSelect
      ? customers.map(({ id, customerCompany }) => `${id}-${customerCompany}`)
      : customers;
  } catch (error) {
    // console.error(error);
    throw new Error("Customer data could not be loaded!");
  }
}

export async function getInformationData(informationId: string) {
  const prop = getParamsWithoutId(informationId);

  try {
    // NOTE For customer page
    if (prop.includes(allInformationPages[0])) {
      return await getAllCustomers();
    } else if (prop === allInformationPages[1]) {
      // NOTE For product page
      const data = await prisma.product.findMany({
        include: {
          customer: {
            select: {
              customerCompany: true,
            },
          },
        },
      });

      // FIXME ทำไม่ได้
      // const validateData = z
      //   .array(
      //     productSchema.extend({
      //       id: z.number(),
      //       // image: z.string(),
      //     }),
      //   )
      //   .safeParse(data);

      // if (!validateData.success)
      //   throw new Error("Product data validation failed!");

      // NOTE Error: Server component can only pass plain objects to Client Components. Decimal objects are not supported.
      return data.map((product) => ({
        ...product,
        directExchangeRate: Number(product.directExchangeRate),
        price: Number(product.price),
      }));
    } else {
      // FIXME Check prop with typescript
      const data = await prisma[prop].findMany({
        include: {
          customer: {
            select: {
              customerCompany: true,
            },
          },
        },
      });

      // NOTE [] is also validated as success
      // FIXME Cannot validate json with zod?
      // const validateData = z
      //   .array(informationSchema[prop].extend({ id: z.number() }))
      //   .safeParse(data);

      // console.log(validateData);

      // if (!validateData.success)
      //   throw new Error(`${convertToCapitalize(prop)} data validation failed!`);

      return data;
    }
  } catch (error) {
    // console.error(error);
    throw new Error(`${convertToCapitalize(prop)} data could not be loaded!`);
  }
}
