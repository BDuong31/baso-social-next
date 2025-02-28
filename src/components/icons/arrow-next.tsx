import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export default function ArrowNext({ className }: { className?: string }) {
    const { theme } = useTheme();
    return (
        <svg 
            className={cn('w-6 h-6 dark:stroke-[#F8F8F8] stroke-[#1F1F1F]', className)}
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            fill="none"
        >
            <g opacity="0.8">
                <path 
                    d="M15.78 18.78a.75.75 0 0 1-1.061-1.061l4.129-4.129c.209-.209.369-.449.478-.706l.052-.135H3.75a.75.75 0 0 1-.743-.648L3 12a.75.75 0 0 1 .75-.75h15.628l-.052-.135c-.088-.205-.207-.4-.359-.577l-.12-.129L14.72 6.28A.75.75 0 0 1 15.78 5.22l4.129 4.129a3.75 3.75 0 0 1 0 5.303L15.78 18.78z"
                    strokeOpacity="0.7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            </svg>
    )
}