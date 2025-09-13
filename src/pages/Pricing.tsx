import {Sparkles} from "lucide-react";
import {Link} from "react-router-dom";
import {useAuth} from "../context/Auth.ts";
import List from "../components/List.tsx";
import {planCardsData} from "../utils";
import PlanCard from "../components/PlanCard.tsx";

const Pricing = () => {
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
                            Simple pricing. Powerful insights.
                        </div>
                        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                            Choose the plan that fits your growth
                        </h1>
                        <p className="mt-4 text-balance text-white/70 sm:text-lg">
                            Get started for free. Upgrade anytime to unlock deeper analytics and longer retention.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Grid */}
            <section className="border-b border-white/10">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <List
                        data={planCardsData}
                        render={(item) => {
                            const isFree = item.name === "Free";
                            const fallbackCta = item.cta;
                            const whenLoggedIn =
                                isFree
                                    ? {label: "Continue Free", to: "/"}
                                    : {label: `Go ${item.name}`, to: "/"};

                            const {label, to} = isLoggedIn ? whenLoggedIn : fallbackCta;

                            return (
                                <PlanCard
                                    {...item}
                                    cta={
                                        <Link
                                            to={to}
                                            className="w-full rounded-md bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                                        >
                                            {label}
                                        </Link>
                                    }
                                />
                            );
                        }}
                        className="grid gap-6 md:grid-cols-3"
                    />
                </div>
            </section>

            {/* FAQ-ish footnote */}
            <section className="border-b border-white/10">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                        <p className="text-sm text-white/70">
                            Notes: “Full analytics” includes device type, referrers, locations, and time-series trends.
                            You can
                            upgrade or downgrade anytime. Prices are placeholders—adjust to match your billing.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};


export default Pricing;