import React, {useEffect} from "react";
import LinksHeader from "../components/DashBoard/LinksHeader.tsx";
import List from "../components/List.tsx";
import LinksCard from "../components/DashBoard/LinksCard.tsx";
import {useQuery} from "@tanstack/react-query";
import {getAllShortUrls} from "../query/functions/Url.ts";
import {toast} from "react-toastify";
import Loader from "../components/Loader.tsx";
import type {GetShortUrlsResponse} from "../types/types.ts";

type LinkItem = {
    id: string;
    title: string;
    url: string;
    clicks?: number;
    createdAt?: string | Date;
};

type HomeProps = {
    links?: LinkItem[];
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
};

const formatDate = (d?: string | Date) => {
    if (!d) return "";
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toLocaleDateString();
};

const GetLinks: React.FC<HomeProps> = () => {

    const handleOpen = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const {isError, isPending: loading, data: res, error} = useQuery<GetShortUrlsResponse>({
        queryKey: ["allLinks"],
        queryFn: getAllShortUrls
    });

    useEffect(() => {
        if (isError) {
            toast.error(error?.message ?? "Failed to load links");
        }
    }, [isError, error]);

    const items = res?.data ?? [];


    return (
        <main className="w-full h-full overflow-y-auto bg-gray-50 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                <LinksHeader/>
                {
                    loading && <div className="h-full w-full flex-center">
                        <Loader/>
                    </div>
                }
                {!loading && items.length === 0 ? (
                    <div
                        className="flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            No links yet. Create your first one to get started.
                        </p>
                    </div>
                ) : (!loading && (
                    <List
                        data={items}
                        render={(item) => {
                            return <LinksCard {...item} handleOpen={handleOpen} formatDate={formatDate}/>
                        }}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
                    />
                ))}
            </div>
        </main>
    );
};

export default GetLinks;


