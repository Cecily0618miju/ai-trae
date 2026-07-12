// 匠心出圈 - AI 生成模拟引擎（升级版）
import type {
  CoverTitle,
  CultureCheck,
  GeneratedPlan,
  PlatformVersion,
  ProjectInput,
  ScoreReasons,
  ScriptSegment,
  ShootingList,
  Shot,
  SpreadScore,
  Topic,
} from "../data/types";

// 非遗项目模板库
interface HeritageTemplate {
  keywords: string[];
  themes: string[];
  visuals: string[];
  cultureLine: string;
  props: string[];
  scenes: string[];
  closeups: string[];
  audio: string[];
  visualPrompts: string[];   // AI 画面提示词
  compositions: string[];     // 构图建议
  shotDurations: string[];    // 镜头时长
  cultureKeywords: string[];  // 核心技艺关键词
  cultureRisks: string[];     // 表达风险
  cultureSuggestions: string[]; // 文化表达建议
}

const TEMPLATES: HeritageTemplate[] = [
  {
    keywords: ["糖画", "糖人", "吹糖"],
    themes: ["会发光的糖", "童年的甜", "一勺糖的魔法"],
    visuals: ["糖浆拉丝", "石板作画", "金色透光"],
    cultureLine: "这门手艺不缺故事，缺的是被看见",
    props: ["铜糖锅", "石板", "糖画铲", "竹签", "麦芽糖"],
    scenes: ["老师傅糖画摊位", "黄昏街道", "孩童围观"],
    closeups: ["糖浆拉丝特写", "糖画成形指尖", "糖画透光纹理", "孩童眼睛特写"],
    audio: ["熬糖咕嘟声", "糖浆接触石板的滋滋声", "孩童笑声"],
    visualPrompts: [
      "竖屏短视频画面，老街糖画摊，金黄色糖浆在石板上拉出龙形，逆光透亮，手部特写，温暖电影感，高细节",
      "俯拍，石板上糖画成形全过程，糖浆流淌轨迹清晰，老师傅手腕动作，自然光，暖色调",
      "中景，小孩在糖画摊前抬头仰望，眼睛发亮，自然光，生活感抓拍",
      "近景，老师傅微笑递出糖画，背景夕阳暖光，人像模式，情感温度",
      "特写，糖画龙在阳光下晃动，晶莹剔透，侧光，高质感",
    ],
    compositions: [
      "俯拍近景，糖浆轨迹位于画面中心，手部从右上角进入",
      "正俯拍，石板占画面下方2/3，留白上方给天空",
      "平视中景，小孩在画面左侧，摊位在右侧",
      "中近景，人物居中，背景虚化",
      "微距特写，成品占满画面，光线从左上角进入",
    ],
    shotDurations: ["3秒", "5秒", "4秒", "5秒", "3秒"],
    cultureKeywords: ["熬糖", "石板作画", "拉丝", "冷却成型", "可食用"],
    cultureRisks: ["避免只当成普通甜品或猎奇内容", "避免只强调'能吃的画'而忽略手工技艺", "避免过度使用滤镜掩盖糖浆质感"],
    cultureSuggestions: ["童年记忆", "手工温度", "现场互动", "老师傅坚守"],
  },
  {
    keywords: ["剪纸", "窗花", "刻纸"],
    themes: ["一张红纸的魔法", "剪刀下的中国年", "纸上的千年纹样"],
    visuals: ["红纸翻飞", "剪刀游走", "纹样成形"],
    cultureLine: "一把剪刀，剪出的是祝福，留下的是根",
    props: ["红宣纸", "剪刀", "刻刀", "蜡板", "样稿"],
    scenes: ["老宅窗前", "春节窗花场景", "阳光透窗"],
    closeups: ["剪刀游走指尖", "纸屑飘落", "成品透光纹样", "老人皱纹与剪纸"],
    audio: ["剪刀咔嚓声", "纸张翻动声", "窗外鞭炮远响"],
    visualPrompts: [
      "竖屏，红宣纸特写，剪刀在指尖游走剪出精细纹样，逆光透红，高对比度",
      "俯拍，剪纸过程全景，纸屑飘落，暖色调室内光",
      "中景，老人坐在窗前剪纸，阳光透过窗花洒在脸上",
      "特写，剪纸成品对着窗户，光线透过纹样形成美丽阴影",
    ],
    compositions: [
      "微距特写，剪刀尖与纸面接触点位于画面中央",
      "俯拍，纸张占画面中心，剪刀从右侧进入",
      "中景侧拍，人物在左侧，窗花在右侧",
      "正对窗户，成品居中，光线从背后透出",
    ],
    shotDurations: ["3秒", "4秒", "5秒", "3秒"],
    cultureKeywords: ["剪刻", "红纸", "窗花", "民间纹样", "节庆"],
    cultureRisks: ["避免仅当成装饰品或手工课内容", "避免忽略纹样背后的文化含义", "避免过度强调'简单'而弱化技艺含量"],
    cultureSuggestions: ["春节年味", "祝福寓意", "指尖匠心", "民间智慧"],
  },
  {
    keywords: ["皮影", "影戏", "皮影戏"],
    themes: ["一块白布后的江湖", "光与影的千年戏", "会动的非遗"],
    visuals: ["皮影剪影", "白布透光", "操纵杆舞动"],
    cultureLine: "光在动，影在演，故事在传承",
    props: ["皮影人物", "白布幕", "灯光源", "操纵杆", "锣鼓"],
    scenes: ["昏暗戏台", "白布幕后", "观众剪影"],
    closeups: ["皮影关节特写", "操纵杆手指", "剪影面部", "灯光透皮"],
    audio: ["锣鼓点", "唱腔片段", "操纵杆碰撞声", "观众惊叹"],
    visualPrompts: [
      "竖屏，白布幕透出皮影剪影，皮影人物关节活动，暖黄背光，高对比剪影",
      "中景，白布幕后操纵者手指翻飞，皮影杆在手间穿梭",
      "特写，皮影关节连接处，牛皮透光纹理",
      "全景，昏暗戏台下观众剪影抬头观看",
    ],
    compositions: [
      "正对白布，皮影剪影居中，留出上下字幕空间",
      "侧面拍幕后，操纵者手部在画面中心",
      "微距，关节细节占满画面",
      "低角度，观众剪影在前景，戏台在远景",
    ],
    shotDurations: ["3秒", "5秒", "3秒", "4秒"],
    cultureKeywords: ["皮影", "白布幕", "背光", "操纵杆", "唱腔", "剪影"],
    cultureRisks: ["避免只强调'老动画'而忽略戏曲艺术性", "避免忽略唱腔与操纵的配合", "避免仅展示视觉而忽略听觉体验"],
    cultureSuggestions: ["光影艺术", "戏曲文化", "手工雕刻", "民间叙事"],
  },
  {
    keywords: ["苏绣", "刺绣", "蜀绣", "湘绣"],
    themes: ["一根丝线的千年雅韵", "针尖上的江南", "绣出来的光阴"],
    visuals: ["丝线穿梭", "绣面渐成", "指尖光泽"],
    cultureLine: "一针一线，绣的是江南，藏的是岁月",
    props: ["绣绷", "蚕丝线", "绣针", "绸缎底料", "图稿"],
    scenes: ["江南窗边绣架", "阳光丝线", "绣娘侧影"],
    closeups: ["针尖穿布", "丝线光泽", "绣面渐成纹理", "绣娘专注眼神"],
    audio: ["丝线穿布轻响", "绣棚转动声", "窗外鸟鸣"],
    visualPrompts: [
      "竖屏微距，针尖穿过丝绸，蚕丝线在光下泛出柔和光泽，浅景深",
      "俯拍，绣绷上图案渐成，丝线色彩渐变丰富",
      "中景侧拍，绣娘坐在窗边，阳光洒在绣面和手上",
      "特写，成品绣面局部，丝线光泽如画",
    ],
    compositions: [
      "微距俯拍，针尖在画面中心，丝线从右侧入画",
      "正俯拍，绣绷占画面80%，渐成图案居中",
      "侧拍，人物在左侧，窗光从左上角进入",
      "微距平移，绣面纹理细节占满画面",
    ],
    shotDurations: ["4秒", "5秒", "5秒", "4秒"],
    cultureKeywords: ["刺绣", "丝线", "针法", "丝绸", "江南"],
    cultureRisks: ["避免只强调'好看'而忽略针法技艺", "避免忽略不同绣种的文化差异", "避免过度强调'慢工出细活'而失去传播节奏"],
    cultureSuggestions: ["丝线之美", "针尖匠心", "江南雅韵", "时间艺术"],
  },
  {
    keywords: ["木版年画", "年画", "木版"],
    themes: ["一张年画的年味", "刻板上的中国年", "墨色里的门神"],
    visuals: ["刻刀游走", "墨色拓印", "年画成形"],
    cultureLine: "一版一年，印出的是年味，传承的是民俗",
    props: ["梨木板", "刻刀", "棕刷", "宣纸", "矿物颜料"],
    scenes: ["老作坊", "年画晾晒架", "春节门庭"],
    closeups: ["刻刀走线", "棕刷上墨", "揭纸瞬间", "门神面部"],
    audio: ["刻刀木板声", "棕刷拓印声", "纸张揭起声"],
    visualPrompts: [
      "竖屏特写，刻刀在梨木板上游走，木屑飘落，侧光强调纹理",
      "俯拍，棕刷在刻板上均匀上墨，墨色浓淡变化",
      "中景，宣纸覆上刻板，棕刷拓印动作",
      "特写，揭纸瞬间，年画图案清晰呈现",
    ],
    compositions: [
      "微距侧拍，刻刀尖与木板接触点居中",
      "正俯拍，刻板占满画面，刷子从上方入画",
      "平视，纸张揭开动作，画面上下对称",
      "成品正面，门神图案居中，四周留白",
    ],
    shotDurations: ["4秒", "4秒", "3秒", "3秒"],
    cultureKeywords: ["刻版", "拓印", "矿物颜料", "门神", "年俗"],
    cultureRisks: ["避免只当成'老海报'而忽略民间信仰", "避免忽略刻版技艺的难度", "避免仅展示成品而忽略制作过程"],
    cultureSuggestions: ["年味记忆", "民间信仰", "手工刻版", "节庆文化"],
  },
  {
    keywords: ["泥塑", "彩塑", "惠山泥人"],
    themes: ["一团泥的百态人生", "指尖捏出的童趣", "泥里的乡愁"],
    visuals: ["泥团成形", "指尖捏塑", "彩绘上色"],
    cultureLine: "一团泥，捏出的是童趣，留下的是乡愁",
    props: ["胶泥", "塑刀", "颜料", "毛笔", "转盘"],
    scenes: ["作坊案台", "泥塑陈列", "孩童围观"],
    closeups: ["指尖捏塑", "泥团成形", "彩绘细节", "泥人表情"],
    audio: ["揉泥声", "塑刀刮擦", "作坊环境音"],
    visualPrompts: [
      "竖屏特写，指尖捏塑泥团成形，泥土纹理，自然光",
      "俯拍，塑刀在泥塑表面雕刻细节",
      "中景，转盘上泥塑旋转，毛笔上色",
      "特写，成品泥人表情生动，彩绘细节",
    ],
    compositions: [
      "微距，指尖与泥团接触面居中",
      "正俯拍，转盘居中，泥塑在中心旋转",
      "平视，成品排列展示",
      "特写，泥人面部表情居中",
    ],
    shotDurations: ["4秒", "4秒", "4秒", "3秒"],
    cultureKeywords: ["捏塑", "彩绘", "民间玩具", "泥人"],
    cultureRisks: ["避免只当成'玩具'而忽略雕塑艺术", "避免忽略地域流派差异", "避免仅展示成品而忽略手工过程"],
    cultureSuggestions: ["童趣记忆", "民间雕塑", "手工温度", "地方特色"],
  },
  {
    keywords: ["蓝印花布", "扎染", "蜡染"],
    themes: ["一块布的植物魔法", "蓝白之间的江南", "染缸里的千年纹"],
    visuals: ["布匹入染", "蓝白显纹", "晾晒飘动"],
    cultureLine: "一缸靛蓝，染的是布，留的是江南记忆",
    props: ["白棉布", "靛蓝染料", "染缸", "竹竿", "刻板"],
    scenes: ["染坊院落", "晾布长廊", "阳光蓝布"],
    closeups: ["布匹入染缸", "蓝白显纹瞬间", "布匹飘动", "染匠双手"],
    audio: ["染缸搅动声", "布匹拧水声", "风吹布匹声"],
    visualPrompts: [
      "竖屏，白布入靛蓝染缸，染料晕开，慢动作",
      "中景，染匠从染缸中提起布匹，蓝白纹样显现",
      "全景，晾布长廊，蓝印花布在风中飘动",
      "特写，蓝白纹样细节，植物染料质感",
    ],
    compositions: [
      "平视，染缸在画面下方，布匹从上方入缸",
      "中景，人物在左侧，布匹从染缸中提起占右侧",
      "仰拍，蓝布飘动占画面上方2/3",
      "微距，纹样细节占满画面",
    ],
    shotDurations: ["4秒", "4秒", "5秒", "3秒"],
    cultureKeywords: ["靛蓝", "植物染", "刻板", "蓝白纹", "晾晒"],
    cultureRisks: ["避免只强调'好看'而忽略染色工艺", "避免忽略不同地域蓝染的差异", "避免仅展示成品而忽略手工印染过程"],
    cultureSuggestions: ["自然染色", "江南记忆", "手工印染", "蓝白之美"],
  },
  // 陶瓷 / 瓷器
  {
    keywords: ["陶瓷", "瓷器", "青花", "汝窑", "建盏", "紫砂", "陶艺"],
    themes: ["一团泥的千年浴火", "瓷器里的中国色", "拉坯机上的时间艺术"],
    visuals: ["拉坯旋转", "釉色流动", "窑火透红"],
    cultureLine: "一团泥，一炉火，烧出的是中国千年雅韵",
    props: ["拉坯机", "陶泥", "釉料", "刻刀", "窑炉", "画笔"],
    scenes: ["陶艺工作室", "窑炉前", "釉色调配台"],
    closeups: ["拉坯指尖动作", "釉料流动纹理", "窑火透亮瞬间", "成品釉面光泽"],
    audio: ["拉坯机嗡嗡声", "泥料拍打声", "窑火燃烧声", "瓷器清脆敲击声"],
    visualPrompts: [
      "竖屏，拉坯机上陶泥旋转成形，双手塑造碗形，水光闪烁，慢动作，电影感",
      "特写，釉料在瓷坯上流动晕开，色彩渐变，侧光突出质感",
      "中景，匠人专注拉坯，背景窑炉暖光，温暖色调",
      "微距，成品青花瓷纹理细节，光线穿透釉面",
    ],
    compositions: [
      "俯拍，拉坯机居中，双手在两侧塑形",
      "特写，釉料接触点居中，从右侧入画",
      "中景侧拍，人物居左，窑炉在背景",
      "微距平移，纹理占满画面",
    ],
    shotDurations: ["4秒", "4秒", "4秒", "3秒"],
    cultureKeywords: ["拉坯", "施釉", "窑烧", "青花", "开片", "紫砂"],
    cultureRisks: ["避免只强调'好看的杯子'而忽略千年技艺", "避免混淆不同窑口（汝窑/官窑/哥窑）的文化差异", "避免仅展示成品而忽略拉坯、施釉、烧窑过程"],
    cultureSuggestions: ["千年窑火", "釉色之美", "手工拉坯", "东方雅韵"],
  },
  // 竹编
  {
    keywords: ["竹编", "竹器", "竹篮", "竹席", "竹丝"],
    themes: ["一根竹篾的千丝万缕", "竹编里的江南时光", "指尖上的编织魔法"],
    visuals: ["竹篾穿梭", "编织成形", "竹丝光泽"],
    cultureLine: "一根竹子，劈成千丝，编出的是生活智慧",
    props: ["竹子", "篾刀", "刮刀", "竹篾", "模具", "水盆"],
    scenes: ["竹编作坊", "竹林边", "老宅院落"],
    closeups: ["竹篾穿梭指尖", "劈篾动作", "编织纹理渐成", "竹丝光泽特写"],
    audio: ["竹篾摩擦声", "篾刀劈竹声", "竹子断裂清脆声"],
    visualPrompts: [
      "竖屏微距，竹篾在指尖穿梭编织，纹理渐成，侧光突出竹丝光泽",
      "特写，篾刀劈开竹子成薄片，慢动作，高细节",
      "中景，匠人坐在作坊中编织，竹篾在手间穿梭，自然光",
      "俯拍，竹编成品纹理细节，几何图案",
    ],
    compositions: [
      "微距，竹篾接触点居中",
      "特写，刀刃与竹子接触面占画面中央",
      "中景侧拍，人物在画面左侧",
      "正俯拍，成品占满画面",
    ],
    shotDurations: ["4秒", "3秒", "4秒", "3秒"],
    cultureKeywords: ["劈篾", "编织", "竹丝", "经纬", "挑压"],
    cultureRisks: ["避免只当成'手工篮子'而忽略编织技艺", "避免忽略不同地域竹编流派差异（如东阳竹编/四川瓷胎竹编）", "避免仅展示成品而忽略劈篾的难度"],
    cultureSuggestions: ["千丝万缕", "竹丝之美", "江南时光", "生活智慧"],
  },
  // 木雕
  {
    keywords: ["木雕", "木刻", "雕花", "东阳木雕", "潮州木雕"],
    themes: ["一刀一凿的木上江湖", "木雕里的中国故事", "木头会说话"],
    visuals: ["刻刀走线", "木屑飘落", "木雕成形"],
    cultureLine: "一刀一凿，刻的是木头，雕的是匠心",
    props: ["木料", "刻刀", "凿子", "木槌", "砂纸", "雕刻台"],
    scenes: ["木雕作坊", "雕刻台前", "成品陈列室"],
    closeups: ["刻刀走线瞬间", "木屑飘落", "木雕纹样渐成", "匠人专注眼神"],
    audio: ["刻刀切削声", "木槌敲击声", "木屑落地声", "砂纸打磨声"],
    visualPrompts: [
      "竖屏特写，刻刀在木料上雕刻纹样，木屑飘落，侧光强调纹理与立体感",
      "俯拍，匠人手持木槌与凿子雕刻，动作有力，自然光",
      "中景，匠人专注雕刻，背景木雕成品陈列，暖色调",
      "微距，成品木雕纹样细节，光线突出层次",
    ],
    compositions: [
      "微距侧拍，刀尖与木料接触点居中",
      "正俯拍，木料占画面中心",
      "中景，人物居中偏左",
      "微距平移，纹样占满画面",
    ],
    shotDurations: ["4秒", "4秒", "4秒", "3秒"],
    cultureKeywords: ["圆雕", "浮雕", "镂空", "贴金", "刀法"],
    cultureRisks: ["避免只当成'木工艺品'而忽略雕刻技艺", "避免混淆不同木雕流派（东阳木雕/潮州木雕/黄杨木雕）", "避免过度强调'慢'而失去短视频节奏"],
    cultureSuggestions: ["刀凿匠心", "木上江湖", "立体雕刻", "东方美学"],
  },
  // 川剧变脸
  {
    keywords: ["变脸", "川剧", "变脸术", "脸谱"],
    themes: ["0.5秒换一张脸的江湖", "川剧变脸的千年秘密", "一秒变脸，百年传承"],
    visuals: ["脸谱瞬间切换", "披风挥舞", "面具飞转"],
    cultureLine: "0.5秒换一张脸，藏的是川剧千年的江湖",
    props: ["脸谱面具", "披风", "戏服", "头饰", "折扇", "音乐伴奏"],
    scenes: ["川剧戏台", "排练厅", "后台化妆间"],
    closeups: ["脸谱切换瞬间", "披风挥舞", "眼神特写", "面具细节"],
    audio: ["川剧锣鼓点", "变脸瞬间'唰'声", "戏腔唱段", "观众惊呼"],
    visualPrompts: [
      "竖屏，川剧演员披风一挥脸谱瞬间切换，高帧率慢动作，强视觉冲击",
      "特写，演员眼神凌厉，脸谱色彩浓烈，舞台灯光",
      "中景，演员在戏台上表演变脸，披风飞舞，戏台灯光",
      "微距，脸谱面具细节，色彩与纹理，侧光",
    ],
    compositions: [
      "中景，演员居中，披风动作占据画面",
      "特写，面部占画面2/3",
      "全景，戏台居中，演员在中央",
      "微距，面具占满画面",
    ],
    shotDurations: ["3秒", "3秒", "4秒", "3秒"],
    cultureKeywords: ["脸谱", "披风", "抹脸", "扯脸", "吹脸", "川剧"],
    cultureRisks: ["避免泄露变脸核心技法（非遗保密要求）", "避免只强调'神奇'而忽略川剧戏曲艺术性", "避免忽略脸谱色彩的文化含义"],
    cultureSuggestions: ["川剧江湖", "脸谱艺术", "瞬间魔法", "巴蜀文化"],
  },
  // 昆曲
  {
    keywords: ["昆曲", "昆剧", "水磨腔", "牡丹亭", "游园惊梦"],
    themes: ["六百年的水磨腔", "昆曲里的中国式浪漫", "一字三叹的东方美学"],
    visuals: ["水袖翻飞", "身段曼妙", "眼神传情"],
    cultureLine: "一字三叹，水袖一甩，六百年的浪漫就在台上",
    props: ["水袖", "戏服", "头面", "折扇", "胭脂", "戏台"],
    scenes: ["昆曲戏台", "园林实景", "后台化妆间"],
    closeups: ["水袖翻飞指尖", "眼神传情", "身段定格", "头面珠钗"],
    audio: ["笛声悠扬", "水磨腔唱段", "鼓板伴奏", "水袖挥动声"],
    visualPrompts: [
      "竖屏，昆曲演员水袖翻飞，身段曼妙，园林实景，柔光，电影质感",
      "特写，演员眼神传情，眼妆精致，戏台灯光",
      "中景，演员在园林中演唱，水袖动作优雅，自然光",
      "微距，头面珠钗细节，光线闪烁",
    ],
    compositions: [
      "中景，演员居中，水袖动作占据画面两侧",
      "特写，眼部占画面中央",
      "全景，园林实景，人物在画面1/3处",
      "微距，珠钗占满画面",
    ],
    shotDurations: ["5秒", "3秒", "4秒", "3秒"],
    cultureKeywords: ["水磨腔", "水袖", "身段", "唱念做打", "折子戏", "行当"],
    cultureRisks: ["避免只当成'古风Cosplay'而忽略戏曲艺术性", "避免用现代审美过度改造传统身段", "避免忽略昆曲'慢'的美学特质而强加快节奏"],
    cultureSuggestions: ["六百年水磨腔", "东方浪漫", "园林梦境", "一字三叹"],
  },
  // 苗绣
  {
    keywords: ["苗绣", "苗族刺绣", "苗银", "百鸟衣"],
    themes: ["一根彩线绣出的史诗", "苗绣里的蝴蝶妈妈", "大山深处的彩色密码"],
    visuals: ["彩线穿梭", "绣面渐成", "银饰闪烁"],
    cultureLine: "苗家女儿从会拿针起，就把史诗绣在了衣服上",
    props: ["彩丝线", "绣针", "绣布", "绣架", "苗银饰", "图腾样稿"],
    scenes: ["苗寨吊脚楼", "绣娘群像", "山间田野"],
    closeups: ["彩线穿梭指尖", "绣面图腾渐成", "苗银饰晃动", "绣娘专注眼神"],
    audio: ["丝线穿布声", "苗语低声吟唱", "银饰碰撞声", "山间鸟鸣"],
    visualPrompts: [
      "竖屏微距，彩线在深色绣布上穿梭，图腾纹样渐成，侧光突出立体感",
      "中景，苗寨绣娘坐在吊脚楼中刺绣，身着传统服饰，自然光",
      "特写，苗银头饰晃动，光线闪烁，背景虚化",
      "俯拍，绣面图腾全貌，色彩浓烈",
    ],
    compositions: [
      "微距，针尖与绣布接触点居中",
      "中景侧拍，人物在画面左侧，吊脚楼背景",
      "特写，银饰占画面2/3",
      "正俯拍，绣面占满画面",
    ],
    shotDurations: ["4秒", "5秒", "3秒", "3秒"],
    cultureKeywords: ["数纱绣", "打籽绣", "锁绣", "蝴蝶妈妈", "图腾", "苗银"],
    cultureRisks: ["避免只当成'少数民族装饰品'而忽略其史诗性", "避免忽略图腾的文化象征含义（如蝴蝶妈妈）", "避免将苗绣与普通刺绣混为一谈"],
    cultureSuggestions: ["彩色史诗", "蝴蝶妈妈", "苗寨传承", "图腾密码"],
  },
];

const GENERIC_TEMPLATE: HeritageTemplate = {
  keywords: [],
  themes: ["一门手艺的当代打开方式", "被时间留下的非遗", "指尖上的中国"],
  visuals: ["手部特写", "工具与材料", "成品展示"],
  cultureLine: "传统技艺值得被更多年轻人看见",
  props: ["传统工具", "原材料", "工作台", "成品"],
  scenes: ["作坊现场", "传承人工作场景", "成品展示空间"],
  closeups: ["手部动作特写", "工具细节", "材料纹理", "成品局部"],
  audio: ["现场环境音", "工具操作声", "传承人口述"],
  visualPrompts: [
    "竖屏，手部特写，传统工具操作细节，自然光，高质感",
    "俯拍，工作台全景，材料与工具陈列",
    "中景，传承人工作神态，暖色调",
    "特写，成品细节，柔和光线",
  ],
  compositions: [
    "特写，手部动作居中",
    "正俯拍，工作台占满画面",
    "中景，人物居中",
    "特写，成品占满画面",
  ],
  shotDurations: ["3秒", "4秒", "4秒", "3秒"],
  cultureKeywords: ["传统技艺", "手工制作", "非物质文化遗产"],
  cultureRisks: ["避免过度包装失去真实感", "避免忽略技艺背后的文化语境"],
  cultureSuggestions: ["文化传承", "手工价值", "地方特色"],
};

function matchTemplate(name: string): HeritageTemplate {
  const lower = name.toLowerCase();
  for (const t of TEMPLATES) {
    if (t.keywords.some((k) => lower.includes(k.toLowerCase()))) {
      return t;
    }
  }
  return GENERIC_TEMPLATE;
}

function audienceHook(audience: string[]): string {
  if (audience.includes("年轻人")) return "用反差感与好奇心抓住年轻人";
  if (audience.includes("亲子家庭")) return "以童年回忆引发家庭共鸣";
  if (audience.includes("文旅游客")) return "突出地方文化与体验感";
  if (audience.includes("学校学生")) return "用知识与趣味结合打开认知";
  if (audience.includes("非遗爱好者")) return "深入技艺细节与文化脉络";
  return "兼顾文化感与传播性";
}

function buildScript(input: ProjectInput, template: HeritageTemplate): ScriptSegment[] {
  const name = input.heritageName;
  const theme = template.themes[0];
  const culture = template.cultureLine;

  if (input.duration === "15s") {
    return [
      { timeRange: "0-3秒", phase: "爆款开头", visual: `特写：${template.visuals[0]}，逆光/高对比呈现`, narration: `你见过这样的${name}吗？`, subtitle: `${theme}`, shootingTip: "强视觉冲击，3秒内不放任何字幕干扰" },
      { timeRange: "3-10秒", phase: "技艺展示", visual: `中景：${input.craftFeatures || `${name}制作过程核心动作`}`, narration: `一双手，一辈子，只做这一件事`, subtitle: "一辈子一件事", shootingTip: "略加速，突出动作流畅" },
      { timeRange: "10-15秒", phase: "真实口述 + 互动", visual: "传承人与成品同框，保留现场原声", narration: input.inheritorStory || `${culture}，你愿意为它点个赞吗？`, subtitle: input.inheritorStory ? "一句本人真话" : "你愿意为它点赞吗", shootingTip: "优先使用本人原声，成品占画面下半部" },
    ];
  }

  if (input.duration === "60s") {
    return [
      { timeRange: "0-3秒", phase: "爆款开头", visual: `特写：${template.visuals[0]}，最高冲击力画面`, narration: `这门${name}，藏着你不知道的中国`, subtitle: theme, shootingTip: "逆光/侧逆光，3秒钩子" },
      { timeRange: "3-15秒", phase: "技艺展示", visual: `俯拍/中景：${input.craftFeatures || `${name}核心制作动作全过程`}`, narration: `从材料到成品，每一步都是时间的沉淀`, subtitle: "时间的沉淀", shootingTip: "俯拍 + 适度加速，保留关键步骤原速" },
      { timeRange: "15-30秒", phase: "传承故事", visual: `近景：传承人工作神态 + ${input.inheritorStory ? "口述片段" : "日常片段"}`, narration: input.inheritorStory || `做${name}的人越来越少，但总有人在坚持`, subtitle: "总有人在坚持", shootingTip: "近景捕捉神态，可加入一句口播原声" },
      { timeRange: "30-45秒", phase: "文化解读", visual: `特写：成品细节 + ${template.visuals[1] || "纹样细节"}`, narration: `${culture}，这是中国人独有的浪漫`, subtitle: "中国人的浪漫", shootingTip: "慢动作 + 暖光，营造文化温度" },
      { timeRange: "45-55秒", phase: "情绪升华", visual: "中景：传承人与作品同框，背景夕阳或暖光", narration: `让${name}被更多人看见，是这一代人的事`, subtitle: "被更多人看见", shootingTip: "夕阳逆光，慢动作收尾" },
      { timeRange: "55-60秒", phase: "互动引导", visual: "全屏字幕 + 成品特写", narration: `你身边还有${name}吗？评论区告诉我`, subtitle: "你身边还有吗", shootingTip: "留3秒评论引导时间" },
    ];
  }

  return [
    { timeRange: "0-3秒", phase: "爆款开头", visual: `特写：${template.visuals[0]}，逆光透亮`, narration: `你见过这样的${name}吗？`, subtitle: theme, shootingTip: "逆光/侧逆光拍摄，强视觉冲击" },
    { timeRange: "3-10秒", phase: "技艺展示", visual: `俯拍：${input.craftFeatures || `${name}核心制作动作，${template.visuals[1] || "成形过程"}`}`, narration: `一双手，几十秒，${name}就活了`, subtitle: `${name}就活了`, shootingTip: "俯拍 + 略加速，突出流畅" },
    { timeRange: "10-20秒", phase: "故事转折", visual: `中景：传承人工作 + ${input.inheritorStory ? "口述片段" : "现场片段"}`, narration: input.inheritorStory || `做${name}的人不多了，但总有人在坚持`, subtitle: "总有人在坚持", shootingTip: "抓拍真实神态，避免摆拍" },
    { timeRange: "20-28秒", phase: "情绪升华", visual: "近景：成品 + 夕阳暖光", narration: culture, subtitle: "缺的是被看见", shootingTip: "夕阳逆光 + 慢动作，营造温度" },
    { timeRange: "28-30秒", phase: "互动引导", visual: "全屏字幕 + 成品特写", narration: `你了解${name}吗？评论区聊聊`, subtitle: "你了解吗", shootingTip: "字幕居中，留评论引导" },
  ];
}

function buildShots(input: ProjectInput, template: HeritageTemplate): Shot[] {
  const name = input.heritageName;
  const craftEvidence = input.craftFeatures.trim() || template.visuals[0];
  const v = template.visualPrompts;
  const c = template.compositions;
  const d = template.shotDurations;

  const baseShots: Shot[] = [
    { id: "镜01", shotType: "特写", description: craftEvidence, movement: "固定 + 微推", subtitle: "3 秒真实动作钩子", focus: `${template.visuals[0]}的视觉冲击`, visualPrompt: `${v[0] || `竖屏短视频画面，${name}特写，传统技艺细节，高质感`}；用户素材锚点：${craftEvidence}`, composition: c[0] || "特写构图，主体居中", duration: d[0] || "3秒" },
    { id: "镜02", shotType: "俯拍全景", description: `${name}制作全过程，手部动作与材料`, movement: "俯拍固定", subtitle: "技艺展示", focus: "动作流畅与成形过程", visualPrompt: v[1] || `俯拍，${name}制作过程全景`, composition: c[1] || "正俯拍，工作台居中", duration: d[1] || "4秒" },
    { id: "镜03", shotType: "中景", description: "传承人工作神态与口述", movement: "手持跟随", subtitle: "传承故事", focus: "人物真实神态与情感", visualPrompt: v[2] || `中景，传承人工作神态，温暖自然光`, composition: c[2] || "中景，人物居中偏左", duration: d[2] || "4秒" },
    { id: "镜04", shotType: "近景", description: `${name}成品细节 + 暖光`, movement: "缓推", subtitle: "文化升华", focus: "成品质感与文化温度", visualPrompt: v[3] || `近景，${name}成品细节，暖光`, composition: c[3] || "近景，成品占满画面", duration: d[3] || "3秒" },
    { id: "镜05", shotType: "特写", description: "成品在光线中晃动/转动", movement: "微移", subtitle: "互动引导", focus: "成品美感与互动引导", visualPrompt: v[0] || `特写，${name}成品，柔光`, composition: c[0] || "特写，成品居中", duration: "3秒" },
  ];

  if (input.duration === "60s") {
    baseShots.splice(3, 0, {
      id: "镜04", shotType: "近景", description: `材料/工具细节，${template.visuals[1] || "工艺细节"}`, movement: "横移", subtitle: "文化解读", focus: "工艺细节与文化符号", visualPrompt: v[1] || "近景，材料细节", composition: c[1] || "横移构图", duration: "4秒",
    });
    baseShots.forEach((s, i) => { s.id = `镜${String(i + 1).padStart(2, "0")}`; });
  }
  if (input.duration === "15s") return baseShots.slice(0, 3);

  return baseShots;
}

function buildCovers(input: ProjectInput, template: HeritageTemplate): CoverTitle[] {
  const name = input.heritageName;
  const theme = template.themes[0];
  return [
    { type: "悬念型", title: `这不是普通${name}，是会说话的非遗` },
    { type: "情绪型", title: `${theme}，藏着中国人的浪漫` },
    { type: "知识型", title: `关于${name}，你可能不知道的几件事` },
  ];
}

function buildShootingList(input: ProjectInput, template: HeritageTemplate): ShootingList {
  return {
    props: template.props,
    scenes: template.scenes,
    closeups: template.closeups,
    people: ["传承人正面/侧面工作", "围观者真实反应", "手部动作特写", "传承人口述片段"],
    environment: ["作坊/摊位全景", "夕阳/暖光空镜", "光影斑驳地面", "材料工具陈列"],
    audio: template.audio,
    lighting: ["逆光/侧逆光突出质感", "夕阳暖色调营造温度", "避免顶光硬阴影", "可用反光板补面部光"],
  };
}

function buildScores(input: ProjectInput, template: HeritageTemplate): SpreadScore {
  const hasStory = input.inheritorStory.length > 10;
  const hasFeatures = input.craftFeatures.length > 10;
  const multiPlatform = input.platforms.length >= 2;
  const isYoung = input.targetAudience.includes("年轻人");
  const matchedTemplate = template !== GENERIC_TEMPLATE;
  const featureDepth = Math.min(12, Math.floor(input.craftFeatures.trim().length / 6));
  const storyDepth = Math.min(12, Math.floor(input.inheritorStory.trim().length / 8));
  // 评估“当前方案是否已经可拍”，而非预测真实流量。
  const opening = Math.min(96, 64 + featureDepth + (isYoung ? 7 : 2) + (matchedTemplate ? 5 : 0));
  const culture = Math.min(96, 58 + storyDepth + (hasFeatures ? 7 : 2) + (matchedTemplate ? 11 : 3));
  const youthResonance = Math.min(94, 61 + (isYoung ? 13 : 5) + (input.targetAudience.length > 1 ? 5 : 0) + (hasStory ? 5 : 1));
  const executability = Math.min(96, 63 + featureDepth + (hasStory ? 6 : 1) + (input.duration ? 5 : 0));
  const platformPotential = Math.min(94, 60 + input.platforms.length * 8 + (multiPlatform ? 5 : 0) + (input.goal ? 6 : 0));
  const overall = Math.round((opening + culture + youthResonance + executability + platformPotential) / 5);
  return { opening, culture, youthResonance, executability, platformPotential, overall };
}

function buildSuggestions(input: ProjectInput): string[] {
  const suggestions = [
    "开头3秒先展示最有冲击力的画面，不要从全景或介绍起手",
    "增加传承人一句有情绪的口播，让观众感受到温度",
    "结尾加入互动问题，并保留3秒评论引导时间",
  ];
  if (input.platforms.includes("抖音")) suggestions.push("抖音版本建议前3秒不放字幕，纯视觉冲击留住观众");
  if (input.platforms.includes("小红书")) suggestions.push("小红书版本可加入封面标题文字与种草话术，提升点击率");
  return suggestions.slice(0, 3);
}

function buildSubtitles(input: ProjectInput, template: HeritageTemplate): string[] {
  const name = input.heritageName;
  return [
    `你见过这样的${name}吗？`,
    `一双手，几十秒，${name}就活了`,
    input.inheritorStory || `做${name}的人不多了，但总有人在坚持`,
    template.cultureLine,
    `你了解${name}吗？评论区聊聊`,
  ];
}

function buildTopics(input: ProjectInput, template: HeritageTemplate): Topic[] {
  const name = input.heritageName;
  const [t1, t2, t3] = template.themes;
  const platforms = input.platforms;
  return [
    { title: t1, platform: platforms[0] || "抖音", reason: `开头即高能，用视觉冲击在3秒内留住观众，${audienceHook(input.targetAudience)}`, highlight: `${template.visuals[0]} + ${template.visuals[1] || "成形过程"}，强视觉与节奏` },
    { title: t2 || `${name}里的中国浪漫`, platform: platforms[1] || platforms[0] || "小红书", reason: "以情绪与文化共鸣切入，适合引发转发与讨论", highlight: "传承人故事 + 文化解读，情感共鸣强" },
    { title: t3 || `这门${name}，藏着中国人的浪漫`, platform: platforms[0] || "视频号", reason: "文化升维，适合家庭与中老年群体传播", highlight: "文化温度 + 传承坚守，适合长尾传播" },
  ];
}

// 新增：平台适配版本
function buildPlatformVersions(input: ProjectInput): PlatformVersion[] {
  const name = input.heritageName;
  const allVersions: PlatformVersion[] = [
    {
      platform: "抖音",
      openingStrategy: "前3秒强视觉冲击，不放字幕，纯画面留住观众",
      subtitleStyle: "快节奏大字幕，一句一行，3-5字为一组",
      coverTitle: `你见过这样的${name}吗？`,
      coverTitleB: `0.5秒看懂${name}的硬核操作`,
      openingHookA: "强视觉冲击：直接给最高能画面特写，逆光+慢动作，前3秒不放字幕",
      openingHookB: "反问悬念：首帧抛出'你见过会发光的糖吗？'，1秒悬念后揭晓画面",
      hookWinner: "A",
      endingInteraction: "评论区互动提问 + 引导关注",
      reason: "抖音算法依赖完播率和互动，前3秒决定视频命运；A 钩子更契合抖音'视觉优先'的留存逻辑",
    },
    {
      platform: "小红书",
      openingStrategy: "封面图+标题先行，情绪化开头引发共鸣",
      subtitleStyle: "温暖治愈风格，加入种草话术和表情引导",
      coverTitle: `${name}，藏着你不知道的浪漫`,
      coverTitleB: `00后第一次看${name}，舍不得走`,
      openingHookA: "封面种草：封面图+标题先行，情绪化文案引发好奇点击",
      openingHookB: "第一人称：'我第一次看'+真实反应镜头，带入感更强",
      hookWinner: "B",
      endingInteraction: "引导收藏 + 关注 + 评论区分享经历",
      reason: "小红书用户习惯图文+视频种草，标题和封面决定点击率；B 钩子的第一人称视角更契合种草氛围",
    },
    {
      platform: "视频号",
      openingStrategy: "温情开头，以传承人故事或文化背景切入",
      subtitleStyle: "稳重、有温度，适合中老年群体阅读节奏",
      coverTitle: `这门${name}，藏着中国人的浪漫`,
      coverTitleB: `老师傅坚持${name}三十年，只为一句承诺`,
      openingHookA: "温情叙事：以传承人工作神态起手，配舒缓口播",
      openingHookB: "情感悬念：'这门手艺快要消失了'制造情感紧迫感",
      hookWinner: "A",
      endingInteraction: "引导点赞+转发到家族群",
      reason: "视频号用户偏中老年，情感共鸣和家庭传播是核心；A 钩子的温情叙事更易引发家族群转发",
    },
    {
      platform: "B站",
      openingStrategy: "知识性开头，抛出问题或冷知识引发好奇",
      subtitleStyle: "弹幕互动风格，有梗有趣，可加入知识注释",
      coverTitle: `关于${name}，你可能不知道的事`,
      coverTitleB: `5个关于${name}的冷知识，第3个绝了`,
      openingHookA: "知识悬念：抛出问题'为什么古人是这样做${name}的？'引发好奇",
      openingHookB: "冷知识流：'99%的人不知道'+编号式冷知识钩子",
      hookWinner: "B",
      endingInteraction: "引导一键三连 + 弹幕互动",
      reason: "B站用户偏好深度内容和互动，弹幕文化和三连是关键；B 钩子的冷知识流更易触发弹幕讨论",
    },
  ];

  // 只返回用户选择的平台
  return allVersions.filter((v) => input.platforms.includes(v.platform));
}

// 新增：传播评分理由（解释每个维度为什么得这个分）
function buildScoreReasons(input: ProjectInput, template: HeritageTemplate, scores: SpreadScore): ScoreReasons {
  const hasStory = input.inheritorStory.length > 10;
  const hasFeatures = input.craftFeatures.length > 10;
  const multiPlatform = input.platforms.length >= 2;
  const isYoung = input.targetAudience.includes("年轻人");
  const isGeneric = template === GENERIC_TEMPLATE;

  const openingReason = scores.opening >= 82
    ? `开头画面具备强视觉冲击（${template.visuals[0]}），${hasFeatures ? "技艺特点描述清晰，AI 据此设计了高能首帧" : "首帧抓拍核心动作"}，3 秒钩子完整度${isYoung ? "且贴合年轻人审美" : "较高"}`
    : scores.opening >= 72
    ? `开头有视觉记忆点（${template.visuals[0]}），但${hasFeatures ? "可进一步突出反差感" : "技艺特点描述偏简，首帧冲击力可加强"}`
    : `开头视觉点明确，但缺乏强反差或悬念，建议补充更具冲击力的首帧画面`;

  const cultureReason = scores.culture >= 82
    ? `命中「${template.keywords[0]}」专属文化模板，识别出${template.cultureKeywords.slice(0, 3).join("、")}等核心技艺，文化表达准确${hasStory ? "，传承人故事增强了文化温度" : ""}`
    : scores.culture >= 72
    ? `识别到${template.cultureKeywords.slice(0, 2).join("、")}等文化关键词，${hasStory ? "传承人故事补充了文化语境" : "建议补充传承人故事以增强文化深度"}`
    : `${isGeneric ? "未命中专属模板，使用通用非遗框架" : "文化识别较浅"}，建议补充技艺特点以提升文化准确度`;

  const youthReason = scores.youthResonance >= 82
    ? `选题切入年轻化视角（${template.themes[0]}），${isYoung ? "目标受众匹配年轻人，开头钩子采用反差感与好奇心设计" : "但受众设定偏宽，可更聚焦年轻群体"}`
    : scores.youthResonance >= 72
    ? `选题有一定年轻感，但${isYoung ? "开头钩子可更具网感" : "目标受众未明确包含年轻人，共鸣度受限"}`
    : `选题偏传统叙事，年轻化表达不足，建议增加反差、悬念或第一人称视角`;

  const execReason = scores.executability >= 82
    ? `分镜表完整（含景别、运镜、构图、时长），拍摄清单覆盖道具/场景/特写/收音/光线，可直接交付拍摄团队执行`
    : scores.executability >= 72
    ? `分镜与拍摄清单基本完整，但部分镜头运镜描述可更具体，建议补充参考样片`
    : `执行信息偏简，建议补充每个镜头的参考画面与运镜细节`;

  const platformReason = scores.platformPotential >= 82
    ? `已生成${input.platforms.length}个平台专属版本（${input.platforms.join("、")}），每个版本有独立开头策略与封面标题，平台适配度高`
    : scores.platformPotential >= 72
    ? `已适配${input.platforms.join("、")}，${multiPlatform ? "多平台覆盖良好" : "建议增加平台以扩大传播面"}，可进一步细化各平台差异`
    : `平台适配较单一，建议至少覆盖抖音+小红书以兼顾传播广度`;

  return {
    opening: openingReason,
    culture: cultureReason,
    youthResonance: youthReason,
    executability: execReason,
    platformPotential: platformReason,
  };
}

// 新增：文化准确性检查
function buildCultureCheck(input: ProjectInput, template: HeritageTemplate): CultureCheck {
  const matched = template !== GENERIC_TEMPLATE;
  const craftEvidence = Math.min(10, Math.floor(input.craftFeatures.trim().length / 8));
  const storyEvidence = input.inheritorStory.trim().length >= 10 ? 8 : 0;
  return {
    heritageIdentified: `「${input.heritageName}」—— ${template.keywords.join("、")}类非遗项目`,
    keywords: template.cultureKeywords,
    highlight: template.cultureLine,
    risks: template.cultureRisks,
    suggestions: template.cultureSuggestions,
    // 这是“内容核验就绪度”，不代表官方非遗认定结果。
    score: Math.min(95, (matched ? 72 : 58) + craftEvidence + storyEvidence),
  };
}

// 主生成函数
export function generatePlan(input: ProjectInput): GeneratedPlan {
  // 规范化输入：未选平台时默认推荐「抖音 + 小红书」，避免平台适配模块为空
  const normalizedInput: ProjectInput = {
    ...input,
    heritageName: input.heritageName.trim() || "传统手艺",
    craftFeatures: input.craftFeatures.trim(),
    targetAudience: input.targetAudience.length > 0 ? input.targetAudience : ["年轻人"],
    platforms: input.platforms.length > 0 ? input.platforms : ["抖音", "小红书"],
    goal: input.goal || "科普传播",
  };

  const template = matchTemplate(normalizedInput.heritageName);
  const id = `plan-${Date.now()}`;
  const createdAt = new Date().toLocaleString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  const scores = buildScores(normalizedInput, template);

  return {
    id, input: normalizedInput,
    topics: buildTopics(normalizedInput, template),
    script: buildScript(normalizedInput, template),
    shots: buildShots(normalizedInput, template),
    covers: buildCovers(normalizedInput, template),
    subtitles: buildSubtitles(normalizedInput, template),
    shootingList: buildShootingList(normalizedInput, template),
    scores,
    scoreReasons: buildScoreReasons(normalizedInput, template, scores),
    suggestions: buildSuggestions(normalizedInput),
    platformVersions: buildPlatformVersions(normalizedInput),
    cultureCheck: buildCultureCheck(normalizedInput, template),
    createdAt,
  };
}

// AI 导演团 loading 文案
export const DIRECTOR_LOADING_STEPS = [
  { agent: "文化顾问", message: "识别技艺特征、文化价值与准确表述", icon: "BookOpen", color: "jade" as const },
  { agent: "爆款编剧", message: "设计 3 秒钩子、情绪转折与真实口述", icon: "Flame", color: "cinnabar" as const },
  { agent: "分镜导演", message: "拆解景别、运镜、构图和镜头时长", icon: "Camera", color: "gold" as const },
  { agent: "平台运营官", message: "生成不同平台的 A/B 传播版本", icon: "Smartphone", color: "indigo" as const },
  { agent: "内容守护员", message: "核验文化表达并标记潜在失实风险", icon: "ShieldCheck", color: "jade" as const },
  { agent: "方案评估官", message: "计算拍摄就绪度并给出补拍建议", icon: "Gauge", color: "cinnabar" as const },
];

export function getPlatformTip(platforms: string[]): string {
  if (platforms.includes("抖音")) return "节奏快、强视觉、3秒钩子";
  if (platforms.includes("小红书")) return "种草感、生活化、有情绪";
  if (platforms.includes("B站")) return "深度感、有梗、可二刷";
  if (platforms.includes("视频号")) return "情感共鸣、适合家庭传播";
  return "节奏适中、文化感";
}

export function getAudienceTip(audience: string[]): string {
  return audienceHook(audience);
}

// 生成质量评估：根据输入完整度给出低/中/高质量提示
export interface QualityAssessment {
  level: "low" | "medium" | "high";
  score: number;          // 0-100
  label: string;          // 低/中/高
  color: string;          // tailwind 颜色类
  tips: string[];         // 改进建议
  matchedTemplate: boolean; // 是否命中非遗模板
}

export function assessInputQuality(input: ProjectInput): QualityAssessment {
  let score = 0;
  const tips: string[] = [];
  const checks: { ok: boolean; weight: number; tip: string }[] = [
    { ok: input.heritageName.trim().length >= 2, weight: 20, tip: "非遗名称请写具体，例如「糖画」「苏绣」「川剧变脸」，不要只写「传统手艺」" },
    { ok: input.craftFeatures.trim().length >= 10, weight: 20, tip: "技艺特点建议描述视觉元素，例如「糖浆拉丝」「逆光透亮」，AI 会据此设计镜头" },
    { ok: input.inheritorStory.trim().length >= 10, weight: 20, tip: "补充传承人故事（坚持年限、心愿、困境），AI 能生成更有感染力的脚本" },
    { ok: input.targetAudience.length > 0, weight: 15, tip: "选择目标受众，AI 会调整开头钩子和语气" },
    { ok: input.platforms.length > 0, weight: 15, tip: "选择发布平台，AI 会生成平台专属版本（抖音/小红书/B站/视频号）" },
    { ok: !!input.goal, weight: 10, tip: "选择传播目标，AI 会调整结尾互动策略" },
  ];

  for (const c of checks) {
    if (c.ok) score += c.weight;
    else tips.push(c.tip);
  }

  // 命中非遗模板加分
  const matchedTemplate = matchTemplate(input.heritageName) !== GENERIC_TEMPLATE;

  let level: "low" | "medium" | "high";
  let label: string;
  let color: string;

  if (score >= 85) {
    level = "high";
    label = "高质量";
    color = "jade";
  } else if (score >= 55) {
    level = "medium";
    label = "中等质量";
    color = "gold";
  } else {
    level = "low";
    label = "需补充";
    color = "cinnabar";
  }

  return { level, score, label, color, tips, matchedTemplate };
}

// 获取所有支持的非遗项目名称（供工作台展示）
export function getSupportedHeritages(): { name: string; keywords: string[] }[] {
  return TEMPLATES.map((t) => ({
    name: t.keywords[0],
    keywords: t.keywords,
  }));
}
