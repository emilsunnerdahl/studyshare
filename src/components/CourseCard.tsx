import { Link } from "react-router-dom";

type CourseCardProps = {
    code: string;
    name: string;
    credits: number;
    rating: number;
};

const CourseCard = ({ code, name, credits, rating }: CourseCardProps) => {
    return (
        <Link
            className="bg-white shadow-md border border-gray-200 rounded-xl p-4 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33%-1rem)] lg:w-[calc(25%-1rem)] transition hover:shadow-lg"
            to={"/courses/" + code}
        >
            <div className="text-sm text-gray-500 font-mono">{code}</div>
            <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">
                {name}
            </h3>
            <p className="text-sm text-gray-700 mb-2">{credits} hp</p>
            <div className="text-sm font-medium text-indigo-600">
                {rating.toFixed(1)} / 5.0 ⭐
            </div>
            <p className="text-xs text-gray-400">42 reviews</p>{" "}
            {/* Static for now */}
        </Link>
    );
};

export default CourseCard;
