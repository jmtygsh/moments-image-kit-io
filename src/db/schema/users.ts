import {InferSelectModel} from "drizzle-orm";
import {boolean, pgTable, text, uuid, varchar} from "drizzle-orm/pg-core";
import {createInsertSchema} from "drizzle-zod";
import {z} from "zod/v4";

import {timestamps} from "./columns-helpers";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", {length: 255}).notNull(),
  email: varchar("email", {length: 255}).notNull().unique(),
  password: text("password").notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  ...timestamps,
});

// Auth.js required tables for the Drizzle adapter
export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {onDelete: "cascade"}),
  type: varchar("type", {length: 255}).notNull(),
  provider: varchar("provider", {length: 255}).notNull(),
  providerAccountId: varchar("provider_account_id", {length: 255}).notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: text("expires_at"),
  token_type: varchar("token_type", {length: 255}),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
  ...timestamps,
});

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionToken: varchar("session_token", {length: 255}).notNull().unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {onDelete: "cascade"}),
  expires: text("expires").notNull(),
  ...timestamps,
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: varchar("identifier", {length: 255}).notNull(),
  token: varchar("token", {length: 255}).notNull().unique(),
  expires: text("expires").notNull(),
  ...timestamps,
});

// Validation schemas
const baseUserSchema = createInsertSchema(users, {
  name: z
    .string()
    .min(1, {message: "Name is required."})
    .max(255, {message: "Name cannot exceed 255 characters."}),
  email: z.string().email({message: "Please provide a valid email address."}),
  password: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long."}),
}).pick({
  name: true,
  email: true,
  password: true,
});

export const createUserSchema = z.object({
  name: baseUserSchema.shape.name,
  email: baseUserSchema.shape.email,
  password: baseUserSchema.shape.password,
});

export const loginUserSchema = z.object({
  email: baseUserSchema.shape.email,
  password: baseUserSchema.shape.password,
});

export const userQuerySchema = z.object({
  id: z.string().uuid({message: "Please provide a valid user ID."}),
});

// Types
export type SelectUserModel = InferSelectModel<typeof users>;
export type CreateUserParams = z.infer<typeof createUserSchema>;
export type LoginUserParams = z.infer<typeof loginUserSchema>;
export type UserQueryParams = z.infer<typeof userQuerySchema>;
