import { useTheme } from "next-themes";

export default function Check() {
  const { theme } = useTheme();
  return (
    <svg
      className="dark:stroke-[#F8F8F8] stroke-[#1F1F1F]"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 13.875L10.0541 17L18 7"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
