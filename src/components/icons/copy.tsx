import { useTheme } from "next-themes";

export default function CopyIcon() {
  const { theme } = useTheme();
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="dark:stroke-[#F8F8F8] stroke-[#1F1F1F]"
        width="24px" 
        height="24px" 
        viewBox="0 0 24 24" 
        fill="none"
    >
    <path 
        d="M3 16V4C3 2.89543 3.89543 2 5 2H15M9 22H18C19.1046 22 20 21.1046 20 20V8C20 6.89543 19.1046 6 18 6H9C7.89543 6 7 6.89543 7 8V20C7 21.1046 7.89543 22 9 22Z" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    />
    </svg>
  );
}
