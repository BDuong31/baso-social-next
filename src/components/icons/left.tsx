import { useTheme } from "next-themes";

export default function LeftIcon() {
  const { theme } = useTheme();
  return (
    <svg
      className="w-6 h-6 dark:stroke-[#F8F8F8] stroke-[#1F1F1F]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13.3787 16L10.4393 13.0607C9.85355 12.4749 9.85355 11.5251 10.4393 10.9393L13.3787 8"
        strokeOpacity="0.8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
