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

export type CreateShortcodeResponse = {
    message: string;
    data: {
        id: number;
        shortCode: string;
        long_url: string;
    };
    statusCode: number;
};

export type Feature = {
    label: string;
    available: boolean;
};

export type AboutFeature = {
    title: string;
    desc: string;
    icon: "target" | "shield" | "globe";
};

export type AboutValue = {
    title: string;
    desc: string;
    icon: "heart" | "shield" | "globe" | "target";
};

export type ShortUrl = {
    id: number;
    shortUrlID: string;
    longUrl: string;
    user_id: number;
    title: string;
    clicksCount: number;
    createdAt: string; // ISO date string
};

export type GetShortUrlsResponse = {
    message: string;
    data: ShortUrl[];
    statusCode: number;
};


export const linkFormSchema = z.object({
    tittle: z.string().min(1, "Title is required"),
    url: z.url("Provide a valid url"),
    short_urlID: z.string().optional(),
});

export type LinkFormValues = z.infer<typeof linkFormSchema>;

export type Action = { type: "Add Link" } | { type: "Edit Link", payload: LinkFormValues } | { type: "Close Form" };

export type State = {
    isFormOpen: boolean;
    formValues?: LinkFormValues;
    mode: "create" | "edit";
}

export const updateLinkSchema = z.object({
    tittle: z.string().min(1, "Title is required"),
    url: z.url("Provide a valid url"),
    short_urlID: z.string("provide a valid short url id"),
});

export type UpdateLinkType = z.infer<typeof updateLinkSchema>;