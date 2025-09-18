import {useMutation} from "@tanstack/react-query";
import {loginUser, signupUser} from "../functions/authentication.ts";
import type {loginType, shortUrlType, signupType} from "../../types/types.ts";
import {deleteShortUrl, createShortUrl} from "../functions/Url.ts";
import {queryClient} from "../query.ts";

export const useLoginHook = () => {
    const {mutateAsync, isPending, data, error, isError} = useMutation({
        mutationFn: (data: loginType) => loginUser(data),
        mutationKey: ["login"],
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (err) => {
            console.log(err);
        }
    });

    return {mutateAsync, isPending, data, error, isError};
}

export const useSignUpHook = () => {
    const {mutateAsync, isPending, data, error, isError} = useMutation({
        mutationFn: (data: signupType) => signupUser(data),
        mutationKey: ["signup"],
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (err) => {
            console.log(err);
        }
    });

    return {mutateAsync, isPending, data, error, isError};
}

export const useShortUrlHook = () => {
    const {mutateAsync, isPending, data, error, isError} = useMutation({
        mutationFn: (data: shortUrlType) => createShortUrl(data),
        mutationKey: ["getShortUrl"],
    });

    return {mutateAsync, isPending, data, error, isError};
}

export const useDeleteShortUrlHook = () => {
    const {mutateAsync, isPending, data, error, isError} = useMutation({
        mutationFn: (id: string) => deleteShortUrl(id),
        mutationKey: ["deleteShortUrl"],
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["allLinks"]});
        }
    });

    return {mutateAsync, isPending, data, error, isError};
}