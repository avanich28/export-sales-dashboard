import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./prisma";

interface AuthUser {
  id: string;
  name: string;
}

const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.name || !credentials?.password) return null;

        const parsedCredentials = z
          .object({
            name: z.string(),
            password: z.string(),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { name, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { name },
        });

        if (user && (await bcrypt.compare(password, user.password)))
          return { id: user.id.toString(), name: user.name };
        else throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async jwt({ token, user }) {
      // Need to add an user's id one more time
      if (user) token.uid = user.id;

      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.sub;

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
