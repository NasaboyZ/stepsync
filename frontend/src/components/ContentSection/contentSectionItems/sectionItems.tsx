"use client";

import Typography from "@/components/typography/typography";
import useContentStore from "@/store/contentStore";
import Image from "next/image";
import Style from "./sectionItems.module.css";
import { Button, ButtonStyle } from "@/components/button/button";
import useHeroStore from "@/store/heroStore";

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
          <Button style={ButtonStyle.PRIMARY} label="Erfahre mehr" />
        </div>
      )}
      <div className={Style["content-wrapper"]}>
        <div className={Style["image-container"]}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={500}
            height={500}
            className={Style["image"]}
          />
        </div>

        <div className={Style["text-container"]}>
          <div className={Style["title"]}>
            <Typography variant="h2">{title}</Typography>
          </div>
          <Typography variant="body1">{text}</Typography>
          {pageKey === "homePage" && (
            <div className={Style["button-container"]}>
              <Button style={ButtonStyle.PRIMARY} label="Erfahre mehr" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
