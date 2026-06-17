import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Methodology } from "@/components/sections/Methodology";
import { Services } from "@/components/sections/Services";
import { ForumPreview } from "@/components/sections/ForumPreview";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Methodology />
      <Services />
      <ForumPreview />
      <About />
      <Contact />
    </>
  );
}
