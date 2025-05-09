import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      'px-5 py-[0.625rem] dark:text-tertiary text-surface-2 relative inline-flex justify-center items-center rounded-button shadow-button dark:bg-[#282828b3] bg-[#ffffffb3]  backdrop-blur-[50px] before:content-[""] before:absolute before:inset-0 before:rounded-button before:pointer-events-none before:border-[1.5px] before:border-[#ffffff1a] before:[mask-image:linear-gradient(175deg,#000,transparent_50%)] hover:bg-neutral2-10 dark:hover:text-primary hover:text-surface-2 ',
      className
    )}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

export default AlertDialogAction;
