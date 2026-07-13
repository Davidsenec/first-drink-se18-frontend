type TextInputNLBProps = {
  type?: string;
  placeholder?: string;
};

export default function TextInputNLB({
  type = "text",
  placeholder,
}: TextInputNLBProps) {
  return (
    <div className="flex flex-col gap-2">

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