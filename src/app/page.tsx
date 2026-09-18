import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Media } from "@/components/Media";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Media />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
