// 顶部导航栏
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import BrandMark from "./BrandMark";

const NAV_ITEMS = [
  { path: "/", label: "首页" },
  { path: "/workspace", label: "开始创作" },
  { path: "/cases", label: "案例" },
  { path: "/library", label: "作品库" },
  { path: "/about", label: "关于项目" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-rice/80 backdrop-blur-md">
      <nav className="section flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <BrandMark size="md" />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-lg font-bold text-ink">匠心出圈</span>
            <span className="text-[10px] text-muted">AI 非遗短视频导演</span>
          </div>
        </Link>

        {/* 桌面导航 */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active ? "text-cinnabar" : "text-ink/70 hover:text-ink"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-cinnabar/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link to="/workspace" className="btn-primary">
            开始创作
          </Link>
        </div>

        {/* 移动端汉堡 */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-xl text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="菜单"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-ink/5 bg-rice lg:hidden"
          >
            <div className="section flex flex-col gap-1 py-4">
              {NAV_ITEMS.map((item) => {
                const active =
                  item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium ${
                      active ? "bg-cinnabar/10 text-cinnabar" : "text-ink/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/workspace"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 w-full"
              >
                开始创作
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
