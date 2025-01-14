import * as React from 'react';

import { cn } from '@/lib/utils';
import { p } from 'framer-motion/client';

function Skeleton({
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('animate-pulse rounded-md bg-gray-300', className)}
            {...props}
        />
    )
}

export default Skeleton;