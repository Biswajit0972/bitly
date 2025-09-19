import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type Action, linkFormSchema, type LinkFormValues, type UpdateLinkType} from "../../types/types.ts";
import Form from "../Form.tsx";
import FormDiv from "../FormDiv.tsx";
import FormInput from "../FormInput.tsx";
import InputError from "../InputError.tsx";
import {Button} from "../Button.tsx";
import {Loader, XIcon} from "lucide-react";
import type {Dispatch} from "react";
import {useShortUrlHook, useUpdateShortUrlHook} from "../../query/hooks/queryHooks.ts";
import {toast} from "react-toastify";


type LinkFormMode = "create" | "edit";

type LinkFormProps = {
    mode: LinkFormMode;
    defaultValues?: Partial<LinkFormValues>;
    submitLabel?: string;
    className?: string;
    dispatch: Dispatch<Action>;
};

const LinkForm = ({
                      mode,
                      defaultValues,
                      dispatch
                  }: LinkFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LinkFormValues>({
        resolver: zodResolver(linkFormSchema),
        defaultValues: {
            tittle: defaultValues?.tittle ?? "",
            url: defaultValues?.url ?? "",
            short_urlID: defaultValues?.short_urlID ?? "",
        },
    });

    const {
        mutateAsync: asyncCreateUrl,
        isPending: creatingShortURL,
        error: createError,
        isError: urlCreationError
    } = useShortUrlHook();

    const {mutateAsync, isError, isPending, error} = useUpdateShortUrlHook();

    if (urlCreationError) {
        toast.error(createError?.message || "Failed to create link");
        dispatch({type: "Close Form"});
    }

    if (isError) {
        toast.error(error?.message || "Failed to update link");
        dispatch({type: "Close Form"});
    }

    const submitForm = async (data: UpdateLinkType | LinkFormValues) => {

        if (mode === "create") {
            await asyncCreateUrl(data);
            dispatch({type: "Close Form"});
            toast.success("Link created successfully");
        } else {
            const newData = {...data, short_urlID: data.short_urlID as string}
            await mutateAsync(newData);
            toast.success("Link updated successfully");
            dispatch({type: "Close Form"});
        }
    }

    return (
        <Form
            className=" relative py-16 px-5  md:p-16 w-full md:max-w-[50%] border-2 border-gray-300 rounded-md bg-black"
            onSubmit={handleSubmit(submitForm)}>
            <Button variant="destructive" className="absolute top-4 right-4 " type="button"
                    onClick={() => dispatch({type: "Close Form"})}>
                <XIcon/>
            </Button>
            <div className="flex w-full flex-col gap-3">
                <FormDiv>
                    <label className="text-sm text-gray-300">Title</label>
                    <FormInput
                        {...register("tittle")}
                        placeholder="Enter a title for your link"
                        className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/30"
                        aria-label="Title"

                    />
                    {errors.tittle && <InputError message={errors.tittle.message}/>}
                </FormDiv>

                <FormDiv>
                    <label className="text-sm text-gray-300">Long URL</label>
                    <FormInput
                        {...register("url")}
                        placeholder="https://example.com/very/long/url"
                        className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/30"
                        aria-label="Long URL"

                    />
                    {errors.url && <InputError message={errors.url.message}/>}
                </FormDiv>

                <FormDiv>
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300">Short code</label>
                        {mode === "edit" && (
                            <span className="text-xs text-gray-400">(editable on creation only)</span>
                        )}
                    </div>
                    <FormInput
                        {...register("short_urlID")}
                        placeholder="Optional custom short code"
                        className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/30"
                        aria-label="Short code"
                        disabled={mode === "edit"}
                    />
                    {errors.short_urlID && <InputError message={errors.short_urlID.message}/>}
                </FormDiv>

                <Button type="submit" disabled={creatingShortURL || isPending}>
                    {
                        !isPending && mode === "edit" ? "Update Link" : isPending &&
                            <Loader/>
                    }
                    {
                        !creatingShortURL && mode === "create" ? "create Link" : creatingShortURL &&
                            <Loader/>
                    }

                </Button>
            </div>
        </Form>
    );
};

export default LinkForm;