import Form from "./Form.tsx";
import {useForm} from "react-hook-form";
import {type CreateShortcodeResponse, shortUrlSchema, type shortUrlType} from "../types/types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import FormDiv from "./FormDiv.tsx";
import FormInput from "./FormInput.tsx";
import InputError from "./InputError.tsx";
import {Button} from "./Button.tsx";
import {useState} from "react";
import {useShortUrlHook} from "../query/hooks/queryHooks.ts";
import Loader from "./Loader.tsx";
import {getTokens} from "../utils/helpers/warrperRouter.ts";
import {toast} from "react-toastify";


const ShortenForm = () => {
    const {register, formState: {errors}, reset, handleSubmit} = useForm<shortUrlType>({
        resolver: zodResolver(shortUrlSchema),
        defaultValues: {
            url: "",
            shortCode: ""
        }
    });

    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const {mutateAsync, isPending, data: shortCode, isError, error} = useShortUrlHook();

    const handleShortenForm = async (data: shortUrlType) => {
        const {isTokenAvailable} = getTokens();
        if (!isTokenAvailable) {
            toast.error("Please login to continue 💀");
            return;
        }
        const {data: resCode} = await mutateAsync(data) as CreateShortcodeResponse;
        setShortUrl("http://localhost:3000/api/url/" + `${resCode.shortCode}`);
        reset();
    }

    if (isError) {
        toast.error(error?.message)
        console.log("", error)
    }
    return (
        <>
            <Form className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
                  onSubmit={handleSubmit(handleShortenForm)}>
                <div className="flex relative w-full gap-2 ">
                    <FormDiv>
                        <FormInput {...register("url")} size="sm" placeholder="Paste a long URL (https://...)"
                                   className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/30"
                                   aria-label="Long URL"/>
                        {
                            errors.url && <InputError message={errors.url.message}/>
                        }
                    </FormDiv>
                    <FormDiv>
                        <FormInput {...register("shortCode")} size="sm" placeholder="Paste a shortCode"
                                   className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/30"
                                   aria-label="Long URL"/>
                        {
                            errors.shortCode && <InputError message={errors.shortCode.message}/>
                        }
                    </FormDiv>
                </div>
                <Button type="submit"
                        className="inline-flex shrink-0 items-center justify-center rounded-md bg-white px-5 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70">
                    submit
                </Button>
            </Form>

        {isPending ? <div className="mx-auto mt-4 w-full max-w-2xl flex-center">
            <Loader/>
        </div> : shortCode && (
            <div
                className="mx-auto mt-4 w-full max-w-2xl rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-left sm:p-4">
                <div className="flex items-center justify-between gap-3">
                    <a
                        href={shortUrl!}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate font-medium text-emerald-300 hover:underline"
                    >
                        {shortUrl}
                    </a>
                    <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(shortUrl!)}
                        className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
                    >
                        Copy
                    </button>
                </div>
            </div>

        )}
        </>
    );
};

export default ShortenForm;
