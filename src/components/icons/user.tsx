import { useTheme } from "next-themes";

export default function User() {
  const { theme } = useTheme();
  return (
    <svg 
        className="dark:stroke-[#F8F8F8] stroke-[#1F1F1F]"
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <path 
            d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z" 
            strokeOpacity="0.7"
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
    </svg>
  );
}
