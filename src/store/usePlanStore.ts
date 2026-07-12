// 匠心出圈 - 全局状态管理（持久化版）
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CaseSummary, GeneratedPlan, ProjectInput } from "../data/types";
import { LIBRARY_INIT } from "../data/mockData";
import { generatePlan } from "../utils/generatePlan";

interface PlanState {
  // 当前生成的方案
  currentPlan: GeneratedPlan | null;
  // 是否正在生成
  isGenerating: boolean;
  // 作品库摘要列表
  library: CaseSummary[];
  // 作品库完整方案（key: plan.id）
  plans: Record<string, GeneratedPlan>;

  // 动作
  generate: (input: ProjectInput) => GeneratedPlan;
  setCurrentPlan: (plan: GeneratedPlan) => void;
  saveToLibrary: (plan: GeneratedPlan) => void;
  getPlanById: (id: string) => GeneratedPlan | null;
  removeFromLibrary: (id: string) => void;
  clearCurrent: () => void;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      currentPlan: null,
      isGenerating: false,
      library: LIBRARY_INIT,
      plans: {},

      generate: (input) => {
        const plan = generatePlan(input);
        set({ currentPlan: plan });
        return plan;
      },

      setCurrentPlan: (plan) => set({ currentPlan: plan }),

      saveToLibrary: (plan) => {
        set((state) => {
          if (state.library.some((c) => c.id === plan.id)) {
            // 已存在，仅更新完整方案
            return {
              plans: { ...state.plans, [plan.id]: plan },
            };
          }
          const newCase: CaseSummary = {
            id: plan.id,
            heritageName: plan.input.heritageName,
            scene: `${plan.input.goal || "科普传播"} · ${plan.input.targetAudience.join("/")}`,
            platforms: plan.input.platforms,
            duration: plan.input.duration,
            status: "已生成",
            score: plan.scores.overall,
          };
          return {
            library: [newCase, ...state.library],
            plans: { ...state.plans, [plan.id]: plan },
          };
        });
      },

      getPlanById: (id) => {
        const state = get();
        // 优先从完整方案库查找
        if (state.plans[id]) return state.plans[id];
        // 再从当前方案查找
        if (state.currentPlan && state.currentPlan.id === id) return state.currentPlan;
        return null;
      },

      removeFromLibrary: (id) => {
        set((state) => {
          const newLibrary = state.library.filter((c) => c.id !== id);
          const newPlans = { ...state.plans };
          delete newPlans[id];
          return { library: newLibrary, plans: newPlans };
        });
      },

      clearCurrent: () => set({ currentPlan: null }),
    }),
    {
      name: "jiangxin-chuquan-store",
      // 仅持久化数据，不持久化临时状态
      partialize: (state) => ({
        library: state.library,
        plans: state.plans,
        currentPlan: state.currentPlan,
      }),
    }
  )
);
