import { Specialisation } from "@/types";
import CourseCard from "../components/CourseCard";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  spec: Specialisation;
  programCode: string;
  colorCode: string;
};

const Specialisations = ({ spec, programCode, colorCode }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <h2
        onClick={() => setOpen((prev) => !prev)}
        className={`text-2xl font-bold text-gray-800 ${
          open && "mb-6"
        } cursor-pointer flex items-center gap-2 border-l-[3px] border-gray-300 pl-3 w-fit`}
      >
        {spec.title}
        {open ? <ChevronUp /> : <ChevronDown />}
      </h2>
      {open && (
        <div className="flex flex-wrap gap-4" >
          {spec.courses.map((course, i) => (
            <CourseCard
              rating={5}
              key={course.code}
              programCode={programCode}
              colorCode={colorCode}
              {...course}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Specialisations;
