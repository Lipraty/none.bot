interface SectionDotProps {
  isActive: boolean;
  isDark: boolean;
  onClick: () => void;
  label: string;
}

export default function SectionDot({ isActive, isDark, onClick, label }: SectionDotProps) {
  return (
    <button
      onClick={onClick}
      className={`w-3 h-3 rounded-full transition-all duration-300 ${
        isActive
          ? "bg-purple-600 scale-125"
          : isDark
            ? "bg-white/30 hover:bg-white/70"
            : "bg-gray-400/30 hover:bg-gray-400/70"
      }`}
      aria-label={label}
    ></button>
  );
}
