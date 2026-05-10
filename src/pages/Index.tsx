import { Suspense, lazy } from "react";
import { Hero } from "@/components/portfolio/Hero";
import { useInView } from "react-intersection-observer";

const About = lazy(() => import("@/components/portfolio/About").then(module => ({ default: module.About })));
const Projects = lazy(() => import("@/components/portfolio/Projects").then(module => ({ default: module.Projects })));
const Experiments = lazy(() => import("@/components/portfolio/Experiments").then(module => ({ default: module.Experiments })));
const Achievements = lazy(() => import("@/components/portfolio/Achievements").then(module => ({ default: module.Achievements })));
const Contact = lazy(() => import("@/components/portfolio/Contact").then(module => ({ default: module.Contact })));

const SectionWrapper = ({ children, threshold = 0.1 }: { children: React.ReactNode, threshold?: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
    rootMargin: "200px 0px",
  });

  return (
    <div ref={ref} className="min-h-[20vh]">
      {inView ? (
        <Suspense fallback={<div className="h-40 flex items-center justify-center font-mono text-xs text-[#00FFD1]/20 animate-pulse">LOADING_MODULE...</div>}>
          {children}
        </Suspense>
      ) : null}
    </div>
  );
};

const Index = () => {
  return (
    <>
      <Hero />
      <SectionWrapper>
        <About />
      </SectionWrapper>
      <SectionWrapper>
        <Projects />
      </SectionWrapper>
      <SectionWrapper>
        <Experiments />
      </SectionWrapper>
      <SectionWrapper>
        <Achievements />
      </SectionWrapper>
      <SectionWrapper>
        <Contact />
      </SectionWrapper>
    </>
  );
};

export default Index;
