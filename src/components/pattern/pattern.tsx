"use client";
import { FC, useEffect, useState } from "react";
import ColorThief from "colorthief";
interface CheckerboardEmojiProps {
  emoji: string; // Emoji từ props
  onColor: (color: string) => void; // Callback để truyền màu ra ngoài
}

const CheckerboardEmoji: FC<CheckerboardEmojiProps> = ({ emoji, onColor }) => {
  const [color, setColor] = useState<string>("#ffffff"); // Màu mặc định

  useEffect(() => {
    const getEmojiImageData = (): Promise<string> => {
      return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return resolve("");

        canvas.width = 72;
        canvas.height = 72;
        ctx.font = "72px sans-serif";
        ctx.fillText(emoji, 0, 64);

        resolve(canvas.toDataURL("image/png"));
      });
    };

    const rgbToHex = (r: number, g: number, b: number): string => {
        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    };

    const extractColor = async () => {
      const dataUrl = await getEmojiImageData();
      if (!dataUrl) return;

      const img = new Image();
      img.src = dataUrl;
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const colorThief = new ColorThief();
        const colors = colorThief.getColor(img);
        const extractedColor = rgbToHex(colors[0], colors[1], colors[2]);

        setColor(extractedColor);
        onColor(extractedColor); // Truyền màu ra ngoài component
      };
    };

    extractColor();
  }, [emoji, onColor]);

  const cols = 6;
  const rows = 10;
  const cellWidth = 100 / cols;
  const cellHeight = 100 / rows;

  return (
    <div className="relative w-full flex flex-col">
      {/* Màn hình chứa icon */}
      <div className="relative w-[100%] h-[500px] text-black">
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              className="absolute"
              style={{
                left: `${col * cellWidth}%`,
                top: `${row * cellHeight}%`,
                width: `${cellWidth}%`,
                height: `${cellHeight}%`,
                display: (row + col) % 2 === 0 ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
                transform: `rotate(${Math.random() * 360}deg)`,
                fontSize: "4rem",
              }}
            >
              {emoji}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckerboardEmoji;
