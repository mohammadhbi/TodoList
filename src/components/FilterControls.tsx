interface FilterControlsProps {
  value: "all" | "completed" | "incomplete";
  onChange: (value: "all" | "completed" | "incomplete") => void;
}

export default function FilterControls({
  value,
  onChange,
}: FilterControlsProps) {
  return (
    <div className="flex justify-center gap-3 mb-6">
      {["all", "completed", "incomplete"].map((type) => {
        const isActive = value === type;
        return (
          <button
            key={type}
            onClick={() => onChange(type as FilterControlsProps["value"])}
            className={`btn btn-sm rounded-full px-4 transition font-medium shadow-sm
          ${
            isActive
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "bg-white border border-emerald-300 text-emerald-600 hover:bg-emerald-50"
          }
        `}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        );
      })}
    </div>
  );
}
