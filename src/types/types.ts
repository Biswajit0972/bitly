import * as z from 'zod';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export const loginSchema = z.object({
    identifier: z.string().min(1, "Must be provide a valid email  or username"),
    password: z.string().min(8, 'Password must be at least 8 characters long').regex(PASSWORD_REGEX, 'Password must include upper, lower, number, and special character')
});

export type loginType = z.infer<typeof loginSchema>;