// 统一空状态/错误状态组件
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  icon: ReactNode;
  title: string;
  desc?: string;
  children?: ReactNode;
  tone?: "default" | "warning";
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  desc,
  children,
  tone = "default",
  className = "",
}: Props) {
  const isWarning = tone === "warning";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`card flex flex-col items-center justify-center py-16 text-center ${className}`}
    >
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
          isWarning
            ? "bg-cinnabar/8 text-cinnabar"
            : "bg-gradient-to-br from-ink/5 to-rice text-ink/35"
        }`}
      >
        {icon}
      </span>
      <h3 className="mt-4 font-serif text-lg font-semibold text-ink">{title}</h3>
      {desc && (
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink/50">{desc}</p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </motion.div>
  );
}
