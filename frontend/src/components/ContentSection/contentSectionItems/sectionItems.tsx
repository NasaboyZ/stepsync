"use client";

import useContentStore from "@/store/contentStore";
import Image from "next/image";
import Style from "./sectionItems.module.css";
import { TitelComponent, titelStyle } from "@/components/titel/titel";
import { Button, ButtonStyle } from "@/components/button/button";

interface ContentSectionItemsProps {
  pageKey: string;
  title: string;
}

export default function SectionItems({ pageKey, title }: ContentSectionItemsProps) {
  const getContent = useContentStore((state) => state.getContent);
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

        {/* Text mit Button */}
        <div className={Style["text-container"]}>
          <div className={Style["title"]}>
            <TitelComponent style={titelStyle.SECONDARY} label={title} />
          </div>
          <p className={Style["description"]}>{text}</p>
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
