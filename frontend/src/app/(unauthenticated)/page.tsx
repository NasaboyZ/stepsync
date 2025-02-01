import SectionItems from "@/components/contentSectionItems/sectionItems";
import Hero from "@/components/homeHero/hero/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionItems pageKey="homePage" title="Über uns" />
    </>
  );
}
