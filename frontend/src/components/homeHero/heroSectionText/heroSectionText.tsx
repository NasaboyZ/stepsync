import { Button, ButtonStyle } from "@/components/button/button";
import Style from "./heroSectionText.module.css";

export default function HeroSectionText() {
  return (
    <>
      <p className={Style["heroSubtitle"]}>
        Erlebe echte Motivation mit StepSync! Unsere Ziele und Challenges
        treiben dich an und zeigen deinen Fortschritt. Verfolge deine
        Verbesserungen genau und werde Teil einer engagierten Community. Kein
        leeres Gerede, sondern echte Fitnessziele – dokumentiere deinen Weg mit
        uns!
      </p>
      <Button style={ButtonStyle.PRIMARY} label="Erfahre mehr"></Button>
    </>
  );
}
