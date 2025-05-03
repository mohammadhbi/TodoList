interface FilterControlsProps {
  value: "all" | "completed" | "incomplete";
  onChange: (value: "all" | "completed" | "incomplete") => void;
}

export default function FilterControls({
  value,
  onChange,
}: FilterControlsProps) {
  return (
    <div className="flex gap-2 justify-center mb-4">
      {["all", "completed", "incomplete"].map((type) => (
        <button
          key={type}
          onClick={() => onChange(type as FilterControlsProps["value"])}
          className={`btn btn-sm ${
            value === type ? "btn-primary" : "btn-outline"
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}
