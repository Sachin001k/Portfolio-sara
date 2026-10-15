import { About } from "@/components/About";
import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";
import { DanceMovement } from "@/components/DanceMovement";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Leadership } from "@/components/Leadership";
import { Navbar } from "@/components/Navbar";
import { Research } from "@/components/Research";
import { hasContact } from "@/content/site";
import { getContent } from "@/lib/content";

export default async function Home() {
  const content = await getContent();
  const { siteConfig } = content;

  return (
    <>
      <Navbar name={siteConfig.name} showContact={hasContact(siteConfig)} />
      <main className="flex-1">
        <Hero config={siteConfig} />
        <About about={content.about} resumeUrl={siteConfig.resumeUrl} />
        <Research research={content.research} />
        <DanceMovement
          ballet={content.ballet}
          movementLiteracy={content.movementLiteracy}
        />
        <Leadership
          schoolRoles={content.schoolRoles}
          internship={content.internship}
        />
        <Awards awards={content.awards} />
        <Contact config={siteConfig} />
      </main>
      <Footer name={siteConfig.name} />
    </>
  );
}
