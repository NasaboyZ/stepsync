import Style from "./content.module.css";
import Image, { StaticImageData } from "next/image";
import { Button, ButtonStyle } from "../button/button";
import { TitelComponent } from "../titel/titel";
import Rohlstuhlman from "@/assets/man-Rollstuhl.jpg"; // Importiere das Bild direkt
import ScrollToTop from "../scrolltoTop/scrolltoTop";

interface ContentSectionProps {
  title?: string;
  text?: string;
  buttonText?: string;
  imageSrc?: StaticImageData | string;
  imageAlt?: string;
  onButtonClick?: () => void;
}

export default function SectionItems({
  title = "Über uns",
  text = "Bist du bereit, deine Fitnessziele zu rocken? Bei Stepsync geht es um mehr als nur Training – es geht um die beste Version von dir! Finde Workouts, die zu dir passen, teile deine Erfolge und stürze dich in aufregende Challenges. Werde Teil unserer Community und starte heute durch – dein neues Ich wartet!",
  buttonText = "Erfahre mehr",
  imageSrc = Rohlstuhlman,
  imageAlt = "Mann im Rollstuhl",
  onButtonClick,
}: ContentSectionProps) {
  return (
    <>
      <TitelComponent label={title} />
      <section className={Style["section-wrapper"]}>
        <div className={Style["container-wrapper-section-home"]}>
          <div className={Style["bild-container"]}>
            <Image
              src={imageSrc}
              width={500}
              height={500}
              alt={imageAlt}
              className={Style["image"]}
            />
          </div>

          <div className={Style["container-beschreibung"]}>
            <p className={Style["beschreibung"]}>{text}</p>
            <div className={Style["container-button"]}>
              <Button
                style={ButtonStyle.PRIMARY}
                label={buttonText}
                onClick={onButtonClick}
              />
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </>
  );
}
