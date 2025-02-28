import { useTheme } from "next-themes";

function Ring3({ className }: { className?: string }) {
  const { theme, systemTheme } = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="201"
      height="176"
      viewBox="0 0 201 176"
      fill="none"
    >
      <circle
        cx="100.5"
        cy="76"
        r="99.25"
        stroke={theme === "dark" ? "#F8F8F8" : theme ? "#1F1F1F" : systemTheme === "dark" ? "#F8F8F8" : "#1F1F1F"}
        strokeOpacity={theme === "dark" ? "0.01" : theme==="light" ? "0.05" : systemTheme === "dark" ? "0.01" : "0.05"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default Ring3;
