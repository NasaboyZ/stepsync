"use client";

import FooterNav from "@/components/footerNav/footerNav";
import Style from "./footer.module.css";
import { Button, ButtonStyle } from "@/components/button/button";

export function Footer() {
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
        onClick={() => console.log("Clickt on!")}
        style={ButtonStyle.PRIMARY}
      />

      <FooterNav />
    </footer>
  );
}
