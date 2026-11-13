import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { CursorProvider, Footer, Nav } from "./ui";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";

let lenis: Lenis | null = null;

function Pages() {
  const loc = useLocation();
  useEffect(() => { lenis ? lenis.scrollTo(0, { immediate: true }) : scrollTo(0, 0); }, [loc.pathname]);
  return (
    <AnimatePresence mode="wait">
      <motion.main key={loc.pathname}>
        <motion.div className="pointer-events-none fixed inset-0 z-[90] origin-bottom bg-ink"
          initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} exit={{ scaleY: 0 }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} />
        <Routes location={loc}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    lenis = new Lenis({ lerp: 0.09 });
    let r = 0;
    const raf = (t: number) => { lenis!.raf(t); r = requestAnimationFrame(raf); };
    r = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(r); lenis!.destroy(); lenis = null; };
  }, []);
  return (
    <HashRouter>
      <CursorProvider>
        <Nav />
        <Pages />
      </CursorProvider>
    </HashRouter>
  );
}
