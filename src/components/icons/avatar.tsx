import { useTheme } from "next-themes";

export default function Avatar() {
  const { theme } = useTheme();
  return (
    <svg
      className="dark:stroke-[#F8F8F8] stroke-[#1F1F1F]"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11.25 3.75H6.75C5.09315 3.75 3.75 5.09315 3.75 6.75V17.25C3.75 18.9069 5.09314 20.25 6.75 20.25H7.25647M20.25 12.75V17.25C20.25 18.9069 18.9069 20.25 17.25 20.25H16.7435M7.25647 20.25C7.38647 17.7429 9.46051 15.75 12 15.75C14.5395 15.75 16.6135 17.7429 16.7435 20.25M7.25647 20.25H16.7435M19 1.75L20.0833 3.91667L22.25 5L20.0833 6.08333L19 8.25L17.9167 6.08333L15.75 5L17.9167 3.91667L19 1.75ZM14.75 10.5C14.75 12.0188 13.5188 13.25 12 13.25C10.4812 13.25 9.25 12.0188 9.25 10.5C9.25 8.98122 10.4812 7.75 12 7.75C13.5188 7.75 14.75 8.98122 14.75 10.5Z"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
