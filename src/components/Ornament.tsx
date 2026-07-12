// 中国传统纹样装饰组件
interface Props {
  variant?: "cloud" | "seal" | "wave" | "frame";
  className?: string;
}

export default function Ornament({ variant = "cloud", className = "" }: Props) {
  if (variant === "seal") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <div className="seal aspect-square h-full p-2 text-center leading-tight">
          匠心<br />出圈
        </div>
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <svg viewBox="0 0 200 20" className={className} preserveAspectRatio="none">
        <path
          d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />
        <path
          d="M0 14 Q 25 4, 50 14 T 100 14 T 150 14 T 200 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />
      </svg>
    );
  }

  if (variant === "frame") {
    return (
      <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="none">
        <path
          d="M5 5 L20 5 M5 5 L5 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <path
          d="M95 5 L80 5 M95 5 L95 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <path
          d="M5 95 L20 95 M5 95 L5 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <path
          d="M95 95 L80 95 M95 95 L95 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        />
      </svg>
    );
  }

  // cloud 默认
  return (
    <svg viewBox="0 0 120 60" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4">
        <path d="M10 40 Q 10 25, 25 25 Q 30 15, 45 20 Q 60 10, 70 25 Q 85 25, 85 40 Z" />
        <path d="M20 45 Q 20 35, 30 35 Q 35 28, 45 32 Q 55 25, 62 35 Q 72 35, 72 45 Z" opacity="0.6" />
      </g>
    </svg>
  );
}
