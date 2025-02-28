import { useTheme } from "next-themes";

function Ring2({ className }: { className?: string }) {
  const { theme, systemTheme } = useTheme();
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
    >
      <circle
        cx="80"
        cy="80"
        r="79.25"
        stroke={theme === "dark" ? "#F8F8F8" : theme ? "#1F1F1F" : systemTheme === "dark" ? "#F8F8F8" : "#1F1F1F"}
        strokeOpacity={theme === "dark" ? "0.01" : theme==="light" ? "0.05" : systemTheme === "dark" ? "0.01" : "0.05"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default Ring2;
