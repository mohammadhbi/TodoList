import { X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="relative max-w-md mx-auto mb-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input input-bordered w-full pr-10"
      />
      <button
        onClick={onClear}
        disabled={!value}
        className={`absolute right-3 top-1/2 -translate-y-1/2 transition-opacity ${
          value ? "text-gray-600 opacity-100" : "opacity-30 cursor-default"
        }`}
        aria-label="Clear search"
      >
        <X size={18} />
      </button>
    </div>
  );
}
