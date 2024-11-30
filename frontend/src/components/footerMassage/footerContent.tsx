import { Button, ButtonStyle } from "../button/button";
import Style from "./footerContent.module.css";
export function FooterContent() {
  return (
    <footer className={Style["footer"]}>
      <div className={Style["container-words"]}>
        <p className={Style["footer_text"]}>
          Bereit, deine Fitness zu steigern? Starte mit StepSync, werde jede
          Sekunde stärker.
        </p>
      </div>

      <Button
        label="start now!"
        style={ButtonStyle.PRIMARY}
      />
    </footer>
  );
}
