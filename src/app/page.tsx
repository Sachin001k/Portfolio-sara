import { About } from "@/components/About";
import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";
import { DanceMovement } from "@/components/DanceMovement";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Leadership } from "@/components/Leadership";
import { Navbar } from "@/components/Navbar";
import { Research } from "@/components/Research";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Research />
        <DanceMovement />
        <Leadership />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
