import { useTheme } from "next-themes";

function Ring1({ className }: { className?: string }) {
  const { theme, systemTheme } = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="117"
      height="116"
      viewBox="0 0 117 116"
      fill="none"
      className={className}
    >
      <circle
        cx="58.5"
        cy="58"
        r="57.25"
        stroke={theme === "dark" ? "#F8F8F8" : theme === "light" ? "#1F1F1F" : systemTheme === "dark" ? "#F8F8F8" : "#1F1F1F"}
        strokeOpacity={theme === "dark" ? "0.02" : theme ==="light" ? "0.1" : systemTheme === "dark" ? "0.02" : "0.1"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default Ring1;
