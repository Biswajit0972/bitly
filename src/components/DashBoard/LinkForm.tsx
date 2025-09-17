import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type Action, linkFormSchema, type LinkFormValues} from "../../types/types.ts";
import Form from "../Form.tsx";
import FormDiv from "../FormDiv.tsx";
import FormInput from "../FormInput.tsx";
import InputError from "../InputError.tsx";
import {Button} from "../Button.tsx";
import {XIcon} from "lucide-react";
import type {Dispatch} from "react";

type LinkFormMode = "create" | "edit";

type LinkFormProps = {
    mode: LinkFormMode;
    defaultValues?: Partial<LinkFormValues>;
    onSubmit: (values: LinkFormValues) => void | Promise<void>;
    isSubmitting?: boolean;
    submitLabel?: string;
    className?: string;
    dispatch: Dispatch<Action>;
};

const LinkForm = ({
                      mode,
                      defaultValues,
                      onSubmit,
                      isSubmitting = false,
                      submitLabel,
                      dispatch
                  }: LinkFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting: rhfSubmitting},
    } = useForm<LinkFormValues>({
        resolver: zodResolver(linkFormSchema),
        defaultValues: {
            title: defaultValues?.title ?? "",
            long_url: defaultValues?.long_url ?? "",
            short_urlID: defaultValues?.short_urlID ?? "",
        },
    });

    const submitting = isSubmitting || rhfSubmitting;

    return (
        <Form className=" relative p-16 max-w-[50%] border-2 border-gray-300 rounded-md bg-black"
              onSubmit={handleSubmit(onSubmit)}>
            <Button variant="destructive" className="absolute top-4 right-4 " type="button"
                    onClick={() => dispatch({type: "Close Form"})}>
                <XIcon/>
            </Button>
            <div className="flex w-full flex-col gap-3">
                <FormDiv>
                    <label className="text-sm text-gray-300">Title</label>
                    <FormInput
                        {...register("title")}
                        placeholder="Enter a title for your link"
                        className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/30"
                        aria-label="Title"
                        disabled={submitting}
                    />
                    {errors.title && <InputError message={errors.title.message}/>}
                </FormDiv>

                <FormDiv>
                    <label className="text-sm text-gray-300">Long URL</label>
                    <FormInput
                        {...register("long_url")}
                        placeholder="https://example.com/very/long/url"
                        className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/30"
                        aria-label="Long URL"
                        disabled={submitting}
                    />
                    {errors.long_url && <InputError message={errors.long_url.message}/>}
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
                        disabled={submitting || mode === "edit"}
                    />
                    {errors.short_urlID && <InputError message={errors.short_urlID.message}/>}
                </FormDiv>

                <div className="flex justify-end">
                    <Button type="submit" disabled={submitting}>
                        {submitLabel ?? (mode === "edit" ? "Update link" : "Create link")}
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default LinkForm;