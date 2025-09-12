import bcrypt from "bcryptjs";
import {eq} from "drizzle-orm";
import type {NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";

import {db} from "@/db";
import {users} from "@/db/schema/users";

export default {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email as string))
            .limit(1);

          if (!user.length) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user[0].password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user[0].id,
            email: user[0].email,
            name: user[0].name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/api/auth/error",
    signOut: "/", // This will redirect to home after logout
  },
} satisfies NextAuthConfig;
