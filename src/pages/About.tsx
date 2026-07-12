// 关于项目页
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Target,
  Heart,
  Users,
  Globe,
  GraduationCap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Ornament from "@/components/Ornament";

const VALUES = [
  {
    icon: Target,
    title: "降低非遗传播门槛",
    desc: "不需要懂短视频策划，也不需要专业团队，AI 帮你完成全流程方案",
    accent: "cinnabar" as const,
  },
  {
    icon: TrendingUp,
    title: "帮助传统文化年轻化表达",
    desc: "用年轻人的语境重构非遗内容，让传统技艺成为可转发的爆款",
    accent: "gold" as const,
  },
  {
    icon: Globe,
    title: "服务地方文旅和校园文化传播",
    desc: "为文旅账号、学校社团、文创团队提供可执行的短视频方案",
    accent: "jade" as const,
  },
  {
    icon: Heart,
    title: "让传统手艺更容易被看见",
    desc: "把好手艺从作坊带到屏幕前，让更多年轻人愿意看、愿意转发",
    accent: "indigo" as const,
  },
];

const FLOW = [
  { icon: Sparkles, label: "选题策划" },
  { icon: Target, label: "脚本创作" },
  { icon: Users, label: "分镜设计" },
  { icon: TrendingUp, label: "字幕优化" },
  { icon: Globe, label: "拍摄执行" },
  { icon: Heart, label: "传播评估" },
];

const ACCENT_MAP = {
  cinnabar: "bg-cinnabar/10 text-cinnabar",
  gold: "bg-gold/15 text-gold-dark",
  jade: "bg-jade/10 text-jade",
  indigo: "bg-indigo/10 text-indigo",
};

export default function About() {
  return (
    <div className="section py-10">
      {/* 页头 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink to-ink/90 px-8 py-14 text-center text-white md:px-16"
      >
        <Ornament
          variant="cloud"
          className="absolute -right-8 -top-4 h-24 w-48 text-gold opacity-30"
        />
        <Ornament
          variant="cloud"
          className="absolute -bottom-4 -left-8 h-24 w-48 text-cinnabar opacity-30"
        />
        <span className="tag-gold mb-4">关于项目</span>
        <h1 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
          让传统技艺被<span className="text-gradient-gold">更多年轻人</span>看见
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60">
          匠心出圈是一款 AI 非遗短视频导演助手，用 AI 帮助非遗内容完成年轻化表达
        </p>
      </motion.div>

      {/* 项目背景 */}
      <section id="background" className="mt-12 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold text-ink">
            <span className="seal">缘</span>
            项目背景
          </h2>
          <div className="space-y-4 text-sm leading-7 text-ink/70">
            <p>
              很多非遗传承人、传统手艺人和地方文旅账号拥有很有价值的技艺和故事，但<span className="font-medium text-ink">不擅长短视频表达</span>，导致内容传播弱、年轻人看不懂、好手艺难以被更多人看见。
            </p>
            <p>
              传统介绍式展示无法吸引年轻人，而普通 AI 文案生成器又不懂非遗文化语境。我们需要一个<span className="font-medium text-cinnabar">真正懂非遗传播的 AI 导演</span>，把技艺、故事、文化转化为可拍摄、可传播的短视频方案。
            </p>
            <p>
              「匠心出圈」正是为此而生——它不是普通短视频生成器，也不是带货工具，而是一个 AI 非遗短视频导演助手，覆盖<span className="font-medium text-ink">选题、脚本、分镜、文案、拍摄、评分</span>全链路。
            </p>
          </div>
        </motion.div>
      </section>

      {/* AI 解决流程 */}
      <section id="workflow" className="mt-8 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <h2 className="mb-6 flex items-center gap-2 font-serif text-2xl font-bold text-ink">
            <span className="seal">能</span>
            AI 帮非遗内容完成什么
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FLOW.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-2xl border border-ink/5 bg-gradient-to-br from-rice to-paper p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cinnabar to-cinnabar-dark text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="num-display text-xs text-ink/30">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="font-serif text-sm font-semibold text-ink">{f.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 社会价值 */}
      <section id="value" className="mt-8 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <h2 className="mb-6 flex items-center gap-2 font-serif text-2xl font-bold text-ink">
            <span className="seal">值</span>
            社会价值
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-4 rounded-2xl border border-ink/5 bg-white/60 p-5"
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${ACCENT_MAP[v.accent]}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-ink">{v.title}</h3>
                    <p className="mt-1 text-sm text-ink/60">{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 目标用户 */}
      <section className="mt-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <h2 className="mb-6 flex items-center gap-2 font-serif text-2xl font-bold text-ink">
            <span className="seal">众</span>
            目标用户
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Users, label: "非遗传承人", desc: "有手艺有故事" },
              { icon: Sparkles, label: "传统手艺人", desc: "想让作品出圈" },
              { icon: Globe, label: "地方文旅账号", desc: "打造文化 IP" },
              { icon: Target, label: "文化类博主", desc: "需要爆款选题" },
              { icon: GraduationCap, label: "学校社团", desc: "校园非遗展示" },
              { icon: Heart, label: "文创团队", desc: "年轻化表达" },
            ].map((u, i) => {
              const Icon = u.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-ink/5 bg-rice/50 p-3"
                >
                  <Icon className="h-5 w-5 shrink-0 text-cinnabar" />
                  <div>
                    <div className="text-sm font-medium text-ink">{u.label}</div>
                    <div className="text-xs text-ink/50">{u.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-gold/30 bg-gradient-to-br from-paper to-rice px-8 py-12 text-center"
      >
        <h2 className="font-serif text-2xl font-bold text-ink md:text-3xl">
          准备好让你的非遗出圈了吗？
        </h2>
        <p className="relative max-w-md text-sm text-ink/60">
          1 分钟输入非遗信息，AI 立即生成完整短视频方案
        </p>
        <Link to="/workspace" className="btn-primary relative mt-2 px-7 py-3.5">
          立即生成方案
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
