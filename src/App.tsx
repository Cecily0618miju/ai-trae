import { lazy, Suspense, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = lazy(() => import("@/pages/Home"));
const Workspace = lazy(() => import("@/pages/Workspace"));
const Result = lazy(() => import("@/pages/Result"));
const Cases = lazy(() => import("@/pages/Cases"));
const Library = lazy(() => import("@/pages/Library"));
const About = lazy(() => import("@/pages/About"));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const move = () => {
      if (hash) document.querySelector(hash)?.scrollIntoView();
      else window.scrollTo({ top: 0, left: 0 });
    };
    move();
    const immediate = window.setTimeout(move, 0);
    const afterLazyPage = window.setTimeout(move, 220);
    return () => {
      window.clearTimeout(immediate);
      window.clearTimeout(afterLazyPage);
    };
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollManager />
      <div className="flex min-h-screen flex-col bg-rice texture-paper">
        <Navbar />
        <main className="flex-1">
          <Suspense
            fallback={
              <div className="section flex min-h-[55vh] items-center justify-center py-20" role="status">
                <div className="flex items-center gap-3 text-sm text-ink/55">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-cinnabar/25 border-t-cinnabar" />
                  正在打开导演工作台…
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workspace" element={<Workspace />} />
              <Route path="/result" element={<Result />} />
              <Route path="/result/:id" element={<Result />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/library" element={<Library />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
