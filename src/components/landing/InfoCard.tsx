import { type LucideIcon } from "lucide-react";

type InfoCardProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const InfoCard = ({ title, description, Icon }: InfoCardProps) => (
  <div className="bg-white border-t-4 border-indigo-500 rounded-xl shadow-md p-6 flex-1 transition hover:shadow-xl">
    <div className="flex gap-3 items-center">
      <Icon className="text-blue-700" />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default InfoCard;
