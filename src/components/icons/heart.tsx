import { useTheme } from "next-themes";

//--------------------------------------------------------------------------
interface HeartProps {
  isActive?: boolean;
}

export default function Heart({ isActive }: HeartProps) {
  const { theme } = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isActive ? 'currentColor' : 'none'}
      className={`dark:stroke-[#F8F8F8] stroke-[#1F1F1F] cursor-pointer ${isActive ? 'fill-[#bd3027e5] dark:stroke-[#bd3027e5] stroke-[#bd3027e5]' : ''}`}
    >
      <g opacity="0.8">
        <path
          d="M12 5.57193C18.3331 -0.86765 29.1898 11.0916 12 20.75C-5.18982 11.0916 5.66687 -0.867651 12 5.57193Z"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
