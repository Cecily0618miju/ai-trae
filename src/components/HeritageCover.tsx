// 非遗工艺感封面 - 用 CSS 渐变 + SVG 纹样还原真实工艺质感
import type { ReactNode } from "react";

interface Props {
  name: string;
  className?: string;
  children?: ReactNode;
}

// 糖画：琥珀糖浆流动质感
function SugarPaintingPattern() {
  return (
    <>
      {/* 多层径向渐变模拟糖浆透光 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255, 200, 87, 0.55) 0%, transparent 45%), radial-gradient(ellipse at 75% 70%, rgba(217, 130, 43, 0.6) 0%, transparent 50%), linear-gradient(135deg, #6B3410 0%, #A85A1F 45%, #D4A24C 100%)",
        }}
      />
      {/* 糖浆流动线条 */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sugar-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFE08A" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFD56B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFE08A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M -20 80 Q 100 40, 200 90 T 420 70" stroke="url(#sugar-line)" strokeWidth="3" fill="none" opacity="0.8" />
        <path d="M -20 130 Q 120 90, 220 140 T 420 120" stroke="url(#sugar-line)" strokeWidth="2" fill="none" opacity="0.6" />
        {/* 糖滴光点 */}
        <circle cx="80" cy="60" r="3" fill="#FFE08A" opacity="0.7" />
        <circle cx="280" cy="100" r="2.5" fill="#FFD56B" opacity="0.6" />
        <circle cx="180" cy="150" r="2" fill="#FFE08A" opacity="0.5" />
      </svg>
    </>
  );
}

// 剪纸：红纸镂空窗花
function PaperCuttingPattern() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #8B1A1A 0%, #C8392E 50%, #A02822 100%)",
        }}
      />
      {/* 窗花对称纹样 */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="paper-grain" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="#C8392E" />
            <circle cx="2" cy="2" r="0.5" fill="#8B1A1A" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="400" height="200" fill="url(#paper-grain)" opacity="0.4" />
        {/* 中心窗花 */}
        <g transform="translate(200 100)" opacity="0.18" fill="none" stroke="#FFE0D0" strokeWidth="1.2">
          <circle r="38" />
          <circle r="26" />
          {/* 八瓣花 */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45})`}>
              <path d="M 0 -38 Q 8 -50, 0 -62 Q -8 -50, 0 -38 Z" fill="#FFE0D0" opacity="0.5" />
              <line x1="0" y1="-38" x2="0" y2="-70" />
            </g>
          ))}
        </g>
        {/* 四角小花 */}
        {[
          [40, 40], [360, 40], [40, 160], [360, 160],
        ].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx} ${cy})`} opacity="0.15" fill="#FFE0D0">
            <circle r="6" />
            {Array.from({ length: 4 }).map((_, j) => (
              <ellipse key={j} cx="0" cy="-10" rx="3" ry="6" transform={`rotate(${j * 90})`} />
            ))}
          </g>
        ))}
      </svg>
    </>
  );
}

// 皮影：光影幕布剪影
function ShadowPuppetPattern() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(255, 196, 87, 0.55) 0%, rgba(217, 130, 43, 0.3) 35%, rgba(26, 26, 26, 0.95) 85%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
        {/* 幕布纹理 */}
        <defs>
          <radialGradient id="shadow-glow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#FFD56B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFD56B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="url(#shadow-glow)" />
        {/* 皮影人物剪影 */}
        <g transform="translate(200 110)" fill="#1A1A1A" opacity="0.85">
          {/* 头 */}
          <circle cx="0" cy="-50" r="12" />
          {/* 帽子/头饰 */}
          <path d="M -14 -58 L 0 -75 L 14 -58 Z" />
          {/* 身体 */}
          <path d="M -8 -38 Q 0 -42, 8 -38 L 14 10 Q 0 16, -14 10 Z" />
          {/* 手臂（操纵杆姿态） */}
          <path d="M -8 -30 Q -28 -20, -36 -5" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 8 -30 Q 28 -20, 36 -8" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* 腿 */}
          <path d="M -6 10 L -10 38" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round" />
          <path d="M 6 10 L 10 38" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round" />
        </g>
        {/* 操纵杆线条 */}
        <g stroke="#3A2A1A" strokeWidth="1" opacity="0.5">
          <line x1="164" y1="105" x2="120" y2="80" />
          <line x1="236" y1="102" x2="280" y2="78" />
        </g>
      </svg>
    </>
  );
}

// 苏绣：丝线交织丝绸光泽
function SuEmbroideryPattern() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1F4F47 0%, #2D7A6E 45%, #C9A961 100%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="silk-warp" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#F0E0A0" strokeWidth="0.6" opacity="0.35" />
          </pattern>
          <pattern id="silk-weft" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#A8D4C8" strokeWidth="0.6" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="400" height="200" fill="url(#silk-warp)" />
        <rect width="400" height="200" fill="url(#silk-weft)" />
        {/* 丝绸高光带 */}
        <path d="M -20 60 Q 200 30, 420 80" stroke="#F5EBC0" strokeWidth="14" fill="none" opacity="0.18" />
        <path d="M -20 140 Q 200 170, 420 130" stroke="#A8D4C8" strokeWidth="10" fill="none" opacity="0.2" />
        {/* 绣面花纹（缠枝） */}
        <g transform="translate(200 100)" opacity="0.3" fill="none" stroke="#F5EBC0" strokeWidth="1.2">
          <path d="M -50 0 Q -30 -20, 0 -10 Q 30 0, 50 -15" />
          <path d="M -50 10 Q -30 30, 0 20 Q 30 10, 50 25" />
          <circle cx="0" cy="-10" r="4" fill="#F5EBC0" opacity="0.5" />
          <circle cx="30" cy="0" r="3" fill="#F5EBC0" opacity="0.4" />
          <circle cx="-25" cy="10" r="3" fill="#F5EBC0" opacity="0.4" />
        </g>
      </svg>
    </>
  );
}

// 通用渐变（未命中的非遗项目）
function GenericPattern() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #5B4B8A 0%, #C8392E 60%, #C9A961 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0%, transparent 40%)",
        }}
      />
    </>
  );
}

const PATTERN_MAP: Record<string, () => JSX.Element> = {
  "糖画": SugarPaintingPattern,
  "剪纸": PaperCuttingPattern,
  "皮影": ShadowPuppetPattern,
  "皮影戏": ShadowPuppetPattern,
  "苏绣": SuEmbroideryPattern,
};

export default function HeritageCover({ name, className = "", children }: Props) {
  const Pattern = PATTERN_MAP[name] ?? GenericPattern;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Pattern />
      {/* 顶部暗角，增强文字可读性 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      {children}
    </div>
  );
}
