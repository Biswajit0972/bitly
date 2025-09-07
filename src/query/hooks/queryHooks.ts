import {useMutation} from "@tanstack/react-query";
import {loginUser, signupUser} from "../functions/authentication.ts";
import type {loginType, signupType} from "../../types/types.ts";

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