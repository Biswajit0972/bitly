import type {FC, FormHTMLAttributes} from "react";
import {cn} from "../utils/cn.ts";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    className?: string;
}

const Form: FC<FormProps> = ({children, className, ...props}) => {
    return (
        <form className={cn("w-full relative", className)}  {...props}>
            {
                children
            }
        </form>
    )
}
export default Form
