"use client";

import Typography from "@/components/typography/typography";
import useContentStore from "@/store/contentStore";

import Style from "./sectionItems.module.css";

import useHeroStore from "@/store/heroStore";
import { Card, CardMedia, CardContent, Box } from "@mui/material";

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
          <Typography variant="body1">{heroText}</Typography>
        </div>
      )}
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: "1200px",
          margin: "2rem auto",
          background: "transparent",
          boxShadow: "none",
          borderRadius: 0,
          color: "var(--white)",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", md: "40%" },
            height: { xs: "300px", md: "auto" },
            objectFit: "cover",
            aspectRatio: "1 / 1",
          }}
          image={imageSrc.src}
          alt={imageAlt}
        />
        <Box sx={{ width: { xs: "100%", md: "60%" } }}>
          <CardContent
            sx={{
              padding: 3,
              "& .MuiTypography-root": {
                color: "var(--white)",
              },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h3">{title}</Typography>
            </Box>
            <Typography variant="body1">{text}</Typography>
            {pageKey === "homePage" && <Box sx={{ marginTop: 2 }}></Box>}
          </CardContent>
        </Box>
      </Card>
    </section>
  );
}
