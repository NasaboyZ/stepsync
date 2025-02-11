import SectionItems from "@/components/contentSectionItems/sectionItems";
import CookieConsent from "@/components/cookiebanner/cookiebanner";
import Hero from "@/components/homeHero/hero/hero";

export default function Home() {
  return (
    <>
      <CookieConsent />
      <Hero />
      <SectionItems pageKey="homePage" title="Über uns" />
    </>
  );
}
