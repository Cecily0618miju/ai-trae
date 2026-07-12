import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  Gauge,
  Lightbulb,
  LockKeyhole,
  RotateCcw,
  Save,
  ShieldCheck,
  Wand2,
} from "lucide-react";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePlanStore } from "@/store/usePlanStore";
import { SUGAR_PAINTING_INPUT } from "@/data/mockData";
import {
  AUDIENCE_OPTIONS,
  DURATION_OPTIONS,
  GOAL_OPTIONS,
  PLATFORM_OPTIONS,
} from "@/data/types";
import type { ProjectInput } from "@/data/types";
import { assessInputQuality, getSupportedHeritages } from "@/utils/generatePlan";

const DRAFT_KEY = "jiangxin-workspace-draft-v2";
const EMPTY_FORM: ProjectInput = {
  heritageName: "",
  craftFeatures: "",
  inheritorStory: "",
  targetAudience: [],
  platforms: [],
  duration: "30s",
  goal: "",
};

const STEPS = [
  { title: "项目定位", note: "告诉导演要拍什么" },
  { title: "真实素材", note: "补充技艺与口述" },
  { title: "传播对象", note: "选择受众与平台" },
  { title: "生成确认", note: "确定目标与时长" },
];

function loadDraft(): ProjectInput {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? { ...EMPTY_FORM, ...JSON.parse(raw) } : EMPTY_FORM;
  } catch {
    return EMPTY_FORM;
  }
}

export default function Workspace() {
  const navigate = useNavigate();
  const generate = usePlanStore((state) => state.generate);
  const [form, setForm] = useState<ProjectInput>(loadDraft);
  const [step, setStep] = useState(0);
  const [fieldError, setFieldError] = useState("");
  const [loading, setLoading] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const supportedHeritages = useMemo(() => getSupportedHeritages(), []);
  const quality = useMemo(() => assessInputQuality(form), [form]);

  useEffect(() => {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
  }, [form]);

  const completed = [
    form.heritageName.trim().length >= 2,
    form.craftFeatures.trim().length >= 10 && form.inheritorStory.trim().length >= 10,
    form.targetAudience.length > 0 && form.platforms.length > 0,
    Boolean(form.goal && form.duration),
  ];

  const toggleArray = (key: "targetAudience" | "platforms", value: string) => {
    setFieldError("");
    setForm((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
  };

  const validateStep = (index: number) => {
    if (index === 0 && form.heritageName.trim().length < 2) return "请填写具体的非遗项目名称，至少 2 个字。";
    if (index === 1 && form.craftFeatures.trim().length < 10) return "请用至少 10 个字描述制作动作或视觉特征。";
    if (index === 1 && form.inheritorStory.trim().length < 10) return "请补充一段真实口述或传承故事，至少 10 个字。";
    if (index === 2 && form.targetAudience.length === 0) return "请至少选择一类目标受众。";
    if (index === 2 && form.platforms.length === 0) return "请至少选择一个发布平台。";
    if (index === 3 && !form.goal) return "请选择本次视频的传播目标。";
    return "";
  };

  const goNext = () => {
    const error = validateStep(step);
    if (error) {
      setFieldError(error);
      return;
    }
    setFieldError("");
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const runGeneration = () => {
    const error = validateStep(3);
    if (error || !completed.every(Boolean)) {
      setFieldError(error || "还有步骤未完成，请返回补充必要信息。");
      return;
    }
    setGenerationError(null);
    setLoading(true);
    window.setTimeout(() => {
      try {
        generate(form);
        setLoading(false);
        navigate("/result");
      } catch {
        setGenerationError("本次生成没有完成。你的草稿已保存，可以直接重试或返回修改。");
      }
    }, 2450);
  };

  const loadExample = () => {
    setForm({ ...SUGAR_PAINTING_INPUT });
    setFieldError("");
    setStep(3);
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setStep(0);
    setFieldError("");
    window.localStorage.removeItem(DRAFT_KEY);
  };

  return (
    <main className="section py-8 sm:py-12">
      <LoadingOverlay
        visible={loading}
        error={generationError}
        onRetry={runGeneration}
        onCancel={() => setLoading(false)}
      />

      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">AI 导演创作台</p>
            <h1 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">把真实素材，变成今天能拍的方案</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">四步完成素材采集。输入会实时保存为本地草稿，不上传人物隐私。</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/5 px-3 py-2 text-xs text-success">
            <Save className="h-4 w-4" />草稿已自动保存
          </div>
        </div>
      </motion.header>

      <div className="mb-6 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {STEPS.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => index <= step && setStep(index)}
            className={`min-h-16 rounded-2xl border p-3 text-left transition-colors ${
              index === step
                ? "border-cinnabar bg-cinnabar/5"
                : completed[index]
                  ? "border-success/20 bg-success/5"
                  : "border-ink/10 bg-white"
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${completed[index] ? "bg-success text-white" : index === step ? "bg-cinnabar text-white" : "bg-surface text-muted"}`}>
                {completed[index] ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              {item.title}
            </span>
            <span className="mt-1 block pl-8 text-[11px] text-muted">{item.note}</span>
          </button>
        ))}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <motion.section
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="panel min-w-0 p-5 sm:p-8"
        >
          <div className="mb-7 flex items-start justify-between gap-4 border-b border-ink/5 pb-5">
            <div>
              <p className="text-xs font-medium text-cinnabar">第 {step + 1} 步，共 4 步</p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-ink">{STEPS[step].title}</h2>
            </div>
            <span className="rounded-full bg-surface px-3 py-1 text-xs text-muted">完成度 {quality.score}%</span>
          </div>

          {step === 0 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="heritage-name" className="mb-2 block text-sm font-semibold text-ink">非遗项目名称 <span className="text-cinnabar">*</span></label>
                <input
                  id="heritage-name"
                  autoFocus
                  value={form.heritageName}
                  onChange={(event) => { setFieldError(""); setForm({ ...form, heritageName: event.target.value }); }}
                  className="field-control"
                  placeholder="例如：成都糖画、苏绣、皮影戏"
                />
                <p className="mt-2 text-xs text-muted">请写具体项目，不要只写“传统手艺”。</p>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-ink">快速选择已适配项目</p>
                <div className="flex flex-wrap gap-2">
                  {supportedHeritages.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setForm({ ...form, heritageName: item.name })}
                      className={`min-h-10 rounded-xl border px-3 text-sm ${form.heritageName === item.name ? "border-cinnabar bg-cinnabar/5 text-cinnabar" : "border-ink/10 bg-white text-muted hover:border-cinnabar/30"}`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="craft-features" className="text-sm font-semibold text-ink">技艺动作与视觉特征 <span className="text-cinnabar">*</span></label>
                  <span className="text-xs text-muted">{form.craftFeatures.length} 字</span>
                </div>
                <textarea
                  id="craft-features"
                  autoFocus
                  rows={5}
                  value={form.craftFeatures}
                  onChange={(event) => { setFieldError(""); setForm({ ...form, craftFeatures: event.target.value }); }}
                  className="field-control resize-none"
                  placeholder="写清材料、动作、纹理、光线，例如：糖浆从铜勺落下，手腕连续拉丝，在石板上形成透亮图案。"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="inheritor-story" className="text-sm font-semibold text-ink">传承人真实口述 <span className="text-cinnabar">*</span></label>
                  <span className="text-xs text-muted">{form.inheritorStory.length} 字</span>
                </div>
                <textarea
                  id="inheritor-story"
                  rows={5}
                  value={form.inheritorStory}
                  onChange={(event) => { setFieldError(""); setForm({ ...form, inheritorStory: event.target.value }); }}
                  className="field-control resize-none"
                  placeholder="尽量使用原话，并补充地点、年限或真实事件。例如：李师傅摆糖画摊 23 年，他说“最怕孩子们不再认识这个味道”。"
                />
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted"><ShieldCheck className="h-3.5 w-3.5 text-jade" />系统会优先保留原话，不替传承人虚构经历。</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-7">
              <ChoiceGroup
                title="目标受众"
                options={AUDIENCE_OPTIONS}
                active={form.targetAudience}
                onToggle={(value) => toggleArray("targetAudience", value)}
              />
              <ChoiceGroup
                title="发布平台"
                options={PLATFORM_OPTIONS}
                active={form.platforms}
                onToggle={(value) => toggleArray("platforms", value)}
              />
              <div className="rounded-2xl bg-surface/70 p-4 text-sm leading-6 text-muted">
                多选平台后，导演团会分别生成开头钩子、封面标题和结尾互动，不会简单复制同一文案。
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="goal" className="mb-2 block text-sm font-semibold text-ink">传播目标 <span className="text-cinnabar">*</span></label>
                  <select id="goal" value={form.goal} onChange={(event) => { setFieldError(""); setForm({ ...form, goal: event.target.value }); }} className="field-control">
                    <option value="">请选择目标</option>
                    {GOAL_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-ink">目标时长</p>
                  <div className="grid grid-cols-3 gap-2">
                    {DURATION_OPTIONS.map((item) => (
                      <button key={item} type="button" onClick={() => setForm({ ...form, duration: item })} className={`min-h-11 rounded-xl border text-sm font-medium ${form.duration === item ? "border-jade bg-jade/10 text-jade" : "border-ink/10 bg-white text-muted"}`}>{item}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-surface/50 p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="font-serif text-lg font-semibold text-ink">生成前确认</h3>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${quality.score >= 80 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>素材质量 {quality.score}/100</span>
                </div>
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  <ReviewItem label="项目" value={form.heritageName || "未填写"} />
                  <ReviewItem label="目标" value={form.goal || "未选择"} />
                  <ReviewItem label="受众" value={form.targetAudience.join("、") || "未选择"} />
                  <ReviewItem label="平台" value={form.platforms.join("、") || "未选择"} />
                  <ReviewItem label="时长" value={form.duration} />
                  <ReviewItem label="真实口述" value={form.inheritorStory ? "已补充" : "未补充"} />
                </dl>
              </div>
            </div>
          )}

          {fieldError && (
            <div role="alert" className="mt-6 rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error">{fieldError}</div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-ink/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={() => { setFieldError(""); setStep((current) => Math.max(0, current - 1)); }} disabled={step === 0} className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40">
              <ArrowLeft className="h-4 w-4" />上一步
            </button>
            {step < 3 ? (
              <button type="button" onClick={goNext} className="btn-primary">下一步<ArrowRight className="h-4 w-4" /></button>
            ) : (
              <button type="button" onClick={runGeneration} className="btn-primary"><Wand2 className="h-4 w-4" />生成导演方案</button>
            )}
          </div>
        </motion.section>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="panel p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold-dark"><Lightbulb className="h-5 w-5" /></span>
              <div><p className="font-serif font-semibold text-ink">导演提示</p><p className="text-xs text-muted">让结果更可拍</p></div>
            </div>
            <ul className="space-y-3 text-sm leading-6 text-muted">
              <Tip>写动作，不只写形容词：拉、吹、刻、绣都能直接变成镜头。</Tip>
              <Tip>保留一句人物原话，能让脚本更可信、更有情绪。</Tip>
              <Tip>如果面向亲子家庭，补充孩子能看懂的细节或互动。</Tip>
            </ul>
          </div>

          <div className="panel p-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-ink"><Gauge className="h-4 w-4 text-jade" />素材准备度</span>
              <span className="font-serif text-xl font-bold text-jade">{quality.score}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-jade transition-all" style={{ width: `${quality.score}%` }} /></div>
            <div className="mt-4 space-y-2">
              {quality.tips.slice(0, 3).map((tip) => <p key={tip} className="text-xs leading-5 text-muted">· {tip}</p>)}
              {quality.tips.length === 0 && <p className="flex items-center gap-1.5 text-xs text-success"><CheckCircle2 className="h-4 w-4" />信息完整，可以生成高质量方案。</p>}
            </div>
          </div>

          <div className="rounded-2xl border border-jade/20 bg-jade/5 p-4 text-xs leading-5 text-muted">
            <p className="flex items-start gap-2"><LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-jade" />Demo 不上传素材；草稿和生成结果只保存在当前浏览器。</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={loadExample} className="btn-secondary px-3"><BookOpen className="h-4 w-4" />糖画示例</button>
            <button type="button" onClick={reset} className="btn-ghost px-3"><RotateCcw className="h-4 w-4" />清空</button>
          </div>
          <p className="flex items-center gap-1.5 text-[11px] text-muted"><Clock3 className="h-3.5 w-3.5" />完整填写约需 2 分钟</p>
        </aside>
      </div>
    </main>
  );
}

function ChoiceGroup({ title, options, active, onToggle }: { title: string; options: readonly string[]; active: string[]; onToggle: (value: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-ink">{title} <span className="text-cinnabar">*</span></legend>
      <div className="flex flex-wrap gap-2">
        {options.map((item) => (
          <button key={item} type="button" aria-pressed={active.includes(item)} onClick={() => onToggle(item)} className={`min-h-11 rounded-xl border px-4 text-sm transition-colors ${active.includes(item) ? "border-cinnabar bg-cinnabar text-white" : "border-ink/10 bg-white text-muted hover:border-cinnabar/35 hover:text-ink"}`}>
            {active.includes(item) && <Check className="mr-1 inline h-3.5 w-3.5" />}{item}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-white p-3"><dt className="text-xs text-muted">{label}</dt><dd className="mt-1 truncate font-medium text-ink">{value}</dd></div>;
}

function Tip({ children }: { children: React.ReactNode }) {
  return <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-jade" /><span>{children}</span></li>;
}
