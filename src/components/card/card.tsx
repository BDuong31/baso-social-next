import { ArrowRiseIcon } from "../icons";
import { Typography } from "../typography";
import { cn } from "@/lib/utils";
type Props = {
    title: string;
    value: string;
    className?: string;
};

const Card =( {title, value, className}: Props) =>  {
    return (
        <div className={cn(
            'w-[250px] h-[110px] p-6 gap-2 flex flex-col rounded-[1.25rem] dark:bg-neutral2-2 bg-neutral1-30 [transition:background_.2s] dark:hover:bg-neutral2-5 hover:bg-neutral1-60',
            className
        )}>
            <Typography level='title'>{title}</Typography>
            <div className="flex flex-row gap-[4.1rem]">
                <Typography level='h5'>{value}</Typography>
            </div>
        </div>
    )
}

export default Card;