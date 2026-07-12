// 雷达图 - 传播评分可视化
import type { SpreadScore } from "../data/types";

interface Props {
  scores: SpreadScore;
  size?: number;
}

const LABELS: { key: keyof Omit<SpreadScore, "overall">; label: string }[] = [
  { key: "opening", label: "3秒钩子" },
  { key: "culture", label: "文化完整" },
  { key: "youthResonance", label: "受众匹配" },
  { key: "executability", label: "拍摄可执行性" },
  { key: "platformPotential", label: "平台适配" },
];

export default function RadarChart({ scores, size = 280 }: Props) {
  const center = size / 2;
  const radius = size / 2 - 50;
  const angleStep = (Math.PI * 2) / LABELS.length;

  // 数据点
  const points = LABELS.map((l, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const value = scores[l.key] / 100;
    return {
      x: center + Math.cos(angle) * radius * value,
      y: center + Math.sin(angle) * radius * value,
      labelX: center + Math.cos(angle) * (radius + 24),
      labelY: center + Math.sin(angle) * (radius + 24),
      label: l.label,
      value: scores[l.key],
    };
  });

  // 网格圈
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* 网格 */}
        {gridLevels.map((level) => {
          const gridPoints = LABELS.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            return `${center + Math.cos(angle) * radius * level},${center + Math.sin(angle) * radius * level}`;
          }).join(" ");
          return (
            <polygon
              key={level}
              points={gridPoints}
              fill="none"
              stroke="#1A1A1A"
              strokeOpacity={level === 1 ? 0.15 : 0.08}
              strokeWidth="1"
            />
          );
        })}

        {/* 轴线 */}
        {LABELS.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + Math.cos(angle) * radius}
              y2={center + Math.sin(angle) * radius}
              stroke="#1A1A1A"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          );
        })}

        {/* 数据多边形 */}
        <polygon
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="#C8392E"
          fillOpacity="0.18"
          stroke="#C8392E"
          strokeWidth="2"
        />

        {/* 数据点 */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#C8392E" stroke="#fff" strokeWidth="1.5" />
        ))}

        {/* 标签 */}
        {points.map((p, i) => (
          <g key={i}>
            <text
              x={p.labelX}
              y={p.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-ink text-[11px] font-medium"
            >
              {p.label}
            </text>
            <text
              x={p.labelX}
              y={p.labelY + 14}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-cinnabar text-[12px] font-bold"
            >
              {p.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
