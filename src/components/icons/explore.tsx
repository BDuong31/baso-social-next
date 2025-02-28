import { cn } from '@/lib/utils';

export default function ExploreIcon({ className }: { className?: string }) {
  return (
    <svg
      id="explore-icon"
      className={cn('h-6 w-6 dark:fill-secondary fill-[#1f1f1f]', className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon, icons, shapes, games" opacity="0.8">
        <path
          id="Icon"
          d="M7.75 3.75C7.75 3.33579 7.41421 3 7 3C6.58579 3 6.25 3.33579 6.25 3.75H7.75ZM6.25 10.25C6.25 10.6642 6.58579 11 7 11C7.41421 11 7.75 10.6642 7.75 10.25H6.25ZM3.75 6.25C3.33579 6.25 3 6.58579 3 7C3 7.41421 3.33579 7.75 3.75 7.75V6.25ZM10.25 7.75C10.6642 7.75 11 7.41421 11 7C11 6.58579 10.6642 6.25 10.25 6.25V7.75ZM19.8284 15.2322C20.1213 14.9393 20.1213 14.4645 19.8284 14.1716C19.5355 13.8787 19.0607 13.8787 18.7678 14.1716L19.8284 15.2322ZM14.1716 18.7678C13.8787 19.0607 13.8787 19.5355 14.1716 19.8284C14.4645 20.1213 14.9393 20.1213 15.2322 19.8284L14.1716 18.7678ZM15.2322 14.1716C14.9393 13.8787 14.4645 13.8787 14.1716 14.1716C13.8787 14.4645 13.8787 14.9393 14.1716 15.2322L15.2322 14.1716ZM18.7678 19.8284C19.0607 20.1213 19.5355 20.1213 19.8284 19.8284C20.1213 19.5355 20.1213 19.0607 19.8284 18.7678L18.7678 19.8284ZM17 9.5C15.6193 9.5 14.5 8.38071 14.5 7H13C13 9.20914 14.7909 11 17 11V9.5ZM19.5 7C19.5 8.38071 18.3807 9.5 17 9.5V11C19.2091 11 21 9.20914 21 7H19.5ZM17 4.5C18.3807 4.5 19.5 5.61929 19.5 7H21C21 4.79086 19.2091 3 17 3V4.5ZM17 3C14.7909 3 13 4.79086 13 7H14.5C14.5 5.61929 15.6193 4.5 17 4.5V3ZM6.25 3.75V7H7.75V3.75H6.25ZM6.25 7V10.25H7.75V7H6.25ZM3.75 7.75H7V6.25H3.75V7.75ZM7 7.75H10.25V6.25H7V7.75ZM18.7678 14.1716L16.4697 16.4697L17.5303 17.5303L19.8284 15.2322L18.7678 14.1716ZM16.4697 16.4697L14.1716 18.7678L15.2322 19.8284L17.5303 17.5303L16.4697 16.4697ZM14.1716 15.2322L16.4697 17.5303L17.5303 16.4697L15.2322 14.1716L14.1716 15.2322ZM16.4697 17.5303L18.7678 19.8284L19.8284 18.7678L17.5303 16.4697L16.4697 17.5303ZM5.25 14.5H8.75V13H5.25V14.5ZM9.5 15.25V18.75H11V15.25H9.5ZM8.75 19.5H5.25V21H8.75V19.5ZM4.5 18.75V15.25H3V18.75H4.5ZM5.25 19.5C4.83579 19.5 4.5 19.1642 4.5 18.75H3C3 19.9926 4.00736 21 5.25 21V19.5ZM9.5 18.75C9.5 19.1642 9.16421 19.5 8.75 19.5V21C9.99264 21 11 19.9926 11 18.75H9.5ZM8.75 14.5C9.16421 14.5 9.5 14.8358 9.5 15.25H11C11 14.0074 9.99264 13 8.75 13V14.5ZM5.25 13C4.00736 13 3 14.0074 3 15.25H4.5C4.5 14.8358 4.83579 14.5 5.25 14.5V13Z"
        />
      </g>
    </svg>
  );
}
