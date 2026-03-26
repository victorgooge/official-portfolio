import Navbar       from "@/components/layout/Navbar";
import Footer       from "@/components/layout/Footer";
import Hero         from "@/components/sections/Hero";
import About        from "@/components/sections/About";
import Skills       from "@/components/sections/Skills";
import Projects     from "@/components/sections/Projects";
import Experience   from "@/components/sections/Experience";
import Contact      from "@/components/sections/Contact";
import TerminalEgg  from "@/components/ui/TerminalEgg";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <TerminalEgg />
    </>
  );
}
