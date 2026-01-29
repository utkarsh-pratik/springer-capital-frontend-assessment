type ButtonProps = {
    label: string;
    onClick?: () => void;
    active?: boolean;
  };
  
  export default function Button({
    label,
    onClick,
    active = false,
  }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition
          ${
            active
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
      >
        {label}
      </button>
    );
  }
  