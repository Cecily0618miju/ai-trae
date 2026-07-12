// 导出方案弹窗 - 真实导出版（剪贴板 / Markdown / TXT / JSON）
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Film,
  Music,
  Image,
  Copy,
  CheckCircle2,
  Download,
  ClipboardList,
  FileCode,
  type LucideIcon,
} from "lucide-react";
import type { GeneratedPlan } from "@/data/types";

interface Props {
  visible: boolean;
  onClose: () => void;
  plan: GeneratedPlan | null;
}

type ExportType = "shootList" | "shotScript" | "douyin" | "xiaohongshu" | "markdown" | "txt" | "json" | "copyAll";

interface ExportOption {
  icon: LucideIcon;
  label: string;
  desc: string;
  color: string;
  type: ExportType;
}

const EXPORT_OPTIONS: ExportOption[] = [
  { icon: ClipboardList, label: "导出为拍摄清单", desc: "道具/场景/收音/光线清单", color: "bg-cinnabar/10 border-cinnabar/30 text-cinnabar", type: "shootList" },
  { icon: Film, label: "导出为分镜脚本", desc: "镜头编号/景别/运镜/字幕", color: "bg-jade/10 border-jade/30 text-jade", type: "shotScript" },
  { icon: Music, label: "导出为抖音口播稿", desc: "适合抖音节奏的口播文案", color: "bg-gold/10 border-gold/30 text-gold-dark", type: "douyin" },
  { icon: Image, label: "导出为小红书文案", desc: "种草感标题+正文+话题", color: "bg-indigo/10 border-indigo/30 text-indigo", type: "xiaohongshu" },
  { icon: FileText, label: "下载 Markdown", desc: "完整方案 .md 文件", color: "bg-ink/5 border-ink/20 text-ink", type: "markdown" },
  { icon: FileCode, label: "下载 JSON", desc: "结构化数据 .json 文件", color: "bg-ink/5 border-ink/20 text-ink", type: "json" },
  { icon: Copy, label: "复制完整方案", desc: "一键复制到剪贴板", color: "bg-ink/5 border-ink/20 text-ink", type: "copyAll" },
];

// ============ 文案生成工具 ============

function buildFullMarkdown(plan: GeneratedPlan): string {
  const lines: string[] = [];
  lines.push(`# 匠心出圈 · AI 非遗短视频方案`);
  lines.push(`> 让传统技艺被更多年轻人看见`);
  lines.push("");
  lines.push(`**非遗项目：** ${plan.input.heritageName}`);
  lines.push(`**技艺特点：** ${plan.input.craftFeatures}`);
  lines.push(`**传承人故事：** ${plan.input.inheritorStory || "（未填写）"}`);
  lines.push(`**目标受众：** ${plan.input.targetAudience.join("、") || "（未选择）"}`);
  lines.push(`**发布平台：** ${plan.input.platforms.join("、")}`);
  lines.push(`**视频时长：** ${plan.input.duration}`);
  lines.push(`**传播目标：** ${plan.input.goal || "科普传播"}`);
  lines.push(`**生成时间：** ${plan.createdAt}`);
  lines.push(`**拍摄方案就绪度：** ${plan.scores.overall}`);
  lines.push("");
  lines.push(`---`);
  lines.push("");

  // 模块一：爆款选题
  lines.push(`## 一、爆款选题推荐`);
  plan.topics.forEach((t, i) => {
    lines.push(`### ${i + 1}. ${t.title}`);
    lines.push(`- **适合平台：** ${t.platform}`);
    lines.push(`- **推荐理由：** ${t.reason}`);
    lines.push(`- **传播亮点：** ${t.highlight}`);
    lines.push("");
  });

  // 模块二：短视频脚本
  lines.push(`## 二、短视频完整脚本`);
  plan.script.forEach((s) => {
    lines.push(`### ${s.timeRange} · ${s.phase}`);
    lines.push(`- **画面：** ${s.visual}`);
    lines.push(`- **旁白：** ${s.narration}`);
    lines.push(`- **字幕：** ${s.subtitle}`);
    lines.push(`- **拍摄建议：** ${s.shootingTip}`);
    lines.push("");
  });

  // 模块三：分镜表
  lines.push(`## 三、导演分镜表`);
  lines.push(`| 镜头 | 景别 | 画面描述 | 运镜 | 字幕 | 时长 |`);
  lines.push(`|------|------|----------|------|------|------|`);
  plan.shots.forEach((s) => {
    lines.push(`| ${s.id} | ${s.shotType} | ${s.description} | ${s.movement} | ${s.subtitle} | ${s.duration} |`);
  });
  lines.push("");
  lines.push(`### 分镜详细说明`);
  plan.shots.forEach((s) => {
    lines.push(`#### ${s.id} ${s.shotType}（${s.duration}）`);
    lines.push(`- **画面描述：** ${s.description}`);
    lines.push(`- **运镜方式：** ${s.movement}`);
    lines.push(`- **字幕内容：** ${s.subtitle}`);
    lines.push(`- **拍摄重点：** ${s.focus}`);
    lines.push(`- **AI画面提示词：** ${s.visualPrompt}`);
    lines.push(`- **构图建议：** ${s.composition}`);
    lines.push("");
  });

  // 模块四：封面文案
  lines.push(`## 四、封面文案`);
  plan.covers.forEach((c) => {
    lines.push(`- **[${c.type}]** ${c.title}`);
  });
  lines.push("");

  // 模块五：字幕口播
  lines.push(`## 五、字幕与口播文案`);
  plan.subtitles.forEach((s, i) => {
    lines.push(`${i + 1}. ${s}`);
  });
  lines.push("");

  // 模块六：平台适配
  lines.push(`## 六、平台适配版本`);
  plan.platformVersions.forEach((pv) => {
    lines.push(`### ${pv.platform}`);
    lines.push(`- **开头策略：** ${pv.openingStrategy}`);
    lines.push(`- **字幕风格：** ${pv.subtitleStyle}`);
    lines.push(`- **封面标题：** ${pv.coverTitle}`);
    lines.push(`- **结尾互动：** ${pv.endingInteraction}`);
    lines.push(`- **推荐理由：** ${pv.reason}`);
    lines.push("");
  });

  // 模块七：拍摄清单
  lines.push(`## 七、拍摄清单`);
  const sl = plan.shootingList;
  lines.push(`### 道具准备`);
  sl.props.forEach((p) => lines.push(`- ${p}`));
  lines.push(`### 拍摄场景`);
  sl.scenes.forEach((p) => lines.push(`- ${p}`));
  lines.push(`### 特写镜头`);
  sl.closeups.forEach((p) => lines.push(`- ${p}`));
  lines.push(`### 人物镜头`);
  sl.people.forEach((p) => lines.push(`- ${p}`));
  lines.push(`### 环境镜头`);
  sl.environment.forEach((p) => lines.push(`- ${p}`));
  lines.push(`### 收音建议`);
  sl.audio.forEach((p) => lines.push(`- ${p}`));
  lines.push(`### 光线建议`);
  sl.lighting.forEach((p) => lines.push(`- ${p}`));
  lines.push("");

  // 模块八：方案就绪度（可解释规则评估）
  lines.push(`## 八、方案就绪度与依据`);
  lines.push(`- 3 秒钩子就绪度：**${plan.scores.opening}** — ${plan.scoreReasons.opening}`);
  lines.push(`- 文化表达完整度：**${plan.scores.culture}** — ${plan.scoreReasons.culture}`);
  lines.push(`- 受众匹配度：**${plan.scores.youthResonance}** — ${plan.scoreReasons.youthResonance}`);
  lines.push(`- 拍摄可执行性：**${plan.scores.executability}** — ${plan.scoreReasons.executability}`);
  lines.push(`- 平台适配完整度：**${plan.scores.platformPotential}** — ${plan.scoreReasons.platformPotential}`);
  lines.push(`- **拍摄方案就绪度：${plan.scores.overall}**`);
  lines.push(`> 该分数用于判断素材和拍摄方案是否就绪，不预测或承诺真实流量。`);
  lines.push("");

  // 模块九：文化内容核验
  lines.push(`## 九、非遗文化内容核验`);
  lines.push(`- **非遗项目识别：** ${plan.cultureCheck.heritageIdentified}`);
  lines.push(`- **核心技艺关键词：** ${plan.cultureCheck.keywords.join("、")}`);
  lines.push(`- **文化表达亮点：** ${plan.cultureCheck.highlight}`);
  lines.push(`- **内容核验就绪度：** ${plan.cultureCheck.score}`);
  lines.push(`- **可能的表达风险：**`);
  plan.cultureCheck.risks.forEach((r) => lines.push(`  - ${r}`));
  lines.push(`- **建议保留的文化表达：** ${plan.cultureCheck.suggestions.join("、")}`);
  lines.push("");

  // 模块十：优化建议
  lines.push(`## 十、AI 优化建议`);
  plan.suggestions.forEach((s, i) => {
    lines.push(`${i + 1}. ${s}`);
  });
  lines.push("");
  lines.push("---");
  lines.push(`*AI 仅负责组织表达；称谓、年限、地域和技艺信息请由传承人本人在发布前确认。*`);
  lines.push(`*由「匠心出圈 · AI 非遗爆款短视频导演」生成 · ${plan.createdAt}*`);

  return lines.join("\n");
}

function buildShootList(plan: GeneratedPlan): string {
  const lines: string[] = [];
  lines.push(`# 拍摄清单 · ${plan.input.heritageName}`);
  lines.push(`> ${plan.input.duration} · ${plan.input.platforms.join("/")}`);
  lines.push("");
  const sl = plan.shootingList;
  lines.push(`## 道具准备`);
  sl.props.forEach((p) => lines.push(`- [ ] ${p}`));
  lines.push(`## 拍摄场景`);
  sl.scenes.forEach((p) => lines.push(`- [ ] ${p}`));
  lines.push(`## 特写镜头`);
  sl.closeups.forEach((p) => lines.push(`- [ ] ${p}`));
  lines.push(`## 人物镜头`);
  sl.people.forEach((p) => lines.push(`- [ ] ${p}`));
  lines.push(`## 环境镜头`);
  sl.environment.forEach((p) => lines.push(`- [ ] ${p}`));
  lines.push(`## 收音建议`);
  sl.audio.forEach((p) => lines.push(`- [ ] ${p}`));
  lines.push(`## 光线建议`);
  sl.lighting.forEach((p) => lines.push(`- [ ] ${p}`));
  return lines.join("\n");
}

function buildShotScript(plan: GeneratedPlan): string {
  const lines: string[] = [];
  lines.push(`# 分镜脚本 · ${plan.input.heritageName}`);
  lines.push(`> 时长 ${plan.input.duration} · 共 ${plan.shots.length} 个镜头`);
  lines.push("");
  plan.shots.forEach((s) => {
    lines.push(`## ${s.id} · ${s.shotType}（${s.duration}）`);
    lines.push(`- **画面描述：** ${s.description}`);
    lines.push(`- **运镜方式：** ${s.movement}`);
    lines.push(`- **字幕内容：** ${s.subtitle}`);
    lines.push(`- **拍摄重点：** ${s.focus}`);
    lines.push(`- **AI画面提示词：** ${s.visualPrompt}`);
    lines.push(`- **构图建议：** ${s.composition}`);
    lines.push("");
  });
  return lines.join("\n");
}

function buildDouyinScript(plan: GeneratedPlan): string {
  const lines: string[] = [];
  const pv = plan.platformVersions.find((p) => p.platform === "抖音") || plan.platformVersions[0];
  lines.push(`# 抖音口播稿 · ${plan.input.heritageName}`);
  lines.push(`> 时长 ${plan.input.duration}`);
  if (pv) lines.push(`> 封面标题：${pv.coverTitle}`);
  lines.push("");
  lines.push(`## 开头策略`);
  lines.push(pv ? pv.openingStrategy : "前3秒强视觉冲击，不放字幕");
  lines.push("");
  lines.push(`## 口播文案（按时间轴）`);
  plan.script.forEach((s) => {
    lines.push(`【${s.timeRange} · ${s.phase}】`);
    lines.push(`画面：${s.visual}`);
    lines.push(`口播：${s.narration}`);
    lines.push(`字幕：${s.subtitle}`);
    lines.push("");
  });
  lines.push(`## 结尾互动`);
  lines.push(pv ? pv.endingInteraction : "评论区互动提问 + 引导关注");
  return lines.join("\n");
}

function buildXiaohongshuCopy(plan: GeneratedPlan): string {
  const lines: string[] = [];
  const pv = plan.platformVersions.find((p) => p.platform === "小红书") || plan.platformVersions[0];
  const cover = plan.covers[0]?.title || plan.topics[0]?.title || plan.input.heritageName;
  lines.push(`# 小红书文案 · ${plan.input.heritageName}`);
  lines.push("");
  lines.push(`## 标题`);
  lines.push(cover);
  lines.push("");
  lines.push(`## 正文`);
  lines.push(`${plan.input.heritageName}，${plan.input.craftFeatures}`);
  if (plan.input.inheritorStory) {
    lines.push("");
    lines.push(plan.input.inheritorStory);
  }
  lines.push("");
  lines.push(`## 字幕文案`);
  plan.subtitles.forEach((s) => lines.push(`· ${s}`));
  lines.push("");
  lines.push(`## 话题标签`);
  const tags = [
    `#${plan.input.heritageName}`,
    "#非遗",
    "#传统文化",
    "#手艺人",
    `#${plan.input.duration}秒短视频`,
    ...plan.input.platforms.map((p) => `#${p}`),
  ];
  lines.push(tags.join(" "));
  if (pv) {
    lines.push("");
    lines.push(`## 互动引导`);
    lines.push(pv.endingInteraction);
  }
  return lines.join("\n");
}

// ============ 下载工具 ============

function downloadTextFile(filename: string, content: string, mime = "text/plain") {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // 释放 URL
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // 回退方案
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function safeName(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, "_").trim() || "非遗方案";
}

// ============ 组件 ============

export default function ExportDialog({ visible, onClose, plan }: Props) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleExport = useCallback(
    async (idx: number, type: ExportType) => {
      if (!plan) return;
      setErrorMsg(null);
      const baseName = `匠心出圈_${safeName(plan.input.heritageName)}_${plan.id.slice(-6)}`;

      try {
        switch (type) {
          case "shootList": {
            const text = buildShootList(plan);
            downloadTextFile(`${baseName}_拍摄清单.md`, text, "text/markdown");
            break;
          }
          case "shotScript": {
            const text = buildShotScript(plan);
            downloadTextFile(`${baseName}_分镜脚本.md`, text, "text/markdown");
            break;
          }
          case "douyin": {
            const text = buildDouyinScript(plan);
            downloadTextFile(`${baseName}_抖音口播稿.md`, text, "text/markdown");
            break;
          }
          case "xiaohongshu": {
            const text = buildXiaohongshuCopy(plan);
            downloadTextFile(`${baseName}_小红书文案.md`, text, "text/markdown");
            break;
          }
          case "markdown": {
            const text = buildFullMarkdown(plan);
            downloadTextFile(`${baseName}_完整方案.md`, text, "text/markdown");
            break;
          }
          case "txt": {
            const text = buildFullMarkdown(plan);
            downloadTextFile(`${baseName}_完整方案.txt`, text);
            break;
          }
          case "json": {
            const text = JSON.stringify(plan, null, 2);
            downloadTextFile(`${baseName}.json`, text, "application/json");
            break;
          }
          case "copyAll": {
            const text = buildFullMarkdown(plan);
            const ok = await copyToClipboard(text);
            if (!ok) {
              setErrorMsg("剪贴板被拒绝，请改用下载 Markdown");
              return;
            }
            break;
          }
        }
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
      } catch (e) {
        setErrorMsg(e instanceof Error ? e.message : "导出失败，请重试");
      }
    },
    [plan]
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3 }}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-card p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <div className="mb-2 text-center">
              <h2 className="font-serif text-xl font-bold text-ink">导出方案</h2>
              <p className="mt-1 text-sm text-ink/50">选择导出格式，支持下载与复制</p>
            </div>

            {/* Heritage name tag */}
            {plan && (
              <div className="mb-5 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-rice px-3 py-1 text-xs font-medium text-ink/60">
                  {plan.input.heritageName}
                </span>
                <span className="rounded-full bg-rice px-3 py-1 text-xs font-medium text-ink/60">
                  {plan.input.duration}
                </span>
                <span className="rounded-full bg-rice px-3 py-1 text-xs font-medium text-ink/60">
                  {plan.shots.length} 镜头
                </span>
              </div>
            )}

            {/* Error message */}
            {errorMsg && (
              <div className="mb-4 rounded-xl border border-cinnabar/30 bg-cinnabar/5 p-3 text-xs text-cinnabar">
                {errorMsg}
              </div>
            )}

            {/* Export options */}
            <div className="flex flex-col gap-2.5 mb-6">
              {EXPORT_OPTIONS.map((option, idx) => {
                const Icon = option.icon;
                const isDone = copiedIdx === idx;

                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleExport(idx, option.type)}
                    disabled={!plan}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors hover:bg-rice/50 disabled:cursor-not-allowed disabled:opacity-50 ${
                      option.color
                    } ${isDone ? "ring-2 ring-jade ring-offset-1" : ""}`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isDone ? "bg-jade/15" : option.color.split(" ")[0]
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-5 w-5 text-jade" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className="text-[11px] text-ink/50">{option.desc}</div>
                    </div>
                    {isDone && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-jade font-medium"
                      >
                        {option.type === "copyAll" ? "已复制" : "已下载"}
                      </motion.span>
                    )}
                    {!isDone && (option.type === "markdown" || option.type === "json" || option.type === "shootList" || option.type === "shotScript" || option.type === "douyin" || option.type === "xiaohongshu") && (
                      <Download className="h-4 w-4 opacity-40" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Tips */}
            <div className="mb-5 rounded-xl bg-indigo/5 p-3 text-xs text-ink/60">
              <p className="flex items-start gap-2">
                <Download className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo" />
                <span>
                  下载的 Markdown / JSON 文件可直接导入剪辑软件、Notion、飞书等工具；
                  「复制完整方案」适合粘贴到聊天或文档。
                </span>
              </p>
            </div>

            {/* Close button */}
            <button onClick={onClose} className="btn-secondary w-full">
              关闭
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
