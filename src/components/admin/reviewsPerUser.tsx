import useReviews from "@/hooks/useReviews";
import { ReviewTable } from "@/types";
import { Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";

type SortColumn =
  | "course_name"
  | "course_code"
  | "comment"
  | "rating"
  | "created_at"
  | null;
type SortDirection = "asc" | "desc";

interface HeaderConfig {
  key: SortColumn;
  label: string;
  isRounded?: "left" | "right" | undefined;
}

const HEADERS: HeaderConfig[] = [
  { key: "course_name", label: "Course Name", isRounded: "left" },
  { key: "course_code", label: "Course Code" },
  { key: "comment", label: "Review Comment" },
  { key: "rating", label: "Rating" },
  { key: "created_at", label: "Created At" },
];

interface TableHeaderProps {
  column: SortColumn;
  label: string;
  isRounded?: "left" | "right" | undefined;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
}

function TableHeader({
  column,
  label,
  isRounded,
  sortColumn,
  sortDirection,
  onSort,
}: TableHeaderProps) {
  const getRoundedClass = () => {
    if (isRounded === "left") return "rounded-tl-2xl";
    if (isRounded === "right") return "rounded-tr-2xl";
    return "";
  };

  const isActive = sortColumn === column;

  return (
    <th
      className={`px-6 py-3 text-left ${
        isRounded ? getRoundedClass() : ""
      } cursor-pointer hover:bg-gray-200 transition`}
      onClick={() => onSort(column)}
    >
      <div className="flex items-center gap-2">
        {label}
        {isActive &&
          (sortDirection === "asc" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          ))}
      </div>
    </th>
  );
}

export default function ReviewsPerUser({
  setDeleting,
}: {
  setDeleting: (value: string | null) => void;
}) {
  const { data: reviews = [], isLoading } = useReviews();
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const groupedByUser = reviews.reduce((acc, review) => {
    if (!acc[review.user_id]) {
      acc[review.user_id] = [];
    }
    acc[review.user_id].push(review);
    return acc;
  }, {} as Record<string, ReviewTable[]>);

  console.log(groupedByUser);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString("sv-SE", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  if (isLoading) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Reviews</h1>

      {Object.entries(groupedByUser).map(([userId, userReviews]) => (
        <div key={userId}>
          <h2 className="m-3">User {userId}</h2>
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-900 uppercase text-xs tracking-wider">
                <tr>
                  {HEADERS.map((header) => (
                    <TableHeader
                      key={header.key}
                      column={header.key}
                      label={header.label}
                      isRounded={header.isRounded}
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                    />
                  ))}
                  <th className="px-6 py-3 text-center rounded-tr-2xl"></th>
                </tr>
              </thead>
              <tbody>
                {userReviews.map((review, index) => (
                  <tr
                    key={review.id}
                    className={`border-t border-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {review.course_name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {review.course_code}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {review.comment}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{review.rating}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {formatDate(review.created_at)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setDeleting(review.id);
                        }}
                        className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        aria-label="Delete review"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
