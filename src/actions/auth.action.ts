"use server";

import bcrypt from "bcryptjs";
import {eq} from "drizzle-orm";

import {db} from "@/db";
import {
  type CreateUserParams,
  createUserSchema,
  users,
} from "@/db/schema/users";
import {handleError} from "@/lib/handlers";
import action from "@/lib/handlers/action";
import type {ActionResponse, ErrorResponse} from "@/types";

export const createUser = async (
  params: CreateUserParams
): Promise<ActionResponse<{id: string; email: string; name: string}>> => {
  const validationResult = await action({
    params,
    schema: createUserSchema,
    authorize: false,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {name, email, password} = validationResult.params!;

  try {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        success: false,
        error: "User with this email already exists",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({id: users.id, email: users.email, name: users.name});

    return {
      success: true,
      data: newUser,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
