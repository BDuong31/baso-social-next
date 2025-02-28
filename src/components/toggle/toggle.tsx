import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> &{};
function Toggle({...props}: Props) {
    return (
        <label className="switch inline-flex items-center cursor-pointer">
            <input {...props} type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 p-1 dark:bg-neutral2-5 bg-neutral1-35 rounded-full peer peer-checked:after:translate-x-[20px] rtl:peer-checked:after:-translate-x-[20px]  after:content-[''] after:absolute after:top-[4px] after:start-[4px] dark:after:bg-neutral2-30 after:bg-neutral2-95 after:rounded-full after:h-4 after:w-4 after:transition-all dark:peer-checked:bg-neutral3-50 peer-checked:bg-neutral-400 peer-checked:after:bg-linear-object"></div>
        </label>
    )
}

export default Toggle;