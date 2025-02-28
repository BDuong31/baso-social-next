import { useTheme } from "next-themes";
import { cn } from '@/lib/utils';
function Bubble({ className }: { className?: string }) {
  const { theme } = useTheme();
  return (
    <svg
      className={cn('fill-[#1F1F1F] dark:fill-[#F8F8F8]', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="73"
      height="72"
      viewBox="0 0 73 72"
      fill="none"
    >
      <g filter="url(#filter0_i_12214_113087)">
        <circle cx="36.5" cy="36" r="36" fillOpacity="0.01" />
      </g>
      <defs>
        <filter
          id="filter0_i_12214_113087"
          x="0.5"
          y="0"
          width="72"
          height="72"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values={theme === 'dark' ? "0 0 0 0 0.972549 0 0 0 0 0.972549 0 0 0 0 0.972549 0 0 0 0.25 0" : "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0"}
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_12214_113087"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default Bubble;
