import {Check, Minus} from "lucide-react";
import type {Feature} from "../types/types.ts";

const PlanCard = ({
                      name,
                      price,
                      period,
                      badge,
                      highlight,
                      cta,
                      features,
                  }: {
    name: string;
    price: string;
    period: string;
    badge?: string;
    highlight?: boolean;
    cta: React.ReactNode;
    features: Feature[];
}) => {
    return (
        <div
            className={[
                "rounded-2xl border p-6 sm:p-8",
                "bg-white/[0.03]",
                "border-white/10",
                highlight ? "ring-1 ring-white/15" : "",
            ].join(" ")}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{name}</h3>
                {badge ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">
            {badge}
          </span>
                ) : null}
            </div>

            <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-bold">{price}</span>
                <span className="pb-1 text-sm text-white/70">{period}</span>
            </div>

            <div className="mt-6">{cta}</div>

            <ul className="mt-6 space-y-3">
                {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div
                            className={[
                                "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-sm",
                                f.available ? "bg-emerald-400/20" : "bg-white/5",
                            ].join(" ")}
                        >
                            {f.available ? (
                                <Check className="h-3.5 w-3.5 text-emerald-300"/>
                            ) : (
                                <Minus className="h-3.5 w-3.5 text-white/40"/>
                            )}
                        </div>
                        <span className={f.available ? "text-white/90" : "text-white/50"}>{f.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default PlanCard
