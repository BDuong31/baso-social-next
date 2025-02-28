import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export default function ArrowRiseDown({ className }: { className?: string }) {
    return (
        <svg 
            className={cn('w-3 h-2 dark:fill-[#F8F8F8] fill-[#1F1F1F]', className)}
            width="9" 
            height="13" 
            viewBox="0 0 9 13" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.05898 7.45488L8.66675 13L3.06064 11.6198L4.71355 9.89804L1.82048 7.12069C1.72227 7.02641 1.66675 6.89615 1.66675 6.76C1.66675 6.62385 1.72227 6.49359 1.82048 6.39931L3.94476 4.36L0.820482 1.36069C0.621277 1.16946 0.614817 0.85294 0.806055 0.653735C0.997292 0.454529 1.31381 0.44807 1.51301 0.639307L5.01301 3.99931C5.11123 4.09359 5.16675 4.22385 5.16675 4.36C5.16675 4.49615 5.11123 4.62641 5.01301 4.72069L2.88874 6.76L5.40608 9.17665L7.05898 7.45488Z" fill="#8C1823"/>
</svg>
    )
}