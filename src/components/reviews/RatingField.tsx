import { useState } from "react";
import { Star } from "lucide-react";

const RatingField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const getColorClasses = (val: number) => {
    if (val <= 1) return "text-red-500 fill-red-400";
    if (val <= 2) return "text-orange-500 fill-orange-400";
    if (val <= 3) return "text-yellow-500 fill-yellow-400";
    if (val <= 4) return "text-lime-500 fill-lime-400";
    return "text-green-500 fill-green-400";
  };

  const color = getColorClasses(hovered || value);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={24}
            onClick={() => onChange(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`cursor-pointer transition ${
              (hovered ?? value) >= i ? color : "stroke-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingField;
