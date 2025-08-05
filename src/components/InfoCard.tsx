// components/InfoCard.tsx
type InfoCardProps = {
    title: string;
    description: string;
};

const InfoCard = ({ title, description }: InfoCardProps) => (
    <div className="bg-white border-t-4 border-indigo-500 rounded-xl shadow-md p-6 flex-1 transition hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

export default InfoCard;
