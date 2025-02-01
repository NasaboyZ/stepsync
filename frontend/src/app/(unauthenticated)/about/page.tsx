import SectionItems from "@/components/contentSectionItems/sectionItems";

export default function AboutPage() {
  return (
    <>
      <SectionItems
        pageKey="aboutTeaser"
        title="Die Geschichte hinter StepSync"
      />
      <SectionItems pageKey="aboutPage" title="Unsere Mission StepSync" />
    </>
  );
}
