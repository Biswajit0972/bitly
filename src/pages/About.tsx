import React from "react";
import {Link} from "react-router-dom";
import {Sparkles, ShieldCheck, Globe2, HeartHandshake, Target} from "lucide-react";
import {useAuth} from "../context/Auth.ts";
import FeatureCard from "../components/FeatureCard.tsx";
import ValueItem from "../components/ValueItem.tsx";
import List from "../components/List.tsx";
import {AboutFeaturesData, AboutValuesData} from "../utils";

const About: React.FC = () => {
    const {isLoggedIn} = useAuth();

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero */}
            <section className="relative border-b border-white/10">
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]"/>
                <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div
                            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                            <Sparkles className="h-3.5 w-3.5 text-yellow-300"/>
                            Built by makers for everyone
                        </div>
                        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                            About Our URL Shortener
                        </h1>
                        <p className="mt-4 text-balance text-white/70 sm:text-lg">
                            We’re on a mission to make links simpler, faster, and more insightful.
                            From individuals to global teams, we help you transform long URLs into
                            powerful, trackable experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* What drives us */}
            <section className="border-b border-white/10">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <List data={AboutFeaturesData} render={(item) => {
                        return <FeatureCard {...item} icon={getIcon(item.icon)}/>
                    }
                    } className="grid grid-cols-1 gap-8 md:grid-cols-3"/>


                </div>
            </section>

            {/* Story / Values */}
            <section className="border-b border-white/10">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
                        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                            <div className="max-w-2xl">
                                <h2 className="text-2xl font-semibold sm:text-3xl">Our Story</h2>
                                <p className="mt-3 text-white/70">
                                    We started with a simple idea: links should be short, smart, and
                                    delightful. What began as a tool for creators has grown into a
                                    platform trusted by teams, startups, and enterprises to power
                                    campaigns, measure engagement, and build brand credibility.
                                </p>
                                <p className="mt-3 text-white/70">
                                    Today, we continue to iterate with community feedback, focusing on
                                    speed, reliability, and actionable insights—without compromising
                                    on privacy.
                                </p>
                            </div>
                            <List data={AboutValuesData} render={(item) => {
                                return <ValueItem {...item} icon={getIcon(item.icon)}/>
                            }} className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-md"/>


                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-b border-white/10">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
                        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                            <div>
                                <h2 className="text-2xl font-semibold sm:text-3xl">Join our journey</h2>
                                <p className="mt-2 max-w-2xl text-white/70">
                                    Start shortening smarter today. Free to try—upgrade any time.
                                </p>
                            </div>
                            <div className="flex w-full gap-3 md:w-auto">
                                <Link
                                    to="/pricing"
                                    className="flex-1 rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10 md:flex-none"
                                >
                                    View Pricing
                                </Link>
                                {!isLoggedIn && (
                                    <Link
                                        to="/auth/signup"
                                        className="flex-1 rounded-md bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90 md:flex-none"
                                    >
                                        Create Free Account
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

function getIcon(
    key: "target" | "shield" | "globe" | "heart" | "Target"
): React.ReactNode {
    switch (key) {
        case "target":
            return <Target className="h-5 w-5 text-yellow-300"/>;
        case "shield":
            return <ShieldCheck className="h-5 w-5 text-sky-300"/>;
        case "globe":
            return <Globe2 className="h-5 w-5 text-emerald-300"/>;
        case "heart" :
            return <HeartHandshake className="h-4 w-4 text-pink-300"/>
        case "Target":
            return <Target className="h-5 w-5 text-yellow-300"/>;
        default:
            return <Sparkles className="h-5 w-5 text-yellow-300"/>;
    }
}


export default About;
