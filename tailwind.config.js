/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        rice: "#FAF7F2",
        surface: "#F3EDE3",
        ink: "#1D1B19",
        muted: "#706A63",
        cinnabar: {
          DEFAULT: "#D63B30",
          light: "#E55A50",
          dark: "#A92C25",
        },
        gold: {
          DEFAULT: "#D6A73C",
          light: "#E8C96D",
          dark: "#A7791F",
        },
        jade: {
          DEFAULT: "#2F7D70",
          light: "#54A094",
          dark: "#205B52",
        },
        indigo: {
          DEFAULT: "#5B4B8A",   // 蓝紫 - AI 科技感
          light: "#7A6BAB",
          dark: "#3E3162",
        },
        paper: "#F7F2E9",
        sand: "#E8DED0",
        success: "#2F7D70",
        warning: "#B7791F",
        error: "#C9342C",
      },
      fontFamily: {
        // 标题用衬线宋体
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', '"Songti SC"', 'STSong', 'serif'],
        // 正文用黑体
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        // 数字/英文用现代字体
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        soft: "0 8px 24px -16px rgba(43, 35, 27, 0.22)",
        card: "0 18px 50px -28px rgba(43, 35, 27, 0.32)",
        glow: "0 12px 34px -18px rgba(214, 59, 48, 0.55)",
        gold: "0 12px 28px -18px rgba(214, 167, 60, 0.5)",
      },
      backgroundImage: {
        'gradient-rice': 'linear-gradient(135deg, #FAF7F2 0%, #F5EFE3 100%)',
        'gradient-cinnabar': 'linear-gradient(135deg, #C8392E 0%, #9E2A21 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A961 0%, #A88A42 100%)',
        'pattern-cloud': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M20 40c0-8 6-14 14-14s14 6 14 14' fill='none' stroke='%23C9A961' stroke-width='1' opacity='0.15'/%3E%3C/svg%3E\")",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-soft': 'pulse 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
