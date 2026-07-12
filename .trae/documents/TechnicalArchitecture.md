# 匠心出圈 - 技术架构文档

## 1. 架构设计

纯前端单页应用，无后端服务，所有数据由前端 mock 提供，AI 生成逻辑通过本地模板引擎模拟。

```mermaid
flowchart TD
    subgraph "前端层 Frontend"
        "React Router 路由" --> "页面组件 Pages"
        "页面组件 Pages" --> "通用组件 Components"
        "通用组件 Components" --> "Zustand 状态管理"
    end
    subgraph "数据层 Data"
        "Zustand 状态管理" --> "mockData 静态数据"
        "Zustand 状态管理" --> "generatePlan 生成引擎"
    end
    subgraph "样式层 Style"
        "页面组件 Pages" --> "Tailwind CSS"
        "通用组件 Components" --> "Framer Motion 动效"
        "通用组件 Components" --> "Lucide Icons"
    end
```

## 2. 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式方案**：Tailwind CSS 3
- **路由**：react-router-dom 6
- **状态管理**：zustand
- **图标**：lucide-react
- **动效**：framer-motion
- **数据**：前端 mock 数据，无真实 API
- **部署**：静态网站（可直接部署至 Vercel/Netlify/GitHub Pages）

## 3. 路由定义

| 路由 | 用途 |
|------|------|
| `/` | 首页 Hero 区，项目介绍与 CTA |
| `/workspace` | 创作工作台，输入表单与生成 |
| `/result` | AI 生成结果页（8 大模块） |
| `/result/:id` | 查看指定作品/案例的生成结果 |
| `/cases` | 示例案例列表 |
| `/library` | 作品库 |
| `/about` | 关于项目 |

## 4. 数据模型

### 4.1 核心数据结构

```typescript
// 用户输入表单
interface ProjectInput {
  heritageName: string;        // 非遗项目名称
  craftFeatures: string;       // 技艺特点
  inheritorStory: string;      // 传承人故事
  targetAudience: string[];    // 目标受众
  platforms: string[];         // 发布平台
  duration: '15s' | '30s' | '60s'; // 视频时长
  goal: string;                // 传播目标
}

// 爆款选题
interface Topic {
  title: string;               // 选题标题
  platform: string;            // 适合平台
  reason: string;              // 推荐理由
  highlight: string;           // 传播亮点
}

// 短视频脚本段
interface ScriptSegment {
  timeRange: string;           // 时间区间，如 "0-3秒"
  phase: string;               // 阶段名，如 "爆款开头"
  visual: string;              // 画面内容
  narration: string;           // 旁白文案
  subtitle: string;            // 字幕内容
  shootingTip: string;         // 拍摄建议
}

// 镜头分镜
interface Shot {
  id: string;                  // 镜头编号
  shotType: string;            // 景别
  description: string;         // 画面描述
  movement: string;            // 运镜方式
  subtitle: string;            // 字幕
  focus: string;               // 拍摄重点
}

// 封面文案
interface CoverTitle {
  type: '悬念型' | '情绪型' | '知识型';
  title: string;
}

// 传播评分
interface SpreadScore {
  opening: number;             // 开头吸引力
  culture: number;             // 文化表达度
  youthResonance: number;      // 年轻人共鸣
  executability: number;       // 拍摄可执行性
  platformPotential: number;   // 平台传播潜力
  overall: number;             // 综合推荐指数
}

// 完整生成方案
interface GeneratedPlan {
  id: string;
  input: ProjectInput;
  topics: Topic[];
  script: ScriptSegment[];
  shots: Shot[];
  covers: CoverTitle[];
  subtitles: string[];
  shootingList: {
    props: string[];
    scenes: string[];
    closeups: string[];
    people: string[];
    environment: string[];
    audio: string[];
    lighting: string[];
  };
  scores: SpreadScore;
  suggestions: string[];
  createdAt: string;
}
```

### 4.2 数据来源

- `src/data/mockData.ts`：内置糖画完整案例 + 4 个案例摘要 + 作品库初始数据
- `src/utils/generatePlan.ts`：根据用户输入动态生成方案的模板引擎，覆盖糖画、剪纸、皮影戏、苏绣等关键词，对其他输入有通用模板兜底

## 5. 生成引擎设计

`generatePlan(input: ProjectInput): GeneratedPlan` 根据 `heritageName` 关键词匹配模板库：

1. **关键词匹配**：识别"糖画/剪纸/皮影/苏绣/木版/泥塑/蓝印"等
2. **模板组合**：从各模块模板池中选取并填入用户输入字段
3. **受众/平台适配**：根据受众和平台调整文案语气与选题方向
4. **时长适配**：根据视频时长调整脚本段数与时间轴
5. **兜底逻辑**：未匹配关键词时使用通用非遗模板，确保任何输入都有完整输出

## 6. 项目结构

```
src/
├── components/          # 通用组件
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── LoadingOverlay.tsx
│   ├── RadarChart.tsx
│   ├── ScoreRing.tsx
│   └── SectionCard.tsx
├── pages/               # 页面
│   ├── Home.tsx
│   ├── Workspace.tsx
│   ├── Result.tsx
│   ├── Cases.tsx
│   ├── Library.tsx
│   └── About.tsx
├── data/
│   └── mockData.ts      # 内置案例与作品库
├── utils/
│   └── generatePlan.ts  # AI 生成模拟引擎
├── store/
│   └── usePlanStore.ts  # zustand 状态
├── App.tsx
├── main.tsx
└── index.css
```

## 7. 关键交互实现

- **生成 loading**：点击生成后显示全屏遮罩 2 秒，文案每 500ms 轮播，旋转纹样 SVG 动效
- **结果页动态化**：方案内容随用户输入变化，关键词匹配确保糖画→糖画内容、剪纸→剪纸内容
- **导出模拟**：点击导出按钮触发 toast 提示，无真实文件下载
- **响应式**：Tailwind 断点 `sm/md/lg/xl`，移动端导航折叠
