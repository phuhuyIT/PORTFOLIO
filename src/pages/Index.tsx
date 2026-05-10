import { Suspense, lazy, useState, useEffect } from "react";
import { Hero } from "@/components/portfolio/Hero";
import { useInView } from "react-intersection-observer";

const About = lazy(() => import("@/components/portfolio/About").then(module => ({ default: module.About })));
const Projects = lazy(() => import("@/components/portfolio/Projects").then(module => ({ default: module.Projects })));
const Experiments = lazy(() => import("@/components/portfolio/Experiments").then(module => ({ default: module.Experiments })));
const Achievements = lazy(() => import("@/components/portfolio/Achievements").then(module => ({ default: module.Achievements })));
const Contact = lazy(() => import("@/components/portfolio/Contact").then(module => ({ default: module.Contact })));

const SectionWrapper = ({ children, id, threshold = 0.1, minHeight = "400px" }: { children: React.ReactNode, id: string, threshold?: number, minHeight?: string }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
    rootMargin: "400px 0px", // Increased margin for smoother loading
  });

  useEffect(() => {
    if (inView) setShouldLoad(true);
  }, [inView]);

  useEffect(() => {
    const handlePreload = (e: any) => {
      if (e.detail?.id === id) {
        setShouldLoad(true);
      }
    };
    window.addEventListener('preload-section', handlePreload);
    return () => window.removeEventListener('preload-section', handlePreload);
  }, [id]);

  return (
    <div ref={ref} id={id} className="scroll-mt-20" style={{ minHeight }}>
      {shouldLoad ? (
        <Suspense fallback={<div style={{ height: minHeight }} className="flex items-center justify-center font-mono text-xs text-[#00FFD1]/20 animate-pulse">LOADING_MODULE...</div>}>
          {children}
        </Suspense>
      ) : (
        <div style={{ height: minHeight }} />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <>
      <Hero />
      <SectionWrapper id="about" minHeight="600px">
        <About />
      </SectionWrapper>
      <SectionWrapper id="projects" minHeight="800px">
        <Projects />
      </SectionWrapper>
      <SectionWrapper id="experiments" minHeight="600px">
        <Experiments />
      </SectionWrapper>
      <SectionWrapper id="records" minHeight="600px">
        <Achievements />
      </SectionWrapper>
      <SectionWrapper id="contact" minHeight="500px">
        <Contact />
      </SectionWrapper>
    </>
  );
};

export default Index;
