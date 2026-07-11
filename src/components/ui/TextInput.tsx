type TextInputProps = {
  label: string;
  type?: string;
  placeholder?: string;
};

export default function TextInput({
  label,
  type = "text",
  placeholder,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-white">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          bg-[#1B1D2F]
          px-5
          py-4
          text-white
          focus:outline-none
        "

      />
    </div>
  );
}