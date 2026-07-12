// 9:16 手机风格视频预览器
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Bookmark, Share2, Play, Pause } from "lucide-react";
import type { Shot } from "../data/types";
import HeritageCover from "./HeritageCover";
import BrandMark from "./BrandMark";

interface Props {
  shots: Shot[];
  heritageName: string;
  activeShotIdx: number;
  onShotChange: (idx: number) => void;
}

const GRADIENT_MAP: Record<string, string> = {
  "糖画": "from-amber-600/30 to-amber-800/60",
  "剪纸": "from-red-700/40 to-red-900/70",
  "皮影": "from-amber-700/30 to-amber-900/50",
  "苏绣": "from-emerald-600/30 to-emerald-800/50",
};

const PREVIEW_ACTIONS = [
  { Icon: Heart, label: "点赞" },
  { Icon: MessageCircle, label: "评论" },
  { Icon: Bookmark, label: "收藏" },
  { Icon: Share2, label: "分享" },
];

function getGradient(heritageName: string): string {
  return GRADIENT_MAP[heritageName] ?? "from-ink/50 to-ink/80";
}

export default function VideoPreviewer({
  shots,
  heritageName,
  activeShotIdx,
  onShotChange,
}: Props) {
  const currentShot = shots[activeShotIdx];
  const gradient = useMemo(() => getGradient(heritageName), [heritageName]);
  const [playing, setPlaying] = useState(false);

  // 自动播放：每 2.5s 切换下一分镜，循环
  useEffect(() => {
    if (!playing || shots.length <= 1) return;
    const timer = setInterval(() => {
      onShotChange((activeShotIdx + 1) % shots.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [playing, activeShotIdx, shots.length, onShotChange]);

  return (
    <div className="relative mx-auto aspect-[9/16] w-[320px] max-w-full rounded-[32px] border-2 border-ink/15 bg-ink shadow-card">
      {/* Phone inner screen */}
      <div className="absolute inset-1 rounded-[28px] overflow-hidden">
        {/* Animated shot content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeShotIdx}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            className={`absolute inset-0 bg-gradient-to-b ${gradient} flex flex-col`}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
              <HeritageCover name={heritageName} className="h-full w-full" />
            </div>
            {/* Top header bar */}
            <div className="relative z-10 flex items-center justify-between px-3 pt-2 pb-1">
              <div className="flex items-center gap-1.5">
                <BrandMark size="sm" className="!h-7 !w-7 !rounded-full !border-white/30" />
                <span className="text-white text-xs font-medium">
                  {heritageName}
                </span>
              </div>
              <span className="rounded-full border border-white/25 bg-ink/25 px-2.5 py-0.5 text-[9px] font-medium text-white/75 backdrop-blur-sm">
                交互原型 · 无虚拟数据
              </span>
            </div>

            {/* Duration badge */}
            {currentShot && (
              <div className="absolute top-10 right-2 z-10 rounded-md bg-ink/50 px-1.5 py-0.5 text-[10px] text-white/70 backdrop-blur-sm">
                {currentShot.duration}
              </div>
            )}

            {/* Center content area */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4">
              {/* Heritage name */}
              <motion.h2
                key={`name-${activeShotIdx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-4xl font-serif font-bold text-white/90 text-center"
              >
                {heritageName}
              </motion.h2>

              {/* Shot description */}
              {currentShot && (
                <motion.p
                  key={`desc-${activeShotIdx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mt-3 text-sm text-white/70 max-w-[85%] mx-auto text-center line-clamp-3"
                >
                  {currentShot.description}
                </motion.p>
              )}
            </div>

            {/* Bottom area */}
            <div className="relative z-10 px-4 pb-14">
              {currentShot && (
                <>
                  {/* Subtitle */}
                  <motion.p
                    key={`sub-${activeShotIdx}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    className="font-serif text-base font-semibold text-white bg-ink/30 rounded-lg px-4 py-2 max-w-[90%] mx-auto mb-4 text-center"
                  >
                    {currentShot.subtitle}
                  </motion.p>

                  {/* Brand tag */}
                  <p className="text-xs text-white/50 text-center">
                    @匠心出圈AI导演
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right side floating action buttons */}
        <div className="absolute right-2 bottom-1/3 flex flex-col items-center gap-4 z-10">
          {PREVIEW_ACTIONS.map(({ Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={`${label}交互位预览`}
              className="flex flex-col items-center gap-0.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/40 backdrop-blur-sm">
                <Icon className="h-5 w-5 text-white/80" />
              </div>
              <span className="text-[9px] text-white/60">{label}</span>
            </button>
          ))}
        </div>

        {/* Shot indicator dots + 自动播放按钮 */}
        {shots.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              {shots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => onShotChange(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === activeShotIdx
                      ? "h-1.5 w-5 bg-white"
                      : "h-1.5 w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/35"
              aria-label={playing ? "暂停自动播放" : "自动播放分镜"}
              title={playing ? "暂停自动播放" : "自动播放分镜"}
            >
              {playing ? (
                <Pause className="h-3.5 w-3.5 text-white" />
              ) : (
                <Play className="h-3.5 w-3.5 fill-white text-white" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
