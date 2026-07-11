type ButtonProps = {
  children: React.ReactNode;
};

export default function Button({
  children,
}: ButtonProps) {
  return (
    <button
      className="
        w-full
        rounded-xl
        bg-emerald-400
        py-4
        font-bold
        tracking-widest
        text-black
        hover:bg-emerald-500
      "
    >
      {children}
    </button>
  );
}