import React from "react";

type RatingBarProps = {
  value: number; // rating 0–5
  size?: "sm" | "lg";
};

const getColor = (value: number) => {
  if (value >= 4) return "bg-green-400";
  if (value >= 3) return "bg-blue-400";
  if (value >= 2) return "bg-yellow-400";
  if (value > 1) return "bg-red-400";
  return "text-green-500 fill-green-400"
};

export default function RatingBar({ value, size = "sm" }: RatingBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), 5);
  const percentage = (clampedValue / 5) * 100;

  return (
    <div
      className={`w-full rounded-full bg-gray-200 overflow-hidden ${
        size === "lg" ? "h-4" : "h-2"
      }`}
    >
      <div
        className={`${getColor(value)} h-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
