import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  Play,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";
import HeritageCover from "@/components/HeritageCover";
import ScoreRing from "@/components/ScoreRing";
import VideoPreviewer from "@/components/VideoPreviewer";
import { CASE_LIST, SUGAR_PAINTING_PLAN } from "@/data/mockData";

const CAPABILITIES = [
  {
    icon: BookOpenCheck,
    title: "真实口述锚点",
    desc: "把传承人原话作为创作约束，保留真实年限、地域和人物经历。",
    tone: "bg-cinnabar/8 text-cinnabar",
  },
  {
    icon: Camera,
    title: "导演级分镜",
    desc: "不只给文案，还给景别、运镜、构图、字幕、收音和拍摄重点。",
    tone: "bg-gold/12 text-gold-dark",
  },
  {
    icon: ShieldCheck,
    title: "文化内容核验",
    desc: "提示可能失真的表达和必须由传承人确认的信息。",
    tone: "bg-jade/10 text-jade",
  },
];

const FLOW = [
  [ScanSearch, "文化顾问", "识别技艺关键词"],
  [Flame, "选题编剧", "设计 3 秒钩子"],
  [Camera, "分镜导演", "拆解景别与运镜"],
  [Smartphone, "平台运营", "生成多平台版本"],
  [ShieldCheck, "内容守护", "检查文化表达"],
  [ClipboardCheck, "方案评估", "计算拍摄就绪度"],
] as const;

function SugarDemo() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setStep((value) => {
        if (value >= 3) {
          window.clearInterval(timer);
          setRunning(false);
          return 3;
        }
        return value + 1;
      });
    }, 520);
    return () => window.clearInterval(timer);
  }, [running]);

  const run = () => {
    setStep(0);
    setRunning(true);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
      <div className="panel flex flex-col justify-between bg-ink text-white">
        <div>
          <span className="eyebrow text-gold-light">断网也能跑的实时 Demo</span>
          <h3 className="mt-4 font-serif text-2xl font-bold">输入「糖画」，看导演方案如何成形</h3>
          <div className="mt-6 space-y-3 text-sm text-white/65">
            <div className="flex justify-between border-b border-white/10 pb-3"><span>技艺细节</span><strong className="text-white">糖浆拉丝 · 逆光透亮</strong></div>
            <div className="flex justify-between border-b border-white/10 pb-3"><span>真实故事</span><strong className="text-right text-white">摆摊 20 年的老师傅</strong></div>
            <div className="flex justify-between"><span>发布平台</span><strong className="text-white">抖音 · 小红书</strong></div>
          </div>
        </div>
        <button type="button" onClick={run} disabled={running} className="btn-primary mt-7 w-full">
          <WandSparkles className="h-4 w-4" />
          {running ? "导演团正在协作…" : step ? "重新运行" : "运行 AI 导演团"}
        </button>
      </div>

      <div className="panel min-h-[380px] bg-white/75">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted">生成状态</div>
            <div className="mt-1 font-serif text-lg font-semibold text-ink">{step === 3 ? "方案已就绪" : running ? "正在组织真实素材" : "等待开始"}</div>
          </div>
          <span className="tag-jade">演示模式</span>
        </div>
        <div className="space-y-3">
          {[
            ["选题", SUGAR_PAINTING_PLAN.topics[0].title],
            ["3 秒钩子", SUGAR_PAINTING_PLAN.script[0].visual],
            ["首镜", SUGAR_PAINTING_PLAN.shots[0].description],
          ].map(([label, value], index) => {
            const visible = step > index;
            return (
              <div key={label} className={`rounded-2xl border p-4 transition-colors ${visible ? "border-jade/20 bg-jade/5" : "border-ink/[0.06] bg-rice/60"}`}>
                <div className="flex items-center gap-2 text-xs font-semibold text-muted">
                  {visible ? <CheckCircle2 className="h-4 w-4 text-jade" /> : <span className="h-4 w-4 rounded-full border border-ink/15" />}
                  {label}
                </div>
                <p className={`mt-2 text-sm leading-6 ${visible ? "text-ink" : "text-ink/25"}`}>{visible ? value : "等待当前阶段完成"}</p>
              </div>
            );
          })}
        </div>
        {step === 3 && (
          <Link to="/result/case-sugar-painting" className="btn-secondary mt-5 w-full">
            查看完整糖画导演包 <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeShot, setActiveShot] = useState(0);

  return (
    <div className="overflow-hidden">
      {/* 1. Hero */}
      <section className="relative border-b border-ink/[0.05] bg-[radial-gradient(circle_at_78%_18%,rgba(214,167,60,0.13),transparent_30%),linear-gradient(180deg,#FAF7F2_0%,#F3EDE3_100%)]">
        <div className="section grid min-h-[calc(100vh-64px)] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="mb-6 flex items-center gap-3">
              <BrandMark size="lg" />
              <div>
                <div className="eyebrow">匠心出圈 · AI 非遗导演</div>
                <div className="mt-1 text-xs text-muted">演示模式 · 素材仅在本地处理</div>
              </div>
            </div>
            <h1 className="max-w-3xl font-serif text-4xl font-black leading-[1.16] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[56px]">
              把非遗的<span className="text-cinnabar">真实故事</span>，<br />变成今天就能拍的短视频
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted md:text-lg">
              为非遗传承人、手艺人和文旅账号生成可执行的选题、脚本、分镜与拍摄清单。AI 帮你组织表达，不替传承人编故事。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["真实口述", "文化核验", "导演分镜"].map((item) => <span key={item} className="tag-jade">{item}</span>)}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/workspace" className="btn-primary px-6">免费生成导演方案 <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/result/case-sugar-painting" className="btn-secondary px-6"><Play className="h-4 w-4" /> 查看糖画案例</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.08 }} className="relative mx-auto w-full max-w-[460px]">
            <div className="absolute -left-4 top-20 hidden w-40 rounded-2xl border border-white/70 bg-white/85 p-3 shadow-soft backdrop-blur md:block">
              <div className="text-[10px] font-semibold text-jade">文化核验</div>
              <div className="mt-1 text-xs text-ink">已识别「熬糖 · 拉丝 · 石板作画」</div>
            </div>
            <div className="rounded-[36px] border border-ink/[0.08] bg-white/55 p-4 shadow-card">
              <VideoPreviewer shots={SUGAR_PAINTING_PLAN.shots} heritageName="糖画" activeShotIdx={activeShot} onShotChange={setActiveShot} />
            </div>
            <div className="absolute -right-3 bottom-20 hidden w-44 rounded-2xl border border-white/70 bg-white/90 p-3 shadow-soft md:block">
              <div className="text-[10px] font-semibold text-cinnabar">当前分镜 · {SUGAR_PAINTING_PLAN.shots[activeShot].id}</div>
              <div className="mt-1 text-xs leading-5 text-ink/70">{SUGAR_PAINTING_PLAN.shots[activeShot].movement} · {SUGAR_PAINTING_PLAN.shots[activeShot].duration}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. 前后对比 */}
      <section className="section py-20">
        <div className="mb-9 max-w-2xl"><span className="eyebrow">真实问题</span><h2 className="mt-3 font-serif text-3xl font-bold text-ink md:text-4xl">好手艺不缺故事，缺的是能被看见的表达</h2></div>
        <div className="grid overflow-hidden rounded-3xl border border-ink/[0.07] lg:grid-cols-2">
          <div className="bg-white/55 p-6 md:p-8">
            <div className="text-xs font-semibold text-muted">传统介绍式文案</div>
            <p className="mt-5 font-serif text-xl leading-9 text-ink/60">「糖画是一种以糖为材料进行造型的传统民间手工艺。」</p>
            <div className="mt-7 space-y-2 text-sm text-muted"><div>× 没有首镜</div><div>× 没有人物原话</div><div>× 不能直接交给拍摄者</div></div>
          </div>
          <div className="bg-ink p-6 text-white md:p-8">
            <div className="text-xs font-semibold text-gold-light">匠心出圈处理后</div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[['3 秒钩子','你见过会发光的糖吗？'],['情绪线','老师傅摆摊 20 年，只想让孩子记住这个味道'],['首镜','糖浆从勺尖拉出龙形，逆光透亮']].map(([k,v])=><div key={k} className="rounded-2xl bg-white/[0.07] p-4"><div className="text-[10px] font-semibold text-gold-light">{k}</div><p className="mt-2 text-sm leading-6 text-white/85">{v}</p></div>)}
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/55"><CheckCircle2 className="h-4 w-4 text-jade-light" /> 从“介绍手艺”变成“今天就能拍”</div>
          </div>
        </div>
      </section>

      {/* 3. 核心能力 */}
      <section className="border-y border-ink/[0.05] bg-white/35 py-20">
        <div className="section"><div className="mb-9 text-center"><span className="eyebrow">核心能力</span><h2 className="mt-3 font-serif text-3xl font-bold text-ink md:text-4xl">不是通用文案机，是非遗创作的导演助手</h2></div><div className="grid gap-4 md:grid-cols-3">{CAPABILITIES.map(({icon:Icon,title,desc,tone})=><div key={title} className="panel bg-white/75"><span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-5 w-5" /></span><h3 className="mt-5 font-serif text-xl font-semibold text-ink">{title}</h3><p className="mt-3 text-sm leading-7 text-muted">{desc}</p></div>)}</div></div>
      </section>

      {/* 4. 工作流 */}
      <section className="section py-20"><div className="mb-9"><span className="eyebrow">AI 导演工作流</span><h2 className="mt-3 font-serif text-3xl font-bold text-ink md:text-4xl">六个阶段，从真实素材到拍摄交付</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{FLOW.map(([Icon,title,desc],i)=><div key={title} className="flex items-center gap-4 rounded-2xl border border-ink/[0.07] bg-white/65 p-4"><span className="num-display text-2xl text-cinnabar/35">{String(i+1).padStart(2,'0')}</span><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-ink"><Icon className="h-5 w-5" /></span><div><h3 className="text-sm font-semibold text-ink">{title}</h3><p className="mt-1 text-xs text-muted">{desc}</p></div></div>)}</div></section>

      {/* 5. 实时 Demo */}
      <section className="border-y border-ink/[0.05] bg-surface/55 py-20"><div className="section"><div className="mb-9 text-center"><span className="eyebrow">糖画实时 Demo</span><h2 className="mt-3 font-serif text-3xl font-bold text-ink md:text-4xl">两秒看懂产品的核心价值</h2></div><SugarDemo /></div></section>

      {/* 6. 案例 + CTA */}
      <section className="section py-20"><div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><span className="eyebrow">内置非遗案例</span><h2 className="mt-3 font-serif text-3xl font-bold text-ink md:text-4xl">每门手艺，都有不同的表达方式</h2></div><Link to="/cases" className="btn-ghost">查看全部案例 <ArrowRight className="h-4 w-4" /></Link></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{CASE_LIST.map(item=><Link key={item.id} to={`/result/${item.id}`} className="group overflow-hidden rounded-3xl border border-ink/[0.07] bg-white/70"><HeritageCover name={item.heritageName} className="h-40"><div className="absolute inset-x-4 bottom-4 flex items-end justify-between"><div><div className="text-xs text-white/65">{item.platforms.join(' · ')} · {item.duration}</div><h3 className="mt-1 font-serif text-2xl font-bold text-white">{item.heritageName}</h3></div><ScoreRing score={item.score} size={58} /></div></HeritageCover><div className="flex items-center justify-between p-4"><span className="text-xs text-muted">{item.scene}</span><ArrowRight className="h-4 w-4 text-cinnabar transition-transform group-hover:translate-x-1" /></div></Link>)}</div><div className="mt-12 grid items-center gap-6 rounded-[32px] bg-cinnabar px-6 py-9 text-white md:grid-cols-[1fr_auto] md:px-10"><div><div className="flex items-center gap-3"><BrandMark size="md" className="ring-1 ring-white/20" /><span className="text-xs font-semibold tracking-[0.18em] text-white/65">开始你的第一个导演包</span></div><h2 className="mt-4 font-serif text-2xl font-bold md:text-3xl">让好手艺被看见，从一句真话开始</h2></div><Link to="/workspace" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-cinnabar">免费生成导演方案 <Sparkles className="h-4 w-4" /></Link></div></section>
    </div>
  );
}
