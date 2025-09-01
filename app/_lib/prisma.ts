// https://github.com/prisma/prisma/discussions/19669
import { PrismaClient } from "../generated/prisma/client.js";

export const prisma = new PrismaClient();
