// 结果页通用章节卡片
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  index: number;
  title: string;
  icon: ReactNode;
  accent?: "cinnabar" | "gold" | "jade" | "indigo";
  anchorId?: string;
  children: ReactNode;
}

const ACCENT_MAP = {
  cinnabar: { bg: "bg-cinnabar/10", text: "text-cinnabar", border: "border-cinnabar/20" },
  gold: { bg: "bg-gold/15", text: "text-gold-dark", border: "border-gold/30" },
  jade: { bg: "bg-jade/10", text: "text-jade", border: "border-jade/20" },
  indigo: { bg: "bg-indigo/10", text: "text-indigo", border: "border-indigo/20" },
};

export default function SectionCard({ index, title, icon, accent = "cinnabar", anchorId, children }: Props) {
  const a = ACCENT_MAP[accent];
  const finalId = anchorId ?? `m${index}`;
  return (
    <motion.section
      id={finalId}
      initial={{ opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className={`card ${anchorId ? "scroll-mt-32" : "scroll-mt-20"}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.bg} ${a.text}`}>
          {icon}
        </span>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink/40">
              {String(index).padStart(2, "0")}
            </span>
            <h3 className="font-serif text-lg font-semibold text-ink">{title}</h3>
          </div>
        </div>
      </div>
      {children}
    </motion.section>
  );
}
