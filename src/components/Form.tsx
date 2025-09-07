import type {FC, FormHTMLAttributes} from "react";
import {cn} from "../utils/cn.ts";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    className?: string;
    handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;

}

const Form: FC<FormProps> = ({children, handleSubmit, className, ...props}) => {
    return (
        <form className={cn("w-full relative", className)} onSubmit={handleSubmit} {...props}>
            {
                children
            }
        </form>
    )
}
export default Form
