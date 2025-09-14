import {cn} from "../../utils/cn.ts";


const SideBar = ({className}: { className?: string }) => {
    return (
        <div className={cn("h-[calc(100%-48px)] w-32 absolute top-12 z-10 bg-red", className)}>

        </div>
    )
}
export default SideBar
