// components/ui/RadioOption.tsx
type RadioOptionProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

export default function RadioOption({ label, checked, onChange }: RadioOptionProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <span className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
        <input
          type="radio"
          name="goingHome"
          checked={checked}
          onChange={onChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {checked && (
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400" />
        )}
      </span>
      <span className="text-sm sm:text-base">{label}</span>
    </label>
  );
}