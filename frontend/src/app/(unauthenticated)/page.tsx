import SectionItems from "@/components/contentSectionItems/sectionItems";
import Hero from "@/components/homeHero/hero/hero";
// import Cookiebanner from "@/components/cookiebanner/cookiebanner";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionItems pageKey="homePage" title="Über uns" />
      {/* <Cookiebanner /> */}
    </>
  );
}
