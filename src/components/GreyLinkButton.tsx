/** Grey, stylish text-link button used at the bottom of windows */
export const GreyLinkButton = ({
  onClick,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  ariaLabel?: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className="mx-auto block text-gray-500 hover:text-gray-700 text-sm font-medium underline-offset-2 hover:underline"
  >
    {children}
  </button>
);
