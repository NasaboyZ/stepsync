"use client";

import Typography from "@/components/typography/typography";
import useContentStore from "@/store/contentStore";
import Style from "./sectionItems.module.css";
import useHeroStore from "@/store/heroStore";
import { Box, Card, CardMedia, CardContent } from "@mui/material";

interface ContentSectionItemsProps {
  pageKey: string;
  title: string;
}

export default function SectionItems({
  pageKey,
  title,
}: ContentSectionItemsProps) {
  const getContent = useContentStore((state) => state.getContent);
  const heroText = useHeroStore((state) => state.heroText);
  const content = getContent(pageKey);

  if (!content)
    return (
      <section className={Style["content-section"]}>
        Inhalt nicht gefunden
      </section>
    );

  const { text, imageSrc, imageAlt } = content;

  return (
    <section className={Style["content-section"]}>
      {pageKey === "homePage" && (
        <div className={Style["hero-text-section"]}>
          <Typography variant="h2">{heroText}</Typography>
        </div>
      )}
      <Card className={Style.card}>
        <CardMedia
          component="img"
          className={Style.cardMedia}
          image={imageSrc.src}
          alt={imageAlt}
        />
        <Box className={Style.contentBox}>
          <CardContent className={Style.cardContent}>
            <Box className={Style.titleBox}>
              <Typography variant="h3">{title}</Typography>
            </Box>
            <Typography variant="body1">{text}</Typography>
            {pageKey === "homePage" && <Box className={Style.marginTop}></Box>}
          </CardContent>
        </Box>
      </Card>
    </section>
  );
}
