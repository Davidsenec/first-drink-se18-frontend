type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  children,
  onClick
}: ButtonProps) {
  return (
    <button
    onClick={onClick}
      className="
        w-full
        rounded-xl
        bg-emerald-400
        py-4
        font-bold
        tracking-widest
        text-black
        hover:bg-emerald-500
        mt-6
      "
    >
      {children}
    </button>
  );
}