// 底部页脚
import { Link } from "react-router-dom";
import { FileCheck2, Heart } from "lucide-react";
import BrandMark from "@/components/BrandMark";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/5 bg-paper/50">
      <div className="section py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* 品牌 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <BrandMark size="sm" />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg font-bold text-ink">匠心出圈</span>
                <span className="text-[10px] text-ink/50">AI 非遗爆款短视频导演</span>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-ink/60">
              让传统技艺被年轻人看见。从传统技艺到短视频作品，只需要一次 AI 导演式创作。
            </p>
          </div>

          {/* 导航 */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-ink">产品</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink/60">
              <li><Link to="/workspace" className="hover:text-cinnabar">创作工作台</Link></li>
              <li><Link to="/cases" className="hover:text-cinnabar">示例案例</Link></li>
              <li><Link to="/library" className="hover:text-cinnabar">作品库</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-ink">关于</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink/60">
              <li><Link to="/about" className="hover:text-cinnabar">项目背景</Link></li>
              <li><Link to="/about#workflow" className="hover:text-cinnabar">工作流程</Link></li>
              <li><Link to="/about#value" className="hover:text-cinnabar">社会价值</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink/5 pt-6 text-xs text-ink/50 sm:flex-row">
          <div className="flex items-center gap-4">
            <span>© 2026 匠心出圈 · TRAE 创意比赛参赛作品</span>
            <Link to="/about#background" className="flex items-center gap-1 hover:text-ink">
              <FileCheck2 className="h-3.5 w-3.5" /> 参赛作品说明
            </Link>
          </div>
          <div className="flex items-center gap-1">
            用 <Heart className="h-3 w-3 fill-cinnabar text-cinnabar" /> 守护非遗
          </div>
        </div>
      </div>
    </footer>
  );
}
