const TestimonialCard = ({
    quote,
    author,
}: {
    quote: string;
    author: string;
}) => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-left flex-1">
        <p className="italic text-gray-700 mb-2">"{quote}"</p>
        <p className="text-sm text-gray-600 font-medium">- {author}</p>
    </div>
);

export default TestimonialCard;
