import { z } from "zod";

export const UserFormValidation = z.object({
    username: z
        .string()
        .optional(),
        // .min(2, "Name must be at least 2 characters")
        // .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password cannot exceed 20 characters" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one digit" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" })
});

export const CategoryValidation = z.object({
    category: z.string()
});

export const FormValidation = z.object({
    teamMember: z.string(),
    taskCategory: z.string(),
    createdAt: z.date().nullable(),
    expireAt: z.date().nullable(),
    description: z.string()
});