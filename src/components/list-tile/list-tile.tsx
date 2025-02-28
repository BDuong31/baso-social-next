import { cn } from '@/lib/utils';

type ListTileProps = {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
};

const ListTile = ({ children, className, onClick, active }: ListTileProps) => {
    return (
        <li
            className={`relative z-0 ${active ? 'dark:bg-neutral2-10 bg-neutral1-60' : 'dark:bg-neutral2-2 bg-neutral1-30'} rounded-[20px] before:content-[''] before:absolute before:inset-0 before:z-1 before:opacity-15 dark:before:bg-linear-card-dark before:bg-linear-card before:rounded-[20px] after:content-[''] after:absolute after:inset-[1px] after:z-1 dark:after:bg-[#313131] bg-[#cbcbcb] after:rounded-[19px]`}
        >
            <div
                onClick={onClick}
                className={cn(
                    `relative z-9 p-3 gap-4 w-full flex items-center rounded-[20px] ${active ? 'dark:bg-neutral2-10 bg-neutral1-80 dark:hover:bg-neutral2-5 hover:bg-neutral1-60 active:bg-neutral3-20' : 'dark:bg-neutral2-2 bg-neutral1-30 dark:hover:bg-neutral2-5 hover:bg-neutral1-60 active:bg-neutral3-20'} select-none cursor-pointer transition-colors ease-in-out`,
                    className,
                )}
            >
                {children}
            </div>
        </li>
    )
};

export default ListTile;