import type {AboutFeature, AboutValue} from "../types/types.ts";

export const basicNavigationLink = ["/pricing", "/about", "/dashboard"]

export const planCardsData = [
    {
        name: "Free",
        price: "$0",
        period: "/mo",
        badge: "Starter",
        highlight: false,
        cta: {label: "Create Free Account", to: "/auth/signup"},
        features: [
            {label: "Shorten unlimited links", available: true},
            {label: "See total click count", available: true},
            {label: "Device, referrer, and location analytics", available: false},
            {label: "Analytics retention for 2 months", available: false},
            {label: "Analytics retention for 6 months", available: false},
            {label: "Email support", available: true},
        ],
    },
    {
        name: "Premium",
        price: "$12",
        period: "/mo",
        badge: "Most Popular",
        highlight: true,
        cta: {label: "Start Premium", to: "/auth/signup"},
        features: [
            {label: "Everything in Free", available: true},
            {label: "Full analytics (devices, referrers, locations)", available: true},
            {label: "Analytics retention for 2 months", available: true},
            {label: "Custom link management (tags, notes)", available: true},
            {label: "Priority email support", available: true},
            {label: "Analytics retention for 6 months", available: false},
        ],
    },
    {
        name: "Super",
        price: "$29",
        period: "/mo",
        badge: "Pro",
        highlight: false,
        cta: {label: "Get Super", to: "/auth/signup"},
        features: [
            {label: "Everything in Free + Premium", available: true},
            {label: "Team features & sharing", available: true},
            {label: "Advanced UTMs & export", available: true},
            {label: "Analytics retention for 6 months", available: true},
            {label: "SLA & dedicated support", available: true},
        ],
    },
]


export const AboutFeaturesData: AboutFeature[] = [
    {
        icon: "target",
        title: "Clarity & Focus",
        desc: "Remove friction from sharing and tracking links so you can focus on your message.",
    },
    {
        icon: "shield",
        title: "Trust & Security",
        desc: "Safety by default with modern security practices and privacy‑first analytics.",
    },
    {
        icon: "globe",
        title: "Scale & Reliability",
        desc: "Built to serve millions of clicks with globally optimized performance.",
    },
];

export const AboutValuesData: AboutValue[] = [
    {
        icon: "heart",
        title: "Customer‑obsessed",
        desc: "We ship what helps you succeed, and we listen closely.",
    },
    {
        icon: "shield",
        title: "Secure by design",
        desc: "Security isn’t a feature—it's a baseline.",
    },
    {
        icon: "globe",
        title: "Global first",
        desc: "Fast everywhere with resilient uptime.",
    },
    {
        icon: "target",
        title: "Outcome driven",
        desc: "Measure what matters and keep it simple.",
    },
];

export  type dashBoardLinkType = {
    title: string,
    icon: "link" | "chart-pie" | "profile" | "heart" | "Target",
    to: string,
}

export const dashBoardLinks: dashBoardLinkType[] = [
    {
        title: "Links",
        icon: "link",
        to: "/dashboard/getLinks"
    },
    {
        title: "Analytics",
        icon: "chart-pie",
        to: "/dashboard/analytics"
    },
    {
        title: "profile",
        icon: "profile",
        to: "/dashboard/profile"
    }
]