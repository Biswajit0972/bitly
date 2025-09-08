import type {ReactNode} from "react";
import {cn} from "../utils/cn.ts";

interface ListProps <T> {
    data: T[]
    render:  (item: T) => ReactNode
    className?: string
}

const List = <T,>({className,  render,  data}:ListProps<T>) => {
    return (
        <ul className={cn("relative w-full", className)}>
            {
                data.map(render)
            }
        </ul>
    )
}
export default List
