function ValueItem({
                       icon,
                       title,
                       desc,
                   }: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <li className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2">
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/5">
                    {icon}
                </div>
                <p className="font-medium">{title}</p>
            </div>
            <p className="mt-2 text-sm text-white/70">{desc}</p>
        </li>
    );
}
export default ValueItem;