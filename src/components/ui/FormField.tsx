const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  readOnly = false,
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
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
      readOnly={readOnly}
      disabled={disabled}
      className="w-full border border-gray-300 rounded-md px-4 py-2
                 disabled:bg-gray-100 disabled:text-gray-500
                 read-only:bg-gray-100 read-only:text-gray-500"
    />
  </div>
);

export default FormField;
