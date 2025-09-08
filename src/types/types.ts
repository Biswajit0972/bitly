import * as z from 'zod';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export const loginSchema = z.object({
    identifier: z.string().min(1, "Must be provide a valid email  or username"),
    password: z.string().min(8, 'Password must be at least 8 characters long').regex(PASSWORD_REGEX, 'Password must include upper, lower, number, and special character')
});

export type loginType = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Provide a valid email"),
    fullName: z.string().min(1, "Full name is required"),
    password: z.string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(PASSWORD_REGEX, 'Password must include upper, lower, number, and special character')
});

export type signupType = z.infer<typeof signupSchema>;

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

export type LoginResponse = {
    message: string;
    data: AuthTokens;
    statusCode: number;
};

export const shortUrlSchema = z.object({
    url: z.url("Provide a valid url"),
    shortCode: z.string().optional()
});

export type shortUrlType = z.infer<typeof shortUrlSchema>;