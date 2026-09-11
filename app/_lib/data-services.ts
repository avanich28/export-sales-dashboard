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
import {
  defaultOrderStatus,
  defaultSalesSorts,
} from "../_features/sales/constants";
import { months, years } from "../_utils/constants";
import {
  convertToCapitalize,
  getCustomerId,
  getParamsWithoutId,
  monthAbbrToNumber,
} from "../_utils/helpers";
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
      ? customers.map(
          ({ id, customerCompany }) =>
            `${id}-${customerCompany.toLowerCase().replace(" ", "-")}`,
        )
      : customers;
  } catch (error) {
    // console.error(error);
    throw new Error("Customer data could not be loaded!");
  }
}

export async function getAllCustomerPortOfUnloads() {
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

    return customers.map(({ id, portOfUnload }) => ({
      id,
      portOfUnload,
    }));
  } catch (error) {
    // console.error(error);
    throw new Error("Customer's port of unloads could not be loaded!");
  }
}

export async function getPurchaseOrder(id) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  try {
    const data = await prisma.purchaseOrder.findFirst({
      where: { id: Number(id) },
      include: {
        customer: {
          select: {
            id: true,
            customerCompany: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    // console.error(error);
    throw new Error("Purchase order could not be loaded!");
  }
}

export async function getAllPurchaseOrders(
  sort = defaultSalesSorts[0], // latest-updated
  status = defaultOrderStatus[0], // all
  customer = "all-customers",
  month = months[0], // all-months
  year = Number(years[1]),
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  let where: any = {};
  if (status !== defaultOrderStatus[0]) where.status = status;
  if (customer !== "all-customers") where.customerId = getCustomerId(customer);

  where.loading = {};

  const startDate =
    month === months[0]
      ? new Date(year, 0, 1)
      : new Date(year, monthAbbrToNumber(month), 1);
  const endDate =
    month === months[0]
      ? new Date(year, 11, 1)
      : new Date(year, monthAbbrToNumber(month) + 1, 1);

  where.loading.gt = startDate;
  where.loading.lte = endDate;

  const sortStr = sort.split("-");
  const order =
    sortStr[0] === "latest" || sortStr[0] === "farthest" ? "desc" : "asc";

  let orderBy: any = {};
  if (sortStr[1] === "updated") orderBy = { updatedAt: order };
  else if (sortStr[1] === "loading") orderBy = { loading: order };

  try {
    const data = await prisma.purchaseOrder.findMany({
      include: {
        customer: {
          select: {
            customerCompany: true,
          },
        },
      },
      where: where,
      orderBy: orderBy,
    });
    return data;
  } catch (error) {
    // console.error(error);
    throw new Error("Purchase order data could not be loaded!");
  }
}

export async function getInformationData(informationId: string, urlId = true) {
  const prop = urlId ? getParamsWithoutId(informationId) : informationId;

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
