import { useState } from "react";
import {  Sparkles, ShieldCheck, BarChart3, Zap } from "lucide-react";
import ShortenForm from "../components/ShortenForm.tsx";

const Home = () => {
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    // mock shortening behavior for the demo UI
    setLoading(true);
    setTimeout(() => {
      const slug = Math.random().toString(36).slice(2, 8);

      setLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              Smarter links. Better results.
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Shorten, share, and track your links
            </h1>
            <p className="mt-4 text-balance text-white/70 sm:text-lg">
              Create branded short links that look great everywhere and boost your click‑through rate. Built for speed, reliability, and insights.
            </p>
                <ShortenForm/>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 items-center gap-6 opacity-80 sm:grid-cols-4">
              <div className="text-center text-xs text-white/60">Trusted by creators</div>
              <div className="text-center text-xs text-white/60">Teams and startups</div>
              <div className="text-center text-xs text-white/60">Agencies</div>
              <div className="text-center text-xs text-white/60">Enterprises</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Zap className="h-5 w-5 text-yellow-300" />}
              title="Fast & Reliable"
              desc="Links that resolve instantly worldwide with enterprise-grade uptime."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5 text-sky-300" />}
              title="Secure by Default"
              desc="Spam and malware protection, HTTPS everywhere, and privacy-first."
            />
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5 text-emerald-300" />}
              title="Actionable Analytics"
              desc="Track clicks, devices, referrers, and locations to optimize campaigns."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-semibold sm:text-3xl">Start shortening smarter</h2>
                <p className="mt-2 max-w-2xl text-white/70">
                  Upgrade any time. Free to try, no credit card required.
                </p>
              </div>
              <div className="flex w-full gap-3 md:w-auto">
                <button className="flex-1 rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10 md:flex-none">
                  View Pricing
                </button>
                <button className="flex-1 rounded-md bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90 md:flex-none">
                  Create Free Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/5">
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-white/70">{desc}</p>
    </div>
  );
}

export default Home;
