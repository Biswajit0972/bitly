import React from "react";


const FeatureCard = ({
                         icon,
                         title,
                         desc,
                     }: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) => {
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
export default FeatureCard
