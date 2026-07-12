// 匠心出圈 - 数据类型定义

// 用户输入表单
export interface ProjectInput {
  heritageName: string;
  craftFeatures: string;
  inheritorStory: string;
  targetAudience: string[];
  platforms: string[];
  duration: "15s" | "30s" | "60s";
  goal: string;
}

// 爆款选题
export interface Topic {
  title: string;
  platform: string;
  reason: string;
  highlight: string;
}

// 短视频脚本段
export interface ScriptSegment {
  timeRange: string;
  phase: string;
  visual: string;
  narration: string;
  subtitle: string;
  shootingTip: string;
}

// 镜头分镜（升级版 - 导演分镜卡）
export interface Shot {
  id: string;
  shotType: string;
  description: string;
  movement: string;
  subtitle: string;
  focus: string;
  visualPrompt: string;
  composition: string;
  duration: string;
}

// 封面文案
export interface CoverTitle {
  type: "悬念型" | "情绪型" | "知识型";
  title: string;
}

// 传播评分
export interface SpreadScore {
  opening: number;
  culture: number;
  youthResonance: number;
  executability: number;
  platformPotential: number;
  overall: number;
}

// 拍摄清单
export interface ShootingList {
  props: string[];
  scenes: string[];
  closeups: string[];
  people: string[];
  environment: string[];
  audio: string[];
  lighting: string[];
}

// 平台适配版本
export interface PlatformVersion {
  platform: string;
  openingStrategy: string;
  subtitleStyle: string;
  coverTitle: string;
  coverTitleB: string;       // A/B 封面标题对比
  openingHookA: string;      // 3 秒开头钩子 A
  openingHookB: string;      // 3 秒开头钩子 B
  hookWinner: "A" | "B";     // AI 判定更优钩子
  endingInteraction: string;
  reason: string;
}

// 传播评分理由（解释每个维度为什么得这个分）
export interface ScoreReasons {
  opening: string;
  culture: string;
  youthResonance: string;
  executability: string;
  platformPotential: string;
}

// 文化准确性检查
export interface CultureCheck {
  heritageIdentified: string;
  keywords: string[];
  highlight: string;
  risks: string[];
  suggestions: string[];
  score: number;
}

// AI 导演 Agent
export interface DirectorAgent {
  id: string;
  name: string;
  role: string;
  icon: string;
  color: "cinnabar" | "gold" | "jade" | "indigo";
  task: string;
  status: "pending" | "active" | "done";
}

// 完整生成方案（升级版）
export interface GeneratedPlan {
  id: string;
  input: ProjectInput;
  topics: Topic[];
  script: ScriptSegment[];
  shots: Shot[];
  covers: CoverTitle[];
  subtitles: string[];
  shootingList: ShootingList;
  scores: SpreadScore;
  scoreReasons: ScoreReasons;
  suggestions: string[];
  platformVersions: PlatformVersion[];
  cultureCheck: CultureCheck;
  createdAt: string;
}

// 案例摘要
export interface CaseSummary {
  id: string;
  heritageName: string;
  scene: string;
  platforms: string[];
  duration: "15s" | "30s" | "60s";
  status: "已生成" | "示例";
  score: number;
  cover?: string;
}

// 选项常量
export const AUDIENCE_OPTIONS = [
  "年轻人",
  "亲子家庭",
  "文旅游客",
  "学校学生",
  "非遗爱好者",
] as const;

export const PLATFORM_OPTIONS = ["抖音", "小红书", "视频号", "B站"] as const;

export const DURATION_OPTIONS = ["15s", "30s", "60s"] as const;

export const GOAL_OPTIONS = [
  "科普传播",
  "文旅宣传",
  "活动预热",
  "文创推广",
  "校园展示",
] as const;

// AI 导演团定义
export const DIRECTOR_AGENTS: DirectorAgent[] = [
  {
    id: "culture-advisor",
    name: "文化顾问",
    role: "识别非遗技艺特点和文化价值",
    icon: "BookOpen",
    color: "jade",
    task: "AI 正在分析非遗文化亮点",
    status: "pending",
  },
  {
    id: "script-writer",
    name: "爆款编剧",
    role: "设计3秒钩子和故事线",
    icon: "Flame",
    color: "cinnabar",
    task: "AI 正在生成爆款开头",
    status: "pending",
  },
  {
    id: "shot-director",
    name: "分镜导演",
    role: "拆解镜头、景别和运镜",
    icon: "Camera",
    color: "gold",
    task: "AI 正在规划镜头分镜",
    status: "pending",
  },
  {
    id: "spread-evaluator",
    name: "传播评估官",
    role: "评估平台传播潜力并给优化建议",
    icon: "Gauge",
    color: "indigo",
    task: "AI 正在评估传播潜力",
    status: "pending",
  },
];
