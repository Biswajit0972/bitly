import type {FC, FormHTMLAttributes} from "react";
import {cn} from "../utils/cn.ts";


interface FormDivProps extends FormHTMLAttributes<HTMLDivElement> {
    className?: string;
}

const FormDiv: FC<FormDivProps> = ({className, children}) => {
    return (
        <div className={cn("w-full relative flex-column gap-2", className)}>{children}</div>
    )
}
export default FormDiv
