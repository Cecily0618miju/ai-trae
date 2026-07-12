// 示例案例页
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, ArrowRight, Eye } from "lucide-react";
import ScoreRing from "@/components/ScoreRing";
import HeritageCover from "@/components/HeritageCover";
import { CASE_LIST } from "@/data/mockData";

// 案例配色与简介
const CASE_META: Record<string, { color: string; desc: string; tag: string }> = {
  "case-sugar-painting": {
    color: "text-cinnabar",
    desc: "街头老手艺，一勺糖画出会发光的龙，藏着童年里的甜",
    tag: "童年回忆",
  },
  "case-shadow-puppet": {
    color: "text-indigo",
    desc: "光与影的千年戏，白布后的江湖，会动的非遗",
    tag: "光影叙事",
  },
  "case-paper-cutting": {
    color: "text-cinnabar",
    desc: "一把剪刀，一张红纸，剪出的是祝福，留下的是根",
    tag: "节庆符号",
  },
  "case-su-embroidery": {
    color: "text-jade",
    desc: "一根丝线穿梭千年，针尖上的江南雅韵",
    tag: "江南雅韵",
  },
};

export default function Cases() {
  return (
    <div className="section py-10">
      {/* 页头 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <span className="tag-gold mb-3">示例案例</span>
        <h1 className="font-serif text-3xl font-bold text-ink md:text-4xl">
          4 个非遗案例 · 即点即看
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-ink/60">
          每个案例都包含选题、脚本、分镜、现场清单与可解释的拍摄就绪度，可直接进入导演工作台
        </p>
      </motion.div>

      {/* 案例网格 */}
      <div className="grid gap-6 sm:grid-cols-2">
        {CASE_LIST.map((c, i) => {
          const meta = CASE_META[c.id] || CASE_META["case-sugar-painting"];
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={`/result/${c.id}`}
                className="card card-hover group block overflow-hidden"
              >
                {/* 顶部工艺感封面 */}
                <HeritageCover name={c.heritageName} className="h-44 rounded-2xl">
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="seal">{c.heritageName.slice(0, 1)}</span>
                    <span className="tag bg-white/20 text-white backdrop-blur-sm">{meta.tag}</span>
                  </div>
                  <div className="absolute right-4 top-4">
                    <ScoreRing score={c.score} size={64} />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-serif text-2xl font-bold text-white drop-shadow-md">
                      {c.heritageName}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-white/70">{c.scene}</p>
                  </div>
                  {/* 播放按钮 hover */}
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-cinnabar opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="h-4 w-4 fill-cinnabar" />
                  </div>
                </HeritageCover>

                {/* 内容 */}
                <div className="p-5">
                  <p className="mb-3 text-sm text-ink/70">{meta.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.platforms.map((p) => (
                      <span key={p} className="tag-jade">{p}</span>
                    ))}
                    <span className="tag-gold">{c.duration}</span>
                    <span className="tag-cinnabar">{c.status}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-4">
                    <span className="flex items-center gap-1 text-xs text-ink/50">
                      <Eye className="h-3 w-3" />
                      拍摄就绪度 {c.score}
                    </span>
                    <span className={`flex items-center gap-1 text-sm font-medium ${meta.color} group-hover:gap-2`}>
                      查看方案
                      <ArrowRight className="h-4 w-4 transition-all" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 rounded-3xl border border-gold/30 bg-gradient-to-br from-paper to-rice px-8 py-12 text-center"
      >
        <h3 className="font-serif text-2xl font-bold text-ink">
          想为你自己的非遗项目生成方案？
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">
          进入创作工作台，输入你的非遗信息，AI 立即为你定制
        </p>
        <Link to="/workspace" className="btn-primary mt-6">
          进入创作工作台
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
