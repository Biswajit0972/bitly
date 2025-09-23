import React, {type Reducer, useEffect, useReducer} from "react";
import LinksHeader from "../components/DashBoard/LinksHeader.tsx";
import List from "../components/List.tsx";
import LinksCard from "../components/DashBoard/LinksCard.tsx";
import {useQuery} from "@tanstack/react-query";
import {getAllShortUrls} from "../query/functions/Url.ts";
import {toast} from "react-toastify";
import Loader from "../components/Loader.tsx";
import type {Action, GetShortUrlsResponse, State} from "../types/types.ts";
import LinkForm from "../components/DashBoard/LinkForm.tsx";

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



const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case "Add Link":
            return {
                ...state,
                isFormOpen: true,
                mode: "create"
            };
        case "Edit Link":
            return {
                ...state,
                isFormOpen: true,
                mode: "edit",
                formValues: action.payload
            }
        case "Close Form":
            return {
                ...state,
                isFormOpen: false,
                formValues: undefined,
                mode: "create"
            }
        default:
            return state;
    }
}

const initialValue: State = {
    isFormOpen: false,
    formValues: undefined,
    mode: "create"
}

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


    const [state, dispatch] = useReducer(reducer, initialValue)

    const items = res?.data ?? [];


    return (
        <main className="w-full h-full overflow-y-auto bg-black">
            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 relative">
                <LinksHeader totalLinks={items.length} dispatch={dispatch}/>
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
                            return <LinksCard key={item.id} {...item} handleOpen={handleOpen} formatDate={formatDate} dispatch={dispatch}/>
                        }}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
                    />
                ))}
            </div>
            {
                state.isFormOpen && (<div className="absolute h-full w-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border
 top-0 left-0 z-10  flex-center px-16">
                    <LinkForm mode={state.mode}  defaultValues={state.formValues} dispatch={dispatch}/>
                </div>)
            }
        </main>
    );
};

export default GetLinks;


