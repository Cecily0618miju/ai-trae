import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Eye, Library as LibraryIcon, Plus, Search, ShieldCheck, Trash2, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import EmptyState from "@/components/EmptyState";
import ExportDialog from "@/components/ExportDialog";
import ScoreRing from "@/components/ScoreRing";
import Toast from "@/components/Toast";
import type { GeneratedPlan } from "@/data/types";
import { usePlanStore } from "@/store/usePlanStore";

export default function Library() {
  const library = usePlanStore((state) => state.library);
  const getPlanById = usePlanStore((state) => state.getPlanById);
  const removeFromLibrary = usePlanStore((state) => state.removeFromLibrary);
  const [query, setQuery] = useState("");
  const [exportPlan, setExportPlan] = useState<GeneratedPlan | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return library;
    return library.filter((item) => [item.heritageName, item.scene, item.platforms.join(" ")].join(" ").toLowerCase().includes(keyword));
  }, [library, query]);
  const deleting = library.find((item) => item.id === deleteId);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <main className="section py-10">
      <Toast message={toast} visible={Boolean(toast)} />
      <motion.header initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow"><LibraryIcon className="mr-1 inline h-3.5 w-3.5" />本地作品库</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">我的导演方案</h1>
          <p className="mt-2 text-sm text-muted">共 {library.length} 个方案，仅保存在当前浏览器。</p>
        </div>
        <Link to="/workspace" className="btn-primary"><Plus className="h-4 w-4" />新建方案</Link>
      </motion.header>

      {library.length > 0 && (
        <div className="panel mb-5 flex items-center gap-3 p-3">
          <Search className="ml-1 h-4 w-4 text-muted" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-h-10 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none" placeholder="搜索非遗名称、平台或传播目标" aria-label="搜索作品" />
          {query && <button type="button" onClick={() => setQuery("")} className="btn-ghost p-2" aria-label="清空搜索"><X className="h-4 w-4" /></button>}
          <span className="hidden text-xs text-muted sm:inline">找到 {filtered.length} 个</span>
        </div>
      )}

      {library.length === 0 ? (
        <EmptyState icon={<BrandMark size="lg" />} title="还没有保存的方案" desc="进入创作台生成导演包，并在结果页点击“保存方案”。">
          <Link to="/workspace" className="btn-primary"><Plus className="h-4 w-4" />开始创作</Link>
        </EmptyState>
      ) : filtered.length === 0 ? (
        <EmptyState icon={<Search className="h-8 w-8" />} title="没有找到匹配方案" desc="换一个非遗名称、平台或传播目标试试。">
          <button type="button" onClick={() => setQuery("")} className="btn-secondary">清空搜索</button>
        </EmptyState>
      ) : (
        <div className="grid gap-4">
          {filtered.map((item, index) => {
            const fullPlan = getPlanById(item.id);
            return (
              <motion.article key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="panel flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cinnabar/10 to-gold/20 font-serif text-2xl font-bold text-cinnabar">{item.heritageName.slice(0, 1)}</span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2"><h2 className="font-serif text-lg font-semibold text-ink">{item.heritageName}</h2><span className="tag-cinnabar">{item.status}</span></div>
                    <p className="mt-1 truncate text-xs text-muted">{item.scene}</p>
                    <div className="mt-2 flex flex-wrap gap-2">{item.platforms.map((platform) => <span key={platform} className="tag-jade">{platform}</span>)}<span className="tag-gold">{item.duration}</span></div>
                    <p className="mt-2 text-[11px] text-muted">{fullPlan?.createdAt ? `生成于 ${fullPlan.createdAt}` : "内置可体验案例"}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
                  <ScoreRing score={item.score} size={66} label="就绪度" />
                  <Link to={`/result/${item.id}`} className="btn-secondary px-3 py-2 text-xs"><Eye className="h-3.5 w-3.5" />查看</Link>
                  <button type="button" onClick={() => { const plan = getPlanById(item.id); if (plan) setExportPlan(plan); else notify("请先打开该案例，生成完整导演包后再导出"); }} className="btn-ghost px-3 py-2 text-xs"><Download className="h-3.5 w-3.5" />导出</button>
                  <button type="button" onClick={() => setDeleteId(item.id)} className="btn-ghost px-3 py-2 text-xs text-error hover:bg-error/5"><Trash2 className="h-3.5 w-3.5" />删除</button>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      <div className="mt-7 rounded-2xl border border-jade/20 bg-jade/5 p-4 text-xs leading-5 text-muted"><p className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-jade" />刷新页面不会丢失。需要跨设备使用时，请先把完整方案导出为 Markdown 或 JSON。</p></div>

      <ExportDialog visible={Boolean(exportPlan)} onClose={() => setExportPlan(null)} plan={exportPlan} />
      <AnimatePresence>
        {deleting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
            <motion.div initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-card" onClick={(event) => event.stopPropagation()}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-error/10 text-error"><Trash2 className="h-5 w-5" /></span>
              <h2 className="mt-4 font-serif text-xl font-semibold text-ink">删除「{deleting.heritageName}」？</h2>
              <p className="mt-2 text-sm leading-6 text-muted">完整方案和本地记录都会被移除，此操作无法撤销。</p>
              <div className="mt-6 flex gap-3"><button type="button" onClick={() => setDeleteId(null)} className="btn-secondary flex-1">取消</button><button type="button" onClick={() => { removeFromLibrary(deleting.id); setDeleteId(null); notify("方案已删除"); }} className="btn-primary flex-1 !bg-error">确认删除</button></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
