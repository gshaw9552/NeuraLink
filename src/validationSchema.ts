import { z } from "zod";

export const userSchema = z.object({
    username: z.string()
        .min(1, { message: "Username is required" })
        .regex(/^[A-Za-z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid Email Address" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" }),
});

export const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).optional(),
    username: z.string().min(1, { message: "Username is required" }).optional(),
    password: z.string().min(1, { message: "Password is required" }),
}).refine((data) => data.email || data.username, {
    message: "Either email or username must be provided",
    path: ["email", "username"],
});
