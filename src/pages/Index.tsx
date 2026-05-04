import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Experiments } from "@/components/portfolio/Experiments";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experiments />
      <Achievements />
      <Contact />
    </>
  );
};

export default Index;
