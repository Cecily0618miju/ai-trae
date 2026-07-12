// 评分圆环
interface Props {
  score: number;
  size?: number;
  label?: string;
}

export default function ScoreRing({ score, size = 88, label }: Props) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // 颜色根据分数
  const color = score >= 90 ? "#C8392E" : score >= 85 ? "#C9A961" : "#2D7A6E";

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1A1A1A"
          strokeOpacity="0.08"
          strokeWidth="5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="num-display text-lg leading-none" style={{ color }}>
          {score}
        </span>
        {label && <span className="mt-0.5 text-[9px] text-ink/50">{label}</span>}
      </div>
    </div>
  );
}
