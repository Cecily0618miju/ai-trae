import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Camera,
  CheckCircle2,
  Circle,
  Flame,
  Gauge,
  RotateCcw,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { DIRECTOR_LOADING_STEPS } from "@/utils/generatePlan";

interface Props {
  visible: boolean;
  error?: string | null;
  onRetry?: () => void;
  onCancel?: () => void;
}

const ICONS = { BookOpen, Flame, Camera, Smartphone, ShieldCheck, Gauge };

export default function LoadingOverlay({ visible, error, onRetry, onCancel }: Props) {
  const [stepIdx, setStepIdx] = useState(0);
  const total = DIRECTOR_LOADING_STEPS.length;

  useEffect(() => {
    if (!visible) {
      setStepIdx(0);
      return;
    }
    if (error) return;
    const timer = window.setInterval(() => {
      setStepIdx((current) => Math.min(current + 1, total));
    }, 360);
    return () => window.clearInterval(timer);
  }, [visible, error, total]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="AI 导演团正在生成方案"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-ink/60 px-4 py-6 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full max-w-xl rounded-[28px] border border-white/70 bg-white p-5 shadow-card sm:p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <motion.div
                animate={error ? {} : { scale: [1, 1.05, 1] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              >
                <BrandMark size="lg" />
              </motion.div>
              <div>
                <p className="eyebrow">六位 AI 导演协作</p>
                <h2 className="mt-1 font-serif text-xl font-semibold text-ink">
                  {error ? "方案生成遇到问题" : stepIdx >= total ? "导演方案已就绪" : "正在把素材变成可拍方案"}
                </h2>
                <p className="mt-1 text-xs text-muted">所有处理均在本地 Demo 规则引擎中完成</p>
              </div>
            </div>

            <div className="space-y-2" aria-live="polite">
              {DIRECTOR_LOADING_STEPS.map((step, index) => {
                const Icon = ICONS[step.icon as keyof typeof ICONS] || BookOpen;
                const failed = Boolean(error) && index === Math.min(stepIdx, total - 1);
                const done = !failed && index < stepIdx;
                const running = !failed && !error && index === stepIdx && stepIdx < total;
                return (
                  <div
                    key={step.agent}
                    className={`flex items-center gap-3 rounded-2xl border p-3 transition-colors ${
                      failed
                        ? "border-error/30 bg-error/5"
                        : running
                          ? "border-cinnabar/25 bg-cinnabar/5"
                          : done
                            ? "border-success/20 bg-success/5"
                            : "border-ink/5 bg-surface/45"
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-cinnabar shadow-soft">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium ${index > stepIdx && !error ? "text-muted" : "text-ink"}`}>{step.agent}</p>
                      <p className="truncate text-xs text-muted">{step.message}</p>
                    </div>
                    {failed ? (
                      <AlertTriangle className="h-5 w-5 shrink-0 text-error" />
                    ) : done ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    ) : running ? (
                      <motion.span
                        className="h-3 w-3 shrink-0 rounded-full bg-cinnabar"
                        animate={{ opacity: [0.35, 1, 0.35] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-ink/20" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-ink/10">
              <motion.div
                className={`h-full rounded-full ${error ? "bg-error" : "bg-gradient-to-r from-cinnabar to-gold"}`}
                animate={{ width: `${Math.max(6, Math.min(100, (stepIdx / total) * 100))}%` }}
              />
            </div>

            {error && (
              <div className="mt-5 rounded-2xl border border-error/20 bg-error/5 p-4">
                <p className="text-sm text-error">{error}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={onRetry} className="btn-primary">
                    <RotateCcw className="h-4 w-4" />重试生成
                  </button>
                  <button type="button" onClick={onCancel} className="btn-secondary">
                    <ArrowLeft className="h-4 w-4" />返回修改
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
