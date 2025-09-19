import {ExternalLink, Edit2, Trash2, Copy, Loader} from "lucide-react";
import {toast} from "react-toastify";
import {useDeleteShortUrlHook} from "../../query/hooks/queryHooks.ts";
import {Button} from "../Button.tsx";
import type {Dispatch} from "react";
import type {Action, LinkFormValues} from "../../types/types.ts";


type LinksCardProps = {
    id: string | number;
    tittle?: string;
    shortUrlID: string;
    longUrl: string;
    clicksCount?: number | string;
    createdAt?: string | Date;
    handleOpen: (url: string) => void;
    formatDate: (input: string | Date) => string;
    dispatch: Dispatch<Action>;
};

const LinksCard = ({
                       id,
                       tittle = "Link Title",
                       longUrl,
                       shortUrlID,
                       clicksCount,
                       createdAt,
                       handleOpen,
                       formatDate,
    dispatch
                   }: LinksCardProps) => {

    const {isPending, isError: DelError, mutateAsync, error} = useDeleteShortUrlHook();

    const handleDelete = async () => {
        await mutateAsync(shortUrlID);
    }

    if (DelError) {
        toast.error(error?.message || "Failed to delete link")
    }

    const handleEdit = async () => {
        const editableData:LinkFormValues = {
            tittle,
            url: longUrl,
            short_urlID: shortUrlID,
        };
        dispatch({type: "Edit Link",  payload: editableData});
    }

    const shortUrl = "http://localhost:3000/api/url/" + `${shortUrlID}`;
    return (
        <article
            key={id}
            className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
        >
            <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="line-clamp-2 font-medium text-gray-900 dark:text-gray-100">
                    {tittle}
                </h3>

                <button
                    type="button"
                    onClick={() => handleOpen(longUrl)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                    aria-label="Open link"
                    title="Open"
                >
                    <ExternalLink className="h-4 w-4" aria-hidden="true"/>
                </button>
            </div>

            <p className="mb-2 truncate text-sm text-blue-600 hover:underline dark:text-blue-400">
                <span className="font-bold text-white pr-1">Long URL</span> {longUrl}
            </p>
            <p className="mb-4 truncate text-sm text-blue-600 hover:underline dark:text-blue-400">
                <span className="font-bold text-white pr-1">Short URL</span>{shortUrl}
            </p>

            <div className="mb-4 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                {typeof clicksCount === "number" && (
                    <span className="rounded bg-gray-100 px-2 py-0.5 dark:bg-gray-800">
            {clicksCount} clicks
          </span>
                )}
                {createdAt && (
                    <span className="rounded bg-gray-100 px-2 py-0.5 dark:bg-gray-800">
            {formatDate(createdAt)}
          </span>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="invisible flex items-center gap-2 group-hover:visible">
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-800 transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                        aria-label="Edit link"
                        title="Edit"
                    >
                        <Edit2 className="h-4 w-4" aria-hidden="true"/>
                        Edit
                    </button>

                    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending}>
                        {
                            isPending ? <Loader/> : <Trash2 className="h-4 w-4" aria-hidden="true"/>
                        }
                    </Button>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        navigator.clipboard.writeText(shortUrl);
                        toast.success("Link copied to clipboard");
                    }}
                    className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="Copy link"
                    title="Copy URL"
                >
                    <Copy className="h-4 w-4" aria-hidden="true"/>
                    Copy
                </button>
            </div>
        </article>
    );
};

export default LinksCard;
