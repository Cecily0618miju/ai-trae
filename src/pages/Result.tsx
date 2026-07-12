import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCopy,
  Download,
  Flame,
  Gauge,
  LayoutGrid,
  Lightbulb,
  ListChecks,
  MessageSquareText,
  MonitorPlay,
  RotateCcw,
  Rows3,
  Save,
  ScrollText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Type,
} from "lucide-react";
import ExportDialog from "@/components/ExportDialog";
import RadarChart from "@/components/RadarChart";
import ScoreRing from "@/components/ScoreRing";
import SectionCard from "@/components/SectionCard";
import Toast from "@/components/Toast";
import VideoPreviewer from "@/components/VideoPreviewer";
import { CASE_LIST, SUGAR_PAINTING_PLAN } from "@/data/mockData";
import type { GeneratedPlan, ProjectInput, ShootingList } from "@/data/types";
import { usePlanStore } from "@/store/usePlanStore";
import { generatePlan } from "@/utils/generatePlan";

const MODULES = [
  { id: "topics", short: "选题", title: "爆款选题", icon: Flame },
  { id: "script", short: "脚本", title: "完整脚本", icon: ScrollText },
  { id: "shots", short: "分镜", title: "导演分镜", icon: Camera },
  { id: "covers", short: "封面", title: "封面文案", icon: Type },
  { id: "subtitles", short: "口播", title: "字幕口播", icon: MessageSquareText },
  { id: "platforms", short: "平台", title: "平台版本", icon: Smartphone },
  { id: "shooting", short: "清单", title: "拍摄清单", icon: ListChecks },
  { id: "readiness", short: "就绪", title: "拍摄就绪度", icon: Gauge },
  { id: "culture", short: "核验", title: "文化核验", icon: ShieldCheck },
  { id: "advice", short: "建议", title: "优化建议", icon: Lightbulb },
] as const;

const LIST_LABELS: { key: keyof ShootingList; title: string }[] = [
  { key: "props", title: "道具" },
  { key: "scenes", title: "场景" },
  { key: "closeups", title: "特写" },
  { key: "people", title: "人物" },
  { key: "environment", title: "环境" },
  { key: "audio", title: "收音" },
  { key: "lighting", title: "光线" },
];

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentPlan = usePlanStore((state) => state.currentPlan);
  const getPlanById = usePlanStore((state) => state.getPlanById);
  const saveToLibrary = usePlanStore((state) => state.saveToLibrary);
  const setCurrentPlan = usePlanStore((state) => state.setCurrentPlan);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [activeShotIdx, setActiveShotIdx] = useState(0);
  const [shotView, setShotView] = useState<"cards" | "rows">("cards");
  const [confirmedShots, setConfirmedShots] = useState<Set<string>>(new Set());
  const [exportVisible, setExportVisible] = useState(false);
  const [toast, setToast] = useState("");
  const [activeId, setActiveId] = useState("topics");

  useEffect(() => {
    let resolved: GeneratedPlan | null = null;
    if (id) {
      resolved = getPlanById(id);
      if (!resolved && id === SUGAR_PAINTING_PLAN.id) resolved = SUGAR_PAINTING_PLAN;
      if (!resolved) {
        const item = CASE_LIST.find((entry) => entry.id === id);
        if (item) {
          const input: ProjectInput = {
            heritageName: item.heritageName,
            craftFeatures: `${item.heritageName}的核心材料、制作动作与成品纹理，请以传承人口述为准。`,
            inheritorStory: "示例案例尚未录入传承人原话，正式拍摄前需补采。",
            targetAudience: ["年轻人"],
            platforms: [...item.platforms],
            duration: item.duration,
            goal: "科普传播",
          };
          resolved = generatePlan(input);
          resolved.id = item.id;
          setCurrentPlan(resolved);
        }
      }
    } else {
      resolved = currentPlan || SUGAR_PAINTING_PLAN;
    }
    setPlan(resolved);
    setNotFound(!resolved);
  }, [id, currentPlan, getPlanById, setCurrentPlan]);

  useEffect(() => {
    if (!plan) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    MODULES.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [plan]);

  const notify = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(targetId);
    }
  }, []);

  const copy = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      notify(`${label}已复制`);
    } catch {
      notify("浏览器未允许复制，请使用导出功能");
    }
  }, [notify]);

  const moduleText = useMemo(() => {
    if (!plan) return {} as Record<string, string>;
    return {
      topics: plan.topics.map((item) => `《${item.title}》\n${item.reason}\n亮点：${item.highlight}`).join("\n\n"),
      script: plan.script.map((item) => `${item.timeRange} ${item.phase}\n画面：${item.visual}\n旁白：${item.narration}\n字幕：${item.subtitle}\n拍摄：${item.shootingTip}`).join("\n\n"),
      shots: plan.shots.map((item) => `${item.id} ${item.shotType} ${item.duration}\n${item.description}\n运镜：${item.movement}\n构图：${item.composition}\n字幕：${item.subtitle}`).join("\n\n"),
      covers: plan.covers.map((item) => `[${item.type}] ${item.title}`).join("\n"),
      subtitles: plan.subtitles.join("\n"),
      platforms: plan.platformVersions.map((item) => `${item.platform}\n钩子A：${item.openingHookA}\n钩子B：${item.openingHookB}\n封面：${item.coverTitle}\n互动：${item.endingInteraction}`).join("\n\n"),
      shooting: LIST_LABELS.map(({ key, title }) => `${title}：${plan.shootingList[key].join("、")}`).join("\n"),
      readiness: `拍摄就绪度 ${plan.scores.overall}/100\n${Object.values(plan.scoreReasons).join("\n")}`,
      culture: `识别：${plan.cultureCheck.heritageIdentified}\n关键词：${plan.cultureCheck.keywords.join("、")}\n风险：${plan.cultureCheck.risks.join("、")}`,
      advice: plan.suggestions.join("\n"),
    };
  }, [plan]);

  if (notFound) return <NotFound id={id} />;
  if (!plan) return <div className="section py-24 text-center text-muted">方案加载中…</div>;

  const hook = plan.platformVersions[0]?.openingHookA || plan.script[0]?.narration || plan.topics[0]?.title;
  const scoreItems = [
    ["3 秒钩子", plan.scores.opening, plan.scoreReasons.opening],
    ["文化完整", plan.scores.culture, plan.scoreReasons.culture],
    ["受众匹配", plan.scores.youthResonance, plan.scoreReasons.youthResonance],
    ["拍摄执行", plan.scores.executability, plan.scoreReasons.executability],
    ["平台适配", plan.scores.platformPotential, plan.scoreReasons.platformPotential],
  ] as const;

  const toggleConfirmed = (shotId: string) => {
    setConfirmedShots((current) => {
      const next = new Set(current);
      if (next.has(shotId)) next.delete(shotId); else next.add(shotId);
      return next;
    });
  };

  return (
    <main className="section py-7 sm:py-10">
      <Toast message={toast} visible={Boolean(toast)} />
      <ExportDialog visible={exportVisible} onClose={() => setExportVisible(false)} plan={plan} />

      <Link to="/workspace" className="btn-ghost -ml-2 mb-4"><ArrowLeft className="h-4 w-4" />返回创作台</Link>

      <section className="panel overflow-hidden p-5 sm:p-7">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="tag-cinnabar">{plan.input.heritageName}</span>
              <span className="tag-gold">{plan.input.duration}</span>
              {plan.input.platforms.map((item) => <span key={item} className="tag-jade">{item}</span>)}
            </div>
            <h1 className="mt-4 font-serif text-2xl font-bold leading-tight text-ink sm:text-3xl">「{plan.input.heritageName}」可执行短视频导演包</h1>
            <p className="mt-2 text-sm leading-6 text-muted">从真实技艺和人物原话出发，已拆成脚本、分镜、平台版本与现场清单。</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={() => { saveToLibrary(plan); notify("已保存到作品库"); }} className="btn-primary"><Save className="h-4 w-4" />保存方案</button>
              <button type="button" onClick={() => setExportVisible(true)} className="btn-secondary"><Download className="h-4 w-4" />导出拍摄包</button>
              <button type="button" onClick={() => navigate("/workspace")} className="btn-ghost"><RotateCcw className="h-4 w-4" />修改素材</button>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-surface/65 p-4">
            <ScoreRing score={plan.scores.overall} size={100} label="拍摄就绪度" />
            <div className="max-w-44 text-xs leading-5 text-muted"><strong className="block text-sm text-ink">不是流量预测</strong>评分只判断素材和执行信息是否齐全。</div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 border-t border-ink/5 pt-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard icon={Flame} label="推荐选题" value={plan.topics[0]?.title || "待生成"} />
          <SummaryCard icon={MonitorPlay} label="3 秒开头" value={hook || "待生成"} />
          <SummaryCard icon={Sparkles} label="核心技艺" value={plan.input.craftFeatures} />
          <SummaryCard icon={MessageSquareText} label="人物原话" value={plan.input.inheritorStory || "未补充，拍摄前需采集"} />
        </div>
      </section>

      <nav aria-label="移动端方案模块" className="sticky top-16 z-30 mt-4 grid grid-cols-5 gap-1 rounded-2xl border border-ink/10 bg-rice/95 p-2 shadow-soft backdrop-blur lg:hidden">
        {MODULES.map((item) => <a key={item.id} href={`#${item.id}`} onClick={(e) => handleNavClick(e, item.id)} className={`rounded-lg px-1 py-2 text-center text-[11px] hover:bg-white hover:text-cinnabar ${activeId === item.id ? "bg-cinnabar/10 font-medium text-cinnabar" : "text-muted"}`}>{item.short}</a>)}
      </nav>

      <details className="panel mt-4 p-4 lg:hidden">
        <summary className="cursor-pointer list-none text-sm font-semibold text-ink">展开 9:16 分镜联动预览</summary>
        <div className="mt-4"><VideoPreviewer shots={plan.shots} heritageName={plan.input.heritageName} activeShotIdx={activeShotIdx} onShotChange={setActiveShotIdx} /></div>
      </details>

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[170px_minmax(0,1fr)_300px]">
        <aside className="hidden xl:sticky xl:top-24 xl:block">
          <p className="mb-2 px-3 text-xs font-semibold text-muted">导演包目录</p>
          <nav className="panel space-y-1 p-2">
            {MODULES.map((item, index) => {
              const Icon = item.icon;
              return <a key={item.id} href={`#${item.id}`} onClick={(e) => handleNavClick(e, item.id)} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs transition-colors hover:bg-surface hover:text-cinnabar ${activeId === item.id ? "bg-cinnabar/10 font-medium text-cinnabar" : "text-muted"}`}><Icon className="h-4 w-4" /><span className="font-mono text-[10px]">{String(index + 1).padStart(2, "0")}</span>{item.short}</a>;
            })}
          </nav>
          <div className="mt-3 rounded-2xl border border-jade/20 bg-jade/5 p-3 text-xs leading-5 text-muted"><ShieldCheck className="mb-2 h-4 w-4 text-jade" />称谓、年限、地域与技艺信息请由传承人本人确认后发布。</div>
        </aside>

        <div className="min-w-0 space-y-5">
          <SectionCard index={1} title="爆款选题推荐" icon={<Flame className="h-5 w-5" />} accent="cinnabar" anchorId="topics">
            <CopyRow onCopy={() => copy(moduleText.topics, "选题模块")} />
            <div className="grid gap-3 md:grid-cols-3">
              {plan.topics.map((item, index) => <article key={`${item.title}-${index}`} className="rounded-2xl border border-cinnabar/15 bg-cinnabar/5 p-4"><div className="flex items-center justify-between"><span className="font-mono text-lg text-cinnabar/40">0{index + 1}</span><span className="tag-cinnabar">{item.platform}</span></div><h4 className="mt-3 font-serif font-semibold leading-6 text-ink">{item.title}</h4><p className="mt-3 text-xs leading-5 text-muted">{item.reason}</p><p className="mt-2 text-xs font-medium text-cinnabar">亮点：{item.highlight}</p></article>)}
            </div>
          </SectionCard>

          <SectionCard index={2} title="短视频完整脚本" icon={<ScrollText className="h-5 w-5" />} accent="gold" anchorId="script">
            <CopyRow onCopy={() => copy(moduleText.script, "脚本模块")} />
            <div className="space-y-3">
              {plan.script.map((item, index) => <article key={`${item.timeRange}-${index}`} className="grid gap-3 rounded-2xl border border-gold/20 bg-gold/5 p-4 sm:grid-cols-[92px_minmax(0,1fr)]"><div><span className="tag-gold">{item.timeRange}</span><p className="mt-2 text-sm font-semibold text-ink">{item.phase}</p></div><div className="space-y-2 text-sm leading-6"><p><Field>画面</Field>{item.visual}</p><p className="font-serif"><Field>旁白</Field>“{item.narration}”</p><p><Field>字幕</Field>{item.subtitle}</p><p className="text-muted"><Field>拍法</Field>{item.shootingTip}</p></div></article>)}
            </div>
          </SectionCard>

          <SectionCard index={3} title="导演分镜卡" icon={<Camera className="h-5 w-5" />} accent="jade" anchorId="shots">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <CopyRow onCopy={() => copy(moduleText.shots, "分镜模块")} compact />
              <div className="flex rounded-xl border border-ink/10 bg-surface p-1"><button type="button" onClick={() => setShotView("cards")} className={`rounded-lg p-2 ${shotView === "cards" ? "bg-white text-cinnabar shadow-soft" : "text-muted"}`} aria-label="卡片视图"><LayoutGrid className="h-4 w-4" /></button><button type="button" onClick={() => setShotView("rows")} className={`rounded-lg p-2 ${shotView === "rows" ? "bg-white text-cinnabar shadow-soft" : "text-muted"}`} aria-label="列表视图"><Rows3 className="h-4 w-4" /></button></div>
            </div>
            {shotView === "cards" ? (
              <div className="grid gap-3 md:grid-cols-2">
                {plan.shots.map((shot, index) => <ShotCard key={shot.id} shot={shot} index={index} active={index === activeShotIdx} confirmed={confirmedShots.has(shot.id)} narration={plan.script[Math.min(index, plan.script.length - 1)]?.narration || "现场原声"} audio={plan.shootingList.audio[index % plan.shootingList.audio.length]} lighting={plan.shootingList.lighting[index % plan.shootingList.lighting.length]} onOpen={() => setActiveShotIdx(index)} onConfirm={() => toggleConfirmed(shot.id)} />)}
              </div>
            ) : (
              <div className="space-y-2">
                {plan.shots.map((shot, index) => <button key={shot.id} type="button" onClick={() => setActiveShotIdx(index)} className={`grid w-full grid-cols-[58px_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-3 text-left ${index === activeShotIdx ? "border-jade bg-jade/5" : "border-ink/10 bg-white"}`}><span className="font-mono text-xs text-jade">{shot.id}</span><span className="min-w-0"><strong className="block truncate text-sm text-ink">{shot.shotType} · {shot.description}</strong><span className="block truncate text-xs text-muted">{shot.movement} / {shot.composition}</span></span><span className="text-xs text-muted">{shot.duration}</span></button>)}
              </div>
            )}
            <p className="mt-4 text-xs text-muted">已确认 {confirmedShots.size}/{plan.shots.length} 个镜头；点击分镜会同步右侧手机预览。</p>
          </SectionCard>

          <SectionCard index={4} title="封面文案" icon={<Type className="h-5 w-5" />} accent="cinnabar" anchorId="covers">
            <CopyRow onCopy={() => copy(moduleText.covers, "封面文案")} />
            <div className="grid gap-3 md:grid-cols-3">{plan.covers.map((item) => <div key={`${item.type}-${item.title}`} className="rounded-2xl border border-cinnabar/15 bg-gradient-to-br from-cinnabar/10 to-gold/10 p-5"><span className="tag-cinnabar">{item.type}</span><p className="mt-5 font-serif text-lg font-bold leading-7 text-ink">{item.title}</p></div>)}</div>
          </SectionCard>

          <SectionCard index={5} title="字幕与口播文案" icon={<MessageSquareText className="h-5 w-5" />} accent="gold" anchorId="subtitles">
            <CopyRow onCopy={() => copy(moduleText.subtitles, "字幕口播")} />
            <ol className="space-y-2">{plan.subtitles.map((item, index) => <li key={`${item}-${index}`} className="flex gap-3 rounded-xl bg-surface/65 p-3 text-sm leading-6 text-ink"><span className="font-mono text-xs text-gold-dark">{String(index + 1).padStart(2, "0")}</span><span>{item}</span></li>)}</ol>
          </SectionCard>

          <SectionCard index={6} title="多平台适配版本" icon={<Smartphone className="h-5 w-5" />} accent="jade" anchorId="platforms">
            <CopyRow onCopy={() => copy(moduleText.platforms, "平台版本")} />
            <div className="space-y-3">{plan.platformVersions.map((item) => <article key={item.platform} className="rounded-2xl border border-ink/10 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><span className="tag-jade">{item.platform}</span><span className="text-xs text-jade">AI 推荐钩子 {item.hookWinner}</span></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><ABCard label="钩子 A" text={item.openingHookA} winner={item.hookWinner === "A"} /><ABCard label="钩子 B" text={item.openingHookB} winner={item.hookWinner === "B"} /></div><dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><Info label="封面 A" value={item.coverTitle} /><Info label="封面 B" value={item.coverTitleB} /><Info label="字幕风格" value={item.subtitleStyle} /><Info label="结尾互动" value={item.endingInteraction} /></dl></article>)}</div>
          </SectionCard>

          <SectionCard index={7} title="现场拍摄清单" icon={<ListChecks className="h-5 w-5" />} accent="cinnabar" anchorId="shooting">
            <CopyRow onCopy={() => copy(moduleText.shooting, "拍摄清单")} />
            <div className="grid gap-3 sm:grid-cols-2">{LIST_LABELS.map(({ key, title }) => <div key={key} className="rounded-2xl border border-ink/10 bg-surface/45 p-4"><h4 className="text-sm font-semibold text-ink">{title}</h4><ul className="mt-2 space-y-2">{plan.shootingList[key].map((item) => <li key={item} className="flex gap-2 text-xs leading-5 text-muted"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cinnabar" />{item}</li>)}</ul></div>)}</div>
          </SectionCard>

          <SectionCard index={8} title="拍摄就绪度与依据" icon={<Gauge className="h-5 w-5" />} accent="gold" anchorId="readiness">
            <CopyRow onCopy={() => copy(moduleText.readiness, "就绪度依据")} />
            <div className="grid items-center gap-5 md:grid-cols-[270px_minmax(0,1fr)]"><div className="max-w-full overflow-hidden"><RadarChart scores={plan.scores} size={260} /></div><div className="space-y-3">{scoreItems.map(([label, value, reason]) => <div key={label} className="rounded-xl bg-surface/60 p-3"><div className="flex justify-between text-sm"><strong className="text-ink">{label}</strong><span className="font-mono font-bold text-cinnabar">{value}</span></div><p className="mt-1 text-xs leading-5 text-muted">{reason}</p></div>)}</div></div>
          </SectionCard>

          <SectionCard index={9} title="非遗文化内容核验" icon={<ShieldCheck className="h-5 w-5" />} accent="jade" anchorId="culture">
            <CopyRow onCopy={() => copy(moduleText.culture, "文化核验")} />
            <div className="rounded-2xl border border-success/20 bg-success/5 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="flex items-center gap-2 font-semibold text-ink"><CheckCircle2 className="h-5 w-5 text-success" />已识别：{plan.cultureCheck.heritageIdentified}</p><span className="tag-jade">核验就绪度 {plan.cultureCheck.score}</span></div><p className="mt-3 text-sm leading-6 text-muted">{plan.cultureCheck.highlight}</p><div className="mt-3 flex flex-wrap gap-2">{plan.cultureCheck.keywords.map((item) => <span key={item} className="rounded-full bg-white px-3 py-1 text-xs text-jade">{item}</span>)}</div></div><div className="mt-3 grid gap-3 md:grid-cols-2"><CultureList title="发布前需确认" items={plan.cultureCheck.risks} warning /><CultureList title="建议保留表达" items={plan.cultureCheck.suggestions} /></div>
          </SectionCard>

          <SectionCard index={10} title="AI 导演优化建议" icon={<Lightbulb className="h-5 w-5" />} accent="cinnabar" anchorId="advice">
            <CopyRow onCopy={() => copy(moduleText.advice, "优化建议")} />
            <div className="space-y-2">{plan.suggestions.map((item, index) => <div key={`${item}-${index}`} className="flex gap-3 rounded-xl border border-cinnabar/10 bg-cinnabar/5 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cinnabar text-xs font-bold text-white">{index + 1}</span><p className="text-sm leading-6 text-ink">{item}</p></div>)}</div>
          </SectionCard>
        </div>

        <aside className="hidden xl:sticky xl:top-24 xl:block">
          <div className="panel p-3"><p className="mb-3 px-1 text-xs font-semibold text-muted">9:16 分镜联动预览</p><VideoPreviewer shots={plan.shots} heritageName={plan.input.heritageName} activeShotIdx={activeShotIdx} onShotChange={setActiveShotIdx} /></div>
          <div className="panel mt-3 p-4"><h3 className="text-sm font-semibold text-ink">项目摘要</h3><dl className="mt-3 space-y-3"><Info label="传播目标" value={plan.input.goal || "科普传播"} /><Info label="目标受众" value={plan.input.targetAudience.join("、")} /><Info label="当前镜头" value={`${plan.shots[activeShotIdx]?.id || "-"} · ${plan.shots[activeShotIdx]?.shotType || "-"}`} /></dl></div>
        </aside>
      </div>
    </main>
  );
}

function CopyRow({ onCopy, compact = false }: { onCopy: () => void; compact?: boolean }) {
  return <div className={compact ? "" : "mb-4 flex justify-end"}><button type="button" onClick={onCopy} className="btn-ghost px-3 py-2 text-xs"><ClipboardCopy className="h-3.5 w-3.5" />复制本模块</button></div>;
}

function SummaryCard({ icon: Icon, label, value }: { icon: typeof Target; label: string; value: string }) {
  return <div className="min-w-0 rounded-2xl bg-surface/60 p-4"><p className="flex items-center gap-2 text-xs font-semibold text-muted"><Icon className="h-4 w-4 text-cinnabar" />{label}</p><p className="mt-2 line-clamp-3 text-sm font-medium leading-6 text-ink">{value}</p></div>;
}

function Field({ children }: { children: string }) { return <span className="mr-2 text-xs font-semibold text-cinnabar">{children}</span>; }

function ABCard({ label, text, winner }: { label: string; text: string; winner: boolean }) {
  return <div className={`rounded-xl border p-3 ${winner ? "border-jade/30 bg-jade/5" : "border-ink/10 bg-surface/40"}`}><p className="text-xs font-semibold text-muted">{label}{winner && <span className="ml-2 text-jade">推荐</span>}</p><p className="mt-2 text-sm leading-6 text-ink">{text}</p></div>;
}

function Info({ label, value }: { label: string; value: string }) { return <div><dt className="text-xs text-muted">{label}</dt><dd className="mt-1 text-sm leading-5 text-ink">{value || "待补充"}</dd></div>; }

function CultureList({ title, items, warning = false }: { title: string; items: string[]; warning?: boolean }) {
  return <div className={`rounded-2xl border p-4 ${warning ? "border-warning/20 bg-warning/5" : "border-jade/20 bg-jade/5"}`}><h4 className="text-sm font-semibold text-ink">{title}</h4><ul className="mt-2 space-y-2">{items.map((item) => <li key={item} className="flex gap-2 text-xs leading-5 text-muted"><Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${warning ? "text-warning" : "text-jade"}`} />{item}</li>)}</ul></div>;
}

function ShotCard({ shot, index, active, confirmed, narration, audio, lighting, onOpen, onConfirm }: { shot: GeneratedPlan["shots"][number]; index: number; active: boolean; confirmed: boolean; narration: string; audio?: string; lighting?: string; onOpen: () => void; onConfirm: () => void }) {
  return <article onClick={onOpen} className={`cursor-pointer rounded-2xl border p-4 transition-colors ${active ? "border-jade bg-jade/5" : "border-ink/10 bg-white hover:border-jade/30"}`}><div className="flex items-start justify-between gap-3"><div><p className="font-mono text-xs text-jade">镜头 {String(index + 1).padStart(2, "0")} · {shot.id}</p><h4 className="mt-1 font-semibold text-ink">{shot.shotType} · {shot.duration}</h4></div><button type="button" onClick={(event) => { event.stopPropagation(); onConfirm(); }} className={`min-h-9 rounded-lg border px-2 text-xs ${confirmed ? "border-success bg-success text-white" : "border-ink/10 bg-white text-muted"}`}>{confirmed ? <><Check className="mr-1 inline h-3 w-3" />已确认</> : "待确认"}</button></div><p className="mt-3 text-sm leading-6 text-ink">{shot.description}</p><dl className="mt-3 grid gap-2 rounded-xl bg-surface/60 p-3 text-xs sm:grid-cols-2"><Info label="运镜" value={shot.movement} /><Info label="构图" value={shot.composition} /><Info label="旁白" value={narration} /><Info label="字幕" value={shot.subtitle} /><Info label="拍摄重点" value={shot.focus} /><Info label="画面提示" value={shot.visualPrompt} /><Info label="收音" value={audio || "保留现场原声"} /><Info label="光线" value={lighting || "柔和侧光"} /></dl></article>;
}

function NotFound({ id }: { id?: string }) {
  return <div className="section py-24 text-center"><AlertTriangle className="mx-auto h-10 w-10 text-cinnabar" /><h1 className="mt-4 font-serif text-2xl font-bold text-ink">未找到该方案</h1><p className="mt-2 text-sm text-muted">方案 {id} 不存在、已删除或保存在另一台设备。</p><div className="mt-6 flex justify-center gap-3"><Link to="/library" className="btn-primary">返回作品库</Link><Link to="/workspace" className="btn-secondary">新建方案</Link></div></div>;
}
