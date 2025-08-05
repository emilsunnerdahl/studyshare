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
                            (hovered ?? value) >= i
                                ? "fill-yellow-400 stroke-yellow-500"
                                : "stroke-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default RatingField;
