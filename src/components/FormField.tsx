const FormField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
}: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}) => (
    <div>
        <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1"
        >
            {label}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
    </div>
);

export default FormField;
