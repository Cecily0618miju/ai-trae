interface Props {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: "h-8 w-8 rounded-xl",
  md: "h-10 w-10 rounded-2xl",
  lg: "h-16 w-16 rounded-[22px]",
};

export default function BrandMark({ size = "md", className = "" }: Props) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden border border-cinnabar/10 bg-rice shadow-soft ${SIZE_MAP[size]} ${className}`}
    >
      <img
        src={`${import.meta.env.BASE_URL}jiangxin-logo.png`}
        alt="匠心出圈 Logo"
        className="h-full w-full scale-[1.34] object-cover"
      />
    </span>
  );
}
