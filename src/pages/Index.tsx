import { Hero } from "@/components/portfolio/Hero";
import { TechStrip } from "@/components/portfolio/TechStrip";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <>
      <Hero />
      <TechStrip />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
};

export default Index;
