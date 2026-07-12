// Toast 提示组件
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  message: string;
  visible: boolean;
  tone?: "success" | "error";
}

export default function Toast({ message, visible, tone = "success" }: Props) {
  const isError = tone === "error";
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
        >
          <div
            className={`flex items-center gap-3 rounded-full px-6 py-3 text-sm text-white shadow-card ${
              isError ? "bg-cinnabar" : "bg-ink"
            }`}
          >
            {isError ? (
              <AlertCircle className="h-4 w-4 text-white" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-jade-light" />
            )}
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
