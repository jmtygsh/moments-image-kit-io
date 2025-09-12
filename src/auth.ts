import {DrizzleAdapter} from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import {db} from "@/db";

import authConfig from "./auth.config";

export const {auth, handlers, signIn, signOut} = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig,
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({session, token}) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
